<template>
  <DebugCode>
    <span>Loading: {{ loading }}</span>
    <span>Room ID: {{ roomId }}</span>
    <span>User: {{ user }}</span>
    <span>Role: {{ role }}</span>
    <span>Raw Room Info:</span>
    <span>{{ JSON.stringify(room, null, 2) }}</span>
  </DebugCode>
  <CopyURL />
  <CurrentURLQrCode />
</template>

<script>
import { ref as dbRef, update } from 'firebase/database'

export default {
  data() {
    return {
      roomId: '',
      loading: true,
      user: '',
      role: '',
      room: {},
      newTodoText: ''
    }
  },
  async mounted() {
    this.roomId = this.$route.params.id
    this.user = await getCurrentUser()
    console.log(this.roomId, this.user.uid)
    this.room = await useDatabaseObject(
      dbRef(useDatabase(), 'rooms/' + this.roomId)
    )
  },
  watch: {
    room: {
      handler: function (val) {
        if (val === undefined) return
        if (val === null) {
          this.loading = false
          return alert('Room does not exist')
        }
        if (this.loading) {
          this.loading = false
          const { userAlreadyInRoom, fillRole, addUserToRoom } = this
          if (userAlreadyInRoom()) {
            fillRole()
            addUserToRoom()
          } else {
            addUserToRoom()
          }
        }
      },
      deep: true
    }
  },
  methods: {
    userAlreadyInRoom() {
      const users = this.room.users
      if (users === undefined) return
      if (users === null) return
      if (users[this.user.uid] === undefined) return false
      return true
    },
    fillRole() {
      const users = this.room.users
      this.role = users[this.user.uid].role
    },
    async addUserToRoom() {
      console.log('new user in room')
      // set role to developer
      this.role = 'developer'
      const usersRef = dbRef(
        useDatabase(),
        'rooms/' + this.roomId + '/users/' + 'IMUYHoFbH3bNePAnzwJh4TZPrzE2'
      )
      try {
        await update(usersRef, {
          name: 'Test User' + Math.random()
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
