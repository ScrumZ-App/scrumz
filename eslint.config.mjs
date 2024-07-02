import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt().append({
  files: ['**/**.vue'],
  name: 'my-components-can-be-one-word-okay',
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
  },
})
