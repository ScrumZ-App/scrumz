<template>
  <NuxtLayout name="default">
    <KonamiCode @activate="debug = $event" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getAuth, signInAnonymously } from 'firebase/auth'
import 'vue-toast-notification/dist/theme-sugar.css'

const user = ref<any>(null)
const debug = ref<boolean>(false)

const providedUser = computed(() => user.value)
const providedDebug = computed(() => debug.value)

provide('user', providedUser)
provide('debug', providedDebug)

async function getCurrentUser() {
  const auth = getAuth()
  return auth.currentUser
}

onBeforeMount(async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    await signInAnonymously(getAuth())
  }
  user.value = await getCurrentUser()

  const config = useRuntimeConfig()
  if (config.public.nodeEnv === 'development' && user.value) {
    console.log('Signed in anonymously. UID:', user.value.uid)
  }
})

if (process.client) {
  let currentTheme = ''
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    currentTheme = storedTheme
  } else {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    currentTheme = preferredTheme
  }
  document.documentElement.setAttribute('data-theme', currentTheme)
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Afacad:wght@400;600;700&display=swap');

:root {
  --color-background: #eff1f2;
  --color-primary: #ff3e6c;
  --color-white: #fff;
  --color-black: #030047;
  --color-skeleton: #e4e4e4;
  --color-faded: #9b9ab8;
  --border-radius: 2rem;
  --color-text: var(--color-black);
  --color-card: var(--color-white);
  --color-card-active: var(--color-primary);
  --color-badge: var(--color-black);
  --color-badge-active: var(--color-white);
  --color-border: var(--color-black);
  --loading-gradient: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*,
input,
textarea,
button {
  font-family: 'Afacad', sans-serif;
}

html {
  font-size: 1.25vw;
}

@media (max-aspect-ratio: 1/1) {
  html {
    font-size: 2vh;
  }
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-background: #1a1a1a;
    --color-primary: #ff3e6c;
    --color-white: #fff;
    --color-black: #030047;
    --color-skeleton: #2f2f2f;
    --color-faded: #9b9ab8;
    --color-text: var(--color-white);
    --color-card: #1f1f1f;
    --color-card-active: #1f1f1f;
    --color-badge: var(--color-primary);
    --color-badge-active: #1f1f1f;
    --color-border: var(--color-white);
    --loading-gradient: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

[data-theme='dark'] {
  --color-background: #1a1a1a;
  --color-primary: #ff3e6c;
  --color-white: #fff;
  --color-black: #030047;
  --color-skeleton: #2f2f2f;
  --color-faded: #9b9ab8;
  --color-text: var(--color-white);
  --color-card: #1f1f1f;
  --color-card-active: #1f1f1f;
  --color-badge: var(--color-primary);
  --color-badge-active: #1f1f1f;
  --color-border: var(--color-white);
  --loading-gradient: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}

html,
body {
  background-color: var(--color-background);
}

.page-leave-to {
  .bento-grid {
    transform: translateY(-100%);
  }
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;

  & svg {
    width: 10rem;
    animation: rotate 3s linear infinite;
  }
}
</style>
