'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, MutableRefObject, forwardRef, useCallback, useMemo } from 'react';
import { GlobeMethods } from 'react-globe.gl';
import * as satellite from 'satellite.js';
import { Play, Pause, RotateCcw, RotateCw, ZoomIn, ZoomOut, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import React from 'react';
import CollisionAlert from './CollisionAlert';
import SpaceParticles, { StarField } from './SpaceParticles';

// Importar Three.js dinámicamente para evitar problemas de SSR
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
  showCollisionAlerts?: boolean;
  showParticles?: boolean;
}

const Globe = forwardRef<HTMLDivElement, GlobeProps>(({ 
  objects, 
  onSatelliteSelect, 
  selectedSatellite,
  showOrbitalPaths = true,
  showAtmosphere = true,
  timeSpeed = 1,
  isPlaying = true,
  onTimeControl,
  showCollisionAlerts = true,
  showParticles = true
}, ref) => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<OrbitalPoint[]>([]);
  const [orbitalPaths, setOrbitalPaths] = useState<OrbitalPath[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [hoveredPoint, setHoveredPoint] = useState<OrbitalPoint | null>(null);
  const [showCollisionModal, setShowCollisionModal] = useState(false);

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

  // Actualizar tiempo cada segundo para animar los puntos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 2000); // Actualizar cada 2 segundos para movimiento más suave

    return () => clearInterval(interval);
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
          // Generar posiciones más distribuidas alrededor del globo usando distribución Fibonacci
          const goldenRatio = (1 + Math.sqrt(5)) / 2;
          const angle = (index * 360 / goldenRatio) % 360;
          const height = 1 - (index / validTLEObjects.length) * 2; // Distribuir uniformemente en altura
          
          // Convertir a coordenadas esféricas
          const lat = Math.asin(height) * 180 / Math.PI;
          const lng = angle;
          
          // Agregar variación temporal para simular movimiento orbital
          const timeOffset = (currentTime.getTime() / 1000 + (index * 1000)) % 100000;
          const latVariation = Math.sin(timeOffset / 15000) * 3; // Variación de ±3 grados
          const lngVariation = Math.cos(timeOffset / 12000) * 8; // Variación de ±8 grados
          
          const finalLat = Math.max(-85, Math.min(85, lat + latVariation));
          const finalLng = ((lng + lngVariation + 180) % 360) - 180;
          
          // Validar coordenadas finales
          if (isNaN(finalLat) || isNaN(finalLng) || finalLat < -85 || finalLat > 85 || finalLng < -180 || finalLng > 180) {
            console.warn("Invalid coordinates calculated for:", tleObj.OBJECT_NAME, "lat:", finalLat, "lng:", finalLng);
            return null;
          }
          
          const point: OrbitalPoint = {
            lat: finalLat,
            lng: finalLng,
            size: 0.4 + (index * 0.05), // Tamaños más uniformes
            color: getSatelliteColor(tleObj.OBJECT_TYPE || 'unknown'),
            name: tleObj.OBJECT_NAME || `Satellite ${index + 1}`,
            type: tleObj.OBJECT_TYPE || 'Unknown',
            altitude: 400 + (index * 50), // Altitudes más variadas
            velocity: 7.5 + (index * 0.3), // Velocidades más variadas
            inclination: 45 + (index * 8), // Inclinaciones más variadas
            period: 90 + (index * 8), // Períodos más variados
            status: 'active'
          };
          
          return point;
        } catch (error) {
          console.error("Error calculating mock point for", tleObj.OBJECT_NAME, ":", error);
          return null;
        }
      })
      .filter((point): point is OrbitalPoint => point !== null);
  }, [validTLEObjects, currentTime, getSatelliteColor]);

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

  // Configurar interacción del globo después del montaje
  useEffect(() => {
    if (globeRef.current && !isLoading) {
      // Intentar configurar la interacción del globo
      const globe = globeRef.current;
      
      // Configurar controles de cámara si están disponibles
      if (globe.controls) {
        globe.controls.enableDamping = true;
        globe.controls.dampingFactor = 0.05;
        globe.controls.enableZoom = true;
        globe.controls.enablePan = true;
        globe.controls.enableRotate = true;
      }
    }
  }, [isLoading]);

  // Manejar clic en satélite
  const handlePointClick = useCallback((point: OrbitalPoint) => {
    onSatelliteSelect?.(point);
  }, [onSatelliteSelect]);

  // Manejar hover en satélite
  const handlePointHover = useCallback((point: OrbitalPoint | null) => {
    setHoveredPoint(point);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-gray-900 via-blue-900 to-black rounded-lg overflow-hidden">
      {/* Efectos de partículas espaciales */}
      {/* {showParticles && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <StarField count={300} />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <SpaceParticles 
              particleCount={500}
              speed={0.0005}
              size={1.5}
              color="#87CEEB"
            />
          </div>
        </>
      )} */}

      {/* Contenido principal del globo */}
      <div className="relative z-10 h-full">
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

        {/* Botón de alertas de colisión */}
        {showCollisionAlerts && (
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setShowCollisionModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Alertas</span>
              <span className="bg-white text-red-500 px-2 py-1 rounded-full text-xs font-bold">
                2
              </span>
            </button>
          </div>
        )}

        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : (
          <div ref={containerRef} className="w-full h-full relative">
            <GlobeGL
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              pointsData={points}
              pointColor="color"
              pointAltitude={0.02}
              pointResolution={12}
              pointLabel="name"
              pointLat="lat"
              pointLng="lng"
              pointRadius="size"
              onGlobeReady={() => {
                setIsLoading(false);
              }}
              onGlobeClick={(point: any) => {
                if (point && 'name' in point) {
                  onSatelliteSelect?.(point as OrbitalPoint);
                }
              }}
              onPointHover={(point: any) => {
                setHoveredPoint(point as OrbitalPoint);
              }}
            />
          </div>
        )}
      </div>

      {/* Modal de alertas de colisión */}
      <CollisionAlert 
        isOpen={showCollisionModal}
        onClose={() => setShowCollisionModal(false)}
      />
    </div>
  );
});

Globe.displayName = 'Globe';

export default Globe;
