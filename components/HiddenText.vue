<template>
  <div
    class="hidden-text-component"
    :class="{
      shown: !!message,
      hiding,
    }"
  >
    <div class="message">{{ shownMessage }}</div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    required: true,
  },
})

const shownMessage = ref('')
const hiding = ref(false)

watch(
  () => props.message,
  (message) => {
    if (message) {
      shownMessage.value = message
    } else {
      hiding.value = true
      setTimeout(() => {
        shownMessage.value = ''
        hiding.value = false
      }, 300)
    }
  }
)
</script>

<style lang="scss">
.hidden-text-component {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.shown .message {
    transform: translateY(0%);
  }

  &.hiding .message {
    transform: translateY(-100%);
  }

  &.shown .text {
    opacity: 0;
  }

  .text {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .message {
    color: var(--color-text);
    transform: translateY(100%);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s;
    text-align: center;
  }
}
</style>
