// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // ... other modules
    'nuxt-vuefire'
  ],
  vuefire: {
    auth: {
      enabled: true
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
      measurementId: 'G-4E7VXM63L5'
    }
  }
})
