// if dev, use debug-token.json
import fs from 'fs'
let token = ''
if (process.env.NODE_ENV !== 'production') {
  try {
    const text = fs.readFileSync('./debug-token.json', 'utf-8')
    const { token: debugToken } = JSON.parse(text)
    token = debugToken
    console.log('Debug token:', token)
  } catch (e) {
    // read debug-token.json
    throw new Error('Missing debug-token.json')
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' },
  // },

  typescript: {
    typeCheck: true,
  },

  nitro: {
    prerender: {
      routes: ['/'],
      failOnError: false,
    },
  },

  devtools: { enabled: true },

  modules: [
    // ... other modules
    'nuxt-vuefire',
    '@nuxt/image',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  pinia: {
    storesDirs: ['./store/**'],
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'tr', language: 'tr-TR', file: 'tr.json' },
    ],
    defaultLocale: 'en',
    langDir: 'lang/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
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

  compatibilityDate: '2024-09-13',
})
