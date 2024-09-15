<template>
  <NuxtLayout name="default">
    <KonamiCode @activate="debug = $event" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { getAuth, signInAnonymously } from 'firebase/auth'
import 'vue-toast-notification/dist/theme-sugar.css'

export default defineComponent({
  provide() {
    return {
      user: computed(() => this.user),
      debug: computed(() => this.debug),
    }
  },
  data(): {
    user: any
    debug: boolean
  } {
    return {
      user: null,
      debug: false,
    }
  },
  async beforeMount() {
    const user = await getCurrentUser()
    if (!user) {
      await signInAnonymously(getAuth())
    }
    this.user = await getCurrentUser()
    if (process.env.NODE_ENV === 'development' && this.user) {
      console.log('Signed in anonymously. UID:', this.user.uid)
    }
  },
})
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

// .page-enter-active,
// .page-leave-active {
//   transition: all 0.4s;
//   .bento-grid {
//     transition: all 0.4s;
//   }
// }
// .page-enter-from {
//   .bento-grid {
//     transform: translateY(100%);
//   }
// }

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
  height: 100vh;

  & svg {
    width: 10rem;
    animation: rotate 3s linear infinite;
  }
}
</style>
