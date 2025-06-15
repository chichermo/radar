'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar, 
  BarChart3, 
  PieChart,
  Satellite,
  AlertTriangle,
  Clock,
  MapPin
} from 'lucide-react';
import { formatNumber, formatTimeOnly } from '@/utils/formatters';

interface MetricData {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  unit: string;
  description: string;
  trend: number[];
  category: 'satellites' | 'collisions' | 'launches' | 'debris';
}

interface HistoricalMetricsProps {
  timeRange?: '24h' | '7d' | '30d' | '1y';
}

export default function HistoricalMetrics({ timeRange = '7d' }: HistoricalMetricsProps) {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular datos históricos
    const mockMetrics: MetricData[] = [
      {
        id: '1',
        name: 'Satélites Activos',
        value: 4852,
        change: 12.5,
        changeType: 'increase',
        unit: 'satélites',
        description: 'Total de satélites operativos en órbita',
        trend: [4800, 4810, 4820, 4830, 4840, 4850, 4852],
        category: 'satellites'
      },
      {
        id: '2',
        name: 'Eventos de Colisión',
        value: 23,
        change: -8.2,
        changeType: 'decrease',
        unit: 'eventos',
        description: 'Alertas de colisión detectadas',
        trend: [25, 24, 23, 22, 23, 24, 23],
        category: 'collisions'
      },
      {
        id: '3',
        name: 'Lanzamientos',
        value: 156,
        change: 15.3,
        changeType: 'increase',
        unit: 'lanzamientos',
        description: 'Lanzamientos exitosos este año',
        trend: [140, 145, 150, 152, 154, 155, 156],
        category: 'launches'
      },
      {
        id: '4',
        name: 'Escombros Espaciales',
        value: 128000,
        change: 2.1,
        changeType: 'increase',
        unit: 'objetos',
        description: 'Objetos de escombros rastreados',
        trend: [125000, 126000, 127000, 127500, 128000, 128000, 128000],
        category: 'debris'
      },
      {
        id: '5',
        name: 'Tiempo de Respuesta',
        value: 2.3,
        change: -12.5,
        changeType: 'decrease',
        unit: 'minutos',
        description: 'Tiempo promedio de respuesta a alertas',
        trend: [2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.3],
        category: 'collisions'
      },
      {
        id: '6',
        name: 'Cobertura Global',
        value: 98.7,
        change: 0.5,
        changeType: 'increase',
        unit: '%',
        description: 'Cobertura de monitoreo global',
        trend: [98.0, 98.2, 98.3, 98.4, 98.5, 98.6, 98.7],
        category: 'satellites'
      }
    ];

    setMetrics(mockMetrics);
    setIsLoading(false);
  }, [timeRange]);

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'satellites':
        return <Satellite className="h-5 w-5" />;
      case 'collisions':
        return <AlertTriangle className="h-5 w-5" />;
      case 'launches':
        return <BarChart3 className="h-5 w-5" />;
      case 'debris':
        return <PieChart className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const formatMetric = (value: number, unit: string) => {
    return `${formatNumber(value)} ${unit}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Métricas Históricas</h2>
          <p className="text-gray-600">Análisis de datos espaciales en tiempo real</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Últimos {timeRange}</span>
        </div>
      </div>

      {/* Métricas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            onClick={() => setSelectedMetric(metric)}
            className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(metric.category)}
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
              </div>
              <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                {getChangeIcon(metric.changeType)}
                <span className="text-sm font-medium">
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-2xl font-bold text-gray-900">
                {formatMetric(metric.value, metric.unit)}
              </div>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>

            {/* Mini gráfico de tendencia */}
            <div className="flex items-end space-x-1 h-12">
              {metric.trend.map((value, index) => {
                const maxValue = Math.max(...metric.trend);
                const height = (value / maxValue) * 100;
                return (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Detalles de métrica seleccionada */}
      {selectedMetric && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getCategoryIcon(selectedMetric.category)}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedMetric.name}</h3>
                <p className="text-gray-600">{selectedMetric.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedMetric(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">Valor Actual</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatMetric(selectedMetric.value, selectedMetric.unit)}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-semibold">Cambio</span>
              </div>
              <div className={`text-2xl font-bold ${getChangeColor(selectedMetric.changeType)}`}>
                {selectedMetric.change > 0 ? '+' : ''}{selectedMetric.change.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                <span className="font-semibold">Tendencia</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {selectedMetric.changeType === 'increase' ? '↗️' : 
                 selectedMetric.changeType === 'decrease' ? '↘️' : '→'}
              </div>
            </div>
          </div>

          {/* Gráfico de tendencia detallado */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Tendencia de los últimos 7 días</h4>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-end space-x-2 h-32">
                {selectedMetric.trend.map((value, index) => {
                  const maxValue = Math.max(...selectedMetric.trend);
                  const height = (value / maxValue) * 100;
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - index));
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer con información adicional */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>📊 Datos actualizados en tiempo real</span>
            <span>🔄 Actualización automática cada 5 minutos</span>
          </div>
          <div className="text-right">
            <p>Última actualización: {formatTimeOnly(new Date())}</p>
            <p className="text-xs">Fuente: APIs de Space-Track.org y NASA</p>
          </div>
        </div>
      </div>
    </div>
  );
} 