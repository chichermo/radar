"use client";
import { useState, useEffect } from "react";
import { Radio, Satellite, MapPin, RefreshCw, Clock, Signal } from "lucide-react";

interface SatNOGSData {
  satellites: Array<{
    id: string;
    name: string;
    status: string;
    frequency: string;
    mode: string;
    last_heard: string;
    passes_today: number;
    next_pass: string;
  }>;
  stations: Array<{
    id: string;
    name: string;
    location: string;
    coordinates: string;
    status: string;
  }>;
  total_passes: number;
  active_stations: number;
}

export default function SatNOGSPage() {
  const [data, setData] = useState<SatNOGSData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/satnogs');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Conectando con estaciones de radioaficionados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">SatNOGS - Radioaficionados</h1>
          <p className="text-lg text-gray-300">Red global de estaciones de radioaficionados para seguimiento de satélites</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <Satellite className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{data.satellites.length}</h3>
                <p className="text-gray-300">Satélites Monitoreados</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <Radio className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{data.active_stations}</h3>
                <p className="text-gray-300">Estaciones Activas</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <Signal className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{data.total_passes}</h3>
                <p className="text-gray-300">Pasos Totales Hoy</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Satellite className="h-6 w-6 text-blue-400" />
                  Satélites Activos
                </h2>
                <div className="space-y-4">
                  {data.satellites.map((satellite) => (
                    <div key={satellite.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{satellite.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          satellite.status === 'active' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {satellite.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-400">Frecuencia:</span>
                          <p className="text-white">{satellite.frequency}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Modo:</span>
                          <p className="text-white">{satellite.mode}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Pasos hoy:</span>
                          <p className="text-white">{satellite.passes_today}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Último contacto:</span>
                          <p className="text-white">
                            {new Date(satellite.last_heard).toLocaleTimeString('es-ES')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>Próximo paso: {new Date(satellite.next_pass).toLocaleTimeString('es-ES')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-green-400" />
                  Estaciones Terrestres
                </h2>
                <div className="space-y-4">
                  {data.stations.map((station) => (
                    <div key={station.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">{station.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          station.status === 'online' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {station.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Ubicación:</span>
                          <p className="text-white">{station.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Coordenadas:</span>
                          <p className="text-white">{station.coordinates}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 