import { createPinia } from 'pinia'
import { useLayoutStore } from '@/store'
import { createApp } from 'vue'

export default defineNuxtPlugin((App) => {
  const pinia = createPinia()
  const app = createApp(App)
  app.use(pinia)
  const store = useLayoutStore()

  const to = (path: string) => {
    if (store.add(path)) {
      history.pushState(null, '', path)
    }
  }

  // console.log(App)
  return {
    provide: {
      to,
    },
  }
})
