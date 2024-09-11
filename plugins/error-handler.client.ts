export default defineNuxtPlugin((nuxtApp) => {
  window.onunhandledrejection = (event) => {
    const knownErrors: {
      [key: string]: string
    } = {
      PERMISSION_DENIED: 'Missing or insufficient permissions.',
    }
    const toast = nuxtApp.$toast as any
    if (event?.reason?.code in knownErrors) {
      toast.open({
        message: knownErrors[event?.reason?.code],
        type: 'error',
        duration: 10000,
      })
    } else {
      toast.open({
        message: String(event?.reason) || '',
        type: 'error',
        duration: 10000,
      })
    }
  }

  window.onerror = function (message, _source, _lineNumber, _colno, _error) {
    console.warn(`UNHANDLED ERROR: ${message}`)
  }
})
