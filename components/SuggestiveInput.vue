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

<script lang="ts">
export default defineComponent({
  data(): {
    querySuggestions: string[]
  } {
    return {
      querySuggestions: [],
    }
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    list: {
      type: Array as PropType<string[]>,
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
  },
  emits: ['update:modelValue', 'enter'],
  computed: {
    query: {
      get(): string {
        return this.modelValue
      },
      set(value: string): void {
        this.$emit('update:modelValue', value)
      },
    },
  },
  mounted() {
    if (this.persistentFocus) {
      const input = this.$refs.input as HTMLInputElement
      input?.focus()
    }
  },
  methods: {
    focus(): void {
      const input = this.$refs.input as HTMLInputElement
      input?.focus()
    },
    onBlur(): void {
      if (this.persistentFocus && !this.query) {
        const input = this.$refs.input as HTMLInputElement
        input?.focus()
      }
      this.query = this.query.length ? (this.querySuggestions[0] ?? '') : ''
    },
    updateSuggestions(query: string): void {
      const suggestions = this.list.filter((item) => item.startsWith(query))
      if (suggestions.includes(query)) {
        this.querySuggestions = [query]
        return
      }
      // randomize the suggestions
      this.querySuggestions = suggestions.sort(() => Math.random() - 0.5)
    },
    filterInput(): void {
      // Use a regular expression to remove non-letter characters
      const newQuery = this.query.replace(/[^a-z]/g, '')
      if (newQuery === this.query) this.updateSuggestions(newQuery)
      this.query = newQuery
    },
  },
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
