<template>
  <Card
    class="logo"
    :height="4"
    background="var(--color-card-active)"
    color="var(--color-white)"
    custom
  >
    <template #front>
      <span>{{ $t('scrumz') }}</span>
    </template>
  </Card>
</template>

<style lang="scss">
.logo {
  user-select: none;
  cursor: pointer;

  .front {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 450%;
    font-weight: 600;
    letter-spacing: -0.1rem;
    span {
      padding-bottom: 1rem;
    }
  }
}
</style>
