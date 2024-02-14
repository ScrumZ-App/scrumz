<template>
  <div class="card-component" :class="{ flip, custom, badge }" :style="style">
    <div v-if="custom" class="front"><slot name="front" /></div>
    <div v-else class="front">
      <div class="title"><slot name="title" /></div>
      <div v-if="mirror" class="title-mirror"><slot name="title" /></div>
      <div class="icon"><slot name="icon" /></div>
      <div class="status-badge"></div>
    </div>
    <div v-if="flip" class="back">
      <slot name="back" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '8'
    },
    height: {
      type: String,
      default: '12'
    },
    flip: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: false
    },
    badge: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: 'var(--color-white)'
    },
    color: {
      type: String,
      default: 'var(--color-black)'
    },
    mirror: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        '--card-width': `${this.width * 2}rem`,
        '--card-height': `${this.height * 2}rem`,
        '--card-background': this.background,
        color: this.color
      }
    }
  }
}
</script>

<style>
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

  .front {
    transform: perspective(64rem) rotateY(0deg);

    .title,
    .title-mirror {
      position: absolute;
      top: 1rem;
      left: 1.5rem;
      font-size: 200%;
      font-weight: 600;
      color: var(--color-black);
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

  &.flip {
    &:hover {
      .front {
        transform: perspective(64rem) rotateY(180deg);
      }
      .back {
        transform: perspective(64rem) rotateY(0);
      }
    }

    .back {
      transform: perspective(64rem) rotateY(-180deg);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

@media (max-aspect-ratio: 1/1) {
  .card-component {
    width: 100%;
  }
}
</style>
