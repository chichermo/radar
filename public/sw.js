// Versión del cache - actualizar este número cuando se hagan cambios importantes
const CACHE_VERSION = 'v2';
const CACHE_NAME = `cosmic-eye-${CACHE_VERSION}`;
const urlsToCache = [
  '/',
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  // Forzar la actualización inmediata del service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker instalado, cache:', CACHE_NAME);
        // No cachear todo automáticamente, solo precachear la página principal
        return cache.addAll(urlsToCache).catch((err) => {
          console.log('Error al precachear:', err);
        });
      })
  );
});

// Interceptar peticiones con estrategia Network First
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorar peticiones a APIs externas y recursos estáticos de Next.js
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/') || 
      url.pathname.startsWith('/_next/') ||
      url.pathname.includes('vercel') ||
      url.origin !== self.location.origin) {
    // Para APIs, siempre usar la red primero
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar obtener del cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Si no hay cache, devolver una respuesta de error básica
            return new Response('Sin conexión', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Actualizar cache y limpiar versiones antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tomar control inmediatamente de todas las páginas
      return self.clients.claim();
    })
  );
}); 