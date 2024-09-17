<template>
  <div class="toggle-avatar-component">
    <button @click="toggleMenu" class="menu-toggler">
      <UserAvatar :name="name" />
    </button>
  </div>
  <Teleport to="body">
    <div :class="{ open: isOpen }" class="toggle-avatar-menu">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '',
  },
})

const isOpen = ref(false)

const closeMenu = (event: Event) => {
  if (!isOpen.value) {
    document.removeEventListener('click', closeMenu)
    return
  }
  // check if click event is inside the menu
  if (event.target instanceof HTMLElement) {
    if (!event.target.closest('.menu')) {
      isOpen.value = false
      document.removeEventListener('click', closeMenu)
    }
  }
}

const toggleMenu = async () => {
  /* add listener to document, if clicks elsewhere, close */
  if (isOpen.value) {
    document.removeEventListener('click', closeMenu)
    isOpen.value = false
  } else {
    isOpen.value = true
    setTimeout(() => {
      document.addEventListener('click', closeMenu)
    }, 1)
  }
}
</script>

<style lang="scss">
.toggle-avatar-component {
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

  .menu-toggler {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 150%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    text-transform: uppercase;
    color: var(--color-text);
  }
}

.toggle-avatar-menu {
  position: absolute;
  top: 7rem;
  right: 6rem;
  width: auto;
  height: auto;
  background: var(--color-card);
  border-radius: var(--border-radius);
  box-shadow: 0 0 1rem 0.1rem #0001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  display: none;

  &.open {
    display: block;
  }
}

@media (max-aspect-ratio: 1/1) {
  .toggle-avatar-menu {
    bottom: 0;
    top: unset;
    right: 0;
    left: 0;
    padding-bottom: 2rem;
    padding-top: 1rem;
    position: fixed;
    border: 1px solid #fff2;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    display: block;

    &.open {
      transform: translateY(0);
    }

    & > * {
      width: 100%;
      text-align: center;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #0001;
      justify-content: center !important;
      font-size: 120%;
      padding: 0;
      float: left;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  [data-theme='dark'] {
    .toggle-avatar-menu {
      & > * {
        border: none;
        box-shadow: none;
        border-bottom: 1px solid #fff2;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

[data-theme='dark'] {
  .toggle-avatar-component {
    border: 1px solid #fff2;
  }
}
</style>
