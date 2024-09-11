<template>
  <div class="suggestive-input-component">
    <input
      ref="input"
      type="text"
      v-model="query"
      @blur="onBlur"
      @keydown.enter="
        $emit('enter', {
          target: $event.target,
          query,
          suggestion: querySuggestions[0],
        })
      "
      autofocus
    />
    <span v-if="query.length && querySuggestions.length">{{
      querySuggestions[0]
    }}</span>
    <span v-else-if="query === ''">{{ placeholder }}</span>
    <span v-else>{{ query }}</span>
  </div>
</template>

<script>
export default {
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
      type: Array,
      default: () => [],
    },
    persistentFocus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'enter'],
  computed: {
    query: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
    querySuggestions() {
      const suggestions = this.list
        .split(',')
        .filter((item) => item.startsWith(this.query))
      if (suggestions.includes(this.query)) {
        return [this.query]
      }
      // randomize the suggestions
      return suggestions.sort(() => Math.random() - 0.5)
    },
  },
  mounted() {
    if (this.persistentFocus) {
      this.$refs.input?.focus()
    }
  },
  methods: {
    focus() {
      this.$refs.input?.focus()
    },
    onBlur() {
      if (this.persistentFocus && !this.query) {
        this.$refs.input?.focus()
      }
      this.query = this.query.length ? this.querySuggestions[0] ?? '' : ''
    },
  },
}
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
