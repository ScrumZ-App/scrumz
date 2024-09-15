<template>
  <div class="avatar-group">
    <div
      v-for="(avatar, index) in displayedAvatars"
      :key="index"
      class="avatar"
      @mouseover="showPopover(index)"
      @mouseleave="hidePopover"
    >
      <Avatar :name="avatar" />
    </div>

    <!-- "+N" Avatar -->
    <div
      v-if="remainingAvatars.length"
      class="avatar more-avatars"
      @mouseover="showPopover(maxAvatars + 1)"
      @mouseleave="hidePopover"
    >
      +{{ remainingAvatars.length }}
    </div>

    <Teleport to="body">
      <!-- Popover for additional avatars -->
      <div
        v-if="isPopoverVisible"
        class="popover"
        :style="{
          top: `${cursor.y}px`,
          left: `${cursor.x}px`,
        }"
      >
        <div v-if="hoveredAvatarIndex === maxAvatars + 1">
          <ul>
            <li v-for="(avatar, index) in remainingAvatars" :key="index">
              <Avatar :name="avatar" />
              <span>
                {{ avatar }}
              </span>
            </li>
          </ul>
        </div>
        <div v-else>
          {{ displayedAvatars[hoveredAvatarIndex] }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
const maxAvatars = 3

export default defineComponent({
  props: {
    avatars: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data(): {
    maxAvatars: number
    cursor: { x: number; y: number }
    displayedAvatars: string[]
    remainingAvatars: string[]
    isPopoverVisible: boolean
    hoveredAvatarIndex: number
  } {
    return {
      maxAvatars,
      cursor: { x: 0, y: 0 },
      displayedAvatars: [],
      remainingAvatars: [],
      isPopoverVisible: false,
      hoveredAvatarIndex: -1,
    }
  },
  computed: {
    displayedAvatars(): string[] {
      if (this.avatars.length <= maxAvatars) {
        return this.avatars
      }
      return this.avatars.slice(0, maxAvatars - 1)
    },
    remainingAvatars(): string[] {
      if (this.avatars.length <= maxAvatars) {
        return []
      }
      return this.avatars.slice(maxAvatars - 1)
    },
  },
  methods: {
    showPopover(index: number) {
      this.hoveredAvatarIndex = index
      this.isPopoverVisible = true
    },
    hidePopover() {
      this.isPopoverVisible = false
      this.hoveredAvatarIndex = -1
    },
    onMouseMove(event: MouseEvent) {
      this.cursor = { x: event.clientX, y: event.clientY }
    },
  },
  beforeMount() {
    // move div to cursor position
    document.addEventListener('mousemove', this.onMouseMove)
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove)
  },
})
</script>

<style lang="scss">
.avatar-group {
  display: flex;
  gap: 0.5rem;
  position: relative;

  .avatar {
    border: 0.2rem solid white;
    border-radius: 50%;
    margin-right: -1.5rem;
    width: calc(3rem + 0.4rem);
    height: calc(3rem + 0.4rem);

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .more-avatars {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(3rem + 0.4rem);
    height: calc(3rem + 0.4rem);
    border-radius: 50%;
    background-color: var(--color-background);
    color: #000;
    cursor: pointer;
    font-size: 100%;
  }
}

.popover {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--border-radius);
  z-index: 1000;
  left: 0;
  transform: translate(-50%, 1.2rem);
  pointer-events: none;

  &:after {
    content: '';
    position: absolute;
    width: 2em;
    height: 2em;
    aspect-ratio: 1;
    top: 0.1rem;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    background-color: #fff;
    border-radius: 0.2rem;
    clip-path: polygon(0 0, 40% 0, 0 50%);
  }
}

.popover ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.popover li {
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
</style>
