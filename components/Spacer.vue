<template>
  <div class="spacer" :style="style" />
</template>

<script setup lang="ts">
const props = defineProps({
  x: {
    type: String,
    default: '0', // px, em, rem, %
  },
  y: {
    type: String,
    default: '0', // px, em, rem, %
  },
})

const style = computed(() => ({
  '--spacer-x': props.x,
  '--spacer-y': props.y,
}))
</script>

<style lang="scss">
.spacer {
  display: block;
  height: var(--spacer-y, 0);
  width: var(--spacer-x, 0);
}
</style>
