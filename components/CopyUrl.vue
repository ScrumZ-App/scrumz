<template>
  <div>
    <button @click="copyToClipboard">Copy URL</button>
  </div>
</template>

<script>
export default {
  methods: {
    copyToClipboard() {
      if (typeof window !== 'undefined') return
      const text = window.location.href
      navigator.clipboard.writeText(text)
    },
  },
}
</script>
