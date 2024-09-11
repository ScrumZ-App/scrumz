<template>
  <pre>
    <slot />
  </pre>
</template>

<style lang="scss">
pre {
  width: 100%;
  height: 400px;
  resize: both;
  overflow-x: scroll;
  span {
    display: block;
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
