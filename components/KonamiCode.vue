<template>
  <div></div>
</template>

<script lang="ts">
export default defineComponent({
  emits: ['activate'],
  data(): {
    code: string
    konami: string
    timeout: any
    activated: boolean
  } {
    return {
      code: '',
      konami: '38384040373937396665',
      timeout: null,
      activated: false,
    }
  },
  beforeMount() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    onKeyDown(e: KeyboardEvent) {
      if (this.timeout) clearTimeout(this.timeout)
      this.code = `${this.code}${e.keyCode}`
      if (this.code === this.konami) {
        this.activated = !this.activated
        this.$emit('activate', this.activated)
      }
      this.timeout = setTimeout(() => {
        if (this.timeout) clearTimeout(this.timeout)
        this.code = ''
      }, 256)
    },
  },
})
</script>
