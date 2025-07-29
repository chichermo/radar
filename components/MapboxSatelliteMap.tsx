"use client";

import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapboxSatelliteMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Estilo vectorial gratuito
      center: [0, 0],
      zoom: 1.5,
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }} ref={mapContainer} />
  );
} 