"use client";

import { Activity, AlertTriangle, Cloud, Sun, Wind } from 'lucide-react';
import { getNOAASpaceWeather } from '../../services/spaceWeather';
import { useEffect, useState } from 'react';

export default function SpaceWeatherPage() {
  const [spaceWeather, setSpaceWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getNOAASpaceWeather();
      setSpaceWeather(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="ml-64 text-white">Cargando clima espacial...</div>;
  }

  if (!spaceWeather) {
    return <div className="ml-64 text-red-400">No se pudieron obtener datos de clima espacial.</div>;
  }

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Clima Espacial en Tiempo Real
        </h1>
        <p className="text-gray-300">
          Monitoreo de actividad solar, condiciones geomagnéticas y alertas espaciales que pueden afectar a la Tierra.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Datos proporcionados por NOAA SWPC (<a href='https://www.swpc.noaa.gov/' className='underline' target='_blank' rel='noopener noreferrer'>swpc.noaa.gov</a>)
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sun className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Manchas Solares</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Regiones activas</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {spaceWeather.sunspots.map((region: any) => (
                      <span key={region.regionnum} className="text-xs bg-gray-700 px-2 py-1 rounded">
                        {region.regionnum} ({region.latitude}&deg;)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Wind className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Índice Kp (Geomagnético)</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Últimos valores</p>
                  <div className="mt-2 flex space-x-2">
                    {spaceWeather.kp.slice(-10).map((kp: any, idx: number) => (
                      <span key={idx} className="text-xs text-gray-400">
                        {kp.time_tag.split('T')[1].slice(0,5)}: <span className="text-white">{kp.kp_index}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">Alertas Activas</h2>
            </div>
            <div className="space-y-4">
              {spaceWeather.alerts.length === 0 && <div className="text-gray-400">Sin alertas activas.</div>}
              {spaceWeather.alerts.map((alert: any, idx: number) => (
                <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-white">{alert.messageType}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400">
                          {alert.severity || 'Info'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">{alert.messageBody}</p>
                    </div>
                    <p className="text-xs text-gray-400">{alert.issueTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 