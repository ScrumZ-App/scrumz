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

<script lang="ts">
export default defineComponent({
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
      set(value: string) {
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
    focus() {
      const input = this.$refs.input as HTMLInputElement
      input?.focus()
    },
    onBlur() {
      if (this.persistentFocus && !this.query) {
        const input = this.$refs.input as HTMLInputElement
        input?.focus()
      }
    },
  },
})
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
