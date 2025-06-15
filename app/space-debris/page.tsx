'use client';
import { AlertTriangle, Globe, Layers, Rocket, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { formatNumber, formatDate } from '@/utils/formatters';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Mock data - esto será reemplazado por datos reales de la API de ESA
const mockDebris = {
  total_objects: 12800,
  by_type: {
    payloads: 3300,
    rocket_bodies: 1500,
    debris: 8000
  },
  by_orbit: {
    leo: 6500,
    meo: 1200,
    geo: 5100
  },
  recent_events: [
    {
      id: 1,
      type: 'Colisión',
      description: 'Colisión entre dos objetos en órbita LEO',
      objects: ['COSMOS 2251', 'IRIDIUM 33'],
      timestamp: '2024-02-24T15:30:00Z',
      risk_level: 'Alto'
    },
    {
      id: 2,
      type: 'Fragmentación',
      description: 'Fragmentación de etapa superior de cohete',
      object: 'CZ-4B R/B',
      timestamp: '2024-02-23T08:15:00Z',
      risk_level: 'Moderado'
    }
  ],
  risk_assessments: [
    {
      id: 'DEB-2024-001',
      object: 'SL-8 R/B',
      size: 'Grande',
      orbit: 'LEO',
      risk: 'Alto',
      tle: {
        line1: '1 12345U 80001A   24056.12345678  .00000000  00000-0  00000-0 0  9999',
        line2: '2 12345  65.0000 180.0000 0000000   0.0000 360.0000 15.00000000 12345'
      }
    },
    {
      id: 'DEB-2024-002',
      object: 'COSMOS 2251 Debris',
      size: 'Mediano',
      orbit: 'LEO',
      risk: 'Moderado',
      tle: {
        line1: '1 33759U 93036A   24056.12345678  .00000000  00000-0  00000-0 0  9999',
        line2: '2 33759  74.0000 180.0000 0000000   0.0000 360.0000 14.00000000 12345'
      }
    }
  ]
};

const riskLevels = {
  Bajo: 'bg-green-500/10 text-green-400',
  Moderado: 'bg-yellow-500/10 text-yellow-400',
  Alto: 'bg-red-500/10 text-red-400'
};

// Componente de mapa MapLibre integrado
function SpaceDebrisMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Datos simulados de desechos espaciales
  const debrisData = [
    { id: '1', name: 'SL-8 R/B', lat: 45.0, lng: -75.0, type: 'debris', size: 5 },
    { id: '2', name: 'COSMOS 2251', lat: 30.0, lng: 45.0, type: 'debris', size: 3 },
    { id: '3', name: 'CZ-4B R/B', lat: -20.0, lng: 120.0, type: 'debris', size: 4 },
    { id: '4', name: 'IRIDIUM 33', lat: 60.0, lng: -120.0, type: 'satellite', size: 2 },
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            paint: {
              'raster-opacity': 0.8
            }
          }
        ]
      },
      center: [0, 0],
      zoom: 2,
      pitch: 45,
      bearing: 0
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setIsLoading(false);
      
      // Agregar fuente de datos de desechos
      map.current?.addSource('debris', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: debrisData.map(item => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.lng, item.lat]
            },
            properties: {
              id: item.id,
              name: item.name,
              type: item.type,
              size: item.size
            }
          }))
        }
      });

      // Agregar capa de desechos
      map.current?.addLayer({
        id: 'debris-points',
        type: 'circle',
        source: 'debris',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'size'],
            1, 4,
            5, 12
          ],
          'circle-color': [
            'match',
            ['get', 'type'],
            'satellite', '#00ff00',
            'debris', '#ff0000',
            '#ffffff'
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Agregar etiquetas
      map.current?.addLayer({
        id: 'debris-labels',
        type: 'symbol',
        source: 'debris',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 10,
          'text-offset': [0, -1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': '#000000',
          'text-halo-width': 1
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="text-white text-lg">Cargando mapa...</div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg text-sm">
        <div className="font-semibold mb-2">Desechos Espaciales</div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Desechos</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Satélites</span>
        </div>
      </div>
    </div>
  );
}

export default function SpaceDebrisPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockDebris.recent_events[0]) | null>(null);
  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Seguimiento de Basura Espacial
        </h1>
        <p className="text-gray-300">
          Monitoreo en tiempo real de objetos en órbita, evaluación de riesgos y
          eventos de fragmentación.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">
                  Objetos en Órbita
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Total de Objetos</p>
                  <p className="text-2xl font-bold text-white" suppressHydrationWarning>
                    {formatNumber(mockDebris.total_objects)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Por Tipo</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Payloads</span>
                        <span className="text-white" suppressHydrationWarning>
                          {formatNumber(mockDebris.by_type.payloads)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Rocket Bodies</span>
                        <span className="text-white" suppressHydrationWarning>
                          {formatNumber(mockDebris.by_type.rocket_bodies)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Debris</span>
                        <span className="text-white" suppressHydrationWarning>
                          {formatNumber(mockDebris.by_type.debris)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Por Órbita</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">LEO</span>
                        <span className="text-white" suppressHydrationWarning>
                          {formatNumber(mockDebris.by_orbit.leo)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">MEO</span>
                        <span className="text-white" suppressHydrationWarning>
                          {formatNumber(mockDebris.by_orbit.meo)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">GEO</span>
                        <span className="text-white" suppressHydrationWarning>
                          {formatNumber(mockDebris.by_orbit.geo)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">
                  Eventos Recientes
                </h2>
              </div>
              <div className="space-y-4">
                {mockDebris.recent_events.map(event => (
                  <div key={event.id} className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-yellow-900/30" onClick={() => setSelectedEvent(event)}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">{event.type}</span>
                      <span className="text-xs text-gray-400" suppressHydrationWarning>
                        {formatDate(event.timestamp)}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm">{event.description}</div>
                  </div>
                ))}
              </div>
              {selectedEvent && (
                <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-yellow-700 text-white">
                  <h3 className="font-bold mb-2">Detalles del Evento</h3>
                  <p><b>Tipo:</b> {selectedEvent.type}</p>
                  <p><b>Descripción:</b> {selectedEvent.description}</p>
                  <p><b>Objetos:</b> {selectedEvent.objects ? selectedEvent.objects.join(', ') : selectedEvent.object}</p>
                  <p><b>Riesgo:</b> {selectedEvent.risk_level}</p>
                  <p><b>Fecha:</b> <span suppressHydrationWarning>{formatDate(selectedEvent.timestamp)}</span></p>
                  <button className="mt-2 px-3 py-1 bg-yellow-700 rounded" onClick={() => setSelectedEvent(null)}>Cerrar</button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="h-5 w-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">
                Evaluación de Riesgos
              </h2>
            </div>
            <div className="space-y-4">
              {mockDebris.risk_assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-white">
                          {assessment.object}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400">
                          {assessment.risk}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Tamaño</p>
                          <p className="text-white">{assessment.size}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Órbita</p>
                          <p className="text-white">{assessment.orbit}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">TLE</p>
                        <div className="mt-1 space-y-1 font-mono text-xs">
                          <p className="text-gray-300">
                            {assessment.tle.line1}
                          </p>
                          <p className="text-gray-300">
                            {assessment.tle.line2}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filtros
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Objeto
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>Todos</option>
                  <option>Payloads</option>
                  <option>Rocket Bodies</option>
                  <option>Debris</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Órbita
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>Todas</option>
                  <option>LEO</option>
                  <option>MEO</option>
                  <option>GEO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nivel de Riesgo
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>Todos</option>
                  <option>Alto</option>
                  <option>Moderado</option>
                  <option>Bajo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Información
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  Acerca de los Datos
                </h3>
                <p className="text-sm text-gray-300">
                  Los datos son proporcionados por la ESA y actualizados en tiempo
                  real. Se incluyen objetos de más de 10 cm en LEO y 1 metro en
                  GEO.
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  Métricas de Riesgo
                </h3>
                <p className="text-sm text-gray-300">
                  El riesgo se calcula basado en el tamaño del objeto, su órbita y
                  la probabilidad de colisión con otros objetos activos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa de Desechos Espaciales */}
      <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">
            Mapa de Desechos Espaciales
          </h2>
        </div>
        <SpaceDebrisMap />
      </div>
    </div>
  );
} 