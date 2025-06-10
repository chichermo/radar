'use client';
import { useState, useEffect } from 'react';
import { AlertTriangle, X, Info, Clock, MapPin, Satellite } from 'lucide-react';

interface CollisionRisk {
  id: string;
  satellite1: string;
  satellite2: string;
  distance: number;
  timeToCollision: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  location: {
    lat: number;
    lng: number;
    altitude: number;
  };
}

interface CollisionAlertProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CollisionAlert({ isVisible, onClose }: CollisionAlertProps) {
  const [collisions, setCollisions] = useState<CollisionRisk[]>([]);
  const [selectedCollision, setSelectedCollision] = useState<CollisionRisk | null>(null);

  // Mock data de colisiones
  useEffect(() => {
    const mockCollisions: CollisionRisk[] = [
      {
        id: '1',
        satellite1: 'STARLINK-1234',
        satellite2: 'COSMOS-2251',
        distance: 0.8,
        timeToCollision: 2.5,
        riskLevel: 'high',
        probability: 0.15,
        location: {
          lat: 45.0,
          lng: -75.0,
          altitude: 550
        }
      },
      {
        id: '2',
        satellite1: 'GPS IIR-20',
        satellite2: 'IRIDIUM-33',
        distance: 1.2,
        timeToCollision: 5.8,
        riskLevel: 'medium',
        probability: 0.08,
        location: {
          lat: 30.0,
          lng: 120.0,
          altitude: 20200
        }
      },
      {
        id: '3',
        satellite1: 'ISS (ZARYA)',
        satellite2: 'DEBRIS-001',
        distance: 0.3,
        timeToCollision: 0.5,
        riskLevel: 'critical',
        probability: 0.25,
        location: {
          lat: 51.6,
          lng: -0.1,
          altitude: 408
        }
      }
    ];

    setCollisions(mockCollisions);
  }, []);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🟠';
      case 'critical': return '🔴';
      default: return '⚪';
    }
  };

  const formatTime = (hours: number) => {
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes} min`;
    }
    return `${hours.toFixed(1)} h`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700/50 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Alertas de Colisión</h2>
              <p className="text-gray-400 text-sm">
                {collisions.length} eventos de riesgo detectados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[60vh]">
          {/* Lista de colisiones */}
          <div className="w-1/2 border-r border-gray-700/50 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Eventos de Riesgo</h3>
              <div className="space-y-3">
                {collisions.map((collision) => (
                  <div
                    key={collision.id}
                    onClick={() => setSelectedCollision(collision)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedCollision?.id === collision.id
                        ? 'bg-blue-600/20 border-blue-500/50'
                        : 'bg-gray-800/50 border-gray-600/30 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getRiskIcon(collision.riskLevel)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(collision.riskLevel)}`}>
                            {collision.riskLevel.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-medium text-white text-sm mb-1">
                          {collision.satellite1} ↔ {collision.satellite2}
                        </h4>
                        <div className="space-y-1 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{formatTime(collision.timeToCollision)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Satellite size={12} />
                            <span>{collision.distance.toFixed(1)} km</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          {(collision.probability * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-400">probabilidad</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detalles de la colisión seleccionada */}
          <div className="w-1/2 p-6">
            {selectedCollision ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Detalles del Evento</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                      <h4 className="font-medium text-white mb-2">Satélites Involucrados</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">{selectedCollision.satellite1}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-gray-300">{selectedCollision.satellite2}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="text-blue-400" size={16} />
                          <span className="text-gray-400 text-sm">Tiempo restante</span>
                        </div>
                        <div className="text-xl font-bold text-white">
                          {formatTime(selectedCollision.timeToCollision)}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <Satellite className="text-green-400" size={16} />
                          <span className="text-gray-400 text-sm">Distancia</span>
                        </div>
                        <div className="text-xl font-bold text-white">
                          {selectedCollision.distance.toFixed(1)} km
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="text-purple-400" size={16} />
                        <span className="text-gray-400 text-sm">Ubicación del evento</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-300">
                        <div>Latitud: {selectedCollision.location.lat.toFixed(2)}°</div>
                        <div>Longitud: {selectedCollision.location.lng.toFixed(2)}°</div>
                        <div>Altitud: {selectedCollision.location.altitude.toFixed(0)} km</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                      <h4 className="font-medium text-white mb-2">Recomendaciones</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        {selectedCollision.riskLevel === 'critical' && (
                          <>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Maniobra de emergencia requerida inmediatamente</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Notificar a control de misión</span>
                            </div>
                          </>
                        )}
                        {selectedCollision.riskLevel === 'high' && (
                          <>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Evaluar maniobra preventiva</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Monitorear continuamente</span>
                            </div>
                          </>
                        )}
                        {selectedCollision.riskLevel === 'medium' && (
                          <>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Mantener vigilancia</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Actualizar en 1 hora</span>
                            </div>
                          </>
                        )}
                        {selectedCollision.riskLevel === 'low' && (
                          <>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Riesgo mínimo</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Monitoreo rutinario</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Info className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-400">Selecciona un evento para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-700/50 bg-gray-800/30">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sistema activo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span>Última actualización: hace 30 seg</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-colors duration-200">
              Exportar Reporte
            </button>
            <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600/30 hover:bg-gray-600/50 transition-colors duration-200">
              Configurar Alertas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 