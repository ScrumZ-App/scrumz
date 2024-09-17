<template>
  <div
    class="button-component"
    :class="{ badge, loading, widthMayChange }"
    :style="style"
  >
    <slot />
    <div v-if="badge" class="status-badge" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 8,
  },
  height: {
    type: Number,
    default: 2,
  },
  background: {
    type: String,
    default: 'var(--color-card)',
  },
  color: {
    type: String,
    default: 'var(--color-text)',
  },
  badge: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '200%',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  badgeColor: {
    type: String,
    default: 'var(--color-badge)',
  },
  center: {
    type: Boolean,
    default: false,
  },
  widthMayChange: {
    type: Boolean,
    default: false,
  },
})

const style = computed(() => {
  return {
    '--button-width': `${props.width * 2}rem`,
    '--button-height': `${props.height * 2}rem`,
    'fontSize': props.size,
    '--badge-color': props.badgeColor,
    'background': props.background,
    'color': props.color,
    '--badge-position': `${props.height <= 2 ? 0.5 : 1}rem`,
    'justify-content': props.center ? 'center' : 'flex-start',
    'padding': props.center ? '0' : '0 2rem 0.3rem',
  }
})
</script>

<style lang="scss">
.button-component {
  width: var(--button-width);
  height: var(--button-height);
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  text-align: left;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px #fff2;

  .status-badge {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    position: absolute;
    bottom: var(--badge-position);
    right: var(--badge-position);
    background: var(--badge-color);
    box-shadow: 0 0 0 0 var(--badge-color);
  }

  &.widthMayChange {
    transition: width 0.6s;
  }

  &.loading {
    .status-badge {
      &:before,
      &:after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        box-shadow: 0 0 0 0 var(--badge-color);
        animation: radiating 3s infinite linear;
        animation-delay: 0.5s;
        opacity: 0.2;
      }
      &:after {
        animation-delay: 1s;
      }
    }
  }

  span {
    line-height: 2rem;
  }

  &:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -10rem;
    left: 0;
    width: 2rem;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:hover {
    &:before {
      animation: shiny 1s ease-in-out;
    }
    .status-badge {
      animation: bounce 0.5s cubic-bezier(0.75, -0.5, 0.25, 1.5);
    }
  }
}

@keyframes radiating {
  100% {
    box-shadow: 0 0 0 40px #0000;
  }
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shiny {
  0% {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  5% {
    transform: scale(0) rotate(45deg);
    opacity: 0.5;
  }
  10% {
    transform: scale(4) rotate(45deg);
    opacity: 1;
  }
  50% {
    transform: scale(50) rotate(45deg);
    opacity: 0;
  }
  100% {
    transform: scale(50) rotate(45deg);
    opacity: 0;
  }
}

@media (max-aspect-ratio: 1/1) {
  .button-component {
    width: 100%;
  }
}
</style>
