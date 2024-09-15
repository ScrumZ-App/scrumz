/*

  For some reason, route and router are not
  available in the global context in TypeScript.
  This is a workaround to make them available
  globally.

  We do not provide router plugin, we just simply
  type declare the global properties.

*/

import type { RouteLocationNormalizedGeneric, Router } from 'vue-router'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly $route: RouteLocationNormalizedGeneric
    readonly $router: Router
    readonly $t: Function
  }
}

export default defineNuxtPlugin(() => {})
