'use client';
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Satellite, Clock, MapPin } from 'lucide-react';
import { formatTimeOnly } from '@/utils/formatters';

interface CollisionEvent {
  id: string;
  satellite1: {
    name: string;
    noradId: string;
    distance: number;
  };
  satellite2: {
    name: string;
    noradId: string;
    distance: number;
  };
  timeToCollision: number; // en minutos
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  location: {
    lat: number;
    lng: number;
    altitude: number;
  };
  timestamp: string;
}

interface CollisionAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollisionAlert({ isOpen, onClose }: CollisionAlertProps) {
  const [collisions, setCollisions] = useState<CollisionEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener datos reales de colisiones
  useEffect(() => {
    const fetchRealCollisions = async () => {
      try {
        setIsLoading(true);
        
        // Obtener datos de satélites y debris desde APIs
        const [spaceTrackResponse, debrisResponse] = await Promise.allSettled([
          fetch('/api/space-track'),
          fetch('/api/space-debris')
        ]);

        const realCollisions: CollisionEvent[] = [];

        // Procesar datos de Space-Track
        if (spaceTrackResponse.status === 'fulfilled') {
          const spaceData = await spaceTrackResponse.value.json();
          if (spaceData.success && spaceData.data) {
            const satellites = spaceData.data.satellites || [];
            
            // Simular posibles colisiones basadas en datos reales
            satellites.slice(0, 2).forEach((satellite: any, index: number) => {
              realCollisions.push({
                id: `collision-${satellite.id || index}`,
                satellite1: {
                  name: satellite.name || `Satellite-${index}`,
                  noradId: satellite.id || `NORAD-${index}`,
                  distance: Math.random() * 5 + 0.5,
                },
                satellite2: {
                  name: 'Debris Object',
                  noradId: `DEBRIS-${Date.now()}`,
                  distance: Math.random() * 5 + 0.5,
                },
                timeToCollision: Math.floor(Math.random() * 60) + 10,
                risk: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW',
                location: {
                  lat: (Math.random() - 0.5) * 180,
                  lng: (Math.random() - 0.5) * 360,
                  altitude: Math.random() * 1000 + 200,
                },
                timestamp: new Date().toISOString(),
              });
            });
          }
        }

        setCollisions(realCollisions);
      } catch (error) {
        console.error('Error fetching collision data:', error);
        setCollisions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealCollisions();
    
    // Actualizar datos cada 5 minutos
    const interval = setInterval(fetchRealCollisions, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return 'text-red-500 bg-red-100 border-red-300';
      case 'MEDIUM':
        return 'text-yellow-500 bg-yellow-100 border-yellow-300';
      case 'LOW':
        return 'text-green-500 bg-green-100 border-green-300';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-300';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return '🚨';
      case 'MEDIUM':
        return '⚠️';
      case 'LOW':
        return 'ℹ️';
      default:
        return '📡';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-bold">Alertas de Colisión</h2>
            <span className="bg-white text-red-500 px-2 py-1 rounded-full text-sm font-bold">
              {collisions.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <span className="ml-2 text-gray-600">Cargando alertas...</span>
            </div>
          ) : collisions.length === 0 ? (
            <div className="text-center py-8">
              <Satellite className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay alertas de colisión activas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {collisions.map((collision) => (
                <div
                  key={collision.id}
                  className={`border rounded-lg p-4 ${getRiskColor(
                    collision.risk
                  )}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getRiskIcon(collision.risk)}
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Riesgo de Colisión {collision.risk}
                        </h3>
                        <p className="text-sm opacity-75">
                          {collision.satellite1.name} ↔ {collision.satellite2.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono">
                          {collision.timeToCollision} min
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-50 rounded p-3">
                      <h4 className="font-semibold text-sm mb-2">Satélite 1</h4>
                      <p className="text-sm">{collision.satellite1.name}</p>
                      <p className="text-xs opacity-75">
                        NORAD: {collision.satellite1.noradId}
                      </p>
                    </div>

                    <div className="bg-white bg-opacity-50 rounded p-3">
                      <h4 className="font-semibold text-sm mb-2">Satélite 2</h4>
                      <p className="text-sm">{collision.satellite2.name}</p>
                      <p className="text-xs opacity-75">
                        NORAD: {collision.satellite2.noradId}
                      </p>
                    </div>

                    <div className="bg-white bg-opacity-50 rounded p-3">
                      <h4 className="font-semibold text-sm mb-2">Ubicación</h4>
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {collision.location.lat.toFixed(2)}°,{' '}
                          {collision.location.lng.toFixed(2)}°
                        </span>
                      </div>
                      <p className="text-xs opacity-75">
                        Alt: {collision.location.altitude} km
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="font-semibold">Distancia mínima:</span>{' '}
                        {collision.satellite1.distance} km
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                        Ver en 3D
                      </button>
                      <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                        Más detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>🚨 Alto riesgo</span>
              <span>⚠️ Riesgo medio</span>
              <span>ℹ️ Riesgo bajo</span>
            </div>
            <div className="text-right">
              <p>Última actualización: {formatTimeOnly(new Date())}</p>
              <p className="text-xs">
                Datos simulados - En producción conectará con APIs reales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 