"use client";
import { useState, useEffect } from "react";
import { Eye, Satellite, Star, RefreshCw, Clock, Zap } from "lucide-react";

interface HeavensData {
  visible_satellites: Array<{
    name: string;
    magnitude: number;
    elevation: number;
    azimuth: number;
    next_pass: string;
    duration: number;
  }>;
  iridium_flares: Array<{
    satellite: string;
    magnitude: number;
    time: string;
    elevation: number;
    azimuth: number;
  }>;
  meteor_showers: Array<{
    name: string;
    peak_date: string;
    hourly_rate: number;
    radiant: string;
    active: boolean;
  }>;
  planets: Array<{
    name: string;
    magnitude: number;
    elevation: number;
    azimuth: number;
    phase: number;
  }>;
}

export default function HeavensPage() {
  const [data, setData] = useState<HeavensData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/heavens');
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
          <p>Calculando posiciones astronómicas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Heavens Above</h1>
          <p className="text-lg text-gray-300">Datos astronómicos y satélites visibles desde tu ubicación</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        </div>

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Satellite className="h-6 w-6 text-blue-400" />
                Satélites Visibles
              </h2>
              <div className="space-y-4">
                {data.visible_satellites.map((satellite, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{satellite.name}</h3>
                      <span className="text-sm text-gray-400">
                        Mag: {satellite.magnitude.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Elevación:</span>
                        <p className="text-white">{satellite.elevation}°</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Azimut:</span>
                        <p className="text-white">{satellite.azimuth}°</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Duración:</span>
                        <p className="text-white">{satellite.duration} min</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Próximo paso:</span>
                        <p className="text-white">
                          {new Date(satellite.next_pass).toLocaleTimeString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-400" />
                Planetas Visibles
              </h2>
              <div className="space-y-4">
                {data.planets.map((planet, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{planet.name}</h3>
                      <span className="text-sm text-gray-400">
                        Mag: {planet.magnitude.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Elevación:</span>
                        <p className="text-white">{planet.elevation}°</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Azimut:</span>
                        <p className="text-white">{planet.azimuth}°</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Fase:</span>
                        <p className="text-white">{(planet.phase * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-8 flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" />
                Lluvias de Meteoros
              </h2>
              <div className="space-y-4">
                {data.meteor_showers.map((shower, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{shower.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        shower.active 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {shower.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Pico:</span>
                        <p className="text-white">{new Date(shower.peak_date).toLocaleDateString('es-ES')}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Tasa horaria:</span>
                        <p className="text-white">{shower.hourly_rate} meteoros/h</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Radiante:</span>
                        <p className="text-white">{shower.radiant}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 