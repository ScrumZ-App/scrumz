<template>
  <div class="spacer" :style="style" />
</template>

<script>
export default {
  props: {
    x: {
      type: String,
      default: '0', // px, em, rem, %
    },
    y: {
      type: String,
      default: '0', // px, em, rem, %
    },
  },
  computed: {
    style() {
      return {
        '--spacer-x': this.x,
        '--spacer-y': this.y,
      }
    },
  },
}
</script>

<style lang="scss">
.spacer {
  display: block;
  height: var(--spacer-y, 0);
  width: var(--spacer-x, 0);
}
</style>
