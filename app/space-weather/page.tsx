"use client";

import { Activity, AlertTriangle, Cloud, Sun, Wind, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';
import ClientDate from '@/components/ClientDate';

export default function SpaceWeatherPage() {
  const [spaceWeather, setSpaceWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpaceWeatherData();
  }, []);

  const fetchSpaceWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de clima espacial
      const response = await fetch('/api/space-weather');
      
      if (response.ok) {
        const data = await response.json();
        setSpaceWeather(data);
      } else {
        throw new Error('No se pudieron obtener datos de clima espacial');
      }
    } catch (error) {
      console.error('Error fetching space weather data:', error);
      setError('No se pudieron cargar los datos de clima espacial');
      setSpaceWeather(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos del clima espacial...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">{error}</p>
          <button 
            onClick={fetchSpaceWeatherData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Clima Espacial</h1>
            <p className="text-gray-300 max-w-xl">
              Monitoreo en tiempo real de las condiciones solares y geomagnéticas
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchSpaceWeatherData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <Activity className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estado Actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Actividad Solar</h3>
              <p className="text-gray-300 text-sm">
                {spaceWeather?.sunspots?.length > 0 ? `${spaceWeather.sunspots.length} regiones activas` : 'Sin actividad significativa'}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Wind className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Viento Solar</h3>
              <p className="text-gray-300 text-sm">
                {spaceWeather?.solarWind || 'Datos no disponibles'}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Campo Magnético</h3>
              <p className="text-gray-300 text-sm">
                {spaceWeather?.geomagneticActivity || 'Datos no disponibles'}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Activity className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Índice Kp</h3>
              <p className="text-gray-300 text-sm">
                {spaceWeather?.kp?.[0]?.kp_index || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Regiones Solares Activas */}
      {spaceWeather?.sunspots && spaceWeather.sunspots.length > 0 && (
        <div className="glass-card">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Sun className="h-5 w-5 text-yellow-400" />
              <span>Regiones Solares Activas</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spaceWeather.sunspots.map((region: any, index: number) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold">{region.regionnum || `Región ${index + 1}`}</h3>
                    <span className="text-yellow-400 text-sm font-mono">{region.class || 'N/A'}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>Latitud: {region.latitude || 'N/A'}°</div>
                    <div>Clase: {region.class || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alertas */}
      {spaceWeather?.alerts && spaceWeather.alerts.length > 0 && (
        <div className="glass-card">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span>Alertas de Clima Espacial</span>
            </h2>
            <div className="space-y-4">
              {spaceWeather.alerts.map((alert: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-semibold">{alert.type || 'Alerta'}</div>
                      <div className="text-gray-300 text-sm">{alert.description || 'Sin descripción'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{alert.severity || 'N/A'}</div>
                    <div className="text-gray-300 text-sm">{alert.time || 'Tiempo desconocido'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sin datos disponibles */}
      {(!spaceWeather || 
        (!spaceWeather.sunspots && !spaceWeather.alerts && !spaceWeather.kp)) && (
        <div className="glass-card">
          <div className="p-6 text-center">
            <Cloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Datos Disponibles</h2>
            <p className="text-gray-300">
              No se pudieron obtener datos de clima espacial en este momento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 