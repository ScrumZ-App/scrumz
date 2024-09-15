<template>
  <Bento
    name="create"
    :areas="['logo fibonacci t-shirt custom']"
    :columns="[8, 8, 8, 8]"
    :height="12"
  >
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Card class="card" flip locked mirror>
      <template #title> fibonacci </template>
      <template #icon>
        <Image :height="7" :width="7" src="/cards/fibonacci.png" />
      </template>
      <template #back>
        <div class="create-card" @click="create('fibonacci')">
          <h1>fibonacci</h1>
          <ul>
            <li>great for estimating</li>
            <li>sequence of numbers</li>
            <li>each number is the sum of the two preceding ones</li>
          </ul>
          <Press
            :width="6"
            :height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            use this template
          </Press>
        </div>
      </template>
    </Card>
    <Card class="card" flip locked mirror>
      <template #title> t-shirt </template>
      <template #icon>
        <Image :height="8" :width="8" src="/cards/t-shirt.png" />
      </template>
      <template #back>
        <div class="create-card" @click="create('t-shirt')">
          <h1>t-shirt</h1>
          <ul>
            <li>great for sizing</li>
            <li>sequence of sizes</li>
            <li>each size is a t-shirt size</li>
          </ul>
          <Press
            :width="6"
            :height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            use this template
          </Press>
        </div>
      </template>
    </Card>
    <Card class="card" flip locked mirror>
      <template #title> custom </template>
      <template #icon>
        <Image :height="8" :width="8" src="/cards/custom.png" />
      </template>
      <template #back>
        <div class="create-card" @click="create('custom')">
          <h1>custom</h1>
          <ul>
            <li>you are the creator</li>
            <li>create your own template</li>
            <li>customize your own deck</li>
          </ul>
          <Press
            :width="6"
            :height="2"
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

<script lang="ts">
export default defineComponent({
  data(): {
    user: any
  } {
    return {
      user: inject('user'),
    }
  },
  methods: {
    async create(type: string): Promise<void> {
      const roomName = await this.$scrumz.createRoom({
        uid: this.user.uid,
        type,
      })

      // go room page
      this.$router.push(`/room/${roomName}`)
    },
  },
})
</script>

<style lang="scss">
.create {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

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

@media (max-aspect-ratio: 1/1) {
  .create {
    height: 100vh;
    margin-top: 0;
    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas:
        'logo'
        'fibonacci'
        't-shirt'
        'custom';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 24rem 24rem 24rem;
      align-content: space-between;

      .coffee-card,
      .info-card,
      .mood-card {
        display: none;
      }
      .spacer {
        display: block;
      }
    }
  }
}
</style>
