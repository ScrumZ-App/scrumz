<template>
  <div class="toggle-next-component">
    <button @click="next" class="next-toggler" :class="{ animate }">
      <Image dark class="next-open" src="/clockwise.svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['next'])
const animate = ref(false)

const props = defineProps({
  version: {
    type: Number,
    default: 0,
  },
})

watch(
  () => props.version,
  () => {
    animate.value = true
    setTimeout(() => {
      animate.value = false
    }, 600)
  }
)

const next = () => {
  emit('next')
}
</script>

<style lang="scss">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.toggle-next-component {
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

  .next-toggler {
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
    will-change: transform;
    transform: rotate(0.01deg);

    &.animate {
      animation: spin 0.6s ease-in-out forwards;
    }

    & > * {
      grid-column: 1;
      grid-row: 1;
      width: 2rem !important;
      height: 2rem !important;
    }
  }
}

[data-theme='dark'] {
  .toggle-next-component {
    border: 1px solid #fff2;
  }
}
</style>
