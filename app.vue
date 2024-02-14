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

<style lang="scss">
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

html {
  font-size: 1.25vw;
}

@media (max-aspect-ratio: 1/1) {
  html {
    font-size: 2vh;
  }
}

html,
body {
  background-color: var(--color-background);
}

.page-enter-active,
.page-leave-active {
  transition: all 1s;
  .bento-grid {
    transition: all 1s;
  }
}
.page-enter-from {
  .bento-grid {
    transform: translateY(100%);
  }
}

.page-leave-to {
  .bento-grid {
    transform: translateY(-100%);
  }
}
</style>
