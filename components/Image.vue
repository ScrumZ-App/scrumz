<template>
  <div class="image-component" :alt="alt" :style="style" :class="{ dark }" />
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 8,
  },
  height: {
    type: Number,
    default: 8,
  },
  alt: {
    type: String,
    default: 'Picture',
  },
  src: {
    type: String,
    default: '',
  },
  darkSrc: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
})

const style = computed(() => {
  return {
    'width': `${props.width * 2}rem`,
    'height': `${props.height * 2}rem`,
    '--light-background': `url(${props.src})`,
    '--dark-background': `url(${props.darkSrc || props.src})`,
    'backgroundSize': 'contain',
  }
})
</script>

<style lang="scss">
.image-component {
  background: var(--light-background) no-repeat center center;
}
[data-theme='dark'] {
  .image-component {
    background: var(--dark-background) no-repeat center center;
    &.dark {
      filter: invert(1);
      mix-blend-mode: color-dodge;
      opacity: 0.8;
    }
  }
}
</style>
