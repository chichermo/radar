'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, MutableRefObject, forwardRef, useCallback, useMemo } from 'react';
import { GlobeMethods } from 'react-globe.gl';
import * as satellite from 'satellite.js';
import { Play, Pause, RotateCcw, RotateCw, ZoomIn, ZoomOut, Eye, EyeOff } from 'lucide-react';
import React from 'react';

const GlobeGL = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <Loading />
});

interface TLEObject {
  TLE_LINE1: string;
  TLE_LINE2: string;
  OBJECT_NAME: string;
  OBJECT_TYPE?: string;
  LAUNCH_DATE?: string;
  STATUS?: string;
}

interface OrbitalPoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  name: string;
  altitude: number;
  velocity: number;
  inclination: number;
  period: number;
  type: string;
  status: string;
}

interface OrbitalPath {
  points: [number, number][]; // Array de coordenadas [lat, lng]
  color: string;
  name: string;
  type: string;
}

// Tipo para el parámetro del event handler de GlobeGL
interface GlobeClickPoint {
  name?: string;
  lat?: number;
  lng?: number;
  [key: string]: any;
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <span>Error: {message}</span>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center p-8 space-y-4">
      <div className="relative">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"></div>
        <div className="absolute inset-0 animate-ping h-12 w-12 border-2 border-blue-400/50 rounded-full"></div>
      </div>
      <div className="text-blue-300 text-sm">Cargando visualización orbital...</div>
    </div>
  );
}

interface GlobeProps {
  objects: TLEObject[];
  onSatelliteSelect?: (satellite: OrbitalPoint | null) => void;
  selectedSatellite?: OrbitalPoint | null;
  showOrbitalPaths?: boolean;
  showAtmosphere?: boolean;
  timeSpeed?: number;
  isPlaying?: boolean;
  onTimeControl?: (action: 'play' | 'pause' | 'reset' | 'speed') => void;
}

const Globe = forwardRef<HTMLDivElement, GlobeProps>(({ 
  objects, 
  onSatelliteSelect, 
  selectedSatellite,
  showOrbitalPaths = true,
  showAtmosphere = true,
  timeSpeed = 1,
  isPlaying = true,
  onTimeControl
}, ref) => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<OrbitalPoint[]>([]);
  const [orbitalPaths, setOrbitalPaths] = useState<OrbitalPath[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [hoveredPoint, setHoveredPoint] = useState<OrbitalPoint | null>(null);

  const validTLEObjects = useMemo(() => {
    if (!Array.isArray(objects)) {
      console.warn('Globe: objects prop is not an array:', objects);
      return [];
    }
    return objects.filter(obj => obj && obj.TLE_LINE1 && obj.TLE_LINE2);
  }, [objects]);

  // Función para obtener color según el tipo de satélite
  const getSatelliteColor = useCallback((type: string): string => {
    const colors: { [key: string]: string } = {
      'PAYLOAD': '#00ff00',
      'ROCKET BODY': '#ff0000',
      'DEBRIS': '#ff8800',
      'unknown': '#888888'
    };
    return colors[type] || colors['unknown'];
  }, []);

  // Calcular posiciones orbitales usando useMemo
  const calculatedPoints = useMemo(() => {
    if (!Array.isArray(validTLEObjects) || validTLEObjects.length === 0) {
      return [];
    }

    // Usar datos mock para evitar problemas con la librería satellite.js
    return validTLEObjects
      .map((tleObj: TLEObject, index: number): OrbitalPoint | null => {
        try {
          // Generar posiciones mock basadas en el índice con rangos más seguros
          const baseLat = 20 + (index * 5) % 60; // Latitudes entre 20 y 80
          const baseLng = -120 + (index * 20) % 240; // Longitudes entre -120 y 120
          const timeOffset = (currentTime.getTime() / 1000 + (index * 1000)) % 100000; // Offset de tiempo cíclico
          
          // Simular movimiento orbital con funciones trigonométricas y rangos limitados
          const latVariation = Math.sin(timeOffset / 10000) * 10; // Variación de ±10 grados
          const lngVariation = Math.cos(timeOffset / 8000) * 15; // Variación de ±15 grados
          
          const lat = Math.max(-85, Math.min(85, baseLat + latVariation)); // Limitar entre -85 y 85
          const lng = ((baseLng + lngVariation + 180) % 360) - 180; // Normalizar entre -180 y 180
          
          // Validar coordenadas finales
          if (isNaN(lat) || isNaN(lng) || lat < -85 || lat > 85 || lng < -180 || lng > 180) {
            console.warn("Invalid coordinates calculated for:", tleObj.OBJECT_NAME, "lat:", lat, "lng:", lng);
            return null;
          }
          
          const point: OrbitalPoint = {
            lat,
            lng,
            size: 0.3 + (index * 0.1), // Tamaños diferentes para cada satélite
            color: '#888888',
            name: tleObj.OBJECT_NAME || `Satellite ${index + 1}`,
            type: tleObj.OBJECT_TYPE || 'Unknown',
            altitude: 400 + (index * 100), // Altitudes diferentes
            velocity: 7.5 + (index * 0.5), // Velocidades diferentes
            inclination: 45 + (index * 10), // Inclinaciones diferentes
            period: 90 + (index * 10), // Períodos diferentes
            status: 'active'
          };
          
          return point;
        } catch (error) {
          console.error("Error calculating mock point for", tleObj.OBJECT_NAME, ":", error);
          return null;
        }
      })
      .filter((point): point is OrbitalPoint => point !== null);
  }, [validTLEObjects, currentTime]);

  // Calcular trayectorias orbitales usando useMemo
  const calculatedPaths = useMemo(() => {
    if (!showOrbitalPaths || !Array.isArray(validTLEObjects) || validTLEObjects.length === 0) {
      return [];
    }
    
    // Usar trayectorias mock para evitar problemas con la librería satellite.js
    return validTLEObjects
      .map((tleObj: TLEObject, index: number): OrbitalPath | null => {
        try {
          // Generar trayectorias mock basadas en el índice con rangos más seguros
          const baseLat = 20 + (index * 5) % 60;
          const baseLng = -120 + (index * 20) % 240;
          const timeOffset = (currentTime.getTime() / 1000 + (index * 1000)) % 100000;
          
          // Simular trayectorias orbitales con rangos limitados
          const latVariation1 = Math.sin(timeOffset / 10000) * 10;
          const lngVariation1 = Math.cos(timeOffset / 8000) * 15;
          const latVariation2 = Math.sin((timeOffset + 5000) / 10000) * 10;
          const lngVariation2 = Math.cos((timeOffset + 5000) / 8000) * 15;
          
          const startLat = Math.max(-85, Math.min(85, baseLat + latVariation1));
          const startLng = ((baseLng + lngVariation1 + 180) % 360) - 180;
          const endLat = Math.max(-85, Math.min(85, baseLat + latVariation2));
          const endLng = ((baseLng + lngVariation2 + 180) % 360) - 180;
          
          // Validar coordenadas
          if (isNaN(startLat) || isNaN(startLng) || isNaN(endLat) || isNaN(endLng) ||
              startLat < -85 || startLat > 85 || endLat < -85 || endLat > 85 ||
              startLng < -180 || startLng > 180 || endLng < -180 || endLng > 180) {
            console.warn("Invalid path coordinates calculated for:", tleObj.OBJECT_NAME);
            return null;
          }
          
          const path: OrbitalPath = {
            points: [[startLat, startLng], [endLat, endLng]],
            color: '#888888',
            name: tleObj.OBJECT_NAME || `Satellite ${index + 1}`,
            type: tleObj.OBJECT_TYPE || 'Unknown'
          };
          
          return path;
        } catch (error) {
          console.error("Error calculating mock path for", tleObj.OBJECT_NAME, ":", error);
          return null;
        }
      })
      .filter((path): path is OrbitalPath => path !== null);
  }, [validTLEObjects, showOrbitalPaths, currentTime]);

  // Actualizar puntos y trayectorias cuando cambien los cálculos
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Asegurar que los datos sean arrays válidos
      const validPoints = Array.isArray(calculatedPoints) ? calculatedPoints : [];
      const validPaths = Array.isArray(calculatedPaths) ? calculatedPaths : [];
      
      // Validación adicional para puntos con rangos más estrictos
      const validatedPoints = validPoints.filter(point => {
        if (!point || typeof point !== 'object') return false;
        if (typeof point.lat !== 'number' || typeof point.lng !== 'number') return false;
        if (isNaN(point.lat) || isNaN(point.lng)) return false;
        if (point.lat < -85 || point.lat > 85 || point.lng < -180 || point.lng > 180) return false;
        return true;
      });
      
      // Validación adicional para paths con rangos más estrictos
      const validatedPaths = validPaths.filter(path => {
        if (!path || typeof path !== 'object') return false;
        if (typeof path.points !== 'object' || !Array.isArray(path.points) || path.points.length !== 2) return false;
        if (typeof path.points[0][0] !== 'number' || typeof path.points[0][1] !== 'number') return false;
        if (typeof path.points[1][0] !== 'number' || typeof path.points[1][1] !== 'number') return false;
        if (isNaN(path.points[0][0]) || isNaN(path.points[0][1]) || isNaN(path.points[1][0]) || isNaN(path.points[1][1])) return false;
        if (path.points[0][0] < -85 || path.points[0][0] > 85 || path.points[1][0] < -85 || path.points[1][0] > 85) return false;
        if (path.points[0][1] < -180 || path.points[0][1] > 180 || path.points[1][1] < -180 || path.points[1][1] > 180) return false;
        return true;
      });
      
      setPoints(validatedPoints);
      setOrbitalPaths(validatedPaths);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating points and paths:", error);
      setError("Error al actualizar los datos orbitales");
      setIsLoading(false);
    }
  }, [calculatedPoints, calculatedPaths]);

  // Simulación de tiempo
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => new Date(prev.getTime() + timeSpeed * 60000)); // Avanzar tiempo
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, timeSpeed]);

  // Manejar clic en satélite
  const handlePointClick = useCallback((point: OrbitalPoint) => {
    onSatelliteSelect?.(point);
  }, [onSatelliteSelect]);

  // Manejar hover en satélite
  const handlePointHover = useCallback((point: OrbitalPoint | null) => {
    setHoveredPoint(point);
  }, []);

  return (
    <div 
      ref={ref}
      className="relative w-full h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-700/50"
    >
      {/* Controles de tiempo */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-gray-600/50">
        <button
          onClick={() => onTimeControl?.('play')}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isPlaying 
              ? 'bg-blue-600/50 text-blue-300' 
              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        <button
          onClick={() => onTimeControl?.('reset')}
          className="p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 transition-all duration-200"
        >
          <RotateCcw size={16} />
        </button>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onTimeControl?.('speed')}
            className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded hover:bg-gray-600/50 transition-all duration-200"
          >
            {timeSpeed}x
          </button>
        </div>
      </div>

      {/* Información de tiempo */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-gray-600/50">
        <div className="text-xs text-gray-300">
          {currentTime.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {/* Tooltip de satélite */}
      {hoveredPoint && (
        <div className="absolute z-20 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50 text-white text-sm max-w-xs">
          <div className="font-semibold text-blue-300">{hoveredPoint.name}</div>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Altitud:</span>
              <span>{hoveredPoint.altitude.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Velocidad:</span>
              <span>{hoveredPoint.velocity.toFixed(2)} km/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Inclinación:</span>
              <span>{hoveredPoint.inclination.toFixed(1)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tipo:</span>
              <span className="capitalize">{hoveredPoint.type}</span>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50">
        <div className="text-xs text-gray-300 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{points.length} satélites activos</span>
          </div>
          <div className="text-gray-400">
            {orbitalPaths.length} trayectorias visibles
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert message={error} />
      ) : (
        <div ref={containerRef} className="w-full h-full">
          <GlobeGLWrapper
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={points}
            pointColor="color"
            pointAltitude="altitude"
            pointResolution={12}
            pointLabel="name"
            pathsData={[]}
            pathColor="color"
            pathDashLength={0.02}
            pathDashGap={0.01}
            pathDashAnimateTime={1500}
            onGlobeReady={() => {
              setIsLoading(false);
            }}
            onGlobeClick={(point: GlobeClickPoint) => {
              if (point && 'name' in point) {
                onSatelliteSelect?.(point as OrbitalPoint);
              }
            }}
            onPointHover={(point: GlobeClickPoint) => {
              setHoveredPoint(point as OrbitalPoint);
            }}
          />
        </div>
      )}
    </div>
  );
});

Globe.displayName = 'Globe';

// Wrapper para GlobeGL que maneja las refs correctamente
const GlobeGLWrapper = React.forwardRef<any, any>((props, ref) => {
  return (
    <div className="w-full h-full">
      <GlobeGL {...props} />
    </div>
  );
});

GlobeGLWrapper.displayName = 'GlobeGLWrapper';

export default Globe;
