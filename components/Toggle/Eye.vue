<template>
  <div class="toggle-eye-component">
    <button class="eye-toggler" :class="{ open }">
      <Image dark class="eye-open" src="/eye-open.svg" />
      <Image dark class="eye-closed" src="/eye-closed.svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.toggle-eye-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid #0001;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-card);
  flex-shrink: 0;

  .eye-toggler {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 150%;
    display: grid;
    align-items: center;
    justify-content: center;
    background: none;
    text-transform: uppercase;
    color: var(--color-text);

    & > * {
      grid-column: 1;
      grid-row: 1;
      width: 2rem !important;
      height: 2rem !important;
    }

    .eye-open {
      transform: scaleY(0);
      transition: transform 0.1s;
    }
    .eye-closed {
      transform: scaleY(1);
      transition: transform 0.1s 0.1s;
    }

    &.open {
      .eye-open {
        transform: scaleY(1);
        transition: transform 0.1s 0.1s;
      }
      .eye-closed {
        transform: scaleY(0);
        transition: transform 0.1s;
      }
    }
  }
}

[data-theme='dark'] {
  .toggle-eye-component {
    border: 1px solid #fff2;
  }
}
</style>
