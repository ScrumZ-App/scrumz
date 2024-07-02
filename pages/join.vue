<template>
  <Bento name="create">
    <Logo @click="goHome" />
    <Card class="card" flip locked mirror>
      <template #title> 1 </template>
      <template #icon> 1 </template>
      <template #back>
        <ul>
          <li>Test</li>
          <li>Test 2</li>
        </ul>
      </template>
    </Card>
  </Bento>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>

<style lang="scss">
.create {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
