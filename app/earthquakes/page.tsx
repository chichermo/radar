'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Activity, Clock, Globe, TrendingUp } from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';
import { useI18n } from '@/lib/i18n';

interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  coordinates: {
    latitude: number;
    longitude: number;
    depth: number;
  };
  type: string;
  alert: string | null;
  tsunami: number;
  significance: number;
}

export default function EarthquakesPage() {
  const { t } = useI18n();
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [selectedMagnitude, setSelectedMagnitude] = useState<number>(5.0);

  // Datos simulados de terremotos mayores a 5 grados
  const mockEarthquakes: Earthquake[] = [
    {
      id: '1',
      magnitude: 6.2,
      place: 'Costa de Chile, 45 km al oeste de Valparaíso',
      time: Date.now() - 2 * 60 * 60 * 1000, // 2 horas atrás
      coordinates: { latitude: -33.045, longitude: -71.620, depth: 35 },
      type: 'earthquake',
      alert: 'green',
      tsunami: 0,
      significance: 450
    },
    {
      id: '2',
      magnitude: 5.8,
      place: 'Islas Aleutianas, Alaska',
      time: Date.now() - 6 * 60 * 60 * 1000, // 6 horas atrás
      coordinates: { latitude: 51.412, longitude: -178.715, depth: 25 },
      type: 'earthquake',
      alert: 'green',
      tsunami: 0,
      significance: 320
    },
    {
      id: '3',
      magnitude: 7.1,
      place: 'Costa de Japón, 120 km al este de Sendai',
      time: Date.now() - 12 * 60 * 60 * 1000, // 12 horas atrás
      coordinates: { latitude: 38.254, longitude: 142.369, depth: 45 },
      type: 'earthquake',
      alert: 'yellow',
      tsunami: 1,
      significance: 890
    },
    {
      id: '4',
      magnitude: 5.5,
      place: 'Nueva Zelanda, 30 km al norte de Christchurch',
      time: Date.now() - 24 * 60 * 60 * 1000, // 24 horas atrás
      coordinates: { latitude: -43.123, longitude: 172.456, depth: 15 },
      type: 'earthquake',
      alert: 'green',
      tsunami: 0,
      significance: 280
    },
    {
      id: '5',
      magnitude: 6.7,
      place: 'Indonesia, 80 km al sur de Sumatra',
      time: Date.now() - 48 * 60 * 60 * 1000, // 48 horas atrás
      coordinates: { latitude: -2.345, longitude: 101.234, depth: 55 },
      type: 'earthquake',
      alert: 'orange',
      tsunami: 1,
      significance: 650
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEarthquakes(mockEarthquakes);
      setLoading(false);
    }, 1000);
  }, []);

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 7.0) return 'text-red-500';
    if (magnitude >= 6.0) return 'text-orange-500';
    if (magnitude >= 5.5) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getAlertColor = (alert: string | null) => {
    switch (alert) {
      case 'red': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'orange': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'yellow': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'green': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredEarthquakes = earthquakes.filter(eq => eq.magnitude >= selectedMagnitude);

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('earthquakes.title')}
        </h1>
        <p className="text-gray-300">
          {t('earthquakes.subtitle')}
        </p>
      </header>

      {/* Filtros y controles */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('earthquakes.minimum_magnitude')}
              </label>
              <select
                value={selectedMagnitude}
                onChange={(e) => setSelectedMagnitude(Number(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value={5.0}>5.0+</option>
                <option value={5.5}>5.5+</option>
                <option value={6.0}>6.0+</option>
                <option value={6.5}>6.5+</option>
                <option value={7.0}>7.0+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('earthquakes.period')}
              </label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="24h">{t('earthquakes.last_24_hours')}</option>
                <option value="7d">{t('earthquakes.last_7_days')}</option>
                <option value="30d">{t('earthquakes.last_30_days')}</option>
              </select>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              {t('earthquakes.last_update')}: {formatTimeOnly(new Date())}
            </p>
            <p className="text-xs text-gray-500">
              {t('earthquakes.source')}
            </p>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t('earthquakes.total_earthquakes')}</p>
              <p className="text-2xl font-bold text-white">{filteredEarthquakes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <div>
              <p className="text-sm text-gray-400">{t('earthquakes.highest_magnitude')}</p>
              <p className="text-2xl font-bold text-white">
                {filteredEarthquakes.length > 0 ? Math.max(...filteredEarthquakes.map(eq => eq.magnitude)).toFixed(1) : '0.0'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">{t('earthquakes.with_tsunami')}</p>
              <p className="text-2xl font-bold text-white">
                {filteredEarthquakes.filter(eq => eq.tsunami === 1).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">{t('earthquakes.average')}</p>
              <p className="text-2xl font-bold text-white">
                {filteredEarthquakes.length > 0 
                  ? (filteredEarthquakes.reduce((sum, eq) => sum + eq.magnitude, 0) / filteredEarthquakes.length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de terremotos */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('earthquakes.recent_earthquakes')} (≥{selectedMagnitude}.0)
        </h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-2">{t('earthquakes.loading_data')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEarthquakes.map((earthquake) => (
              <div
                key={earthquake.id}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`text-2xl font-bold ${getMagnitudeColor(earthquake.magnitude)}`}>
                        {earthquake.magnitude}
                      </span>
                      <div>
                        <h3 className="text-white font-medium">{earthquake.place}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(new Date(earthquake.time))}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {earthquake.coordinates.latitude.toFixed(3)}°, 
                              {earthquake.coordinates.longitude.toFixed(3)}°
                            </span>
                          </span>
                          <span>{t('earthquakes.depth')}: {earthquake.coordinates.depth} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getAlertColor(earthquake.alert)}`}>
                      {earthquake.alert?.toUpperCase() || t('earthquakes.normal')}
                    </span>
                    {earthquake.tsunami === 1 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                        {t('earthquakes.tsunami')}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {t('earthquakes.significance')}: {earthquake.significance}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('earthquakes.system_information')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('earthquakes.magnitude_scale')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">5.0 - 5.9:</span>
                <span className="text-green-400">{t('earthquakes.moderate')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">6.0 - 6.9:</span>
                <span className="text-yellow-400">{t('earthquakes.strong')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">7.0 - 7.9:</span>
                <span className="text-orange-400">{t('earthquakes.major')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">8.0+:</span>
                <span className="text-red-400">{t('earthquakes.great')}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('earthquakes.tsunami_alerts')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('earthquakes.green')}:</span>
                <span className="text-green-400">{t('earthquakes.no_threat')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('earthquakes.yellow')}:</span>
                <span className="text-yellow-400">{t('earthquakes.low_threat')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('earthquakes.orange')}:</span>
                <span className="text-orange-400">{t('earthquakes.medium_threat')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('earthquakes.red')}:</span>
                <span className="text-red-400">{t('earthquakes.high_threat')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
