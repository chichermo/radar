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

export default function PatternAnalysisPage() {
  const [patternData, setPatternData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchPatternData();
  }, []);

  const fetchPatternData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de análisis de patrones
      const [signalsResponse, anomaliesResponse, statsResponse] = await Promise.allSettled([
        fetch('/api/signals'),
        fetch('/api/anomalies'),
        fetch('/api/pattern-stats')
      ]);

      const realData: any = {
        anomalies: [],
        statistics: {
          totalDetections: 0,
          anomaliesToday: 0,
          falsePositives: 0,
          accuracy: 0,
          processingTime: '0s'
        }
      };

      // Procesar datos de anomalías si están disponibles
      if (anomaliesResponse.status === 'fulfilled') {
        const anomaliesData = await anomaliesResponse.value.json();
        if (anomaliesData.success && anomaliesData.data) {
          realData.anomalies = anomaliesData.data.slice(0, 10);
        }
      }

      // Procesar datos de estadísticas si están disponibles
      if (statsResponse.status === 'fulfilled') {
        const statsData = await statsResponse.value.json();
        if (statsData.success && statsData.data) {
          realData.statistics = {
            ...realData.statistics,
            ...statsData.data
          };
        }
      }

      setPatternData(realData);
    } catch (error) {
      console.error('Error fetching pattern data:', error);
      setError('No se pudieron cargar los datos de análisis de patrones');
      setPatternData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando análisis de patrones...</p>
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
            onClick={fetchPatternData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Análisis de Patrones</h1>
            <p className="text-gray-300 max-w-xl">
              Identificación y análisis de patrones anómalos en datos espaciales
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchPatternData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Detecciones Totales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {patternData?.statistics?.totalDetections?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Patrones detectados</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Anomalías Hoy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {patternData?.statistics?.anomaliesToday?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Anomalías detectadas</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Precisión</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {patternData?.statistics?.accuracy || '0'}%
            </div>
            <p className="text-gray-300 text-sm mt-2">Tasa de precisión</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Tiempo Procesamiento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {patternData?.statistics?.processingTime || '0s'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Tiempo promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Análisis de Patrones */}
      <Tabs defaultValue="anomalies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="anomalies">Anomalías</TabsTrigger>
          <TabsTrigger value="patterns">Patrones</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Anomalías Detectadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patternData?.anomalies && patternData.anomalies.length > 0 ? (
                <div className="space-y-4">
                  {patternData.anomalies.map((anomaly: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div>
                          <div className="text-white font-semibold">{anomaly.type || 'Anomalía'}</div>
                          <div className="text-gray-300 text-sm">{anomaly.object || 'Objeto desconocido'}</div>
                          <div className="text-gray-400 text-xs">{anomaly.description || 'Sin descripción'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{anomaly.confidence || 'N/A'}%</div>
                        <div className="text-gray-300 text-sm">{anomaly.severity || 'N/A'}</div>
                        <div className="text-gray-400 text-xs">{anomaly.timestamp || 'Tiempo desconocido'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">No hay anomalías detectadas en este momento</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Análisis de Patrones</h2>
              <p className="text-gray-300">
                Funcionalidad de análisis de patrones en desarrollo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Análisis de Tendencias</h2>
              <p className="text-gray-300">
                Funcionalidad de análisis de tendencias en desarrollo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 