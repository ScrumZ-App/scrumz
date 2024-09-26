<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'scrumz.app - scrum poker',
})
</script>

<style lang="scss">
.wrapper > *:first-child {
  padding-top: 4rem;
  overflow: hidden;
  padding-bottom: 2rem;
}

@media (max-aspect-ratio: 1/1) {
  .wrapper > *:first-child {
    padding-top: 0;
    overflow: auto;
    height: 100dvh;
  }
}
</style>
