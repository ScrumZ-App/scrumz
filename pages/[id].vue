<template>
  <template v-if="loading">
    <div class="loading">
      <Avatar :name="randomLoader" :size="128" />
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
    ref="roomCards"
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

<script lang="ts">
import { ref as dbRef } from 'firebase/database'
import type RoomCards from '~/components/Room/Cards.vue'

export default defineComponent({
  data(): {
    randomLoader: string
    debug?: boolean
    parentUser: any
    loading: boolean
    roomId: string
    user: User | null
    room: Room | null
    showUserInput: boolean
  } {
    return {
      randomLoader: Math.random().toString(36).substring(2, 7),
      debug: inject('debug'),
      parentUser: inject('user'),
      loading: true,
      roomId: '',
      user: null,
      room: null,
      showUserInput: false,
    }
  },
  async mounted() {
    if (typeof this.$route.params.id === 'string')
      this.roomId = this.$route.params.id
    this.room = (await useDatabaseObject(
      dbRef(useDatabase(), 'rooms/' + this.roomId)
    )) as unknown as Room | null
    if (this.parentUser) {
      this.user = {
        uid: this.parentUser.uid,
        name: '',
        role: 'developer',
      }
    }
  },
  watch: {
    room: {
      handler: function (val) {
        if (val === undefined) return
        if (val === null) return
        this.checkIfLoaded()
      },
      deep: true,
    },
    user: {
      handler: function (val) {
        if (!val.id) return
        this.checkIfLoaded()
      },
      deep: true,
    },
    parentUser: {
      handler: function (val) {
        if (!val) return
        this.user = {
          uid: val.uid,
          name: '',
          role: 'developer',
        }
      },
      deep: true,
    },
  },
  methods: {
    checkIfLoaded(): void {
      if (!this.room || !this.user) return
      if (!this.loading) return
      this.loading = false
      this.$nextTick(() => {
        const roomCards = this.$refs.roomCards as typeof RoomCards
        roomCards.load()
      })
    },
  },
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
