"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  Clock, 
  BarChart3, 
  Zap, 
  Eye, 
  Star,
  Crown,
  Award,
  Activity,
  Shield,
  Database,
  Globe,
  Search,
  RefreshCw,
  Download
} from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';

interface Prediction {
  id: string;
  type: 'collision' | 'anomaly' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  probability: number;
  timeframe: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  objects: string[];
  recommendations: string[];
  timestamp: Date;
  status: 'active' | 'resolved' | 'false_positive';
}

interface AnomalyPattern {
  id: string;
  pattern: string;
  frequency: number;
  significance: number;
  objects: number;
  firstDetected: Date;
  lastSeen: Date;
  category: 'orbital' | 'behavioral' | 'temporal' | 'spatial';
}

// Datos simulados para predicciones IA
const aiPredictionsData = {
  models: [
    {
      id: 1,
      name: 'Neural Network Alpha',
      accuracy: '97.3%',
      status: 'Activo',
      lastUpdate: '2024-01-15T14:30:00Z',
      predictions: 1247,
      type: 'Anomalías Espaciales'
    },
    {
      id: 2,
      name: 'Deep Learning Beta',
      accuracy: '95.8%',
      status: 'Entrenando',
      lastUpdate: '2024-01-15T13:15:00Z',
      predictions: 892,
      type: 'Patrones Estelares'
    },
    {
      id: 3,
      name: 'Quantum AI Gamma',
      accuracy: '99.1%',
      status: 'Activo',
      lastUpdate: '2024-01-15T12:45:00Z',
      predictions: 567,
      type: 'Predicciones Climáticas'
    }
  ],
  recentPredictions: [
    {
      id: 1,
      object: 'HD 209458',
      prediction: 'Variación de brillo en 48h',
      confidence: '94.2%',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'Confirmado'
    },
    {
      id: 2,
      object: 'C/2024 A1',
      prediction: 'Aproximación cercana a la Tierra',
      confidence: '87.5%',
      timestamp: '2024-01-15T13:15:00Z',
      status: 'Pendiente'
    },
    {
      id: 3,
      object: 'PSR B1257+12',
      prediction: 'Señal de radio anómala',
      confidence: '91.3%',
      timestamp: '2024-01-15T12:45:00Z',
      status: 'Investigando'
    }
  ],
  statistics: {
    totalPredictions: 2706,
    accuracy: '96.8%',
    activeModels: 3,
    processingTime: '1.2s',
    uptime: '99.9%',
    dataPoints: '2.3M'
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

export default function AIPredictionsPage() {
  const [isLoading, setIsLoading] = useState(false);
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'entrenando': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'confirmado': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pendiente': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'investigando': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
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
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Predicciones IA</h1>
              <p className="text-gray-400">Modelos de inteligencia artificial avanzados para análisis espacial</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Predicciones</p>
                    <p className="text-2xl font-bold text-white">{aiPredictionsData.statistics.totalPredictions.toLocaleString()}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Precisión</p>
                    <p className="text-2xl font-bold text-green-400">{aiPredictionsData.statistics.accuracy}</p>
                  </div>
                  <Award className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Modelos Activos</p>
                    <p className="text-2xl font-bold text-purple-400">{aiPredictionsData.statistics.activeModels}</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Tiempo Procesamiento</p>
                    <p className="text-2xl font-bold text-yellow-400">{aiPredictionsData.statistics.processingTime}</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Uptime</p>
                    <p className="text-2xl font-bold text-cyan-400">{aiPredictionsData.statistics.uptime}</p>
                  </div>
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Datos</p>
                    <p className="text-2xl font-bold text-pink-400">{aiPredictionsData.statistics.dataPoints}</p>
                  </div>
                  <Database className="h-8 w-8 text-pink-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Modelos IA */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Modelos de IA</CardTitle>
                    <CardDescription className="text-gray-400">
                      Sistemas de inteligencia artificial en tiempo real
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
                  {aiPredictionsData.models.map((model) => {
                    const FormattedDate = () => {
                      const formattedDate = useFormattedDate(model.lastUpdate);
                      return <span>{formattedDate}</span>;
                    };

                    return (
                      <div
                        key={model.id}
                        className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(model.status)}`}>
                                {model.status}
                              </span>
                              <Crown className="h-4 w-4 text-yellow-400" />
                            </div>
                            <p className="text-gray-300 mb-2">{model.type}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                Precisión: {model.accuracy}
                              </span>
                              <span className="flex items-center">
                                <BarChart3 className="h-4 w-4 mr-1" />
                                {model.predictions.toLocaleString()} predicciones
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <FormattedDate />
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
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Predicciones recientes */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Predicciones Recientes</CardTitle>
                <CardDescription className="text-gray-400">
                  Últimas predicciones del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiPredictionsData.recentPredictions.map((prediction) => {
                    const FormattedDate = () => {
                      const formattedDate = useFormattedDate(prediction.timestamp);
                      return <span>{formattedDate}</span>;
                    };

                    return (
                      <div
                        key={prediction.id}
                        className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-white">{prediction.object}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(prediction.status)}`}>
                            {prediction.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{prediction.prediction}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Confianza: {prediction.confidence}</span>
                          <FormattedDate />
                        </div>
                      </div>
                    );
                  })}
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
                      <Brain className="h-4 w-4 mr-2" />
                      Entrenar Modelo
                    </span>
                    <Star className="h-4 w-4" />
                  </button>
                  
                  <button className="w-full p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/30 text-green-400 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 flex items-center justify-between">
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Análisis Predictivo
                    </span>
                    <Award className="h-4 w-4" />
                  </button>
                  
                  <button className="w-full p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30 text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 flex items-center justify-between">
                    <span className="flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Detección Anomalías
                    </span>
                    <Activity className="h-4 w-4" />
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
