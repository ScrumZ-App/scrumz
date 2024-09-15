<template>
  <div class="button-component" :class="{ badge, loading }" :style="style">
    <slot />
    <div v-if="badge" class="status-badge" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '8',
    },
    height: {
      type: String,
      default: '2',
    },
    background: {
      type: String,
      default: 'var(--color-white)',
    },
    color: {
      type: String,
      default: 'var(--color-black)',
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
  },
  computed: {
    style() {
      return {
        '--button-width': `${this.width * 2}rem`,
        '--button-height': `${this.height * 2}rem`,
        'fontSize': this.size,
        '--badge-color': 'currentColor',
        'background': this.background,
        'color': this.color,
        '--badge-position': `${this.height <= 2 ? 0.5 : 1}rem`,
      }
    },
  },
}
</script>

<style lang="scss">
.button-component {
  width: var(--button-width);
  height: var(--button-height);
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0rem 2rem;
  border-radius: var(--border-radius);
  text-align: left;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  padding: 0 0 0.3rem 2rem;

  .status-badge {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    position: absolute;
    bottom: var(--badge-position);
    right: var(--badge-position);
    background: var(--color-black);
    background: currentColor;
    box-shadow: 0 0 0 0 var(--badge-color);
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

@keyframes radiating {
  100% {
    box-shadow: 0 0 0 40px #0000;
  }
}

@media (max-aspect-ratio: 1/1) {
  .button-component {
    width: 100%;
  }
}
</style>
