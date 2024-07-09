<template>
  <Bento
    name="create"
    :areas="['logo fibonacci t-shirt']"
    :columns="[8, 8, 8, 8]"
  >
    <To href="/"><Logo /></To>
    <Card class="card" flip locked mirror @click="create('fibonacci')">
      <template #title> fibonacci </template>
      <template #icon>
        <Image height="7" width="7" src="/cards/fibonacci.png" />
      </template>
      <template #back>
        <div class="create-card">
          <h1>fibonacci</h1>
          <ul>
            <li>great for estimating</li>
            <li>sequence of numbers</li>
            <li>each number is the sum of the two preceding ones</li>
          </ul>
          <Press
            width="6"
            height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            use this template
          </Press>
        </div>
      </template>
    </Card>
    <Card class="card" flip locked mirror @click="create('t-shirt')">
      <template #title> t-shirt </template>
      <template #icon>
        <Image height="8" width="8" src="/cards/t-shirt.png" />
      </template>
      <template #back>
        <div class="create-card">
          <h1>t-shirt</h1>
          <ul>
            <li>great for sizing</li>
            <li>sequence of sizes</li>
            <li>each size is a t-shirt size</li>
          </ul>
          <Press
            width="6"
            height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            use this template
          </Press>
        </div>
      </template>
    </Card>
    <Card class="card" flip locked mirror @click="create('custom')">
      <template #title> custom </template>
      <template #icon>
        <Image height="8" width="8" src="/cards/custom.png" />
      </template>
      <template #back>
        <div class="create-card">
          <h1>custom</h1>
          <ul>
            <li>you are the creator</li>
            <li>create your own template</li>
            <li>customize your own deck</li>
          </ul>
          <Press
            width="6"
            height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            use this template
          </Press>
        </div>
      </template>
    </Card>
  </Bento>
</template>

<script>
export default {
  methods: {
    create(type) {
      console.log(type)
    },
  },
}
</script>

<style lang="scss">
.create {
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    cursor: pointer;
  }

  .create-card {
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    justify-items: flex-end;
    justify-content: space-between;
    height: 100%;

    ul {
      margin-left: 1.25rem;
    }
  }
}
</style>
