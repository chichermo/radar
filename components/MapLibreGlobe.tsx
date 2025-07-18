'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface SpaceObject {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  type: 'satellite' | 'debris' | 'asteroid';
  size?: number;
  velocity?: number;
}

interface MapLibreGlobeProps {
  spaceObjects: SpaceObject[];
  onObjectClick?: (object: SpaceObject) => void;
  className?: string;
}

const MapLibreGlobe: React.FC<MapLibreGlobeProps> = ({
  spaceObjects,
  onObjectClick,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Configuración del mapa con MapLibre
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          },
          'satellite': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            paint: {
              'raster-opacity': 0.7
            }
          },
          {
            id: 'satellite-tiles',
            type: 'raster',
            source: 'satellite',
            paint: {
              'raster-opacity': 0.3
            }
          }
        ]
      },
      center: [0, 0],
      zoom: 2,
      pitch: 45,
      bearing: 0,
      maxZoom: 18,
      minZoom: 1
    });

    // Controles del mapa
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');

    // Evento de carga del mapa
    map.current.on('load', () => {
      setIsLoading(false);
      addSpaceObjects();
    });

    // Evento de click en objetos
    map.current.on('click', (e) => {
      const features = map.current?.queryRenderedFeatures(e.point, {
        layers: ['space-objects']
      });
      
      if (features && features.length > 0) {
        const objectId = features[0].properties?.id;
        const object = spaceObjects.find(obj => obj.id === objectId);
        if (object && onObjectClick) {
          onObjectClick(object);
        }
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const addSpaceObjects = () => {
    if (!map.current) return;

    // Agregar fuente de datos para objetos espaciales
    map.current.addSource('space-objects', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: spaceObjects.map(obj => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [obj.longitude, obj.latitude]
          },
          properties: {
            id: obj.id,
            name: obj.name,
            type: obj.type,
            altitude: obj.altitude,
            size: obj.size || 1,
            velocity: obj.velocity || 0
          }
        }))
      }
    });

    // Agregar capa de objetos espaciales
    map.current.addLayer({
      id: 'space-objects',
      type: 'circle',
      source: 'space-objects',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'size'],
          0, 3,
          10, 8
        ],
        'circle-color': [
          'match',
          ['get', 'type'],
          'satellite', '#00ff00',
          'debris', '#ff0000',
          'asteroid', '#ff8800',
          '#ffffff'
        ],
        'circle-opacity': 0.8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });

    // Agregar etiquetas
    map.current.addLayer({
      id: 'space-objects-labels',
      type: 'symbol',
      source: 'space-objects',
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Regular'],
        'text-size': 12,
        'text-offset': [0, -2],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': '#000000',
        'text-halo-width': 1
      }
    });
  };

  // Actualizar objetos cuando cambien
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      const source = map.current.getSource('space-objects') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData({
          type: 'FeatureCollection',
          features: spaceObjects.map(obj => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [obj.longitude, obj.latitude]
            },
            properties: {
              id: obj.id,
              name: obj.name,
              type: obj.type,
              altitude: obj.altitude,
              size: obj.size || 1,
              velocity: obj.velocity || 0
            }
          }))
        });
      }
    }
  }, [spaceObjects]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="text-white text-lg">Cargando mapa...</div>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
      
      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg text-sm">
        <div className="font-semibold mb-2">Objetos Espaciales</div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Satélites</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Desechos</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span>Asteroides</span>
        </div>
      </div>
    </div>
  );
};

export default MapLibreGlobe;
