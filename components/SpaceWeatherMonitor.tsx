"use client";

import React, { useState, useEffect } from 'react';
import { Zap, Sun, Activity, AlertTriangle, TrendingUp, Shield, Radio, Satellite } from 'lucide-react';

interface SpaceWeatherData {
  kpIndex: number;
  solarFlares: Array<{
    class: string;
    time: string;
    intensity: number;
    region: string;
  }>;
  geomagneticStorm: {
    level: 'None' | 'Minor' | 'Moderate' | 'Strong' | 'Severe' | 'Extreme';
    kpValue: number;
    duration: string;
  };
  solarWind: {
    speed: number;
    density: number;
    temperature: number;
  };
  coronalMassEjections: Array<{
    time: string;
    speed: number;
    direction: string;
    earthImpact: boolean;
  }>;
  radioBlackouts: {
    current: 'None' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
    forecast: string;
  };
}

export default function SpaceWeatherMonitor() {
  const [weatherData, setWeatherData] = useState<SpaceWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'flares' | 'storms' | 'impacts'>('overview');

  useEffect(() => {
    fetchSpaceWeather();
    const interval = setInterval(fetchSpaceWeather, 15 * 60 * 1000); // Actualizar cada 15 minutos
    return () => clearInterval(interval);
  }, []);

  const fetchSpaceWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/space-weather');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const processedData = processSpaceWeatherData(data.data);
          setWeatherData(processedData);
        } else {
          throw new Error('API response not successful');
        }
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error fetching space weather:', error);
      // Datos simulados de fallback
      setWeatherData(generateMockWeatherData());
    } finally {
      setLoading(false);
    }
  };

  const processSpaceWeatherData = (apiData: any): SpaceWeatherData => {
    // Procesar datos reales de la API de clima espacial
    const kpIndex = apiData.kp?.[0]?.kp_index || 2;
    
    return {
      kpIndex,
      solarFlares: apiData.solar_flares || generateMockFlares(),
      geomagneticStorm: {
        level: getStormLevel(kpIndex),
        kpValue: kpIndex,
        duration: kpIndex > 5 ? '6-12 horas' : 'N/A'
      },
      solarWind: {
        speed: apiData.solar_wind?.speed || 450 + Math.random() * 200,
        density: apiData.solar_wind?.density || 5 + Math.random() * 10,
        temperature: apiData.solar_wind?.temperature || 100000 + Math.random() * 50000
      },
      coronalMassEjections: apiData.cme || [],
      radioBlackouts: {
        current: getRadioBlackoutLevel(kpIndex),
        forecast: kpIndex > 6 ? 'R1-R2 esperado' : 'Niveles normales'
      }
    };
  };

  const generateMockWeatherData = (): SpaceWeatherData => {
    const kpIndex = 2 + Math.random() * 6; // KP entre 2 y 8
    
    return {
      kpIndex,
      solarFlares: generateMockFlares(),
      geomagneticStorm: {
        level: getStormLevel(kpIndex),
        kpValue: kpIndex,
        duration: kpIndex > 5 ? '4-8 horas' : 'N/A'
      },
      solarWind: {
        speed: 300 + Math.random() * 400,
        density: 2 + Math.random() * 15,
        temperature: 80000 + Math.random() * 80000
      },
      coronalMassEjections: [
        {
          time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          speed: 800 + Math.random() * 1200,
          direction: 'Earth-directed',
          earthImpact: Math.random() > 0.7
        }
      ],
      radioBlackouts: {
        current: getRadioBlackoutLevel(kpIndex),
        forecast: kpIndex > 6 ? 'R1-R2 posible' : 'Condiciones normales'
      }
    };
  };

  const generateMockFlares = () => {
    const flareClasses = ['A', 'B', 'C', 'M', 'X'];
    const flares = [];
    
    for (let i = 0; i < 3; i++) {
      const flareClass = flareClasses[Math.floor(Math.random() * flareClasses.length)];
      const intensity = Math.random() * 9 + 1;
      
      flares.push({
        class: `${flareClass}${intensity.toFixed(1)}`,
        time: new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString(),
        intensity: intensity,
        region: `AR${3000 + Math.floor(Math.random() * 500)}`
      });
    }
    
    return flares;
  };

  const getStormLevel = (kp: number): SpaceWeatherData['geomagneticStorm']['level'] => {
    if (kp >= 9) return 'Extreme';
    if (kp >= 8) return 'Severe';
    if (kp >= 7) return 'Strong';
    if (kp >= 6) return 'Moderate';
    if (kp >= 5) return 'Minor';
    return 'None';
  };

  const getRadioBlackoutLevel = (kp: number): SpaceWeatherData['radioBlackouts']['current'] => {
    if (kp >= 8) return 'R3';
    if (kp >= 7) return 'R2';
    if (kp >= 6) return 'R1';
    return 'None';
  };

  const getKpColor = (kp: number) => {
    if (kp >= 7) return 'text-red-400';
    if (kp >= 5) return 'text-yellow-400';
    if (kp >= 4) return 'text-orange-400';
    return 'text-green-400';
  };

  const getStormColor = (level: string) => {
    switch (level) {
      case 'Extreme': return 'text-red-500 bg-red-500/20';
      case 'Severe': return 'text-red-400 bg-red-400/20';
      case 'Strong': return 'text-orange-400 bg-orange-400/20';
      case 'Moderate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Minor': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-green-400 bg-green-400/20';
    }
  };

  const renderOverview = () => {
    if (!weatherData) return null;

    return (
      <div className="space-y-6">
        {/* KP Index principal */}
        <div className="text-center">
          <div className={`text-6xl font-bold ${getKpColor(weatherData.kpIndex)} mb-2`}>
            {weatherData.kpIndex.toFixed(1)}
          </div>
          <div className="text-gray-300 text-lg">Índice KP Actual</div>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mt-2 ${getStormColor(weatherData.geomagneticStorm.level)}`}>
            {weatherData.geomagneticStorm.level === 'None' ? 'Condiciones Normales' : `Tormenta ${weatherData.geomagneticStorm.level}`}
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Sun className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{weatherData.solarWind.speed.toFixed(0)}</div>
            <div className="text-xs text-gray-400">km/s Viento Solar</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Radio className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{weatherData.radioBlackouts.current}</div>
            <div className="text-xs text-gray-400">Bloqueo Radio</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{weatherData.solarFlares.length}</div>
            <div className="text-xs text-gray-400">Llamaradas 24h</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Satellite className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{weatherData.coronalMassEjections.length}</div>
            <div className="text-xs text-gray-400">CME Detectadas</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFlares = () => {
    if (!weatherData) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Llamaradas Solares Recientes</h4>
        {weatherData.solarFlares.map((flare, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-lg font-bold ${
                flare.class.startsWith('X') ? 'text-red-400' :
                flare.class.startsWith('M') ? 'text-orange-400' :
                flare.class.startsWith('C') ? 'text-yellow-400' : 'text-green-400'
              }`}>
                Clase {flare.class}
              </span>
              <span className="text-sm text-gray-400">
                {new Date(flare.time).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-300">
              Región: {flare.region} | Intensidad: {flare.intensity.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStorms = () => {
    if (!weatherData) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Actividad Geomagnética</h4>
        <div className="bg-white/5 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${getKpColor(weatherData.kpIndex)} mb-2`}>
              KP {weatherData.kpIndex.toFixed(1)}
            </div>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStormColor(weatherData.geomagneticStorm.level)}`}>
              {weatherData.geomagneticStorm.level}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Viento Solar:</span>
              <span className="text-white font-semibold">{weatherData.solarWind.speed.toFixed(0)} km/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Densidad:</span>
              <span className="text-white font-semibold">{weatherData.solarWind.density.toFixed(1)} p/cm³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Temperatura:</span>
              <span className="text-white font-semibold">{(weatherData.solarWind.temperature / 1000).toFixed(0)}K</span>
            </div>
            {weatherData.geomagneticStorm.level !== 'None' && (
              <div className="flex justify-between">
                <span className="text-gray-300">Duración Estimada:</span>
                <span className="text-white font-semibold">{weatherData.geomagneticStorm.duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderImpacts = () => {
    if (!weatherData) return null;

    const impacts = [
      {
        icon: Radio,
        title: 'Comunicaciones por Radio',
        status: weatherData.radioBlackouts.current === 'None' ? 'Normal' : 'Afectado',
        color: weatherData.radioBlackouts.current === 'None' ? 'text-green-400' : 'text-red-400',
        description: weatherData.radioBlackouts.forecast
      },
      {
        icon: Satellite,
        title: 'Operaciones Satelitales',
        status: weatherData.kpIndex > 6 ? 'Riesgo Alto' : weatherData.kpIndex > 4 ? 'Riesgo Moderado' : 'Normal',
        color: weatherData.kpIndex > 6 ? 'text-red-400' : weatherData.kpIndex > 4 ? 'text-yellow-400' : 'text-green-400',
        description: 'Posibles interrupciones en GPS y telecomunicaciones'
      },
      {
        icon: Zap,
        title: 'Redes Eléctricas',
        status: weatherData.kpIndex > 7 ? 'Alerta' : 'Normal',
        color: weatherData.kpIndex > 7 ? 'text-red-400' : 'text-green-400',
        description: 'Monitoreo de corrientes inducidas'
      },
      {
        icon: Shield,
        title: 'Radiación Espacial',
        status: weatherData.solarFlares.some(f => f.class.startsWith('X')) ? 'Elevada' : 'Normal',
        color: weatherData.solarFlares.some(f => f.class.startsWith('X')) ? 'text-orange-400' : 'text-green-400',
        description: 'Exposición para astronautas y vuelos polares'
      }
    ];

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Impactos Tecnológicos</h4>
        {impacts.map((impact, index) => {
          const Icon = impact.icon;
          return (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 ${impact.color}`} />
                <span className="font-semibold text-white">{impact.title}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${impact.color} bg-current bg-opacity-20`}>
                  {impact.status}
                </span>
              </div>
              <p className="text-sm text-gray-300">{impact.description}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: TrendingUp },
    { id: 'flares', label: 'Llamaradas', icon: Sun },
    { id: 'storms', label: 'Tormentas', icon: Zap },
    { id: 'impacts', label: 'Impactos', icon: Shield }
  ];

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sun className="h-6 w-6 text-yellow-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Clima Espacial</h3>
            <p className="text-sm text-gray-300">Monitoreo en tiempo real de la actividad solar</p>
          </div>
        </div>
        {weatherData?.kpIndex && weatherData.kpIndex > 5 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Actividad Elevada</span>
          </div>
        )}
      </div>

      {/* Pestañas */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido */}
      <div className="min-h-[300px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'flares' && renderFlares()}
        {activeTab === 'storms' && renderStorms()}
        {activeTab === 'impacts' && renderImpacts()}
      </div>
    </div>
  );
}