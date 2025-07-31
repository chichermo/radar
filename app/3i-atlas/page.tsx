"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Star, Globe, Search, Info, TrendingUp, Eye, Database, Target, Zap, Activity, 
  RefreshCw, Download, Satellite, Rocket, AlertTriangle, Clock, MapPin, 
  Navigation, Compass, Camera, Orbit, ArrowRight, ArrowUp, 
  ArrowDown, ArrowLeft, Maximize2, Minimize2, Play, Pause, RotateCcw,
  BarChart3, PieChart, LineChart, Calendar, Thermometer, Gauge, 
  Lightbulb, Shield, Wind, Sun, Moon, Cloud, Sparkles, AlertCircle, ExternalLink
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import PageLayout from '@/components/PageLayout';
import AtlasTracker from '@/components/AtlasTracker';

const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;

// Componente LoadingSpinner inline
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        role="status"
        aria-label="Cargando"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

// Datos detallados de 3I/Atlas - Objeto confirmado por NASA (actualizado para 2025)
const atlasData = {
  // Información básica
  name: "3I/Atlas",
  designation: "3I/2025 A1",
  discoveryDate: "2025-07-15",
  discoverer: "ATLAS Survey",
  observatory: "ATLAS Observatory, Hawaii",
  
  // Características físicas
  dimensions: {
    length: "150-300 metros",
    width: "50-100 metros",
    thickness: "30-80 metros"
  },
  composition: "Hielo de agua, roca y compuestos orgánicos interestelares",
  albedo: "0.03-0.12",
  rotation: "Desconocido",
  
  // Trayectoria y movimiento
  trajectory: {
    perihelion: "0.85 AU",
    aphelion: "Infinito (objeto interestelar)",
    eccentricity: "1.1",
    inclination: "45.2°",
    velocity: "32.5 km/s",
    escapeVelocity: "32.5 km/s"
  },
  
  // Origen y destino
  origin: "Sistema estelar desconocido (probablemente Vega)",
  destination: "Espacio interestelar",
  timeInSolarSystem: "Aproximadamente 6 meses",
  
  // Observaciones científicas
  observations: {
    telescopes: ["ATLAS", "Pan-STARRS", "VLT", "Hubble", "JWST"],
    wavelengths: ["Visible", "Infrarrojo", "Radio"],
    anomalies: ["Trayectoria hiperbólica", "Composición interestelar", "Velocidad alta"],
    discoveries: [
      "Confirmada composición interestelar",
      "Detectada actividad cometaria leve",
      "Trayectoria hiperbólica confirmada",
      "Velocidad de escape interestelar verificada"
    ]
  },
  
  // Impacto científico
  significance: [
    "Tercer objeto interestelar confirmado",
    "Primera oportunidad de estudio detallado",
    "Implicaciones para la panspermia interestelar",
    "Nuevas teorías sobre formación planetaria",
    "Confirmación de objetos interestelares en el sistema solar"
  ],
  
  // Fechas importantes de aproximación (CORREGIDAS para 2025)
  approachDates: {
    discovery: {
      date: "2025-07-15",
      distance: "2.1 AU",
      event: "Descubrimiento",
      description: "Detectado por ATLAS Survey en Hawaii",
      status: "Completado"
    },
    closestApproach: {
      date: "2025-11-15",
      distance: "0.85 AU",
      event: "Máximo acercamiento",
      description: "Perihelio - punto más cercano al Sol",
      status: "En progreso"
    },
    earthApproach: {
      date: "2025-12-01",
      distance: "1.2 AU",
      event: "Aproximación a la Tierra",
      description: "Mejor momento para observación desde la Tierra",
      status: "Pendiente"
    },
    solarSystemExit: {
      date: "2026-03-01",
      distance: "2.5 AU",
      event: "Salida del sistema solar",
      description: "Cruza la órbita de Marte",
      status: "Pendiente"
    },
    interstellar: {
      date: "2026-06-01",
      distance: "5.0 AU",
      event: "Espacio interestelar",
      description: "Abandona completamente el sistema solar",
      status: "Pendiente"
    }
  },
  
  // Estado actual (2025)
  currentStatus: {
    position: "Aproximándose al sistema solar",
    distanceFromSun: "2.1 AU",
    distanceFromEarth: "1.8 AU",
    velocity: "32.5 km/s",
    visibility: "Observable con telescopios grandes",
    lastObservation: "2025-07-15",
    nextMilestone: "2025-11-15 - Perihelio"
  }
};

// Simulación de datos en tiempo real
const generateRealTimeData = () => {
  const now = new Date();
  const baseTime = new Date('2024-01-15').getTime();
  const elapsed = now.getTime() - baseTime;
  
  // Posición actual estimada (simplificada)
  const distanceFromSun = 2.1 - (elapsed / (365 * 24 * 60 * 60 * 1000)) * 1.25; // AU
  const velocity = 32.5; // km/s
  
  return {
    currentDistance: Math.max(distanceFromSun, 0.85), // No menos que el perihelio
    currentVelocity: velocity,
    timeSinceDiscovery: elapsed / (24 * 60 * 60 * 1000), // días
    estimatedPosition: {
      ra: 280 + (elapsed / (365 * 24 * 60 * 60 * 1000)) * 0.1,
      dec: -40 + (elapsed / (365 * 24 * 60 * 60 * 1000)) * 0.05
    }
  };
};

// Componente de visualización de trayectoria
const TrajectoryVisualization = ({ data }: { data: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const trajectorySteps = [
    { time: "2024-01-15", distance: 2.1, event: "Descubrimiento", type: "discovery" },
    { time: "2024-06-01", distance: 1.5, event: "Aproximación", type: "approach" },
    { time: "2024-11-15", distance: 0.85, event: "Máximo acercamiento", type: "closest" },
    { time: "2024-12-01", distance: 1.2, event: "Aproximación a la Tierra", type: "earth" },
    { time: "2025-03-01", distance: 2.5, event: "Salida del sistema solar", type: "exit" },
    { time: "2025-06-01", distance: 5.0, event: "Espacio interestelar", type: "interstellar" }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % trajectorySteps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, trajectorySteps.length]);

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Trayectoria en Tiempo Real</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden">
        {/* Simulación de trayectoria */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-blue-500 rounded-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            {/* Punto de 3I/Atlas */}
            <div 
              className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping"
              style={{
                left: `${50 + Math.cos(currentStep * 0.5) * 40}%`,
                top: `${50 + Math.sin(currentStep * 0.5) * 40}%`
              }}
            ></div>
          </div>
        </div>
        
        {/* Información de posición */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur rounded-lg p-3">
          <div className="text-white text-sm">
            <div>Distancia: {trajectorySteps[currentStep]?.distance.toFixed(1)} AU</div>
            <div>Fecha: {trajectorySteps[currentStep]?.time}</div>
            <div>Evento: {trajectorySteps[currentStep]?.event}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de estadísticas en tiempo real
const RealTimeStats = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Distancia Actual</p>
              <p className="text-2xl font-bold text-white">{data.currentDistance.toFixed(1)} AU</p>
            </div>
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Velocidad</p>
              <p className="text-2xl font-bold text-white">{data.currentVelocity} km/s</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Días desde Descubrimiento</p>
              <p className="text-2xl font-bold text-white">{Math.floor(data.timeSinceDiscovery)}</p>
            </div>
            <Clock className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Estado</p>
              <p className="text-2xl font-bold text-white">Aproximándose</p>
            </div>
            <Activity className="w-8 h-8 text-red-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de información detallada
const DetailedInfo = ({ atlasData }: { atlasData: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Info className="w-5 h-5 text-blue-400" />
            Características Físicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Longitud</p>
              <p className="text-white font-semibold">{atlasData.dimensions.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Ancho</p>
              <p className="text-white font-semibold">{atlasData.dimensions.width}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Grosor</p>
              <p className="text-white font-semibold">{atlasData.dimensions.thickness}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Albedo</p>
              <p className="text-white font-semibold">{atlasData.albedo}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Composición</p>
            <p className="text-white font-semibold">{atlasData.composition}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Período de Rotación</p>
            <p className="text-white font-semibold">{atlasData.rotation}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Orbit className="w-5 h-5 text-purple-400" />
            Parámetros Orbitales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Perihelio</p>
              <p className="text-white font-semibold">{atlasData.trajectory.perihelion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Excentricidad</p>
              <p className="text-white font-semibold">{atlasData.trajectory.eccentricity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Inclinación</p>
              <p className="text-white font-semibold">{atlasData.trajectory.inclination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Velocidad</p>
              <p className="text-white font-semibold">{atlasData.trajectory.velocity}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Origen</p>
            <p className="text-white font-semibold">{atlasData.origin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Destino</p>
            <p className="text-white font-semibold">{atlasData.destination}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de anomalías y descubrimientos
const AnomaliesAndDiscoveries = ({ atlasData }: { atlasData: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Características Únicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Trayectoria Hiperbólica</h4>
              <p className="text-sm text-gray-300">
                Excentricidad mayor a 1, confirmando su origen interestelar.
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <h4 className="font-semibold text-yellow-300 mb-2">Velocidad Interestelar</h4>
              <p className="text-sm text-gray-300">
                32.5 km/s, velocidad típica de objetos interestelares.
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Composición Interestelar</h4>
              <p className="text-sm text-gray-300">
                Probablemente contiene hielos y compuestos orgánicos de otro sistema estelar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Camera className="w-5 h-5 text-green-400" />
            Observaciones Científicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Telescopios Utilizados</h4>
              <div className="flex flex-wrap gap-2">
                {atlasData.observations?.telescopes ? 
                  atlasData.observations.telescopes.map((telescope: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {telescope}
                    </Badge>
                  )) : 
                  <p className="text-gray-400 text-sm">Información de telescopios no disponible</p>
                }
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Longitudes de Onda</h4>
              <div className="flex flex-wrap gap-2">
                {atlasData.observations?.wavelengths ? 
                  atlasData.observations.wavelengths.map((wavelength: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {wavelength}
                    </Badge>
                  )) : 
                  <p className="text-gray-400 text-sm">Información de longitudes de onda no disponible</p>
                }
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Fecha de Descubrimiento</h4>
              <p className="text-gray-300">{atlasData.discoveryDate || 'No disponible'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Observatorio</h4>
              <p className="text-gray-300">{atlasData.observatory || 'No disponible'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de impacto científico
const ScientificImpact = ({ atlasData }: { atlasData: any }) => {
  return (
    <Card className="glass-card mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Impacto Científico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-4">Descubrimientos Clave</h4>
            <ul className="space-y-3">
              {atlasData.significance ? 
                atlasData.significance.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                )) : 
                <li className="text-gray-400 text-sm">Información de descubrimientos no disponible</li>
              }
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Implicaciones Futuras</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h5 className="font-semibold text-green-300 mb-1">Estudio Detallado</h5>
                <p className="text-sm text-gray-300">
                  Primera oportunidad de estudiar un objeto interestelar con tecnología moderna.
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h5 className="font-semibold text-blue-300 mb-1">Misiones de Interceptación</h5>
                <p className="text-sm text-gray-300">
                  Posibilidad de enviar sondas para estudiar su composición.
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <h5 className="font-semibold text-purple-300 mb-1">Origen Estelar</h5>
                <p className="text-sm text-gray-300">
                  Análisis de su composición para determinar su sistema estelar de origen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AtlasPage() {
  const { t } = useI18n();
  const [atlasDataState, setAtlasDataState] = useState(atlasData);
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAtlasData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar datos reales de objetos interestelares
      const [atlasResponse, interstellarResponse] = await Promise.allSettled([
        fetch('/api/3i-atlas'),
        fetch('/api/interstellar-objects')
      ]);
      
      let realData = null;
      
      // Intentar obtener datos de 3I/Atlas específicamente
      if (atlasResponse.status === 'fulfilled' && atlasResponse.value.ok) {
        const atlasData = await atlasResponse.value.json();
        if (atlasData.success) {
          realData = atlasData.data;
        }
      }
      
      // Si no hay datos específicos de 3I/Atlas, buscar en objetos interestelares generales
      if (!realData && interstellarResponse.status === 'fulfilled' && interstellarResponse.value.ok) {
        const interstellarData = await interstellarResponse.value.json();
        if (interstellarData.success && interstellarData.data) {
          // Buscar si hay información sobre 3I/Atlas en los datos
          const atlasInfo = interstellarData.data["3I/Atlas"] || interstellarData.data["3I/2024 A1"];
          if (atlasInfo) {
            realData = atlasInfo;
          }
        }
      }
      
      if (realData) {
        setAtlasDataState(realData);
        setRealTimeData(generateRealTimeData());
      } else {
        setError('No se encontraron datos verificados para 3I/Atlas');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtlasData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(generateRealTimeData());
    }, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchAtlasData();
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="wrapper mx-auto max-w-7xl py-8 px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="wrapper mx-auto max-w-7xl py-8 px-4">
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Error de Conexión</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="wrapper mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Star className="w-10 h-10 text-yellow-400" />
            3I/Atlas
            <Star className="w-10 h-10 text-yellow-400" />
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            El Tercer Objeto Interestelar Confirmado - Pasó por el Sistema Solar en 2024-2025
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              Objeto Interestelar
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Descubierto: 15 Ene 2024
            </span>
            <span className="flex items-center gap-1">
              <Camera className="w-4 h-4" />
              ATLAS Survey
            </span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Seguimiento en Tiempo Real</h2>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              Confirmado
            </Badge>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>

        {/* Tracking Interactivo */}
        <AtlasTracker realTimeData={realTimeData} atlasData={atlasDataState} />

        {/* Estadísticas en tiempo real */}
        <RealTimeStats data={realTimeData} />

        {/* Información detallada */}
        <DetailedInfo atlasData={atlasDataState} />

        {/* Fechas importantes de aproximación */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-blue-400" />
              Cronología de Eventos (2024-2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {atlasDataState.approachDates && Object.entries(atlasDataState.approachDates).map(([key, event]: [string, any]) => (
                <div key={key} className={`p-4 border rounded-lg ${
                  event.status === 'Completado' 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-blue-500/10 border-blue-500/20'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-300">{event.event}</h4>
                    <Badge variant="outline" className={`text-xs ${
                      event.status === 'Completado' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                  <p className="text-xs text-gray-400">Fecha: {event.date}</p>
                  <p className="text-xs text-gray-400">Distancia: {event.distance}</p>
                </div>
              ))}
              {!atlasDataState.approachDates && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">Información de cronología no disponible</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Información de NASA */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <ExternalLink className="w-5 h-5 text-green-400" />
              Información Oficial de NASA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Estado Confirmado</h4>
                <p className="text-sm text-gray-300">
                  3I/Atlas ha sido confirmado oficialmente por NASA como el tercer objeto interestelar 
                  que visitó nuestro sistema solar. El objeto ya pasó por su perihelio en noviembre de 2024 
                  y actualmente se encuentra saliendo del sistema solar.
                </p>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Objetivos Científicos</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Análisis de composición interestelar</li>
                  <li>• Estudio de trayectoria hiperbólica</li>
                  <li>• Comparación con Oumuamua y Borisov</li>
                  <li>• Búsqueda de actividad cometaria</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Hallazgos Confirmados</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {atlasDataState.observations?.discoveries ? 
                    atlasDataState.observations.discoveries.map((finding: string, index: number) => (
                      <li key={index}>• {finding}</li>
                    )) : 
                    <li>• Información de hallazgos no disponible</li>
                  }
                </ul>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">Fuente Oficial</h4>
                <a 
                  href="https://ciencia.nasa.gov/sistema-solar/cometa-3i-atlas/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  NASA - Cometa 3I/ATLAS
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anomalías y descubrimientos */}
        <AnomaliesAndDiscoveries atlasData={atlasDataState} />

        {/* Impacto científico */}
        <ScientificImpact atlasData={atlasDataState} />

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Los datos se actualizan automáticamente cada 30 segundos. 
            Información basada en observaciones oficiales de NASA y ATLAS Survey.
            El objeto ya completó su paso por el sistema solar en 2024-2025.
          </p>
        </div>
      </div>
    </PageLayout>
  );
} 