"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Activity,
  Zap,
  Eye,
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Clock,
  Star,
  Globe,
  Satellite
} from 'lucide-react';

const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;

// Datos simulados para análisis de patrones
const mockPatternData = {
  anomalies: [
    {
      id: 1,
      type: 'Variación de brillo',
      object: 'HD 209458',
      confidence: 94.2,
      timestamp: '2024-01-15T14:30:00Z',
      severity: 'Alta',
      description: 'Detección de variación anómala en el brillo de la estrella'
    },
    {
      id: 2,
      type: 'Señal de radio',
      object: 'WOW! Signal',
      confidence: 87.5,
      timestamp: '2024-01-14T09:15:00Z',
      severity: 'Media',
      description: 'Señal de radio no identificada detectada'
    },
    {
      id: 3,
      type: 'Movimiento orbital',
      object: 'Oumuamua',
      confidence: 92.1,
      timestamp: '2024-01-13T16:45:00Z',
      severity: 'Alta',
      description: 'Cambio inesperado en la trayectoria orbital'
    }
  ],
  statistics: {
    totalDetections: 1247,
    anomaliesToday: 23,
    falsePositives: 8,
    accuracy: 96.5,
    processingTime: '2.3s'
  }
};

// Hook para manejar fechas de manera consistente
const useFormattedDate = (timestamp: string) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const date = new Date(timestamp);
    setFormattedDate(date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }));
  }, [timestamp]);

  return formattedDate;
};

export default function PatternAnalysisPage() {
  const [activeTab, setActiveTab] = useState('anomalies');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

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
            <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Análisis de Patrones</h1>
              <p className="text-gray-400">Detección inteligente de anomalías espaciales</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Detecciones</p>
                    <p className="text-2xl font-bold text-white">{mockPatternData.statistics.totalDetections}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Anomalías Hoy</p>
                    <p className="text-2xl font-bold text-red-400">{mockPatternData.statistics.anomaliesToday}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Precisión</p>
                    <p className="text-2xl font-bold text-green-400">{mockPatternData.statistics.accuracy}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Tiempo Procesamiento</p>
                    <p className="text-2xl font-bold text-purple-400">{mockPatternData.statistics.processingTime}</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-700/50">
            <TabsTrigger value="anomalies" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Anomalías Detectadas
            </TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <TrendingUp className="h-4 w-4 mr-2" />
              Patrones Identificados
            </TabsTrigger>
            <TabsTrigger value="algorithms" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <Activity className="h-4 w-4 mr-2" />
              Algoritmos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="anomalies" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Anomalías Recientes</CardTitle>
                    <CardDescription className="text-gray-400">
                      Detecciones automáticas de patrones anómalos en datos espaciales
                    </CardDescription>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatternData.anomalies.map((anomaly) => {
                    const FormattedDate = () => {
                      const formattedDate = useFormattedDate(anomaly.timestamp);
                      return <span>{formattedDate}</span>;
                    };

                    return (
                      <div
                        key={anomaly.id}
                        className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{anomaly.type}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(anomaly.severity)}`}>
                                {anomaly.severity}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-2">{anomaly.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Globe className="h-4 w-4 mr-1" />
                                {anomaly.object}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <FormattedDate />
                              </span>
                              <span className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                {anomaly.confidence}% confianza
                              </span>
                            </div>
                          </div>
                          <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Patrones Identificados</CardTitle>
                <CardDescription className="text-gray-400">
                  Análisis de correlaciones y patrones recurrentes en datos astronómicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <Star className="h-6 w-6 text-yellow-400" />
                      <h3 className="text-lg font-semibold text-white">Variaciones Estelares</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      Patrón detectado en variaciones de brillo de estrellas tipo Cefeidas
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Confianza: 89%</span>
                      <span className="text-green-400">✓ Verificado</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <Satellite className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Órbitas Anómalas</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      Agrupación de objetos con trayectorias orbitales inusuales
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Confianza: 76%</span>
                      <span className="text-yellow-400">⚠ En análisis</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="algorithms" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Algoritmos de Detección</CardTitle>
                <CardDescription className="text-gray-400">
                  Configuración y rendimiento de los algoritmos de machine learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <h3 className="text-lg font-semibold text-white mb-2">Random Forest</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Algoritmo principal para clasificación de anomalías
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Precisión: 94.2%</span>
                      <span className="text-green-400 text-sm">Activo</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <h3 className="text-lg font-semibold text-white mb-2">Isolation Forest</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Detección de outliers en series temporales
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Precisión: 91.8%</span>
                      <span className="text-green-400 text-sm">Activo</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                    <h3 className="text-lg font-semibold text-white mb-2">LSTM Neural Network</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Predicción de eventos basada en patrones históricos
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Precisión: 88.5%</span>
                      <span className="text-yellow-400 text-sm">Entrenando</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 