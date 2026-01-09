const CACHE_NAME = 'spending-tracker-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.tsx',
  '/src/App.tsx',
  '/src/App.css',
  '/src/index.css'
]

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll error:', err)
        return Promise.resolve()
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if available
      if (response) {
        return response
      }

      // Otherwise, fetch from network
      return fetch(event.request)
        .then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type === 'error') {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache the new response for non-API calls
          if (!event.request.url.includes('/api/')) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache)
            })
          }

          return response
        })
        .catch(() => {
          // Return offline fallback if needed
          console.log('Fetch failed, returning cached or offline response')
          return caches.match('/')
        })
    })
  )
})

// Handle background sync if needed
self.addEventListener('sync', event => {
  if (event.tag === 'sync-spending') {
    event.waitUntil(syncSpending())
  }
})

async function syncSpending() {
  try {
    // Future: sync pending spendings with server
    console.log('Syncing spending data...')
  } catch (err) {
    console.error('Sync failed:', err)
    throw err
  }
}
