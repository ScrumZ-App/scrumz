<template>
  <div>
    <NavBar :name="user.name">
      <template #avatar>
        <Press @click="changeName">
          {{ $t('change-name') }}
        </Press>
      </template>
      <template v-if="room.createdBy === user.uid">
        <div class="scrum-master-tools">
          <ToggleEye :open="room.isOpened" @click="toggleVisibility" />
          <Press
            center
            width-may-change
            :width="smartButtonWidth"
            @click="onSmartButton"
          >
            {{ smartButtonText }}
          </Press>
          <ToggleNext :version="room.version" @next="resetVotes" />
        </div>
      </template>
      <template v-else>
        <Press width-may-change center :width="customMessage ? 10 : 6">
          <HiddenText
            :message="customMessage"
            :text="
              singleVotes.length + ' / ' + Object.values(room.users).length
            "
          />
        </Press>
      </template>
    </NavBar>
    <Bento
      v-if="room"
      name="room"
      :areas="['logo card']"
      :columns="[6, 6, 6, 6, 6]"
      :height="15"
    >
      <!-- <Card class="logo-card" flip :width="6" :height="7">
      <template #icon>
        <div>
          <span>{{ $t('scrumz') }}</span>
        </div>
      </template>
      <template #back>
        <div class="config-card" v-if="user && room"></div>
      </template>
    </Card> -->
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
        :height="7"
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
  </div>
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
const parentUser = inject('user') as Ref<any>

const emit = defineEmits(['change-name', 'fill-role'])
const database = useDatabase()

const customMessage = ref('')

watch(
  () => props.room.version,
  () => {
    customMessage.value = $t('new-round')
    setTimeout(() => (customMessage.value = ''), 3000)
  }
)

// helper functions
const userAlreadyInRoom = () => {
  if (!props.room || !props.user?.uid) return false
  if (debug.value) console.log('Checking if user already in room')
  const users = props.room.users
  return users && users[props.user.uid] !== undefined
}

const fillRole = async () => {
  if (!props.user || !props.room || !props.user.name) return
  if (debug.value) console.log('User already in room')

  if (
    props.user.name !== parentUser.value.displayName &&
    parentUser.value.displayName
  ) {
    console.log('syncing room name to display name')
    const userRef = dbRef(
      useDatabase(),
      'rooms/' + props.roomId + '/users/' + props.user.uid
    )
    await update(userRef, { name: parentUser.value.displayName })
  }

  const users = props.room.users

  emit('fill-role', {
    role: users[props.user.uid].role,
    name: users[props.user.uid].name,
  })
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
      name: parentUser?.value?.displayName || '',
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

const smartButtonText = computed(() => {
  if (!props.room) return ''
  if (props.room.isOpened) return $t('reset-votes')
  const voteCount = singleVotes.value.length
  const userCount = Object.values(props.room.users).length
  if (voteCount >= userCount) return $t('show-results')
  return voteCount + ' / ' + userCount
})

const smartButtonWidth = computed(() => {
  if (!props.room) return 1
  if (props.room.isOpened) return 8
  const voteCount = singleVotes.value.length
  const userCount = Object.values(props.room.users).length
  if (voteCount >= userCount) return 8
  return 8
})

const onSmartButton = () => {
  if (props.room.isOpened) return resetVotes()
  const voteCount = singleVotes.value.length
  const userCount = Object.values(props.room.users).length
  if (voteCount >= userCount) return toggleVisibility()
  return false
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

<style lang="scss">
.scrum-master-tools {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

@media (max-aspect-ratio: 1/1) {
  .scrum-master-tools {
    width: 100%;
    gap: 1rem;

    .toggle-eye-component,
    .toggle-next-component {
      display: none;
    }
  }
}
</style>
