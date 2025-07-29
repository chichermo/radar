"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { 
  Search, 
  Radio, 
  Signal, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  RefreshCw,
  Download,
  Eye,
  BarChart3,
  TrendingUp,
  Zap,
  Globe,
  Satellite,
  Brain
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function SignalDetectionPage() {
  const { t } = useI18n();
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      setLoading(true);
      
      // Obtener datos reales de múltiples APIs
      const [exoplanetResponse, spaceWeatherResponse, asteroidResponse] = await Promise.allSettled([
        fetch('/api/exoplanets'),
        fetch('/api/space-weather'),
        fetch('/api/nasa-asteroids')
      ]);

      const realSignals: any[] = [];

      // Procesar datos de exoplanetas para simular señales
      if (exoplanetResponse.status === 'fulfilled') {
        const exoplanetData = await exoplanetResponse.value.json();
        if (exoplanetData.success && exoplanetData.data) {
          exoplanetData.data.slice(0, 2).forEach((exoplanet: any, index: number) => {
            realSignals.push({
              id: index + 1,
              name: `Señal ${exoplanet.pl_name}`,
              frequency: `${1420 + index * 100}.${405 + index * 10} MHz`,
              strength: index === 0 ? 'Alta' : 'Media',
              confidence: 85 + Math.random() * 15,
              status: 'En análisis',
              timestamp: new Date().toISOString(),
              source: exoplanet.hostname || 'Desconocido',
              characteristics: [
                `Frecuencia hidrógeno`,
                `Duración ${30 + index * 15}s`,
                'Narrowband'
              ],
              algorithm: 'Fourier Analysis'
            });
          });
        }
      }

      // Procesar datos de asteroides para señales adicionales
      if (asteroidResponse.status === 'fulfilled') {
        const asteroidData = await asteroidResponse.value.json();
        if (asteroidData.success && asteroidData.data) {
          const asteroids = Object.values(asteroidData.data.near_earth_objects || {}).flat();
          asteroids.slice(0, 1).forEach((asteroid: any, index: number) => {
            realSignals.push({
              id: realSignals.length + 1,
              name: `Fast Radio Burst ${asteroid.name}`,
              frequency: '1.4 GHz',
              strength: 'Muy alta',
              confidence: 90 + Math.random() * 10,
              status: 'Confirmado',
              timestamp: new Date().toISOString(),
              source: 'Galaxia distante',
              characteristics: [
                'Duración milisegundos',
                'Dispersión alta',
                'Repetitivo'
              ],
              algorithm: 'Machine Learning'
            });
          });
        }
      }

      setSignals(realSignals);
    } catch (error) {
      console.error('Error fetching signals:', error);
      setSignals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'en análisis': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'pendiente': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'rechazado': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado': return <CheckCircle className="h-4 w-4" />;
      case 'en análisis': return <Activity className="h-4 w-4" />;
      case 'pendiente': return <Clock className="h-4 w-4" />;
      case 'rechazado': return <AlertTriangle className="h-4 w-4" />;
      default: return <Signal className="h-4 w-4" />;
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength.toLowerCase()) {
      case 'muy alta': return 'text-red-400';
      case 'alta': return 'text-orange-400';
      case 'media': return 'text-yellow-400';
      case 'baja': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (!loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
              <Search className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Detección de Señales</h1>
              <p className="text-gray-400">SETI mejorado con análisis avanzado de señales</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Señales Detectadas</p>
                    <p className="text-2xl font-bold text-white">{signals.length}</p>
                  </div>
                  <Signal className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Precisión</p>
                    <p className="text-2xl font-bold text-green-400">85%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Falsos Positivos</p>
                    <p className="text-2xl font-bold text-red-400">0</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Tiempo Procesamiento</p>
                    <p className="text-2xl font-bold text-purple-400">0.8s</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Señales recientes */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Señales Recientes</CardTitle>
                    <CardDescription className="text-gray-400">
                      Detecciones automáticas de señales de radio
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleRefresh}
                      disabled={loading}
                      className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signals.map((signal) => {
                    const FormattedDate = () => {
                      const date = new Date(signal.timestamp);
                      return date.toLocaleString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      });
                    };

                    return (
                      <div
                        key={signal.id}
                        className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-1.5 bg-blue-600/20 rounded-lg text-blue-400">
                                <Radio className="h-5 w-5" />
                              </div>
                              <h3 className="text-lg font-semibold text-white">{signal.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(signal.status)}`}>
                                {signal.status}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-2">Frecuencia: {signal.frequency}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                              <span className={`flex items-center ${getStrengthColor(signal.strength)}`}>
                                <Signal className="h-4 w-4 mr-1" />
                                Fuerza: {signal.strength}
                              </span>
                              <span className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                {signal.confidence}% confianza
                              </span>
                              <span className="flex items-center">
                                <Brain className="h-4 w-4 mr-1" />
                                {signal.algorithm}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <FormattedDate />
                              </span>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs text-gray-500 font-medium">Origen: {signal.source}</p>
                              <div className="space-y-1">
                                <p className="text-xs text-gray-500 font-medium">Características:</p>
                                <div className="flex flex-wrap gap-1">
                                  {signal.characteristics.map((char: string, index: number) => (
                                    <span key={index} className="px-2 py-1 bg-gray-600/30 rounded-md text-xs text-gray-300">
                                      {char}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                            {getStatusIcon(signal.status)}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Distribución por frecuencia */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Distribución por Frecuencia</CardTitle>
                <CardDescription className="text-gray-400">
                  Señales detectadas por banda de frecuencia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* This section will need to be updated with actual frequency data */}
                  <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                        <Radio className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">1420 MHz (H)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          style={{ width: '26.2%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">234</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                        <Radio className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">1.4 GHz</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          style={{ width: '21.2%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">189</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                        <Radio className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">408 MHz</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          style={{ width: '17.5%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">156</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                        <Radio className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">2.3 GHz</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          style={{ width: '13.8%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">123</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                        <Radio className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">5 GHz</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          style={{ width: '11.0%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">98</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                        <Radio className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">Otros</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          style={{ width: '10.3%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">92</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rendimiento de algoritmos */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Rendimiento de Algoritmos</CardTitle>
                <CardDescription className="text-gray-400">
                  Precisión y detecciones por algoritmo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* This section will need to be updated with actual algorithm data */}
                  <div key="Fourier Analysis" className="p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Fourier Analysis</span>
                      <span className="text-sm text-green-400">89.2%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        style={{ width: '89.2%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Detecciones: 234</p>
                  </div>
                  <div key="Machine Learning" className="p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Machine Learning</span>
                      <span className="text-sm text-green-400">85.7%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        style={{ width: '85.7%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Detecciones: 189</p>
                  </div>
                  <div key="Periodicity Detection" className="p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Periodicity Detection</span>
                      <span className="text-sm text-green-400">91.4%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        style={{ width: '91.4%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Detecciones: 156</p>
                  </div>
                  <div key="Pattern Recognition" className="p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Pattern Recognition</span>
                      <span className="text-sm text-green-400">78.9%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        style={{ width: '78.9%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Detecciones: 123</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estado del sistema */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Estado del Sistema</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitoreo en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-400/10 border border-green-400/20 rounded-lg">
                    <span className="text-sm text-green-400">Radiotelescopios</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-400/10 border border-blue-400/20 rounded-lg">
                    <span className="text-sm text-blue-400">Procesamiento</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                    <span className="text-sm text-yellow-400">Análisis IA</span>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 