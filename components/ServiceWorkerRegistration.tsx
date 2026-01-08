"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Registrar el service worker con un parámetro de versión para forzar actualizaciones
      const swUrl = `/sw.js?v=${Date.now()}`;
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Service Worker registrado:', registration.scope);

          // Verificar actualizaciones cada vez que se carga la página
          registration.update();

          // Escuchar actualizaciones del service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Hay una nueva versión disponible
                  console.log('Nueva versión del Service Worker disponible');
                  // Opcional: mostrar notificación al usuario
                  if (confirm('Hay una nueva versión disponible. ¿Deseas recargar la página?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Error al registrar Service Worker:', error);
        });

      // Limpiar caches antiguos al cargar
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            // Eliminar caches que no sean de la versión actual
            if (!cacheName.includes('cosmic-eye-v')) {
              caches.delete(cacheName);
            }
          });
        });
      }
    }
  }, []);

  return null;
}
