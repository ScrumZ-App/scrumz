<template>
  <div :class="currentTheme" class="toggle-theme-component">
    <button @click="toggleTheme" class="theme-toggler">
      <span
        :class="{
          sun: currentTheme === 'light',
          moon: currentTheme === 'dark',
        }"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentTheme = ref('light')

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    currentTheme.value = storedTheme
  } else {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    currentTheme.value = preferredTheme
  }
})

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  localStorage.setItem('theme', currentTheme.value)
}
</script>

<style lang="scss">
.toggle-theme-component {
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
  transition: background 0.5s;

  .theme-toggler {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;

    .sun,
    .moon {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      position: relative;
      transition: all 0.5s;
      &:before {
        content: '';
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: var(--color-card);
        transform: translate(2rem, -2rem);
        transition: all 0.5s;
        top: 0;
        left: 0;
      }
    }

    .sun {
      background: #f6d602;
      border: 5px solid #f5eb71;
    }

    .moon {
      background: #fff;
      &:before {
        transform: translate(0.5rem, -0.5rem);
      }
    }
  }
}

[data-theme='dark'] {
  .toggle-theme-component {
    border: 1px solid #fff2;
  }
}
</style>
