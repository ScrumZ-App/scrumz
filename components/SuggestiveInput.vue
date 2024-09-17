<template>
  <div class="suggestive-input-component">
    <input
      ref="input"
      type="text"
      v-model="query"
      autofocus
      pattern="[a-z]*"
      :disabled="disabled"
      @blur="onBlur"
      @keydown.enter="
        $emit('enter', {
          target: $event.target,
          query,
          suggestion: querySuggestions[0],
        })
      "
      @input="filterInput"
    />
    <span v-if="query.length && querySuggestions.length">{{
      querySuggestions[0]
    }}</span>
    <span v-else-if="query === ''">{{ placeholder }}</span>
    <span v-else>{{ query }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  lists: {
    type: Array as PropType<string[][]>,
    default: () => [],
  },
  persistentFocus: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'enter'])

const querySuggestions = ref<string[]>([])
const inputRef = useTemplateRef('input') as Ref<HTMLInputElement | null>

const query = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  },
})

onMounted(() => {
  if (props.persistentFocus && inputRef.value) {
    inputRef.value.focus()
  }
})

function focus(): void {
  inputRef.value?.focus()
}

function onBlur(): void {
  if (props.persistentFocus && !query.value) {
    inputRef.value?.focus()
  }
  query.value = query.value.length ? (querySuggestions.value[0] ?? '') : ''
}

function updateSuggestions(query: string): void {
  let suggestions: string[] = []
  for (const list of props.lists) {
    const subSuggestions = list.filter((item) => item.startsWith(query))
    if (subSuggestions.includes(query)) {
      suggestions = [query]
      break
    }

    suggestions = [
      ...suggestions,
      ...subSuggestions.sort(() => Math.random() - 0.5),
    ]
  }
  querySuggestions.value = suggestions
}

function filterInput(): void {
  const newQuery = query.value.toLocaleLowerCase().replace(/[^a-z]/g, '')
  if (newQuery === query.value) updateSuggestions(newQuery)
  query.value = newQuery
}

watch(query, (newQuery) => {
  updateSuggestions(newQuery)
})

defineExpose({
  focus,
})
</script>

<style lang="scss">
.suggestive-input-component {
  position: relative;
  width: fit-content;
  min-width: 50px;
  input {
    border: none;
    background: none;
    color: var(--color-text);
    text-align: left;
    width: 100%;
    height: 100%;
    font-size: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: not-allowed;
      /* make color red */
      opacity: 0.4;
    }
  }
  span {
    position: relative;
    z-index: 0;
    display: flex;
    align-items: center;
    color: gray;
  }
}
</style>
