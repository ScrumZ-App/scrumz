<template>
  <div></div>
</template>

<script setup lang="ts">
const code = ref('')
const konami = '38384040373937396665'
const timeout = ref<NodeJS.Timeout | null>(null)
const activated = ref(false)

function onKeyDown(e: KeyboardEvent) {
  if (timeout.value) clearTimeout(timeout.value)
  code.value = `${code.value}${e.keyCode}`
  if (code.value === konami) {
    activated.value = !activated.value
    emit('activate', activated.value)
  }
  timeout.value = setTimeout(() => {
    if (timeout.value) clearTimeout(timeout.value)
    code.value = ''
  }, 256)
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})

const emit = defineEmits(['activate'])
</script>
