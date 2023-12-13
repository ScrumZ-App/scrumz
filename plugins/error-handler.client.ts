export default defineNuxtPlugin((nuxtApp) => {
  window.onunhandledrejection = (event) => {
    nuxtApp.$toast.open({
      message: event.reason,
      type: 'error',
      duration: 10000
    })
  }

  window.onerror = function (message, source, lineNumber, colno, error) {
    console.warn(`UNHANDLED ERROR: ${message}`)
  }
})
