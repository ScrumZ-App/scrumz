<template>
  <Bento name="join" :areas="['logo', 'roomNameInput', 'join']" :columns="[35]">
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Card class="room-name-input" height="10" width="35">
      <template #title></template>
      <template #icon>
        <SuggestiveInput
          v-model="adjective"
          :list="adjectives"
          :disabled="isLoading"
          placeholder="masmavi"
          persistent-focus
          @enter="selectAdjective"
        />
        <span>&nbsp;-&nbsp;</span>
        <SuggestiveInput
          ref="name"
          v-model="name"
          :list="names"
          :disabled="isLoading"
          placeholder="deniz"
          @enter="join"
        />
      </template>
    </Card>
    <div class="join-button">
      <Press :loading="isLoading" badge @click="join">
        <span> join room </span>
      </Press>
    </div>
    <Spacer class="spacer" />
  </Bento>
</template>

<script lang="ts">
import { adjectives, names } from '~/config'
import type SuggestiveInput from '~/components/SuggestiveInput.vue'
export default defineComponent({
  data(): {
    isLoading: boolean
    adjective: string
    name: string
  } {
    return {
      isLoading: false,
      adjective: '',
      name: '',
    }
  },
  computed: {
    adjectives(): string[] {
      return adjectives
    },
    names(): string[] {
      return names
    },
  },
  methods: {
    selectAdjective({ suggestion }: { suggestion: string }) {
      this.adjective = suggestion
      // focus on next element
      const name = this.$refs.name as typeof SuggestiveInput
      name?.focus()
    },
    async join({ suggestion }: { suggestion: string }) {
      if (!this.adjective || !this.name) return
      this.isLoading = true
      // fill out the suggestion if it's not filled
      if (suggestion) this.name = suggestion
      // check room exists
      const exists = await this.$scrumz.roomExists(
        `${this.adjective}-${this.name}`
      )
      const nameInput = this.$refs.name as HTMLInputElement
      nameInput?.focus()
      this.isLoading = false
      if (!exists) {
        this.$toast.error('room does not exist')
        return
      }
      this.$router.push(`/room/${this.adjective}-${this.name}`)
    },
  },
})
</script>

<style lang="scss">
.join {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  .room-name-input {
    grid-area: roomNameInput;
  }
  .spacer {
    grid-area: spacer;
    display: none;
  }
  .join-button {
    grid-area: join;
    display: flex;
    justify-content: end;
  }
}

@media (max-aspect-ratio: 1/1) {
  .join {
    height: 100vh;
    margin-top: 0;

    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas: 'logo' 'spacer' 'roomNameInput' 'join';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 20rem 4rem;
      align-content: space-between;

      .room-name-input .icon {
        flex-direction: column;

        & > span {
          line-height: 1rem;
        }
      }

      .spacer {
        display: block;
      }
    }
  }
}
</style>
