<template>
  <Bento
    name="create"
    :areas="['logo fibonacci t-shirt custom']"
    :columns="[8, 8, 8, 8]"
    :height="12"
  >
    <NuxtLink to="/"><Logo /></NuxtLink>
    <Card class="card" flip locked mirror :loading="!user">
      <template #title>
        {{ $t('fibonacci-card.title') }}
      </template>
      <template #icon>
        <Image :height="7" :width="7" src="/cards/fibonacci.png" dark />
      </template>
      <template #back>
        <div class="create-card" @click="create('fibonacci')">
          <h1>{{ $t('fibonacci-card.title') }}</h1>
          <ul>
            <li>{{ $t('fibonacci-card.great-for-estimating') }}</li>
            <li>{{ $t('fibonacci-card.sequence-of-numbers') }}</li>
            <li>
              {{
                $t(
                  'fibonacci-card.each-number-is-the-sum-of-the-two-preceding-ones'
                )
              }}
            </li>
          </ul>
          <Press
            :width="6"
            :height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            {{ $t('use-this-template') }}
          </Press>
        </div>
      </template>
    </Card>
    <Card class="card" flip locked mirror :loading="!user">
      <template #title> {{ $t('t-shirt-card.title') }} </template>
      <template #icon>
        <Image :height="8" :width="8" src="/cards/t-shirt.png" dark />
      </template>
      <template #back>
        <div class="create-card" @click="create('t-shirt')">
          <h1>{{ $t('t-shirt-card.title') }}</h1>
          <ul>
            <li>{{ $t('t-shirt-card.great-for-sizing') }}</li>
            <li>{{ $t('t-shirt-card.sequence-of-sizes') }}</li>
            <li>{{ $t('t-shirt-card.each-size-is-a-t-shirt-size') }}</li>
          </ul>
          <Press
            :width="6"
            :height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            {{ $t('use-this-template') }}
          </Press>
        </div>
      </template>
    </Card>
    <Card class="card" flip locked mirror :loading="!user">
      <template #title> {{ $t('custom-card.title') }} </template>
      <template #icon>
        <Image :height="8" :width="8" src="/cards/custom.png" dark />
      </template>
      <template #back>
        <div class="create-card" @click="create('custom')">
          <h1>{{ $t('custom-card.title') }}</h1>
          <ul>
            <li>{{ $t('custom-card.you-are-the-creator') }}</li>
            <li>{{ $t('custom-card.create-your-own-template') }}</li>
            <li>{{ $t('custom-card.customize-your-own-deck') }}</li>
          </ul>
          <Press
            :width="6"
            :height="2"
            size="120%"
            background="var(--color-primary)"
            color="var(--color-white)"
          >
            {{ $t('use-this-template') }}
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
      this.$router.push(`/${roomName}`)
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
    height: 100dvh;
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
