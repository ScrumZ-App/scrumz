<template>
  <BoringAvatar
    :name="name"
    :size="48"
    variant="beam"
    :colors="['#cdeccc', '#edd269', '#e88460', '#f23460', '#321d2e']"
  />
</template>

<script lang="ts">
import Avatar from 'vue-boring-avatars'

export default defineComponent({
  components: {
    BoringAvatar: Avatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>
