"use client";

import React from 'react';
import { BarChart3, TrendingUp, Activity, Calendar, Satellite, Database, Globe, AlertTriangle } from 'lucide-react';

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
  }
};

export default function MetricsPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Métricas Espaciales</h1>
        <p className="subtitle max-w-2xl mx-auto">Consulta métricas clave sobre satélites, objetos, misiones y eventos espaciales en tiempo real.</p>
      </div>
      <div className="metricsGrid mb-8">
        <div className="glass-card p-6 flex flex-col items-center">
          <Satellite className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metricsData.statistics.totalSatellites.toLocaleString('es-ES')}</div>
          <div className="text-gray-400 text-sm">Satélites totales</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <Activity className="w-8 h-8 text-red-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metricsData.statistics.debrisTracked.toLocaleString('es-ES')}</div>
          <div className="text-gray-400 text-sm">Basura espacial rastreada</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <BarChart3 className="w-8 h-8 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metricsData.statistics.launches2024.toLocaleString('es-ES')}</div>
          <div className="text-gray-400 text-sm">Lanzamientos 2024</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <Database className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metricsData.statistics.dataPoints}</div>
          <div className="text-gray-400 text-sm">Puntos de datos</div>
        </div>
      </div>
      <div className="glass-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-gray-400 text-sm mb-1">Precisión de predicción</div>
          <div className="text-xl font-bold text-blue-400">{metricsData.statistics.predictionAccuracy}</div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="text-gray-400 text-sm mb-1">Tiempo de respuesta</div>
          <div className="text-xl font-bold text-green-400">{metricsData.statistics.responseTime}</div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="text-gray-400 text-sm mb-1">Uptime</div>
          <div className="text-xl font-bold text-yellow-400">{metricsData.statistics.uptime}</div>
        </div>
      </div>
    </div>
  );
} 