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
  persistentFocus: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'enter'])

const query = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

function focus() {
  const input = document.querySelector('input') as HTMLInputElement
  input?.focus()
}

function onBlur() {
  if (props.persistentFocus && !query.value) {
    const input = document.querySelector('input') as HTMLInputElement
    input?.focus()
  }
}

onMounted(() => {
  if (props.persistentFocus) {
    focus()
  }
})

defineExpose({
  focus,
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
