<template>
  <Bento
    name="home"
    :areas="[
      'logo mood info',
      'logo mood info',
      'coffee mood info',
      'coffee mood join',
      'coffee mood create',
      'coffee mood create',
    ]"
  >
    <Logo />
    <Card class="coffee-card" flip badge>
      <template #title>coffee</template>
      <template #icon>
        <Image height="4" width="4" src="/coffee.svg"
      /></template>
      <template #back>
        <h1>Please Support Us 🥺</h1>
      </template>
    </Card>
    <Card class="mood-card" width="17" height="17">
      <template #title>mood</template>
      <template #icon>
        <Image height="15" width="15" src="/mood.svg" />
      </template>
    </Card>
    <Card class="info-card" height="9" custom>
      <template #front>
        <span>
          scrumz.app was developed for you to gather with your team members for
          story point estimation.
        </span>
        <span>
          work together and achieve success in your projects with our fun and
          flexible structure provided by scrum poker.
        </span>
      </template>
    </Card>
    <Press class="join-button" badge @click="joinRoom">
      <span> join room </span>
    </Press>
    <To href="/create">
      <Press
        class="create-button"
        height="4"
        size="250%"
        background="var(--color-primary)"
        color="var(--color-white)"
        badge
        @click="createRoom"
      >
        <span style="width: 0px"> create room </span>
      </Press>
    </To>
    <Spacer class="spacer" />
  </Bento>
</template>

<script>
export default {
  methods: {
    createRoom() {
      this.$to('/create')
    },
    joinRoom() {
      this.$to('/join')
    },
  },
}
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  .logo {
    grid-area: logo;
  }
  .coffee-card {
    grid-area: coffee;
    h1 {
      font-size: 150%;
      font-weight: 600;
      color: var(--color-black);
      text-align: center;
      padding: 1rem;
    }
  }
  .mood-card {
    grid-area: mood;
  }
  .info-card {
    grid-area: info;
    .front {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 110%;
      border-radius: var(--border-radius);
      padding: 1.5rem 2rem;
      text-wrap: balance;
      span {
        text-align: left;
      }
    }
  }
  .join-button {
    grid-area: join;
  }
  .create-button {
    grid-area: create;
  }
  .spacer {
    grid-area: spacer;
    display: none;
  }
}

@media (max-aspect-ratio: 1/1) {
  .home {
    height: 100vh;
    margin-top: 0;
    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: scroll;
      grid-template-areas:
        'logo'
        'spacer'
        'join'
        'create';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 4rem 8rem;
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
