"use client";

import React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapboxSatelliteMap() {
  // Si no hay token de Mapbox, mostrar un fallback
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === '') {
    return (
      <div className="w-full h-[600px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🛰️</div>
          <h3 className="text-2xl font-bold text-white mb-4">Mapa de Satélites</h3>
          <p className="text-gray-300 mb-6 max-w-md">
            Para mostrar el mapa interactivo de satélites, necesitas configurar un token de Mapbox.
          </p>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-2">Datos de Satélites Disponibles:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• ISS (Estación Espacial Internacional)</li>
              <li>• Satélites Starlink</li>
              <li>• Telescopio Espacial Hubble</li>
              <li>• Otros satélites activos</li>
            </ul>
          </div>
          <div className="mt-6 text-xs text-gray-400">
            <p>Configura NEXT_PUBLIC_MAPBOX_TOKEN en tu archivo .env.local</p>
            <p>Obtén tu token gratuito en <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">mapbox.com</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Map
        initialViewState={{ longitude: 0, latitude: 0, zoom: 1.5 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Las rutas de satélites se agregarán en una versión futura */}
      </Map>
    </div>
  );
} 