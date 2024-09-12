<template>
  <div class="text-input-component">
    <input
      ref="input"
      type="text"
      v-model="query"
      :placeholder="placeholder"
      @blur="onBlur"
      @keydown.enter="
        $emit('enter', {
          target: $event.target,
          query,
        })
      "
      autofocus
    />
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
    },
  },
}
</script>

<style lang="scss">
.text-input-component {
  position: relative;
  width: 100%;
  input {
    border: none;
    background: none;
    color: var(--color-text);
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 100%;
    &:focus {
      outline: none;
    }
  }
}
</style>
