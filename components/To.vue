<template>
  <a class="to-component" :href="href" @click="disableRedirection">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  methods: {
    disableRedirection(e) {
      this.$to(e.currentTarget.attributes.href.value)
      e.preventDefault()
      return false
    },
  },
}
</script>

<style lang="scss">
.to-component {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>
