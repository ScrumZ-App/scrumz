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
    <div class="mobile-buttons">
      <ToggleLanguage />
      <ToggleTheme />
    </div>
    <Card class="coffee-card" flip badge>
      <template #title>{{ $t('coffee') }}</template>
      <template #icon>
        <Image
          :height="4"
          :width="4"
          src="/coffee.svg"
          dark-src="/coffee-dark.svg"
      /></template>
      <template #back>
        <h1>{{ $t('support-us') }}</h1>
      </template>
    </Card>
    <Card class="mood-card" :width="17" :height="17">
      <template #title>{{ $t('mood') }}</template>
      <template #icon>
        <Image
          :height="15"
          :width="15"
          src="/mood.svg"
          dark-src="/mood-dark.svg"
        />
        <div class="buttons">
          <ToggleLanguage />
          <ToggleTheme />
        </div>
      </template>
    </Card>
    <Card class="info-card" :height="9" custom>
      <template #front>
        <span>
          {{ $t('info-card.what-is-scrumz') }}
        </span>
        <span>
          {{ $t('info-card.what-is-scrum-poker') }}
        </span>
      </template>
    </Card>
    <NuxtLink to="/join">
      <Press class="join-button" badge>
        <span> {{ $t('join-room') }} </span>
      </Press>
    </NuxtLink>
    <NuxtLink to="/create">
      <Press
        class="create-button"
        :height="4"
        size="250%"
        background="var(--color-primary)"
        badge-color="var(--color-badge-active)"
        color="var(--color-white)"
        badge
      >
        <span style="width: 0px"> {{ $t('create-room') }} </span>
      </Press>
    </NuxtLink>
    <Spacer class="spacer" />
  </Bento>
</template>

<script setup lang="ts">
const { t: $t } = useI18n()
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .logo {
    grid-area: logo;
  }
  .coffee-card {
    grid-area: coffee;
    h1 {
      font-size: 150%;
      font-weight: 600;
      color: var(--color-text);
      text-align: center;
      padding: 1rem;
    }
  }
  .mood-card {
    grid-area: mood;
    position: relative;

    .buttons {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      gap: 1rem;
      flex-direction: column;
    }
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
  .mobile-buttons {
    grid-area: mobile-buttons;
    display: none;
    justify-content: flex-end;
    gap: 1rem;
  }
}

@media (max-aspect-ratio: 1/1) {
  .home {
    .bento-grid {
      padding: 2rem;
      min-height: 100%;
      overflow: hidden;
      height: auto;
      grid-template-areas:
        'logo'
        'spacer'
        'mobile-buttons'
        'join'
        'create';
      grid-template-columns: 100%;
      grid-template-rows: 8rem 1fr 4rem 4rem 8rem;
      align-content: space-between;

      .coffee-card,
      .info-card,
      .mood-card {
        display: none;
      }
      .spacer,
      .mobile-buttons {
        display: flex;
      }
    }
  }
}
</style>
