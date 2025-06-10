'use client';
import React from 'react';
import { 
  Satellite, 
  MapPin, 
  Clock, 
  Activity, 
  Zap, 
  Thermometer, 
  Gauge, 
  Navigation,
  Target,
  Orbit,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Maximize2,
  Download,
  Share2
} from 'lucide-react';

interface SatelliteDetailsProps {
  satellite: {
    name: string;
    type: string;
    status: string;
    altitude: number;
    velocity: number;
    inclination: number;
    period: number;
    country?: string;
    purpose?: string;
    signal_strength?: number;
    battery_level?: number;
    temperature?: number;
    last_contact?: string;
    launch_date?: string;
    tle_line1?: string;
    tle_line2?: string;
    apogee?: number;
    perigee?: number;
    eccentricity?: number;
    right_ascension?: number;
    argument_of_perigee?: number;
    mean_anomaly?: number;
    mean_motion?: number;
  };
  isVisible: boolean;
  onClose: () => void;
  onMaximize?: () => void;
}

export default function SatelliteDetails({ 
  satellite, 
  isVisible, 
  onClose, 
  onMaximize 
}: SatelliteDetailsProps) {
  if (!isVisible) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-red-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GPS': 'text-green-400',
      'COMMUNICATION': 'text-red-400',
      'WEATHER': 'text-cyan-400',
      'MILITARY': 'text-yellow-400',
      'RESEARCH': 'text-purple-400',
      'STARLINK': 'text-indigo-400',
      'ISS': 'text-pink-400',
      'NAVIGATION': 'text-blue-400',
      'unknown': 'text-blue-400'
    };
    return colors[type.toUpperCase()] || colors['unknown'];
  };

  const getTypeBgColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GPS': 'bg-green-400/20 border-green-500/30',
      'COMMUNICATION': 'bg-red-400/20 border-red-500/30',
      'WEATHER': 'bg-cyan-400/20 border-cyan-500/30',
      'MILITARY': 'bg-yellow-400/20 border-yellow-500/30',
      'RESEARCH': 'bg-purple-400/20 border-purple-500/30',
      'STARLINK': 'bg-indigo-400/20 border-indigo-500/30',
      'ISS': 'bg-pink-400/20 border-pink-500/30',
      'NAVIGATION': 'bg-blue-400/20 border-blue-500/30',
      'unknown': 'bg-blue-400/20 border-blue-500/30'
    };
    return colors[type.toUpperCase()] || colors['unknown'];
  };

  const getMetricStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return { color: 'text-green-400', icon: <CheckCircle size={14} />, status: 'Óptimo' };
    if (value >= thresholds.warning) return { color: 'text-yellow-400', icon: <AlertTriangle size={14} />, status: 'Normal' };
    return { color: 'text-red-400', icon: <AlertTriangle size={14} />, status: 'Crítico' };
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getTypeBgColor(satellite.type)}`}>
            <Satellite size={24} className={getTypeColor(satellite.type)} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{satellite.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-sm ${getTypeColor(satellite.type)}`}>
                {satellite.type}
              </span>
              <span className="text-gray-400">•</span>
              <span className={`text-sm ${getStatusColor(satellite.status)}`}>
                {satellite.status}
              </span>
              {satellite.country && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-300">{satellite.country}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onMaximize && (
            <button
              onClick={onMaximize}
              className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
            >
              <Maximize2 size={16} className="text-gray-300" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
          >
            <X size={16} className="text-gray-300" />
          </button>
        </div>
      </div>

      {/* Información Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Parámetros Orbitales */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Orbit size={18} className="mr-2" />
            Parámetros Orbitales
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Altitud</span>
              <span className="text-white font-medium">{satellite.altitude.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Velocidad</span>
              <span className="text-white font-medium">{satellite.velocity.toFixed(2)} km/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Inclinación</span>
              <span className="text-white font-medium">{satellite.inclination.toFixed(1)}°</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Período</span>
              <span className="text-white font-medium">{satellite.period.toFixed(0)} min</span>
            </div>
            {satellite.apogee && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Apogeo</span>
                <span className="text-white font-medium">{satellite.apogee.toFixed(1)} km</span>
              </div>
            )}
            {satellite.perigee && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Perigeo</span>
                <span className="text-white font-medium">{satellite.perigee.toFixed(1)} km</span>
              </div>
            )}
          </div>
        </div>

        {/* Estado del Sistema */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Activity size={18} className="mr-2" />
            Estado del Sistema
          </h3>
          <div className="space-y-3">
            {satellite.signal_strength && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Fuerza de Señal</span>
                  <div className="flex items-center space-x-2">
                    {getMetricStatus(satellite.signal_strength, { good: 80, warning: 60 }).icon}
                    <span className={`font-medium ${getMetricStatus(satellite.signal_strength, { good: 80, warning: 60 }).color}`}>
                      {satellite.signal_strength}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getMetricStatus(satellite.signal_strength, { good: 80, warning: 60 }).color.replace('text-', 'bg-')
                    }`}
                    style={{ width: `${satellite.signal_strength}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {satellite.battery_level && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Nivel de Batería</span>
                  <div className="flex items-center space-x-2">
                    {getMetricStatus(satellite.battery_level, { good: 70, warning: 30 }).icon}
                    <span className={`font-medium ${getMetricStatus(satellite.battery_level, { good: 70, warning: 30 }).color}`}>
                      {satellite.battery_level}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getMetricStatus(satellite.battery_level, { good: 70, warning: 30 }).color.replace('text-', 'bg-')
                    }`}
                    style={{ width: `${satellite.battery_level}%` }}
                  ></div>
                </div>
              </div>
            )}

            {satellite.temperature && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Temperatura</span>
                <div className="flex items-center space-x-2">
                  <Thermometer size={14} className="text-orange-400" />
                  <span className="text-white font-medium">{satellite.temperature.toFixed(1)}°C</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información General */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Globe size={18} className="mr-2" />
            Información General
          </h3>
          <div className="space-y-3">
            {satellite.purpose && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Propósito</span>
                <span className="text-white font-medium text-right">{satellite.purpose}</span>
              </div>
            )}
            {satellite.launch_date && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Fecha de Lanzamiento</span>
                <span className="text-white font-medium">{satellite.launch_date}</span>
              </div>
            )}
            {satellite.last_contact && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Último Contacto</span>
                <span className="text-white font-medium">{satellite.last_contact}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Estado</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Datos TLE */}
      {satellite.tle_line1 && satellite.tle_line2 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Target size={18} className="mr-2" />
            Datos TLE (Two-Line Element)
          </h3>
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-mono break-all">
                {satellite.tle_line1}
              </p>
              <p className="text-xs text-gray-400 font-mono break-all">
                {satellite.tle_line2}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock size={14} />
          <span>Última actualización: hace 2 minutos</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-200">
            <Download size={14} className="text-gray-300" />
            <span className="text-sm text-gray-300">Exportar</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-200">
            <Share2 size={14} className="text-gray-300" />
            <span className="text-sm text-gray-300">Compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
} 