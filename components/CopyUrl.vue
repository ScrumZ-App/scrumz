<template>
  <div>
    <button @click="copyToClipboard">Copy URL</button>
  </div>
</template>

<script>
export default {
  methods: {
    copyToClipboard() {
      if (!process.browser) return
      var dummy = document.createElement('input')
      var text = window.location.href

      document.body.appendChild(dummy)
      dummy.value = text
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
    }
  }
}
</script>
