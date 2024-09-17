<template>
  <div class="nav-bar-component" :class="{ loading }" :style="style">
    <div class="nav-bar-logo">
      <NuxtLink to="/">
        <Press
          :width="7"
          background="var(--color-primary)"
          color="var(--color-white)"
        >
          <span> {{ $t('scrumz') }} </span>
        </Press>
      </NuxtLink>
      <ToggleAvatar :name="props.name">
        <slot name="avatar" />
        <ToggleLanguage />
        <ToggleTheme />
      </ToggleAvatar>
    </div>
    <div class="center-panel">
      <slot />
    </div>
    <div class="right-panel">
      <ToggleLanguage />
      <ToggleTheme />
      <ToggleAvatar :name="props.name">
        <slot name="avatar" />
      </ToggleAvatar>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t: $t } = useI18n()

const props = defineProps({
  width: {
    type: Number,
    default: 34,
  },
  height: {
    type: Number,
    default: 2,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
})

const style = computed(() => {
  return {
    '--nav-bar-width': `${props.width * 2}rem`,
    '--nav-bar-height': `${props.height * 2}rem`,
  }
})
</script>

<style lang="scss">
.nav-bar-component {
  width: var(--nav-bar-width);
  height: var(--nav-bar-height);
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  margin: -2rem auto 2rem;
  gap: 1rem;

  .nav-bar-logo {
    a {
      letter-spacing: -0.1rem;
    }
    .toggle-avatar-component {
      display: none;
    }
  }

  .center-panel,
  .right-panel {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
}

@media (max-aspect-ratio: 1/1) {
  .nav-bar-component {
    width: 100%;
    flex-direction: column;
    height: auto;
    max-width: 100vw;
    margin: 2rem 0;
    align-items: center;
    justify-content: center;

    .nav-bar-logo {
      width: calc(100% - 4rem);
      display: flex;
      gap: 1rem;

      .toggle-avatar-component {
        display: block;
      }

      a {
        width: calc(100% - 4rem);

        .button-component {
          width: calc(100%);
          text-align: center;
        }
      }
    }

    .right-panel {
      display: none;
    }

    .center-panel,
    .right-panel {
      width: calc(100% - 4rem);
      justify-content: center;
    }
  }
}
</style>
