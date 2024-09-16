<template>
  <template v-if="loading">
    <div class="loading">
      <UserAvatar :name="randomLoader" :size="128" />
    </div>
  </template>
  <RoomNameInput
    v-else-if="user && (!user.name || showUserInput)"
    :room-id="roomId"
    :user="user"
    @set="
      (username) => {
        if (!user) return
        showUserInput = false
        user.name = username
      }
    "
  />
  <RoomCards
    ref="roomCardsRef"
    v-if="room && user"
    v-show="!loading && user.name && !showUserInput"
    :room="room"
    :user="user"
    :room-id="roomId"
    @changeName="() => (showUserInput = true)"
  />
  <DebugCode v-if="debug">
    <span>Loading: {{ loading }}</span>
    <span>Room ID: {{ roomId }}</span>
    <span>User: {{ user?.uid }}</span>
    <span>Role: {{ user?.role }}</span>
    <span>Raw Room Info:</span>
    <span>{{ JSON.stringify(room, null, 2) }}</span>
  </DebugCode>
</template>

<script setup lang="ts">
import { ref as dbRef } from 'firebase/database'
import type RoomCards from '~/components/Room/Cards.vue'

const { t: $t } = useI18n()
const route = useRoute()

const debug = inject('debug') as Ref<any>
const parentUser = inject('user') as Ref<any>

const randomLoader = Math.random().toString(36).substring(2, 7)
const roomId = ref(route.params.id as string)
const user = ref({
  uid: '',
  name: '',
  role: '',
})
const room = computed(
  () =>
    useDatabaseObject(dbRef(useDatabase(), 'rooms/' + roomId.value)).value ||
    null
) as Ref<Room | null>
const loading = ref(true)
const showUserInput = ref(false)

const roomCardsComponent = useTemplateRef('roomCardsRef') as Ref<
  typeof RoomCards | null
>

onMounted(async () => {
  if (parentUser.value) {
    if (debug.value) console.log('Parent user found', parentUser.value)
    user.value.uid = parentUser.value.uid
    user.value.role = 'developer'
  }
})

watch(
  room,
  (val) => {
    if (debug.value) console.log('Room changed', val)
    if (val === undefined || val === null) return
    checkIfLoaded()
  },
  { deep: true }
)

watch(
  user,
  (val) => {
    if (debug.value) console.log('User changed', val)
    if (!val?.uid) return
    checkIfLoaded()
  },
  { deep: true }
)

watch(
  parentUser,
  (val) => {
    if (debug.value) console.log('Parent user changed', val)
    if (!val) return
    user.value = {
      uid: val.uid,
      name: '',
      role: 'developer',
    }
  },
  { deep: true }
)

function checkIfLoaded(): void {
  if (!room.value || !user.value || !user.value.uid) return
  if (!loading.value) return
  if (debug.value) console.log('Room and user are loaded')
  loading.value = false
  nextTick(() => {
    roomCardsComponent.value?.load()
  })
}

useHead({
  title: 'scrumz.app - ' + $t('room'),
})
</script>

<style lang="scss">
.room {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  .logo-card {
    grid-area: logo;
    .front {
      background: var(--color-primary);
      color: white;
      font-size: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      letter-spacing: -0.1rem;
      span {
        padding-bottom: 1rem;
      }
    }
  }

  .config-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: center;
    gap: 0;
    .button-component {
      width: 100%;
      padding: 1rem;
      font-size: 160% !important;
      justify-content: center;
      border-radius: 0;
    }
  }

  .card {
    cursor: pointer;

    &:not(.most-voted) {
      .back {
        filter: grayscale(0.8);
        .title,
        .title-mirror {
          opacity: 0.3;
        }
      }
    }

    &.most-voted .back-card {
      box-shadow: inset 0 0 0 0.25rem var(--color-border);
    }

    &.voted:not(.most-voted) .back-card {
      border: 0.25rem solid #dcdcdc;
    }

    &.voted .front-card,
    &.voted .back-card {
      border: 0.25rem solid var(--color-primary);

      h1 {
        color: var(--color-black);
      }
      span {
        color: white;
        filter: invert(43%) sepia(81%) saturate(4144%) hue-rotate(324deg)
          brightness(104%) contrast(102%);
      }
    }

    .front-card,
    .back-card {
      transition: 0.3s ease-out border;
      border: 0 solid transparent;
      display: flex;
      flex-direction: column;
      justify-items: flex-end;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-radius: var(--border-radius);
      align-items: center;
    }
  }
}

@media (max-aspect-ratio: 1/1) {
  .room {
    height: 100dvh;
    margin-top: 0;

    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas:
        'logo'
        'card';
      grid-template-columns: 100%;
      grid-template-rows: 16rem 16rem 16rem;
      align-content: space-between;

      .coffee-card,
      .info-card,
      .mood-card {
        display: none;
      }
      .spacer {
        display: block;
      }
    }
  }
}
</style>
