'use client';

import React, { useState } from 'react';
import HistoricalMetrics from '@/components/HistoricalMetrics';
import { Calendar, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

export default function MetricsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('7d');

  const timeRangeOptions = [
    { value: '24h', label: '24 horas', icon: Activity },
    { value: '7d', label: '7 días', icon: Calendar },
    { value: '30d', label: '30 días', icon: BarChart3 },
    { value: '1y', label: '1 año', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Métricas Espaciales</h1>
              <p className="text-gray-600 mt-1">
                Análisis detallado de datos históricos y tendencias espaciales
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                {timeRangeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTimeRange(option.value as any)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTimeRange === option.value
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
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
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Métricas principales */}
          <div className="lg:col-span-2">
            <HistoricalMetrics timeRange={selectedTimeRange} />
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Resumen rápido */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Rápido</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Satélites</span>
                  <span className="font-semibold text-gray-900">4,852</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Alertas Activas</span>
                  <span className="font-semibold text-red-600">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lanzamientos 2024</span>
                  <span className="font-semibold text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Escombros Rastreados</span>
                  <span className="font-semibold text-gray-900">128K</span>
                </div>
              </div>
            </div>

            {/* Alertas recientes */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas Recientes</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">STARLINK-1234</p>
                    <p className="text-xs text-gray-600">Riesgo alto de colisión</p>
                  </div>
                  <span className="text-xs text-gray-500">2 min</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">ISS</p>
                    <p className="text-xs text-gray-600">Maniobra programada</p>
                  </div>
                  <span className="text-xs text-gray-500">15 min</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">GPS IIR-20</p>
                    <p className="text-xs text-gray-600">Operación normal</p>
                  </div>
                  <span className="text-xs text-gray-500">1h</span>
                </div>
              </div>
            </div>

            {/* Fuentes de datos */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuentes de Datos</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Space-Track.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">NASA APIs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">ESA Database</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">JAXA</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-400" suppressHydrationWarning>
                  Última actualización: {formatDate(new Date())}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de análisis avanzado */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Análisis Avanzado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">98.7%</div>
                <div className="text-sm text-gray-600">Precisión de Predicción</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2.3s</div>
                <div className="text-sm text-gray-600">Tiempo de Respuesta</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Monitoreo Continuo</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-gray-600">Disponibilidad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 