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

// Datos simulados para predicciones climáticas
const mockClimateData = {
  currentConditions: {
    solarWind: 'Moderada',
    geomagneticActivity: 'Baja',
    radiationLevels: 'Normal',
    temperature: '2.7K',
    cosmicRays: 'Elevados'
  },
  predictions: [
    {
      id: 1,
      type: 'Tormenta Solar',
      probability: 85,
      timeframe: '24-48 horas',
      severity: 'Moderada',
      description: 'Posible eyección de masa coronal afectando comunicaciones',
      impact: ['Auroras boreales', 'Interferencias GPS', 'Protección necesaria']
    },
    {
      id: 2,
      type: 'Radiación Cósmica',
      probability: 92,
      timeframe: '1-2 semanas',
      severity: 'Alta',
      description: 'Aumento significativo en radiación cósmica galáctica',
      impact: ['Protección de astronautas', 'Monitoreo de satélites', 'Alertas de salud']
    },
    {
      id: 3,
      type: 'Actividad Geomagnética',
      probability: 67,
      timeframe: '3-5 días',
      severity: 'Baja',
      description: 'Perturbaciones menores en el campo magnético terrestre',
      impact: ['Auroras menores', 'Sin impacto significativo']
    }
  ],
  historicalData: {
    solarCycles: [
      { year: 2020, activity: 45, phase: 'Mínimo' },
      { year: 2021, activity: 52, phase: 'Ascendente' },
      { year: 2022, activity: 68, phase: 'Ascendente' },
      { year: 2023, activity: 78, phase: 'Máximo' },
      { year: 2024, activity: 85, phase: 'Máximo' }
    ]
  }
};

// Hook para manejar fechas de manera consistente
const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setFormattedDate(now.toLocaleString('es-ES', {
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

export default function ClimatePredictionsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('predictions');
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

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'alta': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'moderada': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'baja': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-400';
    if (probability >= 60) return 'text-yellow-400';
    return 'text-green-400';
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
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t('climate.title')}</h1>
              <p className="text-gray-400">{t('climate.subtitle')}</p>
            </div>
          </div>

          {/* Información de última actualización */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{t('climate.last_update')}: {formattedDate}</span>
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
          
          {/* Condiciones actuales */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('climate.solar_wind')}</p>
                    <p className="text-lg font-semibold text-white">{mockClimateData.currentConditions.solarWind}</p>
                  </div>
                  <Wind className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('climate.geomagnetic_activity')}</p>
                    <p className="text-lg font-semibold text-green-400">{mockClimateData.currentConditions.geomagneticActivity}</p>
                  </div>
                  <Globe className="h-6 w-6 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('climate.radiation_levels')}</p>
                    <p className="text-lg font-semibold text-yellow-400">{mockClimateData.currentConditions.radiationLevels}</p>
                  </div>
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('climate.temperature')}</p>
                    <p className="text-lg font-semibold text-purple-400">{mockClimateData.currentConditions.temperature}</p>
                  </div>
                  <Thermometer className="h-6 w-6 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('climate.cosmic_rays')}</p>
                    <p className="text-lg font-semibold text-red-400">{mockClimateData.currentConditions.cosmicRays}</p>
                  </div>
                  <Activity className="h-6 w-6 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Predicciones */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">{t('climate.predictions_title')}</CardTitle>
                <CardDescription className="text-gray-400">
                  {t('climate.predictions_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClimateData.predictions.map((prediction) => (
                    <div
                      key={prediction.id}
                      className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{prediction.type}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(prediction.severity)}`}>
                              {prediction.severity}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">{prediction.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {prediction.timeframe}
                            </span>
                            <span className={`flex items-center ${getProbabilityColor(prediction.probability)}`}>
                              <Target className="h-4 w-4 mr-1" />
                              {prediction.probability}% {t('climate.probability')}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 font-medium">{t('climate.expected_impacts')}:</p>
                            <ul className="text-sm text-gray-400">
                              {prediction.impact.map((impact, index) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                                  {impact}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                          <AlertTriangle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Ciclo Solar */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">{t('climate.solar_cycle')}</CardTitle>
                <CardDescription className="text-gray-400">
                  {t('climate.solar_cycle_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockClimateData.historicalData.solarCycles.map((cycle, index) => (
                    <div key={cycle.year} className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">{cycle.year}</p>
                        <p className="text-xs text-gray-400">{cycle.phase}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                            style={{ width: `${cycle.activity}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{cycle.activity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">{t('climate.active_alerts')}</CardTitle>
                <CardDescription className="text-gray-400">
                  {t('climate.active_alerts_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">{t('climate.solar_storm')}</span>
                    </div>
                    <p className="text-xs text-gray-400">{t('climate.active_monitoring')} - 24-48h</p>
                  </div>
                  
                  <div className="p-3 bg-red-400/10 border border-red-400/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-4 w-4 text-red-400" />
                      <span className="text-sm font-medium text-red-400">{t('climate.elevated_radiation')}</span>
                    </div>
                    <p className="text-xs text-gray-400">{t('climate.protection_needed')} - 1-2 {t('climate.weeks')}</p>
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