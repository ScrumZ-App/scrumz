<template>
    <div>
      <qrcode :value="currentURL"></qrcode>
    </div>
  </template>
  
  <script>
  
  import QRCode from 'vue-qrcode';
  
  export default {
    components: {
      qrcode: QRCode,
    },
    data() {
      return {
        currentURL: window.location.href,
      };
    },
  };
  </script>