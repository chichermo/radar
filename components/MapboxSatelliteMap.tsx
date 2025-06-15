"use client";

import React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapboxSatelliteMap() {
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