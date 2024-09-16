<template>
  <div :class="name">
    <div class="bento-grid" :style="style">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'bento',
  },
  width: {
    type: Number,
    default: 35,
  },
  height: {
    type: Number,
    default: 18,
  },
  gap: {
    type: Number,
    default: 1,
  },
  areas: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<number[]>,
    default: () => [8, 17, 8],
  },
})

const style = computed(() => {
  return {
    '--bento-width': `${props.width * 2}rem`,
    '--bento-height': `${props.height * 2}rem`,
    '--bento-grid-template-areas': `${props.areas
      .map((row) => `'${row}'`)
      .join(' ')}`,
    '--bento-grid-template-columns': `${props.columns
      .map((col) => `${col * 2}rem`)
      .join(' ')}`,
    '--bento-gap': `${props.gap * 2}rem`,
  }
})
</script>

<style lang="scss">
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.bento-grid {
  display: grid;
  grid-template-columns: var(--bento-grid-template-columns);
  grid-template-areas: var(--bento-grid-template-areas);
  gap: var(--bento-gap);
  width: var(--bento-width);
  height: var(--bento-height);
  align-content: center;
  justify-content: center;
}

.loading .bento-grid {
  /* for 1 to 20 in scss*/
  @for $i from 1 through 20 {
    & > *:nth-of-type(#{$i}) {
      opacity: 0;
      animation: slide-in
        0.2s
        cubic-bezier(0.25, 0.46, 0.45, 0.94)
        #{0.2 +
        (0.1 + $i * 0.05)}s
        forwards;
    }
  }
}
</style>
