<template>
  <Bento name="join" :areas="['joinCard']" :columns="[35]">
    <Card style="grid-area: joinCard" height="17" width="35">
      <template #title>join a room</template>
      <template #icon>
        <input type="text" placeholder="enter room code" />
      </template>
    </Card>
  </Bento>
</template>

<style lang="scss">
.join {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-aspect-ratio: 1/1) {
  .join {
    height: 100vh;
    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas: 'joinCard';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 4rem 8rem;
      align-content: space-between;
    }
  }
}
</style>
