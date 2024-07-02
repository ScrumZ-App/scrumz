export default defineNuxtPlugin((nuxtApp) => {
  window.onunhandledrejection = (event) => {
    nuxtApp.$toast.open({
      message: event.reason,
      type: 'error',
      duration: 10000,
    })
  }

  window.onerror = function (message, _source, _lineNumber, _colno, _error) {
    console.warn(`UNHANDLED ERROR: ${message}`)
  }
})
