import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { ref as dbRef, push, update, get } from 'firebase/database'

interface OptionType {
  position: number
  value: string
  isEmpty?: boolean
}

import { adjectives, names } from '~/config'

const defaultRooms: { [key: string]: OptionType[] } = {
  'fibonacci': [
    { position: 1, value: '1' },
    { position: 2, value: '2' },
    { position: 3, value: '3' },
    { position: 4, value: '5' },
    { position: 5, value: '8' },
    { position: 6, value: '13' },
    { position: 7, value: '21' },
    { position: 8, value: '34' },
    { position: 9, value: '?', isEmpty: true },
  ],
  't-shirt': [
    { position: 1, value: 'XXS' },
    { position: 2, value: 'XS' },
    { position: 3, value: 'S' },
    { position: 4, value: 'M' },
    { position: 5, value: 'L' },
    { position: 6, value: 'XL' },
    { position: 7, value: 'XXL' },
    { position: 8, value: '3XL' },
    { position: 9, value: '?', isEmpty: true },
  ],
  'face': [
    { position: 1, value: 'xD' },
    { position: 2, value: ':D' },
    { position: 3, value: ':)' },
    { position: 4, value: ':|' },
    { position: 5, value: ':(' },
    { position: 6, value: ':C' },
    { position: 7, value: '?', isEmpty: true },
  ],
}

export default defineNuxtPlugin((App) => {
  const pinia = createPinia()
  const app = createApp(App)
  app.use(pinia)

  const scrumz = {
    createNewId: function (): string {
      const namesArr = names.split(',')
      const adjectivesArr = adjectives.split(',')
      return (
        adjectivesArr[Math.floor(Math.random() * adjectivesArr.length)] +
        '-' +
        namesArr[Math.floor(Math.random() * namesArr.length)]
      )
    },
    roomExists: async function (roomId: string): Promise<boolean> {
      return (await this.getRoom(roomId)) !== null
    },
    getRoom: async function (roomId: string): Promise<any> {
      const roomRef = dbRef(useDatabase(), `rooms/${roomId}`)
      const snapshot = await get(roomRef)
      return await snapshot.val()
    },
    createRoom: async function (options: {
      uid: string
      type: string
      customOptions: OptionType[]
    }): Promise<string> {
      const { uid, type, customOptions } = options
      const newId = this.createNewId()
      const roomRef = dbRef(useDatabase(), `rooms/${newId}`)

      await update(roomRef, {
        createdBy: uid,
        isOpened: false,
        options: defaultRooms[type] || customOptions,
        users: {
          [uid]: {
            name: 'John Doe',
            role: 'scrum-master',
          },
        },
        version: 0,
      })

      const exists = await this.roomExists(newId)
      if (!exists) {
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }

      return newId
    },
  }

  return {
    provide: {
      scrumz,
    },
  }
})