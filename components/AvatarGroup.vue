<template>
  <div class="avatar-group">
    <div
      v-for="(avatar, index) in displayedAvatars"
      :key="index"
      class="avatar"
      @mouseover="showPopover(index, $event)"
      @mouseleave="hidePopover"
      @touchstart="updatePopover(index, $event)"
      @touchend="updatePopover(index, $event)"
      @touchmove="hidePopoverIfDrag($event)"
    >
      <UserAvatar :name="avatar" :size="48" />
    </div>

    <!-- "+N" Avatar -->
    <div
      v-if="remainingAvatars.length"
      class="avatar more-avatars"
      @mouseover="showPopover(maxAvatars + 1, $event)"
      @mouseleave="hidePopover"
      @touchstart="updatePopover(maxAvatars + 1, $event)"
      @touchend="updatePopover(maxAvatars + 1, $event)"
      @touchmove="hidePopoverIfDrag($event)"
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
              <UserAvatar :name="avatar" />
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

<script setup lang="ts">
const maxAvatars = 3

const props = defineProps({
  avatars: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const cursor = ref({ x: 0, y: 0, startX: 0, startY: 0 })
const isPopoverVisible = ref(false)
const hoveredAvatarIndex = ref(-1)
const popoverPosition = ref({ x: 0, y: 0 })

const displayedAvatars = computed(() => {
  if (props.avatars.length <= maxAvatars) {
    return props.avatars
  }
  return props.avatars.slice(0, maxAvatars - 1)
})

const remainingAvatars = computed(() => {
  if (props.avatars.length <= maxAvatars) {
    return []
  }
  return props.avatars.slice(maxAvatars - 1)
})

function showPopover(index: number, event: TouchEvent | MouseEvent) {
  updatePopover(index, event)
  isPopoverVisible.value = true
}

function updatePopover(index: number, event: TouchEvent | MouseEvent) {
  hoveredAvatarIndex.value = index

  // Get the position of the clicked element
  const popoverElement = event.target as HTMLElement
  const popoverElementRect = popoverElement.getBoundingClientRect()

  // Set the popover position
  popoverPosition.value = {
    x: popoverElementRect.left + window.scrollX + popoverElementRect.width / 2,
    y: popoverElementRect.top + window.scrollY + popoverElementRect.height,
  }
  const isTouchEvent = 'touches' in event
  if (isTouchEvent) {
    console.log('uu')
    cursor.value.x = event.touches[0]?.clientX || 0
    cursor.value.y = event.touches[0]?.clientY || 0
    cursor.value.startX = cursor.value.x
    cursor.value.startY = cursor.value.y
  }
}

function hidePopoverIfDrag(event: TouchEvent | MouseEvent) {
  const isTouchEvent = 'touches' in event
  const x = isTouchEvent ? event.touches[0].clientX : event.clientX
  const y = isTouchEvent ? event.touches[0].clientY : event.clientY
  console.log(x, cursor.value.x)

  if (
    Math.abs(x - cursor.value.startX) > 10 ||
    Math.abs(y - cursor.value.startY) > 10
  ) {
    hidePopover()
  }
}

function hidePopover() {
  isPopoverVisible.value = false
  hoveredAvatarIndex.value = -1
}

// TODO: On mouse move should be only for popover elements.
function onMouseMove(event: MouseEvent | TouchEvent) {
  const isTouchEvent = 'touches' in event
  const x = isTouchEvent ? event.touches[0].clientX : event.clientX
  const y = isTouchEvent ? event.touches[0].clientY : event.clientY
  cursor.value.x = x
  cursor.value.y = y
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('scroll', hidePopover)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  // document.removeEventListener('touchmove', onMouseMove) // Remove touchmove on unmount
})
</script>

<style lang="scss">
.avatar-group {
  display: flex;
  gap: 0.5rem;
  position: relative;

  & > .avatar {
    border: 0.2rem solid var(--color-card);
    border-radius: 50%;
    margin-right: -1.5rem;
    width: calc(3rem + 0.4rem);
    height: calc(3rem + 0.4rem);

    &:last-child {
      margin-right: 0;
    }

    img,
    svg {
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
    color: var(--color-text);
    cursor: pointer;
    font-size: 100%;
  }
}

.popover {
  position: fixed;
  background-color: var(--color-popover-card);
  color: var(--color-popover-text);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--border-radius);
  z-index: 1000;
  left: 0;
  transform: translate(-50%, 1.2rem);
  pointer-events: none;

  svg {
    border-radius: 50%;
    overflow: hidden;
    width: 3rem;
    height: 3rem;
  }

  &:after {
    content: '';
    position: absolute;
    width: 2em;
    height: 2em;
    aspect-ratio: 1;
    top: 0.1rem;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    background-color: var(--color-popover-card);
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
