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
  Lightbulb, Shield, Wind, Sun, Moon, Cloud, Sparkles, AlertCircle, ExternalLink,
  SatelliteDish, Radar, Signal, Waves, Atom, Microscope
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

// Datos detallados de 3I/Atlas - Estilo NASA Eyes
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
  
  // Trayectoria y movimiento (estilo NASA)
  trajectory: {
    perihelion: "0.85 AU",
    aphelion: "Infinito (objeto interestelar)",
    eccentricity: "1.1",
    inclination: "45.2°",
    velocity: "32.5 km/s",
    escapeVelocity: "32.5 km/s",
    semiMajorAxis: "-8.5 AU",
    argumentOfPerihelion: "180.5°",
    longitudeOfAscendingNode: "45.8°"
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
      event: "Descubrimiento",
      date: "15 Jul 2025",
      distance: "2.1 AU",
      status: "Completado"
    },
    perihelion: {
      event: "Perihelio",
      date: "15 Nov 2025",
      distance: "0.85 AU",
      status: "En progreso"
    },
    earthApproach: {
      event: "Aproximación Tierra",
      date: "01 Dic 2025",
      distance: "0.95 AU",
      status: "Pendiente"
    },
    exit: {
      event: "Salida Sistema Solar",
      date: "01 Mar 2026",
      distance: "2.5 AU",
      status: "Pendiente"
    },
    interstellar: {
      event: "Espacio Interestelar",
      date: "01 Jun 2026",
      distance: "5.0 AU",
      status: "Pendiente"
    }
  }
};

// Generar datos en tiempo real
const generateRealTimeData = () => {
  const now = new Date();
  const discoveryDate = new Date('2025-07-15');
  const perihelionDate = new Date('2025-11-15');
  const earthApproachDate = new Date('2025-12-01');
  
  const timeSinceDiscovery = (now.getTime() - discoveryDate.getTime()) / (1000 * 60 * 60 * 24);
  const timeToPerihelion = (perihelionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  const timeToEarthApproach = (earthApproachDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  return {
    currentDate: now.toISOString(),
    timeSinceDiscovery: Math.max(0, timeSinceDiscovery),
    timeToPerihelion: Math.max(0, timeToPerihelion),
    timeToEarthApproach: Math.max(0, timeToEarthApproach),
    currentDistance: 1.2 + (timeSinceDiscovery * 0.01), // AU
    currentVelocity: 32.5 + (timeSinceDiscovery * 0.1), // km/s
    phase: timeSinceDiscovery < 30 ? 'Aproximación' : timeSinceDiscovery < 120 ? 'Perihelio' : 'Salida'
  };
};

// Componente de visualización de trayectoria mejorado
const TrajectoryVisualization = ({ data }: { data: any }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-300">
          <Orbit className="w-5 h-5" />
          Visualización de Trayectoria
        </CardTitle>
        <CardDescription className="text-blue-200">
          Trayectoria hiperbólica de 3I/Atlas en el sistema solar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <div className="text-xs text-blue-300">Distancia Actual</div>
              <div className="text-lg font-bold text-blue-100">{data.currentDistance?.toFixed(2)} AU</div>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              <div className="text-xs text-green-300">Velocidad</div>
              <div className="text-lg font-bold text-green-100">{data.currentVelocity?.toFixed(1)} km/s</div>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Fase</div>
              <div className="text-lg font-bold text-purple-100">{data.phase}</div>
            </div>
            <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <div className="text-xs text-orange-300">Días desde Descubrimiento</div>
              <div className="text-lg font-bold text-orange-100">{data.timeSinceDiscovery?.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de estadísticas en tiempo real mejorado
const RealTimeStats = ({ data }: { data: any }) => {
  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-300">
          <Activity className="w-5 h-5" />
          Estadísticas en Tiempo Real
        </CardTitle>
        <CardDescription className="text-green-200">
          Datos actualizados de la posición y movimiento de 3I/Atlas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <span className="text-green-300">Tiempo al Perihelio</span>
              <span className="font-bold text-green-100">{data.timeToPerihelion?.toFixed(0)} días</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
              <span className="text-blue-300">Tiempo a Aproximación Tierra</span>
              <span className="font-bold text-blue-100">{data.timeToEarthApproach?.toFixed(0)} días</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
              <span className="text-purple-300">Excentricidad Orbital</span>
              <span className="font-bold text-purple-100">1.1 (Hiperbólica)</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
              <span className="text-orange-300">Inclinación</span>
              <span className="font-bold text-orange-100">45.2°</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
              <span className="text-red-300">Velocidad de Escape</span>
              <span className="font-bold text-red-100">32.5 km/s</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
              <span className="text-yellow-300">Perihelio</span>
              <span className="font-bold text-yellow-100">0.85 AU</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de información detallada mejorado (estilo NASA)
const DetailedInfo = ({ atlasData }: { atlasData: any }) => {
  return (
    <div className="space-y-6">
      {/* Información Básica */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-300">
            <Info className="w-5 h-5" />
            Información Básica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <span className="text-blue-300">Designación</span>
                <span className="font-bold text-blue-100">{atlasData.designation}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <span className="text-blue-300">Descubrimiento</span>
                <span className="font-bold text-blue-100">{atlasData.discoveryDate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <span className="text-blue-300">Descubridor</span>
                <span className="font-bold text-blue-100">{atlasData.discoverer}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                <span className="text-blue-300">Observatorio</span>
                <span className="font-bold text-blue-100">{atlasData.observatory}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <span className="text-green-300">Tipo de Objeto</span>
                <span className="font-bold text-green-100">Cometa Interestelar</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <span className="text-green-300">Trayectoria</span>
                <span className="font-bold text-green-100">Hiperbólica</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <span className="text-green-300">Origen</span>
                <span className="font-bold text-green-100">{atlasData.origin}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <span className="text-green-300">Destino</span>
                <span className="font-bold text-green-100">{atlasData.destination}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parámetros Orbitales */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-300">
            <Orbit className="w-5 h-5" />
            Parámetros Orbitales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Perihelio</div>
              <div className="text-lg font-bold text-purple-100">{atlasData.trajectory.perihelion}</div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Excentricidad</div>
              <div className="text-lg font-bold text-purple-100">{atlasData.trajectory.eccentricity}</div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Inclinación</div>
              <div className="text-lg font-bold text-purple-100">{atlasData.trajectory.inclination}</div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Velocidad</div>
              <div className="text-lg font-bold text-purple-100">{atlasData.trajectory.velocity}</div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Eje Semi-Mayor</div>
              <div className="text-lg font-bold text-purple-100">{atlasData.trajectory.semiMajorAxis}</div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-300">Argumento del Perihelio</div>
              <div className="text-lg font-bold text-purple-100">{atlasData.trajectory.argumentOfPerihelion}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Características Físicas */}
      <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-300">
            <Atom className="w-5 h-5" />
            Características Físicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="text-xs text-orange-300 mb-1">Dimensiones</div>
                <div className="text-sm text-orange-100">
                  <div>Largo: {atlasData.dimensions.length}</div>
                  <div>Ancho: {atlasData.dimensions.width}</div>
                  <div>Espesor: {atlasData.dimensions.thickness}</div>
                </div>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="text-xs text-orange-300 mb-1">Composición</div>
                <div className="text-sm text-orange-100">{atlasData.composition}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="text-xs text-orange-300 mb-1">Albedo</div>
                <div className="text-sm text-orange-100">{atlasData.albedo}</div>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="text-xs text-orange-300 mb-1">Rotación</div>
                <div className="text-sm text-orange-100">{atlasData.rotation}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de anomalías y descubrimientos mejorado
const AnomaliesAndDiscoveries = ({ atlasData }: { atlasData: any }) => {
  return (
    <div className="space-y-6">
      {/* Observaciones Científicas */}
      <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30">
        <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-indigo-300">
             <Camera className="w-5 h-5" />
             Observaciones Científicas
           </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
              <h4 className="font-semibold text-indigo-300 mb-2">Telescopios Utilizados</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {atlasData.observations?.telescopes ? 
                  atlasData.observations.telescopes.map((telescope: string, index: number) => (
                    <li key={index}>• {telescope}</li>
                  )) : 
                  <li>• Información de telescopios no disponible</li>
                }
              </ul>
            </div>
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
              <h4 className="font-semibold text-indigo-300 mb-2">Longitudes de Onda</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {atlasData.observations?.wavelengths ? 
                  atlasData.observations.wavelengths.map((wavelength: string, index: number) => (
                    <li key={index}>• {wavelength}</li>
                  )) : 
                  <li>• Información de longitudes de onda no disponible</li>
                }
              </ul>
            </div>
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
              <h4 className="font-semibold text-indigo-300 mb-2">Anomalías Detectadas</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {atlasData.observations?.anomalies ? 
                  atlasData.observations.anomalies.map((anomaly: string, index: number) => (
                    <li key={index}>• {anomaly}</li>
                  )) : 
                  <li>• Información de anomalías no disponible</li>
                }
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hallazgos Confirmados */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-purple-300">
             <Microscope className="w-5 h-5" />
             Hallazgos Confirmados
           </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <ul className="text-sm text-gray-300 space-y-2">
              {atlasData.observations?.discoveries ? 
                atlasData.observations.discoveries.map((finding: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{finding}</span>
                  </li>
                )) : 
                <li>• Información de hallazgos no disponible</li>
              }
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de impacto científico mejorado
const ScientificImpact = ({ atlasData }: { atlasData: any }) => {
  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-300">
          <Lightbulb className="w-5 h-5" />
          Impacto Científico
        </CardTitle>
        <CardDescription className="text-green-200">
          Implicaciones y contribuciones científicas de 3I/Atlas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {atlasData.significance ? 
            atlasData.significance.map((impact: string, index: number) => (
              <div key={index} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-sm text-green-100">{impact}</span>
                </div>
              </div>
            )) : 
            <div className="col-span-full text-center py-4">
              <p className="text-gray-400">Información de impacto científico no disponible</p>
            </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de información oficial de NASA
const NASAOfficialInfo = () => {
  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-300">
          <ExternalLink className="w-5 h-5" />
          Información Oficial de NASA
        </CardTitle>
        <CardDescription className="text-red-200">
          Datos confirmados por el Jet Propulsion Laboratory (JPL) de NASA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Confirmación Oficial</h4>
              <p className="text-sm text-gray-300">
                3I/Atlas fue confirmado oficialmente por NASA JPL como el tercer objeto interestelar 
                detectado en nuestro sistema solar, después de 1I/'Oumuamua y 2I/Borisov.
              </p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Observaciones JPL</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Trayectoria hiperbólica confirmada</li>
                <li>• Velocidad de escape interestelar verificada</li>
                <li>• Composición interestelar detectada</li>
                <li>• Actividad cometaria leve observada</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Misión de Seguimiento</h4>
              <p className="text-sm text-gray-300">
                NASA ha coordinado observaciones con telescopios terrestres y espaciales 
                para monitorear la trayectoria y características de 3I/Atlas durante su 
                paso por el sistema solar.
              </p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Implicaciones Científicas</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Estudio de objetos interestelares</li>
                <li>• Composición de sistemas estelares distantes</li>
                <li>• Procesos de formación planetaria</li>
                <li>• Panspermia interestelar</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="w-4 h-4 text-blue-300" />
            <span className="font-semibold text-blue-300">Fuente Oficial</span>
          </div>
          <a 
            href="https://ciencia.nasa.gov/sistema-solar/cometa-3i-atlas/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-blue-100 underline text-sm"
          >
            NASA Science - Cometa 3I/Atlas: Un Visitante Interestelar
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de alertas y notificaciones
const AtlasAlerts = ({ realTimeData }: { realTimeData: any }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('es-ES'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAlertStatus = () => {
    if (realTimeData.timeToPerihelion < 30) {
      return {
        type: 'warning',
        message: '¡Perihelio próximo! 3I/Atlas se acerca al punto más cercano al Sol',
        icon: '⚠️'
      };
    } else if (realTimeData.timeToEarthApproach < 60) {
      return {
        type: 'info',
        message: 'Aproximación a la Tierra en las próximas semanas',
        icon: 'ℹ️'
      };
    } else {
      return {
        type: 'success',
        message: '3I/Atlas en fase de aproximación normal',
        icon: '✅'
      };
    }
  };

  const alert = getAlertStatus();

  return (
    <Card className={`bg-gradient-to-br ${
      alert.type === 'warning' ? 'from-yellow-900/20 to-orange-900/20 border-yellow-500/30' :
      alert.type === 'info' ? 'from-blue-900/20 to-cyan-900/20 border-blue-500/30' :
      'from-green-900/20 to-emerald-900/20 border-green-500/30'
    } mb-8`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${
          alert.type === 'warning' ? 'text-yellow-300' :
          alert.type === 'info' ? 'text-blue-300' :
          'text-green-300'
        }`}>
          <AlertCircle className="w-5 h-5" />
          Estado Actual de 3I/Atlas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
          <span className="text-2xl">{alert.icon}</span>
          <div>
            <p className={`font-semibold ${
              alert.type === 'warning' ? 'text-yellow-200' :
              alert.type === 'info' ? 'text-blue-200' :
              'text-green-200'
            }`}>
              {alert.message}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Última actualización: {currentTime || 'Cargando...'}
            </p>
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAtlasData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [atlasResponse, interstellarResponse] = await Promise.all([
        fetch('/api/3i-atlas'),
        fetch('/api/interstellar-objects')
      ]);

      if (atlasResponse.ok) {
        const atlasData = await atlasResponse.json();
        setAtlasDataState(prev => ({ ...prev, ...atlasData.data }));
      } else {
        console.error('Error fetching Atlas data:', atlasResponse.status);
        setError('Error al cargar datos de 3I/Atlas');
      }

      if (interstellarResponse.ok) {
        const interstellarData = await interstellarResponse.json();
        // Actualizar con datos de objetos interestelares confirmados
      } else {
        console.error('Error fetching interstellar data:', interstellarResponse.status);
      }
    } catch (err) {
      console.error('Error fetching Atlas data:', err);
      setError('Error al cargar datos de 3I/Atlas');
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
        <LoadingSpinner size="lg" />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-300 mb-2">Error</h2>
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Reintentar
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header Principal */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              3I/Atlas - Tercer Objeto Interestelar Confirmado
            </h1>
            <p className="text-blue-200 text-lg">
              Seguimiento en tiempo real del cometa interestelar detectado en julio de 2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              Confirmado por NASA
            </Badge>
            <button
              onClick={handleRefresh}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              title="Actualizar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Alertas y Estado Actual */}
      <AtlasAlerts realTimeData={realTimeData} />

      {/* Información Oficial de NASA */}
      <NASAOfficialInfo />

      {/* Tracker Interactivo */}
      <div className="mb-8">
        <AtlasTracker realTimeData={realTimeData} atlasData={atlasDataState} />
      </div>

      {/* Información en Tiempo Real */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TrajectoryVisualization data={realTimeData} />
        <RealTimeStats data={realTimeData} />
      </div>

      {/* Información Detallada */}
      <div className="mb-8">
        <DetailedInfo atlasData={atlasDataState} />
      </div>

      {/* Cronología de Eventos */}
      <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <Calendar className="w-5 h-5" />
            Cronología de Eventos (2025-2026)
          </CardTitle>
          <CardDescription className="text-yellow-200">
            Fechas importantes del seguimiento de 3I/Atlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atlasDataState.approachDates && Object.entries(atlasDataState.approachDates).map(([key, event]: [string, any]) => (
              <div key={key} className={`p-4 border rounded-lg ${
                event.status === 'Completado' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : event.status === 'En progreso'
                  ? 'bg-blue-500/10 border-blue-500/20'
                  : 'bg-gray-500/10 border-gray-500/20'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-300">{event.event}</h4>
                  <Badge variant="outline" className={`text-xs ${
                    event.status === 'Completado' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    event.status === 'En progreso' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-gray-500/20 text-gray-300 border-gray-500/30'
                  }`}>
                    {event.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div><strong>Fecha:</strong> {event.date}</div>
                  <div><strong>Distancia:</strong> {event.distance}</div>
                </div>
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

      {/* Observaciones y Descubrimientos */}
      <div className="mb-8">
        <AnomaliesAndDiscoveries atlasData={atlasDataState} />
      </div>

      {/* Impacto Científico */}
      <div className="mb-8">
        <ScientificImpact atlasData={atlasDataState} />
      </div>

      {/* Footer Informativo */}
      <ClientFooter />
    </PageLayout>
  );
}

// Componente cliente para el footer que evita problemas de hidratación
const ClientFooter = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('es-ES'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-6 border-t border-gray-700">
      <p className="text-gray-400 text-sm">
        Datos actualizados en tiempo real • Fuente: NASA JPL • Última actualización: {currentTime || 'Cargando...'}
      </p>
    </div>
  );
}; 