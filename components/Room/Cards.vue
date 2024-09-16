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
          <span>{{ $t('scrumz') }}</span>
        </div>
      </template>
      <template #back>
        <div class="config-card" v-if="user && room">
          <Press @click="changeName"> {{ $t('change-name') }} </Press>
          <template v-if="room.createdBy === user.uid">
            <Press @click="toggleVisibility">
              <template v-if="room.isOpened">
                {{ $t('hide-results') }}
              </template>
              <template v-else> {{ $t('show-results') }} </template>
            </Press>
            <Press @click="resetVotes"> {{ $t('reset-votes') }} </Press>
          </template>
        </div>
      </template>
    </Card>
    <Card
      v-for="option in room.options?.sort((a, b) => a.position - b.position)"
      class="card"
      :class="{
        'voted': isUserVotedForOption(option.position),
        'most-voted': mostVotedOption === option.position,
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

<script setup lang="ts">
import { ref as dbRef, push, update, set } from 'firebase/database'

const { t: $t } = useI18n()

const props = defineProps({
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
})

const debug = inject('debug') as Ref<any>

const emit = defineEmits(['change-name'])
const database = useDatabase()

// helper functions
const userAlreadyInRoom = () => {
  if (!props.room || !props.user?.uid) return false
  if (debug.value) console.log('Checking if user already in room')
  const users = props.room.users
  return users && users[props.user.uid] !== undefined
}

const fillRole = () => {
  if (!props.user || !props.room) return
  if (debug.value) console.log('User already in room')
  const users = props.room.users
  props.user.role = users[props.user.uid].role
  props.user.name = users[props.user.uid].name
}

const addUserToRoom = async () => {
  if (!props.user) return
  if (debug.value) console.log('Adding user to room')
  const usersRef = dbRef(
    database,
    `rooms/${props.roomId}/users/${props.user.uid}`
  )
  try {
    await set(usersRef, {
      name: '',
      role: 'developer',
    })
  } catch (error) {
    console.error(error)
  }
}

async function load() {
  if (userAlreadyInRoom()) {
    fillRole()
  } else {
    await addUserToRoom()
  }
}

const changeName = () => {
  emit('change-name')
}

const toggleVisibility = async () => {
  if (!props.room) return
  const roomRef = dbRef(database, `rooms/${props.roomId}`)
  await update(roomRef, {
    isOpened: !props.room.isOpened,
  })
}

const resetVotes = async () => {
  if (!props.room) return
  const roomRef = dbRef(database, `rooms/${props.roomId}`)
  await update(roomRef, {
    isOpened: false,
    version: props.room.version + 1,
  })
}

const voteToCard = async (option: { position: number }) => {
  if (!props.room || !props.user || props.room.isOpened) return
  const voteVersionsRef = dbRef(
    database,
    `rooms/${props.roomId}/voteVersions/${props.room.version}`
  )
  try {
    await push(voteVersionsRef, {
      user: props.user.uid,
      option: option.position,
    })
  } catch (error) {
    console.error(error)
  }
}

const singleVotes = computed(() => {
  if (!props.room) return []
  const votes = props.room.voteVersions?.[props.room.version]
  if (!votes) return []
  const votesArray = Object.values(votes)
  const voters = [...new Set(votesArray.map((vote) => vote.user))]
  return (
    voters.map(
      (voter) =>
        votesArray.findLast((vote) => vote.user === voter) as {
          user: string
          option: number
        }
    ) || []
  )
})

const getAvatarsOfOption = (optionPosition: number) => {
  return singleVotes.value
    .filter((vote) => vote.option === optionPosition)
    .map((vote) => props.room?.users[vote.user]?.name || '')
}

const isUserVotedForOption = (optionPosition: number) => {
  return !!singleVotes.value.find(
    (vote) => vote.option === optionPosition && vote.user === props.user?.uid
  )
}

const getVoteCount = (optionPosition: number) => {
  return singleVotes.value.filter((vote) => vote.option === optionPosition)
    .length
}

const mostVotedOption = computed(() => {
  if (!props.room) return -1
  const mostVotedOptions = [...props.room.options]
    .map((option) => ({
      ...option,
      votes: getVoteCount(option.position),
    }))
    .sort((a, b) => b.votes - a.votes || b.position - a.position)
  return mostVotedOptions[0].votes === 0 ? -1 : mostVotedOptions[0].position
})

defineExpose({
  load,
})
</script>
