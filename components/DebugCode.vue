<template>
  <pre>
    <slot />
  </pre>
</template>

<style lang="scss">
pre {
  width: 10px;
  height: 10px;
  resize: both;
  overflow-x: scroll;
  span {
    display: block;
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>
