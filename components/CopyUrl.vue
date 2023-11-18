<template>
    <div>
      <button @click="copyToClipboard">Copy URL</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      copyToClipboard() {
        var dummy = document.createElement('input');
        var text = window.location.href;
  
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>