<template>
  <div>
    <QRCode
      :value="currentURL"
      :color="{ dark: '#000', light: '#fff' }"
      type="image/png"
    />
  </div>
</template>

<script setup lang="ts">
import QRCode from 'vue-qrcode'
const currentURL = ref('')

onMounted(() => {
  if (typeof window === 'undefined') return
  if (!window.location) return
  currentURL.value = window.location.href
})
</script>
