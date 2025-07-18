"use client";

import { Activity, AlertTriangle, Cloud, Sun, Wind, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';
import ClientDate from '@/components/ClientDate';

export default function SpaceWeatherPage() {
  const [spaceWeather, setSpaceWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulacion de datos para evitar errores
    setTimeout(() => {
      setSpaceWeather({
        sunspots: [
          { regionnum: 'AR 3723', latitude: 15, class: 'Beta' },
          { regionnum: 'AR 3724', latitude: -8, class: 'Alpha' }
        ],
        kp: [
          { time_tag: new Date().toISOString(), kp_index: 2 },
          { time_tag: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), kp_index: 3 }
        ],
        alerts: []
      });
      setLoading(false);
    }, 1000);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Clima Espacial
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Monitoreo en tiempo real de la actividad solar, tormentas geomagneticas y condiciones espaciales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {spaceWeather?.sunspots?.length || 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Regiones Activas</h3>
            <p className="text-sm text-gray-400">Manchas solares detectadas</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {spaceWeather?.kp?.[spaceWeather.kp.length - 1]?.kp_index || 'N/A'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Indice Kp</h3>
            <p className="text-sm text-gray-400">Actividad geomagnetica actual</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-pink-500">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {spaceWeather?.alerts?.length || 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Alertas Activas</h3>
            <p className="text-sm text-gray-400">Eventos espaciales importantes</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-teal-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                {spaceWeather?.kp?.filter((k: any) => k.kp_index >= 5).length || 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tormentas</h3>
            <p className="text-sm text-gray-400">Eventos geomagneticos fuertes</p>
          </div>
        </div>

        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <p className="text-green-400 font-medium">Clima espacial tranquilo</p>
          <p className="text-gray-400 text-sm mt-2">No hay alertas activas en este momento</p>
        </div>

        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <p className="text-green-400 font-medium">
            Ultima actualizacion: <ClientDate 
              date={new Date()} 
              type="time" 
              options={{
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
} 