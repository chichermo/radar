"use client";
import { useState, useEffect } from "react";
import { Eye, Satellite, Star, RefreshCw, Clock, Zap, Moon, Globe, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n';
import ClientDate from '@/components/ClientDate';

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

const events = [
  { type: 'Fase Lunar', name: 'Luna Llena', date: '2024-06-22', description: 'La Luna estará completamente iluminada.' },
  { type: 'Planeta Visible', name: 'Júpiter', date: '2024-06-15', description: 'Visible toda la noche en el este.' },
  { type: 'Lluvia de Meteoros', name: 'Perseidas', date: '2024-08-12', description: 'Máximo de la lluvia de meteoros Perseidas.' },
  { type: 'Conjunción', name: 'Venus y Marte', date: '2024-07-10', description: 'Ambos planetas muy cerca en el cielo al amanecer.' },
  { type: 'Eclipse', name: 'Eclipse Parcial de Luna', date: '2024-09-18', description: 'Visible en Sudamérica y Europa.' }
];

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
        <div className="header text-center mb-8">
          <h1 className="title gradient-text">Cielo Actual</h1>
          <p className="subtitle max-w-2xl mx-auto">Descubre qué objetos y eventos astronómicos son visibles hoy desde tu ubicación.</p>
        </div>
        <div className="glass-card p-6 mb-8 flex flex-col items-center">
          <Moon className="w-10 h-10 text-blue-400 mb-2" />
          <h2 className="text-lg font-semibold text-white mb-2">Fase Lunar</h2>
          <div className="text-gray-300 text-sm mb-2">Luna Llena</div>
          <div className="text-gray-400 text-xs">Próxima: 22 de junio de 2024</div>
        </div>
        <div className="glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center"><Eye className="w-5 h-5 mr-2" />Eventos Astronómicos</h2>
          <ul className="space-y-3">
            {events.map((e, i) => (
              <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{e.type}: {e.name}</span>
                <span className="text-gray-300 text-sm">{e.description} ({e.date})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-10 text-center">
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
                          <ClientDate 
                            date={satellite.next_pass} 
                            type="time" 
                            options={{
                              hour: '2-digit',
                              minute: '2-digit'
                            }}
                          />
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
                        <p className="text-white">
                          <ClientDate 
                            date={shower.peak_date} 
                            type="date" 
                            options={{
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }}
                          />
                        </p>
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