<template>
  <div>
    <button @click="copyToClipboard">Copy URL</button>
  </div>
</template>

<script setup lang="ts">
function copyToClipboard() {
  if (typeof window === 'undefined') return
  if (!window.location) return
  const text = window.location.href
  navigator.clipboard.writeText(text)
}
</script>
