/**
 * Service Worker for Nagisa的小屋
 * Provides offline support and caching for PWA
 */

var CACHE_NAME = 'nagisa-cache-v1';
var OFFLINE_URL = '/offline.html';

/* Assets to cache on install */
var PRECACHE_ASSETS = [
  '/',
  '/assets/css/main.css',
  '/assets/css/custom.css',
  '/images/profile.png',
  '/images/banner.jpg',
  '/images/banner-mobile.jpg'
];

/* Install event - cache essential assets */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Precaching assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* Activate event - clean up old caches */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* Fetch event - serve from cache, fallback to network */
self.addEventListener('fetch', function(event) {
  /* Skip non-GET requests */
  if (event.request.method !== 'GET') {
    return;
  }

  /* Skip cross-origin requests */
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        /* Return cached response and update cache in background */
        event.waitUntil(
          fetch(event.request).then(function(networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(function() {
            /* Network failed, but we have cache */
          })
        );
        return cachedResponse;
      }

      /* No cache, fetch from network */
      return fetch(event.request).then(function(networkResponse) {
        /* Cache successful responses */
        if (networkResponse && networkResponse.status === 200) {
          var responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(function() {
        /* Network failed, return offline page for navigation requests */
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return new Response('', { status: 408, statusText: 'Request timeout' });
      });
    })
  );
});
