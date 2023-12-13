<template>
  <NuxtPage />
</template>

<script>
// TODO wait for auth, loading screen
import { signInAnonymously } from 'firebase/auth'
import 'vue-toast-notification/dist/theme-sugar.css'

export default {
  async beforeMount() {
    const user = await getCurrentUser()
    if (!user) {
      await signInAnonymously(useFirebaseAuth())
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Signed in anonymously')
      console.dir({ ...user })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Afacad:wght@400;600;700&display=swap');

:root {
  --color-background: #eff1f2;
  --color-primary: #ff3e6c;
  --color-white: #fff;
  --color-black: #030047;
  --color-faded: #9b9ab8;
  --border-radius: 2rem;
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

html,
body {
  background-color: var(--color-background);
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

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
