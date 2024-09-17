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
  margin-top: 4rem;
  height: 100dvh;
}

@media (max-aspect-ratio: 1/1) {
  .wrapper > *:first-child {
    height: 100dvh;
    margin-top: 0;
  }
}
</style>
