'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Orbit, Target, MapPin, Clock, TrendingUp, Eye, EyeOff } from 'lucide-react';

interface OrbitalTrajectoryProps {
  satellite: {
    name: string;
    type: string;
    altitude: number;
    inclination: number;
    period: number;
    apogee?: number;
    perigee?: number;
    eccentricity?: number;
  };
  showTrajectory: boolean;
  showGroundTrack: boolean;
  showOrbitLines: boolean;
  timeSpeed: number;
  isPlaying: boolean;
}

export default function OrbitalTrajectory({
  satellite,
  showTrajectory,
  showGroundTrack,
  showOrbitLines,
  timeSpeed,
  isPlaying
}: OrbitalTrajectoryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trajectoryPoints, setTrajectoryPoints] = useState<Array<{x: number, y: number, z: number}>>([]);
  const [groundTrackPoints, setGroundTrackPoints] = useState<Array<{lat: number, lng: number}>>([]);
  const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0, z: 0});

  // Simular puntos de trayectoria orbital
  useEffect(() => {
    const points = [];
    const groundPoints = [];
    
    // Generar puntos de órbita elíptica
    for (let i = 0; i < 360; i += 5) {
      const angle = (i * Math.PI) / 180;
      const radius = satellite.altitude + 6371; // Radio de la Tierra + altitud
      
      // Posición en 3D
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle) * Math.cos((satellite.inclination * Math.PI) / 180);
      const z = radius * Math.sin(angle) * Math.sin((satellite.inclination * Math.PI) / 180);
      
      points.push({x, y, z});
      
      // Proyección en superficie terrestre
      const lat = Math.asin(z / radius) * (180 / Math.PI);
      const lng = Math.atan2(y, x) * (180 / Math.PI);
      groundPoints.push({lat, lng});
    }
    
    setTrajectoryPoints(points);
    setGroundTrackPoints(groundPoints);
  }, [satellite]);

  // Animar posición del satélite
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const now = Date.now() * timeSpeed / 1000;
      const angle = (now / (satellite.period * 60)) * 2 * Math.PI;
      const radius = satellite.altitude + 6371;
      
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle) * Math.cos((satellite.inclination * Math.PI) / 180);
      const z = radius * Math.sin(angle) * Math.sin((satellite.inclination * Math.PI) / 180);
      
      setCurrentPosition({x, y, z});
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, timeSpeed, satellite]);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GPS': '#10b981',
      'COMMUNICATION': '#ef4444',
      'WEATHER': '#06b6d4',
      'MILITARY': '#eab308',
      'RESEARCH': '#8b5cf6',
      'STARLINK': '#6366f1',
      'ISS': '#ec4899',
      'NAVIGATION': '#3b82f6',
      'unknown': '#3b82f6'
    };
    return colors[type.toUpperCase()] || colors['unknown'];
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Orbit size={20} className="mr-2" />
          Trayectoria Orbital: {satellite.name}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getTypeColor(satellite.type) }}></div>
            <span>{satellite.type}</span>
          </div>
        </div>
      </div>

      {/* Canvas para visualización 3D */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-gray-900 rounded-lg border border-gray-600/30"
          style={{ background: 'radial-gradient(circle at center, #1f2937 0%, #111827 100%)' }}
        />
        
        {/* Overlay de información */}
        <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600/30">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm">
              <Target size={12} className="text-blue-400" />
              <span className="text-gray-300">Posición Actual</span>
            </div>
            <div className="text-xs text-gray-400">
              X: {currentPosition.x.toFixed(1)} km
            </div>
            <div className="text-xs text-gray-400">
              Y: {currentPosition.y.toFixed(1)} km
            </div>
            <div className="text-xs text-gray-400">
              Z: {currentPosition.z.toFixed(1)} km
            </div>
          </div>
        </div>

        {/* Controles de visualización */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${
              showTrajectory 
                ? 'bg-blue-600/50 text-blue-300' 
                : 'bg-gray-700/50 text-gray-400'
            }`}
            title="Mostrar/Ocultar Trayectoria"
          >
            <Orbit size={16} />
          </button>
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${
              showGroundTrack 
                ? 'bg-green-600/50 text-green-300' 
                : 'bg-gray-700/50 text-gray-400'
            }`}
            title="Mostrar/Ocultar Trayectoria Terrestre"
          >
            <MapPin size={16} />
          </button>
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${
              showOrbitLines 
                ? 'bg-purple-600/50 text-purple-300' 
                : 'bg-gray-700/50 text-gray-400'
            }`}
            title="Mostrar/Ocultar Líneas de Órbita"
          >
            <TrendingUp size={16} />
          </button>
        </div>
      </div>

      {/* Información de la órbita */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
          <div className="flex items-center space-x-2 mb-1">
            <Orbit size={14} className="text-blue-400" />
            <span className="text-xs text-gray-400">Altitud</span>
          </div>
          <div className="text-lg font-bold text-white">{satellite.altitude.toFixed(0)} km</div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp size={14} className="text-green-400" />
            <span className="text-xs text-gray-400">Inclinación</span>
          </div>
          <div className="text-lg font-bold text-white">{satellite.inclination.toFixed(1)}°</div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
          <div className="flex items-center space-x-2 mb-1">
            <Clock size={14} className="text-purple-400" />
            <span className="text-xs text-gray-400">Período</span>
          </div>
          <div className="text-lg font-bold text-white">{satellite.period.toFixed(0)} min</div>
        </div>

        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
          <div className="flex items-center space-x-2 mb-1">
            <Target size={14} className="text-orange-400" />
            <span className="text-xs text-gray-400">Velocidad</span>
          </div>
          <div className="text-lg font-bold text-white">{timeSpeed}x</div>
        </div>
      </div>

      {/* Trayectoria terrestre */}
      {showGroundTrack && (
        <div className="mb-6">
          <h4 className="text-md font-semibold text-white mb-3 flex items-center">
            <MapPin size={16} className="mr-2" />
            Trayectoria Terrestre
          </h4>
          <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
            <div className="text-sm text-gray-300 mb-3">
              Proyección de la órbita sobre la superficie terrestre
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {groundTrackPoints.slice(0, 4).map((point, index) => (
                <div key={index} className="text-xs">
                  <div className="text-gray-400">Punto {index + 1}</div>
                  <div className="text-white">
                    {point.lat.toFixed(2)}°, {point.lng.toFixed(2)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Parámetros orbitales detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-white flex items-center">
            <Orbit size={16} className="mr-2" />
            Parámetros Orbitales
          </h4>
          <div className="space-y-3">
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
            {satellite.eccentricity && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Excentricidad</span>
                <span className="text-white font-medium">{satellite.eccentricity.toFixed(4)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Radio Orbital</span>
              <span className="text-white font-medium">{(satellite.altitude + 6371).toFixed(0)} km</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-semibold text-white flex items-center">
            <Activity size={16} className="mr-2" />
            Estado de Visualización
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Trayectoria</span>
              <div className="flex items-center space-x-2">
                {showTrajectory ? <Eye size={14} className="text-green-400" /> : <EyeOff size={14} className="text-red-400" />}
                <span className={`text-sm ${showTrajectory ? 'text-green-400' : 'text-red-400'}`}>
                  {showTrajectory ? 'Visible' : 'Oculta'}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Trayectoria Terrestre</span>
              <div className="flex items-center space-x-2">
                {showGroundTrack ? <Eye size={14} className="text-green-400" /> : <EyeOff size={14} className="text-red-400" />}
                <span className={`text-sm ${showGroundTrack ? 'text-green-400' : 'text-red-400'}`}>
                  {showGroundTrack ? 'Visible' : 'Oculta'}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Líneas de Órbita</span>
              <div className="flex items-center space-x-2">
                {showOrbitLines ? <Eye size={14} className="text-green-400" /> : <EyeOff size={14} className="text-red-400" />}
                <span className={`text-sm ${showOrbitLines ? 'text-green-400' : 'text-red-400'}`}>
                  {showOrbitLines ? 'Visible' : 'Oculta'}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Animación</span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className={`text-sm ${isPlaying ? 'text-green-400' : 'text-red-400'}`}>
                  {isPlaying ? 'Reproduciendo' : 'Pausada'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 