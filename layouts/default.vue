<template>
  <!-- <Spacer y="4rem" /> -->
  <slot />
  <!-- <div v-show="isServer" style="opacity: 0">
    <slot />
  </div> -->
  <!-- <template v-for="(page, pageIndex) in /* last two */ pages.slice(-2)">
    <PagesHome
      v-if="page === '/'"
      :class="unloadClass(pageIndex)"
      :key="page"
    />
    <PagesCreate
      v-if="page === '/create'"
      :class="unloadClass(pageIndex)"
      :key="page"
    />
    <PagesJoin
      v-if="page === '/join'"
      :class="unloadClass(pageIndex)"
      :key="page"
    />
    <PagesRoom
      v-if="page.startsWith('/room/')"
      :class="unloadClass(pageIndex)"
      :key="page"
    />
  </template> -->
</template>

<script setup>
// import { storeToRefs } from 'pinia'
// import { useRouter } from 'vue-router'
// import { useLayoutStore } from '@/store'
// const router = useRouter()
// const store = useLayoutStore()
// const { pages } = storeToRefs(store)
// const isServer = process.server

// router.beforeEach((to, from, next) => {
//   console.error('Router is disabled')
//   next(false)
// })

// const unloadClass = (pageIndex) => {
//   const maxPageSize = 2
//   if (pages.value.length === 1) return 'loading'
//   return maxPageSize - 1 > pageIndex ? 'unloading' : 'loading'
// }
</script>

<style>
/* @keyframes something {
  0% {
    max-height: 100vh;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
  }
} */

/* .unloading {
  animation: something 0.1s ease-out forwards;
  pointer-events: none;
} */
</style>
