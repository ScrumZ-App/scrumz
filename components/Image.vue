<template>
  <div :alt="alt" :style="style" />
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
  },
  computed: {
    style() {
      return {
        width: `${this.width * 2}rem`,
        height: `${this.height * 2}rem`,
        background: `url(${this.src}) no-repeat center center`,
        backgroundSize: 'contain',
      }
    },
  },
})
</script>
