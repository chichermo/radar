"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { 
  TrendingUp, 
  Cloud, 
  Sun, 
  Wind, 
  Thermometer, 
  Activity,
  Calendar,
  AlertTriangle,
  BarChart3,
  Globe,
  Zap,
  Clock,
  Target,
  RefreshCw,
  Download
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function ClimatePredictionsPage() {
  const [climateData, setClimateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClimateData();
  }, []);

  const fetchClimateData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de predicciones climáticas
      const [spaceWeatherResponse, solarResponse] = await Promise.allSettled([
        fetch('/api/space-weather'),
        fetch('/api/solar-activity')
      ]);

      const realData: any = {
        currentConditions: {
          solarWind: 'Datos no disponibles',
          geomagneticActivity: 'Datos no disponibles',
          radiationLevels: 'Datos no disponibles',
          temperature: 'Datos no disponibles',
          cosmicRays: 'Datos no disponibles'
        },
        predictions: [],
        historicalData: {
          solarCycles: []
        }
      };

      // Procesar datos de clima espacial si están disponibles
      if (spaceWeatherResponse.status === 'fulfilled') {
        const spaceWeatherData = await spaceWeatherResponse.value.json();
        if (spaceWeatherData) {
          realData.currentConditions = {
            ...realData.currentConditions,
            solarWind: spaceWeatherData.solarWind || 'Datos no disponibles',
            geomagneticActivity: spaceWeatherData.geomagneticActivity || 'Datos no disponibles',
            radiationLevels: spaceWeatherData.radiationLevels || 'Datos no disponibles'
          };
        }
      }

      // Procesar datos solares si están disponibles
      if (solarResponse.status === 'fulfilled') {
        const solarData = await solarResponse.value.json();
        if (solarData && solarData.success) {
          realData.currentConditions = {
            ...realData.currentConditions,
            temperature: solarData.temperature || 'Datos no disponibles',
            cosmicRays: solarData.cosmicRays || 'Datos no disponibles'
          };
        }
      }

      setClimateData(realData);
    } catch (error) {
      console.error('Error fetching climate data:', error);
      setError('No se pudieron cargar los datos de predicciones climáticas');
      setClimateData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando predicciones climáticas...</p>
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
            onClick={fetchClimateData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Predicciones Climáticas</h1>
            <p className="text-gray-300 max-w-xl">
              Análisis y predicciones de condiciones espaciales y climáticas
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchClimateData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Condiciones Actuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Wind className="h-5 w-5" />
              <span>Viento Solar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {climateData?.currentConditions?.solarWind || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Condición actual</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Actividad Geomagnética</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {climateData?.currentConditions?.geomagneticActivity || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Estado del campo magnético</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Niveles de Radiación</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {climateData?.currentConditions?.radiationLevels || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Radiación cósmica</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Thermometer className="h-5 w-5" />
              <span>Temperatura</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {climateData?.currentConditions?.temperature || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Temperatura espacial</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Rayos Cósmicos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {climateData?.currentConditions?.cosmicRays || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Flujo de rayos cósmicos</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Sun className="h-5 w-5" />
              <span>Actividad Solar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {climateData?.currentConditions?.solarActivity || 'N/A'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Estado del Sol</p>
          </CardContent>
        </Card>
      </div>

      {/* Predicciones */}
      {climateData?.predictions && climateData.predictions.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Predicciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {climateData.predictions.map((prediction: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-semibold">{prediction.type || 'Predicción'}</div>
                      <div className="text-gray-300 text-sm">{prediction.description || 'Sin descripción'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{prediction.probability || 'N/A'}%</div>
                    <div className="text-gray-300 text-sm">{prediction.timeframe || 'Tiempo desconocido'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Predicciones Disponibles</h2>
            <p className="text-gray-300">
              No hay predicciones climáticas disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Datos Históricos */}
      {climateData?.historicalData?.solarCycles && climateData.historicalData.solarCycles.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Datos Históricos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {climateData.historicalData.solarCycles.map((cycle: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{cycle.year || 'Año desconocido'}</div>
                    <div className="text-gray-300 text-sm">Actividad: {cycle.activity || 'N/A'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{cycle.phase || 'Fase desconocida'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Datos Históricos</h2>
            <p className="text-gray-300">
              No hay datos históricos disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 