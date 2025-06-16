"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { 
  Tags, 
  Brain, 
  Star, 
  Globe, 
  Satellite, 
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  RefreshCw,
  Download,
  Eye,
  BarChart3,
  TrendingUp,
  Zap
} from 'lucide-react';

// Datos simulados para clasificación automática
const mockClassificationData = {
  recentClassifications: [
    {
      id: 1,
      object: 'HD 209458 b',
      type: 'Exoplaneta',
      confidence: 98.7,
      status: 'Verificado',
      timestamp: '2024-01-15T14:30:00Z',
      characteristics: ['Júpiter caliente', 'Tránsito confirmado', 'Atmósfera detectada'],
      algorithm: 'Random Forest'
    },
    {
      id: 2,
      object: 'PSR B1257+12 c',
      type: 'Planeta Púlsar',
      confidence: 94.2,
      status: 'Pendiente',
      timestamp: '2024-01-15T13:45:00Z',
      characteristics: ['Orbita púlsar', 'Masa terrestre', 'Confirmación requerida'],
      algorithm: 'Neural Network'
    },
    {
      id: 3,
      object: 'Oumuamua',
      type: 'Objeto Interestelar',
      confidence: 99.1,
      status: 'Verificado',
      timestamp: '2024-01-15T12:20:00Z',
      characteristics: ['Forma elongada', 'Aceleración no gravitacional', 'Origen desconocido'],
      algorithm: 'SVM'
    },
    {
      id: 4,
      object: 'C/2023 A3',
      type: 'Cometa',
      confidence: 96.8,
      status: 'Verificado',
      timestamp: '2024-01-15T11:15:00Z',
      characteristics: ['Órbita hiperbólica', 'Cola visible', 'Núcleo activo'],
      algorithm: 'Random Forest'
    }
  ],
  statistics: {
    totalClassified: 1247,
    accuracy: 97.3,
    processingTime: '1.8s',
    algorithms: [
      { name: 'Random Forest', accuracy: 98.1, usage: 45 },
      { name: 'Neural Network', accuracy: 96.8, usage: 30 },
      { name: 'SVM', accuracy: 95.4, usage: 15 },
      { name: 'K-Means', accuracy: 93.2, usage: 10 }
    ]
  },
  objectTypes: [
    { type: 'Exoplaneta', count: 456, percentage: 36.6 },
    { type: 'Estrella', count: 234, percentage: 18.8 },
    { type: 'Cometa', count: 189, percentage: 15.2 },
    { type: 'Asteroide', count: 156, percentage: 12.5 },
    { type: 'Galaxia', count: 123, percentage: 9.9 },
    { type: 'Otros', count: 89, percentage: 7.1 }
  ]
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

export default function AutoClassificationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

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
      case 'verificado': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pendiente': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'rechazado': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verificado': return <CheckCircle className="h-4 w-4" />;
      case 'pendiente': return <Clock className="h-4 w-4" />;
      case 'rechazado': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getObjectIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'exoplaneta': return <Globe className="h-5 w-5" />;
      case 'estrella': return <Star className="h-5 w-5" />;
      case 'cometa': return <Activity className="h-5 w-5" />;
      case 'asteroide': return <Target className="h-5 w-5" />;
      case 'galaxia': return <Eye className="h-5 w-5" />;
      default: return <Satellite className="h-5 w-5" />;
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
              <Tags className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Clasificación Automática</h1>
              <p className="text-gray-400">Algoritmos de IA para clasificación de objetos celestes</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Clasificados</p>
                    <p className="text-2xl font-bold text-white">{mockClassificationData.statistics.totalClassified}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Precisión</p>
                    <p className="text-2xl font-bold text-green-400">{mockClassificationData.statistics.accuracy}%</p>
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
                    <p className="text-2xl font-bold text-purple-400">{mockClassificationData.statistics.processingTime}</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Algoritmos Activos</p>
                    <p className="text-2xl font-bold text-yellow-400">{mockClassificationData.statistics.algorithms.length}</p>
                  </div>
                  <Brain className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clasificaciones recientes */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Clasificaciones Recientes</CardTitle>
                    <CardDescription className="text-gray-400">
                      Objetos clasificados automáticamente por algoritmos de IA
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
                  {mockClassificationData.recentClassifications.map((classification) => {
                    const FormattedDate = () => {
                      const formattedDate = useFormattedDate(classification.timestamp);
                      return <span>{formattedDate}</span>;
                    };

                    return (
                      <div
                        key={classification.id}
                        className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-1.5 bg-blue-600/20 rounded-lg text-blue-400">
                                {getObjectIcon(classification.type)}
                              </div>
                              <h3 className="text-lg font-semibold text-white">{classification.object}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(classification.status)}`}>
                                {classification.status}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-2">Tipo: {classification.type}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                              <span className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                {classification.confidence}% confianza
                              </span>
                              <span className="flex items-center">
                                <Brain className="h-4 w-4 mr-1" />
                                {classification.algorithm}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <FormattedDate />
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 font-medium">Características:</p>
                              <div className="flex flex-wrap gap-1">
                                {classification.characteristics.map((char, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-600/30 rounded-md text-xs text-gray-300">
                                    {char}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                            {getStatusIcon(classification.status)}
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
            {/* Distribución por tipo */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Distribución por Tipo</CardTitle>
                <CardDescription className="text-gray-400">
                  Objetos clasificados por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockClassificationData.objectTypes.map((objType) => (
                    <div key={objType.type} className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-blue-600/20 rounded text-blue-400">
                          {getObjectIcon(objType.type)}
                        </div>
                        <span className="text-sm font-medium text-white">{objType.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            style={{ width: `${objType.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{objType.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rendimiento de algoritmos */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Rendimiento de Algoritmos</CardTitle>
                <CardDescription className="text-gray-400">
                  Precisión y uso de cada algoritmo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockClassificationData.statistics.algorithms.map((algorithm) => (
                    <div key={algorithm.name} className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{algorithm.name}</span>
                        <span className="text-sm text-green-400">{algorithm.accuracy}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                          style={{ width: `${algorithm.usage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Uso: {algorithm.usage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 