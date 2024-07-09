<template>
  <PagesCreate />
</template>

<script setup>
import { useLayoutStore } from '@/store'
const store = useLayoutStore()
store.add('/create')
</script>
