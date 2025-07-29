"use client";
import { useState, useEffect } from 'react';
import { MapPin, Clock, Navigation, Globe, Zap, Eye } from 'lucide-react';
import ClientDate from '@/components/ClientDate';

interface ISSPosition {
  latitude: string;
  longitude: string;
}

interface ISSLocationData {
  message: string;
  timestamp: number;
  iss_position: ISSPosition;
  velocity: string;
  altitude: string;
  visibility: string;
  footprint: string;
  daynum: number;
  solar_lat: string;
  solar_lon: string;
  units: string;
  next_pass?: any;
  statistics?: {
    orbital_period: string;
    inclination: string;
    apogee: string;
    perigee: string;
  };
  note?: string;
}

export default function ISSLocationPage() {
  const [data, setData] = useState<ISSLocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchISSLocation();
    const interval = setInterval(fetchISSLocation, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const fetchISSLocation = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/iss-location');
      if (!response.ok) {
        throw new Error('Error obteniendo datos');
      }
      const result = await response.json();
      setData(result);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getVisibilityColor = (visibility: string) => {
    return visibility === 'day' ? 'text-yellow-400' : 'text-blue-400';
  };

  const getVisibilityIcon = (visibility: string) => {
    return visibility === 'day' ? <Eye className="h-4 w-4" /> : <Globe className="h-4 w-4" />;
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Cargando ubicación de la ISS...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-red-400 text-xl">Error: {error}</p>
            <button 
              onClick={fetchISSLocation}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Ubicación de la ISS</h1>
          <p className="text-lg text-gray-300">
            Estación Espacial Internacional en tiempo real
          </p>
          {data.note && (
            <p className="text-sm text-yellow-400 mt-2">{data.note}</p>
          )}
        </div>

        {/* Información principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Latitud</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{parseFloat(data.iss_position.latitude).toFixed(4)}°</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="h-8 w-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Longitud</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{parseFloat(data.iss_position.longitude).toFixed(4)}°</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Velocidad</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{parseInt(data.velocity).toLocaleString('es-ES')} km/h</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              {getVisibilityIcon(data.visibility)}
              <h3 className="text-xl font-bold text-white">Visibilidad</h3>
            </div>
            <p className={`text-3xl font-bold ${getVisibilityColor(data.visibility)}`}>
              {data.visibility === 'day' ? 'Día' : 'Noche'}
            </p>
          </div>
        </div>

        {/* Estadísticas orbitales */}
        {data.statistics && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="h-6 w-6 text-blue-400" />
              Estadísticas Orbitales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{data.statistics.orbital_period}</p>
                <p className="text-gray-300 text-sm">Período Orbital</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{data.statistics.inclination}</p>
                <p className="text-gray-300 text-sm">Inclinación</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{data.statistics.apogee}</p>
                <p className="text-gray-300 text-sm">Apogeo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{data.statistics.perigee}</p>
                <p className="text-gray-300 text-sm">Perigeo</p>
              </div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-400" />
              Información Temporal
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Última actualización:</span>
                <span className="text-white">
                  <ClientDate 
                    date={data.timestamp * 1000} 
                    type="datetime" 
                    options={{
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Altitud:</span>
                <span className="text-white">{data.altitude} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Huella:</span>
                <span className="text-white">{data.footprint} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Día juliano:</span>
                <span className="text-white">{data.daynum.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="h-5 w-5 text-green-400" />
              Estado del Sistema
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Estado:</span>
                <span className="text-green-400">Operativo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Actualización:</span>
                <span className="text-white">
                  <ClientDate 
                    date={new Date()} 
                    type="time" 
                    options={{
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Latitud solar:</span>
                <span className="text-white">{data.solar_lat}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Longitud solar:</span>
                <span className="text-white">{data.solar_lon}°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de actualización manual */}
        <div className="text-center mt-8">
          <button 
            onClick={fetchISSLocation}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Actualizando...' : 'Actualizar Ubicación'}
          </button>
        </div>
      </div>
    </div>
  );
} 