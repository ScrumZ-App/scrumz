<template>
  <To href="/" class="back-button-component"></To>
</template>

<script>
export default {}
</script>

<style lang="scss">
.back-button-component {
  display: inline-flex;
  height: 3rem;
  width: 3rem;
  background: var(--color-primary);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  &:before {
    content: '';
    border: solid white;
    border-width: 0 0.2rem 0.2rem 0;
    display: inline-block;
    padding: 0.2rem;
    transform: rotate(135deg) translate(-0.08rem, -0.08rem);
  }
}
</style>
