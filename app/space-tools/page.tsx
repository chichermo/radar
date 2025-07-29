"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { 
  Calculator, 
  Satellite, 
  AlertTriangle, 
  Radio, 
  Activity,
  Settings,
  Target,
  RefreshCw,
  Download,
  BarChart3,
  TrendingUp,
  Zap,
  Globe,
  MapPin,
  Clock
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function SpaceToolsPage() {
  const [toolsData, setToolsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchToolsData();
  }, []);

  const fetchToolsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de herramientas espaciales
      const [orbitalResponse, weatherResponse, collisionResponse, signalResponse] = await Promise.allSettled([
        fetch('/api/orbital-calculator'),
        fetch('/api/space-weather'),
        fetch('/api/collision-detector'),
        fetch('/api/signal-analyzer')
      ]);

      const realData: any = {
        orbitalCalculator: {
          currentObject: null,
          calculations: {
            escapeVelocity: 0,
            orbitalPeriod: 0,
            apogee: 0,
            perigee: 0,
            energy: 0
          }
        },
        spaceWeather: {
          solarActivity: {
            sunspots: 0,
            solarFlare: 'N/A',
            geomagneticStorm: 'N/A',
            cosmicRays: 'N/A'
          },
          predictions: {
            nextFlare: 'N/A',
            stormProbability: 0,
            auroraActivity: 'N/A'
          }
        },
        collisionDetector: {
          activeAlerts: 0,
          highRisk: 0,
          mediumRisk: 0,
          lowRisk: 0,
          recentEvents: []
        },
        signalAnalyzer: {
          activeSignals: 0,
          detected: 0,
          analyzed: 0,
          unidentified: 0,
          recentDetections: []
        }
      };

      // Procesar datos orbitales si están disponibles
      if (orbitalResponse.status === 'fulfilled') {
        const orbitalData = await orbitalResponse.value.json();
        if (orbitalData.success && orbitalData.data) {
          realData.orbitalCalculator = {
            ...realData.orbitalCalculator,
            ...orbitalData.data
          };
        }
      }

      // Procesar datos de clima espacial si están disponibles
      if (weatherResponse.status === 'fulfilled') {
        const weatherData = await weatherResponse.value.json();
        if (weatherData) {
          realData.spaceWeather = {
            ...realData.spaceWeather,
            ...weatherData
          };
        }
      }

      // Procesar datos de detección de colisiones si están disponibles
      if (collisionResponse.status === 'fulfilled') {
        const collisionData = await collisionResponse.value.json();
        if (collisionData.success && collisionData.data) {
          realData.collisionDetector = {
            ...realData.collisionDetector,
            ...collisionData.data
          };
        }
      }

      // Procesar datos de análisis de señales si están disponibles
      if (signalResponse.status === 'fulfilled') {
        const signalData = await signalResponse.value.json();
        if (signalData.success && signalData.data) {
          realData.signalAnalyzer = {
            ...realData.signalAnalyzer,
            ...signalData.data
          };
        }
      }

      setToolsData(realData);
    } catch (error) {
      console.error('Error fetching tools data:', error);
      setError('No se pudieron cargar los datos de herramientas espaciales');
      setToolsData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando herramientas espaciales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">{error}</p>
          <button 
            onClick={fetchToolsData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Herramientas Espaciales</h1>
            <p className="text-gray-300 max-w-xl">
              Conjunto de herramientas profesionales para análisis espacial
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchToolsData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Herramientas Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculadora Orbital */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Calculadora Orbital</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Velocidad de escape:</span>
                <span className="text-blue-400 font-semibold">
                  {toolsData?.orbitalCalculator?.calculations?.escapeVelocity || '0'} km/s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Período orbital:</span>
                <span className="text-green-400 font-semibold">
                  {toolsData?.orbitalCalculator?.calculations?.orbitalPeriod || '0'} min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Apogeo:</span>
                <span className="text-purple-400 font-semibold">
                  {toolsData?.orbitalCalculator?.calculations?.apogee || '0'} km
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Perigeo:</span>
                <span className="text-orange-400 font-semibold">
                  {toolsData?.orbitalCalculator?.calculations?.perigee || '0'} km
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clima Espacial */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Clima Espacial</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Manchas solares:</span>
                <span className="text-yellow-400 font-semibold">
                  {toolsData?.spaceWeather?.solarActivity?.sunspots || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Fulguraciones:</span>
                <span className="text-red-400 font-semibold">
                  {toolsData?.spaceWeather?.solarActivity?.solarFlare || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tormentas geomagnéticas:</span>
                <span className="text-purple-400 font-semibold">
                  {toolsData?.spaceWeather?.solarActivity?.geomagneticStorm || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Rayos cósmicos:</span>
                <span className="text-green-400 font-semibold">
                  {toolsData?.spaceWeather?.solarActivity?.cosmicRays || 'N/A'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detector de Colisiones */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Detector de Colisiones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Alertas activas:</span>
                <span className="text-red-400 font-semibold">
                  {toolsData?.collisionDetector?.activeAlerts || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Alto riesgo:</span>
                <span className="text-red-400 font-semibold">
                  {toolsData?.collisionDetector?.highRisk || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Riesgo medio:</span>
                <span className="text-yellow-400 font-semibold">
                  {toolsData?.collisionDetector?.mediumRisk || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Bajo riesgo:</span>
                <span className="text-green-400 font-semibold">
                  {toolsData?.collisionDetector?.lowRisk || '0'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analizador de Señales */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Radio className="h-5 w-5" />
              <span>Analizador de Señales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Señales activas:</span>
                <span className="text-blue-400 font-semibold">
                  {toolsData?.signalAnalyzer?.activeSignals || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Detectadas:</span>
                <span className="text-green-400 font-semibold">
                  {toolsData?.signalAnalyzer?.detected || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Analizadas:</span>
                <span className="text-purple-400 font-semibold">
                  {toolsData?.signalAnalyzer?.analyzed || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">No identificadas:</span>
                <span className="text-orange-400 font-semibold">
                  {toolsData?.signalAnalyzer?.unidentified || '0'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recientes */}
      {(toolsData?.collisionDetector?.recentEvents?.length > 0 || 
        toolsData?.signalAnalyzer?.recentDetections?.length > 0) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Eventos de Colisión */}
          {toolsData?.collisionDetector?.recentEvents?.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Eventos de Colisión Recientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {toolsData.collisionDetector.recentEvents.map((event: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{event.object1} - {event.object2}</div>
                        <div className="text-gray-300 text-sm">Distancia: {event.distance} km</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${
                          event.risk === 'High' ? 'text-red-400' : 
                          event.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {event.risk}
                        </div>
                        <div className="text-gray-400 text-xs">{event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detecciones de Señales */}
          {toolsData?.signalAnalyzer?.recentDetections?.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Radio className="h-5 w-5" />
                  <span>Detecciones Recientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {toolsData.signalAnalyzer.recentDetections.map((detection: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{detection.frequency}</div>
                        <div className="text-gray-300 text-sm">Fuerza: {detection.strength} dB</div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-semibold">{detection.type}</div>
                        <div className="text-gray-400 text-xs">{detection.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Datos Disponibles</h2>
            <p className="text-gray-300">
              No hay datos de herramientas espaciales disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 