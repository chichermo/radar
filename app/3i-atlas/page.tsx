"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Star, Globe, Search, Info, TrendingUp, Eye, Database, Target, Zap, Activity, 
  RefreshCw, Download, Satellite, Rocket, AlertTriangle, Clock, MapPin, 
  Navigation, Compass, Telescope, Planet, Orbit, ArrowRight, ArrowUp, 
  ArrowDown, ArrowLeft, Maximize2, Minimize2, Play, Pause, RotateCcw,
  BarChart3, PieChart, LineChart, Calendar, Thermometer, Gauge, 
  Lightbulb, Shield, Wind, Sun, Moon, Cloud, Sparkles
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import PageLayout from '@/components/PageLayout';

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

// Datos detallados de 3I/Atlas (Oumuamua) - Fallback
const atlasData = {
  // Información básica
  name: "3I/Atlas (Oumuamua)",
  designation: "1I/2017 U1",
  discoveryDate: "2017-10-19",
  discoverer: "Pan-STARRS 1",
  observatory: "Haleakalā Observatory, Hawaii",
  
  // Características físicas
  dimensions: {
    length: "400-800 metros",
    width: "35-167 metros",
    thickness: "35-167 metros"
  },
  composition: "Hielo de agua con recubrimiento orgánico",
  albedo: "0.1-0.2",
  rotation: "7.3 horas",
  
  // Trayectoria y movimiento
  trajectory: {
    perihelion: "0.255 AU",
    aphelion: "Infinito (objeto interestelar)",
    eccentricity: "1.2",
    inclination: "122.7°",
    velocity: "26.33 km/s",
    escapeVelocity: "26.33 km/s"
  },
  
  // Origen y destino
  origin: "Sistema estelar desconocido",
  destination: "Espacio interestelar",
  timeInSolarSystem: "Aproximadamente 1 año",
  
  // Observaciones científicas
  observations: {
    telescopes: ["Pan-STARRS", "VLT", "Hubble", "Spitzer", "ALMA"],
    wavelengths: ["Visible", "Infrarrojo", "Radio"],
    anomalies: ["Aceleración no gravitacional", "Forma elongada", "Rotación compleja"]
  },
  
  // Impacto científico
  significance: [
    "Primer objeto interestelar confirmado",
    "Evidencia de objetos interestelares en el sistema solar",
    "Implicaciones para la panspermia",
    "Nuevas teorías sobre formación planetaria"
  ]
};

// Simulación de datos en tiempo real
const generateRealTimeData = () => {
  const now = new Date();
  const baseTime = new Date('2017-10-19').getTime();
  const elapsed = now.getTime() - baseTime;
  
  // Posición actual estimada (simplificada)
  const distanceFromSun = 20 + (elapsed / (365 * 24 * 60 * 60 * 1000)) * 5; // AU
  const velocity = 26.33; // km/s
  
  return {
    currentDistance: distanceFromSun,
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
    { time: "2017-10-19", distance: 0.25, event: "Descubrimiento", type: "discovery" },
    { time: "2017-11-01", distance: 0.3, event: "Máximo acercamiento", type: "closest" },
    { time: "2017-12-01", distance: 0.5, event: "Aproximación a la Tierra", type: "earth" },
    { time: "2018-01-01", distance: 1.0, event: "Salida del sistema solar", type: "exit" },
    { time: "2020-01-01", distance: 5.0, event: "Espacio interestelar", type: "interstellar" },
    { time: "2024-01-01", distance: 20.0, event: "Posición actual", type: "current" }
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
              <p className="text-2xl font-bold text-white">Activo</p>
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
            Anomalías Detectadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Aceleración No Gravitacional</h4>
              <p className="text-sm text-gray-300">
                El objeto mostró una aceleración que no puede explicarse únicamente por la gravedad solar.
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <h4 className="font-semibold text-yellow-300 mb-2">Forma Extremadamente Elongada</h4>
              <p className="text-sm text-gray-300">
                Relación longitud/ancho de 10:1, forma nunca vista en objetos del sistema solar.
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Rotación Compleja</h4>
              <p className="text-sm text-gray-300">
                Patrón de rotación que sugiere un objeto con forma irregular o múltiples componentes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Telescope className="w-5 h-5 text-green-400" />
            Observaciones Científicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Telescopios Utilizados</h4>
              <div className="flex flex-wrap gap-2">
                {atlasData.observations.telescopes.map((telescope, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {telescope}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Longitudes de Onda</h4>
              <div className="flex flex-wrap gap-2">
                {atlasData.observations.wavelengths.map((wavelength, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {wavelength}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Fecha de Descubrimiento</h4>
              <p className="text-gray-300">{atlasData.discoveryDate}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Observatorio</h4>
              <p className="text-gray-300">{atlasData.observatory}</p>
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
              {atlasData.significance.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Implicaciones Futuras</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h5 className="font-semibold text-green-300 mb-1">Búsqueda de Objetos Interestelares</h5>
                <p className="text-sm text-gray-300">
                  Desarrollo de nuevos programas de observación para detectar objetos similares.
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h5 className="font-semibold text-blue-300 mb-1">Misiones de Interceptación</h5>
                <p className="text-sm text-gray-300">
                  Planificación de misiones espaciales para estudiar objetos interestelares.
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <h5 className="font-semibold text-purple-300 mb-1">Teorías de Formación</h5>
                <p className="text-sm text-gray-300">
                  Nuevas teorías sobre la formación y evolución de sistemas planetarios.
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
      
      const response = await fetch('/api/3i-atlas');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAtlasDataState(data.data);
          setRealTimeData(data.data.realTime);
        } else {
          setError(data.error || 'Error al cargar datos');
        }
      } else {
        setError('Error al conectar con el servidor');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtlasData();
    
    // Actualizar datos en tiempo real cada 30 segundos
    const interval = setInterval(() => {
      setRealTimeData(generateRealTimeData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchAtlasData();
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="wrapper mx-auto max-w-7xl py-8 px-4">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 mt-4">Cargando datos de 3I/Atlas...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="wrapper mx-auto max-w-7xl py-8 px-4">
          <div className="text-center">
            <div className="glass-card p-8 rounded-xl">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Error al Cargar Datos</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={handleRefresh}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2 inline" />
                Reintentar
              </button>
            </div>
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
            3I/Atlas (Oumuamua)
            <Star className="w-10 h-10 text-yellow-400" />
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            El Primer Objeto Interestelar Confirmado en el Sistema Solar
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              Objeto Interestelar
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Descubierto: 19 Oct 2017
            </span>
            <span className="flex items-center gap-1">
              <Telescope className="w-4 h-4" />
              Pan-STARRS 1
            </span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Seguimiento en Tiempo Real</h2>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              Activo
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

        {/* Estadísticas en tiempo real */}
        <RealTimeStats data={realTimeData} />

        {/* Información detallada */}
        <DetailedInfo atlasData={atlasDataState} />

        {/* Anomalías y observaciones */}
        <AnomaliesAndDiscoveries atlasData={atlasDataState} />

        {/* Impacto científico */}
        <ScientificImpact atlasData={atlasDataState} />

        {/* Visualización de trayectoria */}
        <TrajectoryVisualization data={realTimeData} />

        {/* Fechas importantes de aproximación */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-green-400" />
              Fechas Importantes de Aproximación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Descubrimiento</h4>
                <p className="text-white font-bold">19 Oct 2017</p>
                <p className="text-sm text-gray-300">Distancia: 0.25 AU</p>
                <p className="text-sm text-gray-300">Observatorio: Pan-STARRS 1</p>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">Máximo Acercamiento</h4>
                <p className="text-white font-bold">01 Nov 2017</p>
                <p className="text-sm text-gray-300">Distancia: 0.3 AU</p>
                <p className="text-sm text-gray-300">Perihelio alcanzado</p>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Aproximación a la Tierra</h4>
                <p className="text-white font-bold">01 Dec 2017</p>
                <p className="text-sm text-gray-300">Distancia: 0.5 AU</p>
                <p className="text-sm text-gray-300">Última observación cercana</p>
              </div>
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Salida del Sistema Solar</h4>
                <p className="text-white font-bold">01 Jan 2018</p>
                <p className="text-sm text-gray-300">Distancia: 1.0 AU</p>
                <p className="text-sm text-gray-300">Cruza la órbita de Júpiter</p>
              </div>
              <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Espacio Interestelar</h4>
                <p className="text-white font-bold">01 Jan 2020</p>
                <p className="text-sm text-gray-300">Distancia: 5.0 AU</p>
                <p className="text-sm text-gray-300">Abandona el sistema solar</p>
              </div>
              <div className="p-4 bg-gray-500/20 border border-gray-500/30 rounded-lg">
                <h4 className="font-semibold text-gray-300 mb-2">Posición Actual</h4>
                <p className="text-white font-bold">2024</p>
                <p className="text-sm text-gray-300">Distancia: ~20 AU</p>
                <p className="text-sm text-gray-300">En espacio interestelar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="w-5 h-5 text-blue-400" />
                Datos Técnicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                                 <div>
                   <p className="text-sm text-gray-400">Designación</p>
                   <p className="text-white font-semibold">{atlasDataState.designation}</p>
                 </div>
                 <div>
                   <p className="text-sm text-gray-400">Descubridor</p>
                   <p className="text-white font-semibold">{atlasDataState.discoverer}</p>
                 </div>
                 <div>
                   <p className="text-sm text-gray-400">Tiempo en Sistema Solar</p>
                   <p className="text-white font-semibold">{atlasDataState.timeInSolarSystem}</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                                 <div>
                   <p className="text-sm text-gray-400">Velocidad de Escape</p>
                   <p className="text-white font-semibold">{atlasDataState.trajectory.escapeVelocity}</p>
                 </div>
                 <div>
                   <p className="text-sm text-gray-400">Distancia Mínima</p>
                   <p className="text-white font-semibold">{atlasDataState.trajectory.perihelion}</p>
                 </div>
                <div>
                  <p className="text-sm text-gray-400">Estado Actual</p>
                  <p className="text-white font-semibold">En Espacio Interestelar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="w-5 h-5 text-purple-400" />
                Visibilidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Magnitud Actual</p>
                  <p className="text-white font-semibold">+28.0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Observable</p>
                  <p className="text-white font-semibold">No (muy débil)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Última Observación</p>
                  <p className="text-white font-semibold">2018-01-02</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer informativo */}
        <div className="mt-8 text-center text-gray-400">
          <p className="text-sm">
            Los datos se actualizan automáticamente cada 30 segundos. 
            La información de posición es estimada basada en cálculos orbitales.
          </p>
        </div>
      </div>
    </PageLayout>
  );
} 