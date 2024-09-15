<template>
  <Bento
    v-if="user"
    name="name-input"
    :areas="['logo', 'userNameInput']"
    :columns="[35]"
    height="17"
  >
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Card class="user-name-input" height="10" width="35">
      <template #title></template>
      <template #icon>
        <TextInput
          v-model="name"
          placeholder="your name"
          persistent-focus
          @enter="selectName"
        />
      </template>
    </Card>
  </Bento>
</template>

<script lang="ts">
import { ref as dbRef, update } from 'firebase/database'

export interface User {
  uid: string
  name: string
  role: string
}

export default defineComponent({
  data() {
    return {
      name: '',
    }
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  emits: ['set'],
  methods: {
    async selectName() {
      const userRef = dbRef(
        useDatabase(),
        'rooms/' + this.roomId + '/users/' + this.user.uid
      )
      await update(userRef, {
        name: this.name,
      })
      this.$emit('set', this.name)
    },
  },
  mounted() {
    this.name = this.user.name
  },
})
</script>

<style lang="scss">
.name-input {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  .user-name-input {
    grid-area: userNameInput;
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
  .name-input {
    height: 100vh;
    margin-top: 0;

    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas: 'logo' 'spacer' 'userNameInput';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 20rem;
      align-content: space-between;

      .user-name-input .icon {
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
