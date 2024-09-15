<template>
  <div>
    <button @click="copyToClipboard">Copy URL</button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  methods: {
    copyToClipboard() {
      if (typeof window !== 'undefined') return
      if (!(window as any).location) return
      const text = (window as any).location.href
      navigator.clipboard.writeText(text)
    },
  },
})
</script>
