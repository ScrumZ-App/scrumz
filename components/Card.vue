<template>
  <div
    class="card-component"
    :class="{ 'has-back': back, flip, custom, badge, loading }"
    :style="style"
  >
    <div v-if="custom" class="front"><slot name="front" /></div>
    <div v-else class="front">
      <div class="title"><slot name="title" /></div>
      <div v-if="mirror" class="title-mirror"><slot name="title" /></div>
      <div class="icon"><slot name="icon" /></div>
      <div class="status-badge" />
    </div>
    <div class="back">
      <template v-if="backTitle">
        <div class="title"><slot name="title" /></div>
        <div v-if="mirror" class="title-mirror"><slot name="title" /></div>
      </template>
      <slot name="back" />
    </div>
  </div>
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
      default: 12,
    },
    flip: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: 'var(--color-white)',
    },
    color: {
      type: String,
      default: 'var(--color-black)',
    },
    mirror: {
      type: Boolean,
      default: false,
    },
    backTitle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      return {
        '--card-width': `${this.width * 2}rem`,
        '--card-height': `${this.height * 2}rem`,
        '--card-background': this.background,
        'color': this.color,
      }
    },
  },
})
</script>

<style lang="scss">
@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.card-component {
  width: var(--card-width);
  height: var(--card-height);
  position: relative;

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: 0.5s transform;
    background: var(--card-background);
    border-radius: var(--border-radius);
  }

  .front,
  .back {
    transform: perspective(64rem) rotateY(0deg);

    .title,
    .title-mirror {
      position: absolute;
      top: 1rem;
      left: 1.5rem;
      font-size: 200%;
      font-weight: 600;
      color: var(--color-black);
      display: inline-flex;
    }

    .title-mirror {
      transform: rotate(180deg);
      bottom: 1rem;
      right: 1.5rem;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 500%;
    }
  }

  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: perspective(64rem) rotateY(-180deg);
  }

  &.badge {
    .status-badge {
      width: 3rem;
      height: 3rem;
      background: var(--color-black);
      border-radius: 50%;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }
  }

  &.loading {
    overflow: hidden;
    border-radius: var(--border-radius);
    border: 2px solid #e0e0e0;
    pointer-events: none;

    .front::before {
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e4e4e4;
      position: absolute;
      overflow: hidden;
      z-index: 2;
    }
    .front::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shine 1.5s infinite;
      z-index: 3;
    }
  }

  &.has-back {
    .front {
      transform: perspective(64rem) rotateY(180deg);
    }
    .back {
      transform: perspective(64rem) rotateY(0);
    }
  }

  &.flip {
    &:not(.loading):hover {
      .front {
        transform: perspective(64rem) rotateY(180deg);
      }
      .back {
        transform: perspective(64rem) rotateY(0);
      }
    }
  }
}

@media (max-aspect-ratio: 1/1) {
  .card-component {
    width: 100%;
  }
}
</style>
