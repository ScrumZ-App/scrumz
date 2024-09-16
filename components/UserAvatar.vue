<template>
  <Avatar
    class="avatar"
    :name="name"
    :size="size"
    variant="beam"
    :colors="[
      '#cdeccc',
      '#edd269',
      '#e88460',
      'var(--color-primary)',
      '#321d2e',
    ]"
  />
</template>

<script setup lang="ts">
import Avatar from 'vue-boring-avatars'

defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 48,
  },
})
</script>

<style lang="scss">
.avatar {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
</style>
