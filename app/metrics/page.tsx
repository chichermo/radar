"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Calendar,
  Clock,
  Target,
  Zap,
  Eye,
  Star,
  Crown,
  Award,
  Shield,
  Database,
  Globe,
  Search,
  RefreshCw,
  Download,
  AlertTriangle,
  Satellite,
  Brain
} from 'lucide-react';

// Datos simulados para métricas
const metricsData = {
  statistics: {
    totalSatellites: 4852,
    activeAlerts: 23,
    launches2024: 156,
    debrisTracked: 128000,
    predictionAccuracy: '98.7%',
    responseTime: '2.3s',
    uptime: '99.9%',
    dataPoints: '2.3M'
  },
  recentAlerts: [
    {
      id: 1,
      satellite: 'STARLINK-1234',
      type: 'Riesgo alto de colisión',
      severity: 'Alta',
      time: '2 min',
      status: 'Activo'
    },
    {
      id: 2,
      satellite: 'ISS',
      type: 'Maniobra programada',
      severity: 'Media',
      time: '15 min',
      status: 'Programado'
    },
    {
      id: 3,
      satellite: 'GPS IIR-20',
      type: 'Operación normal',
      severity: 'Baja',
      time: '1h',
      status: 'Normal'
    }
  ],
  dataSources: [
    { name: 'Space-Track.org', status: 'Conectado', color: 'green' },
    { name: 'NASA APIs', status: 'Activo', color: 'blue' },
    { name: 'ESA Database', status: 'Sincronizado', color: 'purple' },
    { name: 'JAXA', status: 'Conectado', color: 'orange' }
  ]
};

// Hook para manejar fechas de manera consistente
const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    setFormattedDate(date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }));
  }, []);

  return formattedDate;
};

export default function MetricsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const formattedDate = useFormattedDate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const timeRangeOptions = [
    { value: '24h', label: '24 horas', icon: Activity },
    { value: '7d', label: '7 días', icon: Calendar },
    { value: '30d', label: '30 días', icon: BarChart3 },
    { value: '1y', label: '1 año', icon: TrendingUp },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'alta': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'media': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'baja': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (!isClient) {
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
            <div className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Métricas Avanzadas</h1>
              <p className="text-gray-400">Análisis detallado de datos históricos y tendencias espaciales</p>
            </div>
          </div>
          
          {/* Selector de rango de tiempo */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1 border border-gray-700/50">
              {timeRangeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedTimeRange(option.value as any)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedTimeRange === option.value
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/40'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Satélites</p>
                    <p className="text-2xl font-bold text-white">{metricsData.statistics.totalSatellites.toLocaleString()}</p>
                  </div>
                  <Satellite className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Alertas</p>
                    <p className="text-2xl font-bold text-red-400">{metricsData.statistics.activeAlerts}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Lanzamientos</p>
                    <p className="text-2xl font-bold text-green-400">{metricsData.statistics.launches2024}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Escombros</p>
                    <p className="text-2xl font-bold text-yellow-400">{(metricsData.statistics.debrisTracked / 1000).toFixed(0)}K</p>
                  </div>
                  <Target className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Precisión</p>
                    <p className="text-2xl font-bold text-purple-400">{metricsData.statistics.predictionAccuracy}</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Respuesta</p>
                    <p className="text-2xl font-bold text-cyan-400">{metricsData.statistics.responseTime}</p>
                  </div>
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Uptime</p>
                    <p className="text-2xl font-bold text-pink-400">{metricsData.statistics.uptime}</p>
                  </div>
                  <Shield className="h-8 w-8 text-pink-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Datos</p>
                    <p className="text-2xl font-bold text-indigo-400">{metricsData.statistics.dataPoints}</p>
                  </div>
                  <Database className="h-8 w-8 text-indigo-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráficos principales */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Análisis de Tendencias</CardTitle>
                    <CardDescription className="text-gray-400">
                      Datos históricos y proyecciones para {selectedTimeRange}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">Datos en tiempo real</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-700/30 rounded-lg border border-gray-600/30 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Gráfico de métricas para {selectedTimeRange}</p>
                    <p className="text-sm text-gray-500 mt-2">Datos simulados para demostración</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Alertas recientes */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Alertas Recientes</CardTitle>
                <CardDescription className="text-gray-400">
                  Eventos y notificaciones del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metricsData.recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-semibold text-white">{alert.satellite}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 mb-1">{alert.type}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{alert.status}</span>
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        <button className="p-1 bg-blue-600/20 rounded border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                          <Eye className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fuentes de datos */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Fuentes de Datos</CardTitle>
                <CardDescription className="text-gray-400">
                  Estado de las conexiones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metricsData.dataSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-${source.color}-500 rounded-full`}></div>
                        <span className="text-sm text-gray-300">{source.name}</span>
                      </div>
                      <span className="text-xs text-green-400">{source.status}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600/30">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Última actualización:</span>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Acciones Rápidas</CardTitle>
                <CardDescription className="text-gray-400">
                  Funciones principales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 flex items-center justify-between">
                    <span className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Exportar Datos
                    </span>
                    <Download className="h-4 w-4" />
                  </button>
                  
                  <button className="w-full p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/30 text-green-400 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 flex items-center justify-between">
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Análisis Avanzado
                    </span>
                    <Award className="h-4 w-4" />
                  </button>
                  
                  <button className="w-full p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30 text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 flex items-center justify-between">
                    <span className="flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Configurar Alertas
                    </span>
                    <Star className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 