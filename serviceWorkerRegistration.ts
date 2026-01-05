// This code registers a service worker if supported.

export function register(config?: { onSuccess?: (registration: ServiceWorkerRegistration) => void; onUpdate?: (registration: ServiceWorkerRegistration) => void }) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(window.location.href).origin;
    const swUrl = `${publicUrl}/service-worker.js`;

    window.addEventListener('load', () => {
      registerValidSW(swUrl, config);
    });
  }
}

function registerValidSW(swUrl: string, config?: any) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available and will be used when all tabs for this page are closed.');
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

/* 
 * NOTE: Create a file named `public/service-worker.js` (or generated via workbox) with the following content logic:
 * 
 * const CACHE_NAME = 'wandering-fortress-v1';
 * const CRITICAL_ASSETS = [
 *   '/',
 *   '/index.html',
 *   '/manifest.json',
 *   '/models/fortress.glb', // Example
 *   '/textures/terrain.ktx2' // Example
 * ];
 * 
 * self.addEventListener('install', (event) => {
 *   event.waitUntil(
 *     caches.open(CACHE_NAME).then((cache) => cache.addAll(CRITICAL_ASSETS))
 *   );
 * });
 * 
 * self.addEventListener('fetch', (event) => {
 *   event.respondWith(
 *     caches.match(event.request).then((response) => response || fetch(event.request))
 *   );
 * });
 */