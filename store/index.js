import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    currentPage: null,
    pages: [],
  }),
  actions: {
    add(page) {
      // if ssr, don't add pages
      if (typeof window === 'undefined') return false
      if (page === this.currentPage) return false

      console.log(page, this.pages)
      this.currentPage = page
      this.pages = [...this.pages, page]
      return true
    },
  },
})
