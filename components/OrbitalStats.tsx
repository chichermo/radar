'use client';
import React from 'react';
import { 
  Activity, 
  Satellite, 
  Orbit, 
  Target, 
  Zap, 
  Thermometer, 
  Gauge, 
  Navigation,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface OrbitalStatsProps {
  totalSatellites: number;
  activeSatellites: number;
  visibleOrbits: number;
  timeSpeed: number;
  lastUpdate: string;
  collisionAlerts: number;
  signalStrength: number;
  batteryLevel: number;
  temperature: number;
  velocity: number;
}

export default function OrbitalStats({
  totalSatellites,
  activeSatellites,
  visibleOrbits,
  timeSpeed,
  lastUpdate,
  collisionAlerts,
  signalStrength,
  batteryLevel,
  temperature,
  velocity
}: OrbitalStatsProps) {
  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-400';
    if (value >= thresholds.warning) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return <CheckCircle size={16} className="text-green-400" />;
    if (value >= thresholds.warning) return <AlertTriangle size={16} className="text-yellow-400" />;
    return <AlertTriangle size={16} className="text-red-400" />;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Activity size={20} className="mr-2" />
          Estadísticas Orbitales
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock size={14} />
          <span>Actualizado: {lastUpdate}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Satélites Totales */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <Satellite size={16} className="text-blue-400" />
            <span className="text-xs text-gray-400">Total</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalSatellites}</div>
          <div className="text-xs text-gray-400">Satélites</div>
        </div>

        {/* Satélites Activos */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-xs text-gray-400">Activos</span>
          </div>
          <div className="text-2xl font-bold text-white">{activeSatellites}</div>
          <div className="text-xs text-gray-400">
            {((activeSatellites / totalSatellites) * 100).toFixed(1)}% operativos
          </div>
        </div>

        {/* Órbitas Visibles */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <Orbit size={16} className="text-purple-400" />
            <span className="text-xs text-gray-400">Órbitas</span>
          </div>
          <div className="text-2xl font-bold text-white">{visibleOrbits}</div>
          <div className="text-xs text-gray-400">Trayectorias</div>
        </div>

        {/* Velocidad de Tiempo */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <Zap size={16} className="text-yellow-400" />
            <span className="text-xs text-gray-400">Velocidad</span>
          </div>
          <div className="text-2xl font-bold text-white">{timeSpeed}x</div>
          <div className="text-xs text-gray-400">Simulación</div>
        </div>
      </div>

      {/* Métricas de Sistema */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Fuerza de Señal */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Navigation size={16} className="text-cyan-400" />
              <span className="text-sm font-medium text-white">Fuerza de Señal</span>
            </div>
            {getStatusIcon(signalStrength, { good: 80, warning: 60 })}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  getStatusColor(signalStrength, { good: 80, warning: 60 }).replace('text-', 'bg-')
                }`}
                style={{ width: `${signalStrength}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(signalStrength, { good: 80, warning: 60 })}`}>
              {signalStrength}%
            </span>
          </div>
        </div>

        {/* Nivel de Batería */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Gauge size={16} className="text-green-400" />
              <span className="text-sm font-medium text-white">Batería</span>
            </div>
            {getStatusIcon(batteryLevel, { good: 70, warning: 30 })}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  getStatusColor(batteryLevel, { good: 70, warning: 30 }).replace('text-', 'bg-')
                }`}
                style={{ width: `${batteryLevel}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(batteryLevel, { good: 70, warning: 30 })}`}>
              {batteryLevel}%
            </span>
          </div>
        </div>

        {/* Temperatura */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Thermometer size={16} className="text-orange-400" />
              <span className="text-sm font-medium text-white">Temperatura</span>
            </div>
            {getStatusIcon(temperature, { good: 25, warning: 35 })}
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${getStatusColor(temperature, { good: 25, warning: 35 })}`}>
              {temperature.toFixed(1)}°C
            </span>
            <div className="text-xs text-gray-400">
              {temperature < 25 ? 'Óptima' : temperature < 35 ? 'Normal' : 'Alta'}
            </div>
          </div>
        </div>
      </div>

      {/* Alertas y Estado del Sistema */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alertas de Colisión */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-red-400" />
              <span className="text-sm font-medium text-white">Alertas de Colisión</span>
            </div>
            <span className="text-xs text-gray-400">Últimas 24h</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{collisionAlerts}</span>
            <div className="text-xs text-gray-400">
              {collisionAlerts === 0 ? 'Sin alertas' : 'Requiere atención'}
            </div>
          </div>
        </div>

        {/* Velocidad Orbital */}
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-white">Velocidad Orbital</span>
            </div>
            <span className="text-xs text-gray-400">Promedio</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{velocity.toFixed(1)}</span>
            <div className="text-xs text-gray-400">km/s</div>
          </div>
        </div>
      </div>

      {/* Estado General del Sistema */}
      <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">Estado del Sistema</span>
          </div>
          <span className="text-sm text-green-400 font-medium">Operativo</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Todos los sistemas funcionando correctamente. Monitoreo activo en tiempo real.
        </div>
      </div>
    </div>
  );
} 