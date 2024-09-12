<template>
  <BoringAvatar
    size="3rem"
    :name="name"
    variant="beam"
    :colors="['#cdeccc', '#edd269', '#e88460', '#f23460', '#321d2e']"
  />
</template>

<script>
import Avatar from 'vue-boring-avatars'

export default {
  components: {
    BoringAvatar: Avatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
