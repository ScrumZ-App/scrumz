<template>
  <!-- <PagesRoom /> -->
</template>

<script setup>
import { useLayoutStore } from '@/store'
const store = useLayoutStore()
store.add('/room/')
</script>
