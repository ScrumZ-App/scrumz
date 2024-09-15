<template>
  <div>
    <QRCode
      :value="currentURL"
      :color="{ dark: '#000', light: '#fff' }"
      type="image/png"
    />
  </div>
</template>

<script lang="ts">
import QRCode from 'vue-qrcode'

export default defineComponent({
  components: {
    QRCode,
  },
  data() {
    return {
      currentURL: '',
    }
  },
  mounted() {
    if (typeof window !== 'undefined') return
    if (!(window as any).location) return
    this.currentURL = (window as any).location.href
  },
})
</script>
