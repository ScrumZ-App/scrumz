<template>
  <Press @click="toggleVisibility"> Toggle </Press>
  <Press @click="prevVersion"> Prev Version </Press>
  <Press @click="nextVersion"> Next Version </Press>
  <Bento
    v-if="room && user"
    name="room"
    :areas="['logo card']"
    :columns="[6, 6, 6, 6, 6]"
    height="17"
  >
    <To href="/"><Logo width="6" height="8" /></To>
    <Card
      v-for="option in room.options.sort((a, b) => a.position - b.position)"
      class="card"
      locked
      mirror
      :back="isUserVotedForOption(option.position) || room.isOpened"
      width="6"
      height="8"
      @click="voteToCard(option)"
    >
      <template #title> {{ option.value }} </template>
      <template #icon> </template>
      <template #back>
        <div
          class="create-card"
          :class="{
            voted: isUserVotedForOption(option.position),
          }"
        >
          <h1 v-if="room.isOpened">{{ getVoteCount(option.position) }}</h1>
          <span v-else> ✨ </span>
        </div>
      </template>
    </Card>
  </Bento>
  <DebugCode>
    <span>Loading: {{ loading }}</span>
    <span>Room ID: {{ roomId }}</span>
    <span>User: {{ user?.uid }}</span>
    <span>Role: {{ role }}</span>
    <span>Raw Room Info:</span>
    <span>{{ JSON.stringify(room, null, 2) }}</span>
  </DebugCode>
  <CopyUrl />
  <CurrentURLQrCode />
</template>

<script>
import { ref as dbRef, push, update } from 'firebase/database'

export default {
  data() {
    return {
      roomId: '',
      user: null,
      room: null,
      newTodoText: '',
    }
  },
  watch: {
    room: {
      handler: function (val) {
        console.log('ü', val)
        if (val === undefined) return
        if (val === null) return

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
      deep: true,
    },
  },
  async mounted() {
    this.roomId = this.$route.params.id
    this.user = {
      uid: (await getCurrentUser()).uid,
      role: 'developer',
    }
    this.room = await useDatabaseObject(
      dbRef(useDatabase(), 'rooms/' + this.roomId)
    )
  },
  methods: {
    async prevVersion() {
      if (this.room.version === 0) return
      const roomRef = dbRef(useDatabase(), 'rooms/' + this.roomId)
      await update(roomRef, {
        version: this.room.version - 1,
      })
    },
    async nextVersion() {
      const roomRef = dbRef(useDatabase(), 'rooms/' + this.roomId)
      await update(roomRef, {
        version: this.room.version + 1,
      })
    },
    async toggleVisibility() {
      const roomRef = dbRef(useDatabase(), 'rooms/' + this.roomId)
      await update(roomRef, {
        isOpened: !this.room.isOpened,
      })
    },
    singleVotes() {
      const votes = this.room.voteVersions?.[this.room.version]
      if (votes === undefined) return []
      if (votes === null) return []
      const votesArray = Object.values(votes)
      const voters = [...new Set(votesArray.map((vote) => vote.user))]
      const singleVotes = voters.map((voter) =>
        votesArray.findLast((vote) => vote.user === voter)
      )
      return singleVotes || []
    },
    isUserVotedForOption(option) {
      return this.singleVotes().find(
        (vote) => vote.option === option && vote.user === this.user.uid
      )
    },
    getVoteCount(option) {
      return this.singleVotes().filter((vote) => vote.option === option).length
    },
    userAlreadyInRoom() {
      const users = this.room.users
      if (users === undefined) return
      if (users === null) return
      if (users[this.user.uid] === undefined) return false
      return true
    },
    fillRole() {
      const users = this.room.users
      this.user.role = users[this.user.uid].role
    },
    async voteToCard(option) {
      if (this.room.isOpened) return
      const voteVersionsRef = dbRef(
        useDatabase(),
        'rooms/' + this.roomId + '/voteVersions/' + this.room.version + '/'
      )
      try {
        push(voteVersionsRef, {
          user: this.user.uid,
          option: option.position,
        })
      } catch (error) {
        console.error(error)
      }
    },
    async addUserToRoom() {
      console.log('new user in room')
      // set role to developer
      const usersRef = dbRef(
        useDatabase(),
        'rooms/' + this.roomId + '/users/' + this.user.uid
      )
      try {
        await update(usersRef, {
          name: 'Test User' + Math.random(),
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss">
.room {
  display: flex;
  justify-content: center;
  align-items: center;

  .logo .front {
    font-size: 350%;
  }

  .card {
    cursor: pointer;
  }

  .create-card {
    display: flex;
    flex-direction: column;
    justify-items: flex-end;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: var(--border-radius);
    align-items: center;

    &.voted {
      border: 4px solid var(--color-primary);

      h1 {
        color: var(--color-black);
      }
      span {
        font-size: 400%;
        color: white;
        filter: invert(43%) sepia(81%) saturate(4144%) hue-rotate(324deg)
          brightness(104%) contrast(102%);
      }
    }
  }
}
</style>
