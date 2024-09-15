<template>
  <Bento
    v-if="room"
    name="room"
    :areas="['logo card']"
    :columns="[6, 6, 6, 6, 6]"
    :height="17"
  >
    <Card class="logo-card" flip :width="6" :height="8">
      <template #icon>
        <div>
          <span>scrumz</span>
        </div>
      </template>
      <template #back>
        <div class="config-card" v-if="user && room">
          <Press @click="changeName"> Change Name </Press>
          <template v-if="room.createdBy === user.uid">
            <Press @click="toggleVisibility">
              <template v-if="room.isOpened"> Hide Results </template>
              <template v-else> Show Results </template>
            </Press>
            <Press @click="clearVotes"> Clear Votes </Press>
          </template>
        </div>
      </template>
    </Card>
    <Card
      v-for="option in room.options.sort((a, b) => a.position - b.position)"
      class="card"
      :class="{
        'voted': isUserVotedForOption(option.position),
        'most-voted': getMostVotedOption() === option.position,
      }"
      locked
      mirror
      :back="room.isOpened"
      back-title
      :width="6"
      :height="8"
      @click="voteToCard(option)"
    >
      <template #title> {{ option.value }} </template>
      <template #icon>
        <div class="front-card"></div>
      </template>
      <template #back>
        <div class="back-card">
          <AvatarGroup :avatars="getAvatarsOfOption(option.position)" />
        </div>
      </template>
    </Card>
  </Bento>
</template>

<script lang="ts">
import { ref as dbRef, push, update, set } from 'firebase/database'

export default defineComponent({
  props: {
    roomId: {
      type: String,
      default: '',
    },
    room: {
      type: Object as PropType<Room>,
      default: null,
    },
    user: {
      type: Object as PropType<User>,
      default: null,
    },
  },

  methods: {
    /* Lifecycle */
    async load() {
      if (this.userAlreadyInRoom()) this.fillRole()
      else await this.addUserToRoom()
    },
    userAlreadyInRoom(): boolean {
      if (this.room === null) return false
      if (!this.user?.uid) return false
      const users = this.room.users
      if (users === undefined) return false
      if (users === null) return false
      if (users[this.user.uid] === undefined) return false
      console.log('Already in the room')
      return true
    },
    fillRole(): void {
      if (!this.user) return
      if (!this.room) return
      console.log('Filling role')
      const users = this.room.users
      this.user.role = users[this.user.uid].role
      this.user.name = users[this.user.uid].name
    },
    async addUserToRoom(): Promise<void> {
      if (!this.user) return
      console.log('Not in the room, adding user')
      // set role to developer
      const usersRef = dbRef(
        useDatabase(),
        'rooms/' + this.roomId + '/users/' + this.user.uid
      )
      try {
        await set(usersRef, {
          name: '',
          role: 'developer',
        })
      } catch (error) {
        console.error(error)
      }
    },

    /* Buttons */
    async changeName(): Promise<void> {
      this.$emit('change-name')
    },
    async toggleVisibility(): Promise<void> {
      if (!this.room) return
      const roomRef = dbRef(useDatabase(), 'rooms/' + this.roomId)
      await update(roomRef, {
        isOpened: !this.room.isOpened,
      })
    },
    async clearVotes(): Promise<void> {
      if (!this.room) return
      const roomRef = dbRef(useDatabase(), 'rooms/' + this.roomId)
      await update(roomRef, {
        isOpened: false,
        version: this.room.version + 1,
      })
    },
    async voteToCard(option: { position: number }): Promise<void> {
      if (!this.room) return
      if (!this.user) return
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

    /* Vote Helpers */
    singleVotes(): { user: string; option: number }[] {
      if (!this.room) return []
      const votes = this.room.voteVersions?.[this.room.version]
      if (votes === undefined) return []
      if (votes === null) return []
      const votesArray = Object.values(votes)
      const voters = [...new Set(votesArray.map((vote) => vote.user))]
      const singleVotes = voters.map(
        (voter) =>
          votesArray.findLast((vote) => vote.user === voter) as {
            user: string
            option: number
          }
      )
      return singleVotes || []
    },
    getAvatarsOfOption(optionPosition: number): string[] {
      return this.singleVotes()
        .filter((vote) => vote.option === optionPosition)
        .map((vote) => vote.user)
        .map((userId) => this.room?.users[userId]?.name || '')
    },
    isUserVotedForOption(optionPosition: number): boolean {
      if (!this.user) return false
      return !!this.singleVotes().find(
        (vote) => vote.option === optionPosition && vote.user === this.user?.uid
      )
    },
    getVoteCount(optionPosition: number): number {
      return this.singleVotes().filter((vote) => vote.option === optionPosition)
        .length
    },
    getMostVotedOption(): number {
      if (!this.room) return -1
      const mostVotedOptions = [...this.room.options]
        .map((option) => ({
          ...option,
          votes: this.getVoteCount(option.position),
        }))
        .sort((a, b) => b.position - a.position)
        .sort((a, b) => {
          return b.votes - a.votes
        })
      if (mostVotedOptions[0].votes === 0) return -1
      return mostVotedOptions[0].position
    },
  },
})
</script>
