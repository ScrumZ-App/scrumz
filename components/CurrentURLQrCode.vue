<template>
  <div>
    <QRCode
      :value="currentURL"
      :color="{ dark: '#000', light: '#fff' }"
      type="image/png"
    />
  </div>
</template>

<script>
import QRCode from 'vue-qrcode'

export default {
  components: {
    QRCode
  },
  data() {
    return {
      currentURL: ''
    }
  },
  mounted() {
    if (!process.browser) return
    this.currentURL = window.location.href
  }
}
</script>
