<template>
  <Spacer y="4rem" />
  <div v-show="isServer" style="opacity: 0">
    <slot />
  </div>
  <template v-for="(page, pageIndex) in /* last two */ pages.slice(-2)">
    <PagesCreate
      v-if="page === '/create'"
      :class="unloadClass(pageIndex)"
      :key="page"
    />
    <PagesHome
      v-if="page === '/'"
      :class="unloadClass(pageIndex)"
      :key="page"
    />
  </template>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/store'
const router = useRouter()
const store = useLayoutStore()
const { currentPage, pages } = storeToRefs(store)
const isServer = process.server

router.beforeEach((to, from, next) => {
  console.error('Router is disabled')
  next(false)
})

const unloadClass = (pageIndex) => {
  const maxPageSize = 2
  if (pages.value.length === 1) return 'loading'
  return maxPageSize - 1 > pageIndex ? 'unloading' : 'loading'
}
</script>

<style>
@keyframes something {
  0% {
    /* transform: translateY(0); */
    opacity: 1;
    max-height: 100vh;
  }
  10% {
    margin-top: 0;
  }
  100% {
    /* transform: translateY(-100%); */
    opacity: 0;
    /* margin-top: -40%; */
    max-height: 0;
  }
}

.unloading {
  animation: something 0.5s ease-out forwards;
}
</style>
