<template>
  <Bento
    name="join"
    :areas="['logo', 'roomNameInput', 'join']"
    :columns="[35]"
    :height="18"
  >
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Card class="room-name-input" :height="9" :width="35">
      <template #title></template>
      <template #icon>
        <SuggestiveInput
          v-model="adjective"
          persistent-focus
          :lists="adjectives"
          :disabled="isLoading"
          :placeholder="adjectives[0][0]"
          @enter="selectAdjective"
        />
        <span>&nbsp;-&nbsp;</span>
        <SuggestiveInput
          ref="nounInput"
          v-model="noun"
          :lists="nouns"
          :disabled="isLoading"
          :placeholder="nouns[0][0]"
          @enter="join"
        />
      </template>
    </Card>
    <div class="join-button">
      <Press :loading="isLoading" badge @click="join">
        <span> {{ $t('join-room') }} </span>
      </Press>
    </div>
    <Spacer class="spacer" />
  </Bento>
</template>

<script setup lang="ts">
import { adjectives as _adjectives, nouns as _nouns } from '~/config'
import type SuggestiveInput from '~/components/SuggestiveInput.vue'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()
const scrumz = useScrumz()
const { t: $t, locale, locales } = useI18n()

const isLoading = ref(false)
const adjective = ref('')
const noun = ref('')

enum Language {
  tr = 'tr',
  en = 'en',
}

const preferredLanguage = locale.value as Language
const otherLanguages = [...locales.value]
  .map((el) => el.code as Language)
  .filter((el) => el !== preferredLanguage)

const adjectives = computed(() => [
  _adjectives[preferredLanguage],
  ...otherLanguages.map((el) => _adjectives[el]),
])
const nouns = computed(() => [
  _nouns[preferredLanguage],
  ...otherLanguages.map((el) => _nouns[el]),
])
const nounRef = useTemplateRef('nounInput') as Ref<
  typeof SuggestiveInput | null
>

function selectAdjective({ suggestion }: { suggestion: string }) {
  adjective.value = suggestion
  nounRef.value?.focus()
}

async function join({ suggestion }: { suggestion: string }) {
  if (!adjective.value || !noun.value) return
  isLoading.value = true
  // fill out the suggestion if it's not filled
  if (suggestion) noun.value = suggestion
  // check room exists
  const exists = await scrumz.roomExists(`${adjective.value}-${noun.value}`)
  nounRef.value?.focus()
  isLoading.value = false

  if (!exists) {
    toast.error($t('room-not-found'))
    return
  }

  router.push(`/${adjective.value}-${noun.value}`)
}

useHead({
  title: 'scrumz.app - ' + $t('join-room'),
})
</script>

<style lang="scss">
.join {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .room-name-input {
    grid-area: roomNameInput;
    font-size: 500%;
  }
  .spacer {
    grid-area: spacer;
    display: none;
  }
  .join-button {
    grid-area: join;
    display: flex;
    justify-content: end;
    margin-bottom: 2rem;
  }
}

@media (max-aspect-ratio: 1/1) {
  .join {
    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: hidden;
      height: auto;
      grid-template-areas: 'logo' 'spacer' 'roomNameInput' 'join';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 20rem 4rem;
      align-content: space-between;

      .room-name-input {
        font-size: 350%;
        .icon {
          flex-direction: column;

          & > span {
            line-height: 1rem;
          }
        }
      }

      .spacer {
        display: block;
      }
    }
  }
}
</style>
