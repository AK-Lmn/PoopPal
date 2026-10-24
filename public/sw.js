const CACHE_NAME = 'pooppal-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/app-icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable.png',
  '/shortcut-log.png',
  '/shortcut-friends.png',
  '/screenshot-mobile.png',
  '/screenshot-desktop.png'
];

// Service Worker Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Service Worker Activation & Cache Cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Offline Support & Fetch Cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        return caches.match('/');
      });
    })
  );
});

// 1. Background Sync (Resilience to poor network connections)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-poop-logs') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch('/').then((response) => cache.put('/', response)).catch(() => {});
      })
    );
  }
});

// 2. Periodic Background Sync (Fresh daily data updates)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-poop-sync') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch('/').then((response) => cache.put('/', response)).catch(() => {});
      })
    );
  }
});

// 3. Push Notifications (Re-engage users with timely buddy updates)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'PoopPal Update';
  const options = {
    body: data.body || 'Your daily buddy streak is active!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
