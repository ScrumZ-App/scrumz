<template>
  <div class="toggle-language-component">
    <button @click="toggleLanguage" class="language-toggler">
      {{ locale }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const toggleLanguage = () => {
  setLocale(locale.value === 'en' ? 'tr' : 'en')
}
</script>

<style lang="scss">
.toggle-language-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid #0001;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-card);

  .language-toggler {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    text-transform: uppercase;
    color: var(--color-text);
  }
}

[data-theme='dark'] {
  .toggle-language-component {
    border: 1px solid #fff2;
  }
}
</style>
