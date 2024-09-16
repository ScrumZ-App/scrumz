<template>
  <Bento
    v-if="user"
    name="name-input"
    :areas="['logo', 'userNameInput', 'changeButton']"
    :columns="[35]"
    :height="17"
  >
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Card class="user-name-input" :height="10" :width="35">
      <template #title></template>
      <template #icon>
        <TextInput
          v-model="name"
          :placeholder="$t('your-name')"
          persistent-focus
          @enter="selectName"
        />
      </template>
    </Card>
    <div class="change-button">
      <Press :width="10" :loading="isLoading" badge @click="selectName">
        <span v-if="user.name"> {{ $t('change-name') }} </span>
        <span v-else> {{ $t('set-name') }} </span>
      </Press>
    </div>
  </Bento>
</template>

<script setup lang="ts">
import { ref as dbRef, update } from 'firebase/database'
import { ref, onMounted } from 'vue'
import { useDatabase } from 'vuefire'

const { t: $t } = useI18n()

const props = defineProps({
  roomId: {
    type: String,
    required: true,
  },
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})
const emit = defineEmits(['set'])

const isLoading = ref(false)
const name = ref('')

async function selectName() {
  if (!props.roomId || !props.user.uid) return

  isLoading.value = true

  const userRef = dbRef(
    useDatabase(),
    'rooms/' + props.roomId + '/users/' + props.user.uid
  )

  await update(userRef, {
    name: name.value,
  })

  isLoading.value = false
  emit('set', name.value)
}

onMounted(() => {
  name.value = props.user.name
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
  .change-button {
    grid-area: changeButton;
    display: flex;
    justify-content: end;
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
    height: 100dvh;
    margin-top: 0;

    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas: 'logo' 'spacer' 'userNameInput' 'changeButton';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 20rem;
      align-content: space-between;

      .user-name-input .icon {
        flex-direction: column;

        input {
          font-size: 60%;
        }

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
