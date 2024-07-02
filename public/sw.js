// Empty Service Worker

self.addEventListener('install', () => {
  // Skip waiting so the new service worker activates immediately
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Claim clients immediately so the service worker takes control immediately
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', () => {
  // Do nothing for fetch events
})
