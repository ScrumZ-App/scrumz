<template>
  <div class="image-component" :alt="alt" :style="style" :class="{ dark }" />
</template>

<script lang="ts">
export default defineComponent({
  props: {
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
  },
  computed: {
    style() {
      return {
        'width': `${this.width * 2}rem`,
        'height': `${this.height * 2}rem`,
        '--light-background': `url(${this.src})`,
        '--dark-background': `url(${this.darkSrc || this.src})`,
        'backgroundSize': 'contain',
      }
    },
  },
})
</script>

<style lang="scss">
.image-component {
  background: var(--light-background) no-repeat center center;
}
@media (prefers-color-scheme: dark) {
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
