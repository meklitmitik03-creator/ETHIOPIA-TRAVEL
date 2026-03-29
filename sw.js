// sw.js - Service Worker
const CACHE_NAME = 'ethio-travel-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://cdn-icons-png.flaticon.com/512/330/330551.png'
];

// 1. Install Event: Saves your files so the app works offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets');
      return cache.addAll(assets);
    })
  );
});

// 2. Fetch Event: Helps the app load instantly from the cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});