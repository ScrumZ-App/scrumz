<template>
  {{ pages }} {{ pages.length > 1 && 'unloading' }}
  <Spacer y="8rem" />
  <div v-show="isServer" style="opacity: 0">
    <slot />
  </div>
  <template v-for="(page, pageIndex) in /* last two */ pages.slice(-2)">
    <PagesCreate v-if="page === '/create'" :class="unloadClass(pageIndex)" />
    <PagesHome v-if="page === '/'" :class="unloadClass(pageIndex)" />
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
  return pageIndex === 0 && pages.value.length > 1 ? 'unloading' : ''
}
</script>

<style>
.unloading {
  /* animate flying out */
  transform: translateY(-100%);
  opacity: 0;
  transition:
    transform 0.5s,
    opacity 0.5s;
}
</style>
