// read debug-token.json
import { token } from './debug-token.json'
if (!token) {
  throw new Error('Missing debug token')
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: { enabled: true },
  modules: [
    // ... other modules
    'nuxt-vuefire',
    '@nuxt/image',
    '@nuxt/eslint',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./store/**'],
  },
  vuefire: {
    auth: {
      enabled: true,
    },
    appCheck: {
      // get from .env
      debug: process.env.NODE_ENV !== 'production' ? token : false,
      isTokenAutoRefreshEnabled: true,
      provider: 'ReCaptchaV3',
      key: '6Ld1pywpAAAAAGwmMqHTBZWjIWob9mcO4J77qLzT',
    },
    config: {
      apiKey: 'AIzaSyBJvIxD974Fn42MG7fkZ7B9bm6HpOlGL9M',
      authDomain: 'scrumz-app.firebaseapp.com',
      databaseURL:
        'https://scrumz-app-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'scrumz-app',
      storageBucket: 'scrumz-app.appspot.com',
      messagingSenderId: '97619863839',
      appId: '1:97619863839:web:012d1599e420602e7b282a',
      measurementId: 'G-4E7VXM63L5',
    },
  },
})
