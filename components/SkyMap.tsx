"use client";

import React, { useState, useRef, useEffect } from 'react';
import type { SpaceObject } from '@/types/space';

interface SkyMapProps {
  objects: SpaceObject[];
  showTrajectories?: boolean;
  error?: string;
}

export default function SkyMap({ objects = [], showTrajectories = true, error }: SkyMapProps) {
  const [selectedObject, setSelectedObject] = useState<SpaceObject | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Estados para zoom y pan
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [showHelp, setShowHelp] = useState(true);

  // Validar que objects sea un array
  const validObjects = Array.isArray(objects) ? objects : [];

  // Mejorar la normalización de coordenadas para que ocupen todo el canvas
  function getObjectScreenPosition(obj: SpaceObject, width: number, height: number) {
    // Buscar los rangos de x/y en los objetos
    const xs = validObjects.map(o => o.position?.x ?? 0);
    const ys = validObjects.map(o => o.position?.y ?? 0);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // Normalizar a [0,1]
    const normX = (obj.position!.x - minX) / (maxX - minX || 1);
    const normY = (obj.position!.y - minY) / (maxY - minY || 1);
    // Escalar al canvas
    return {
      x: normX * width,
      y: normY * height
    };
  }

  // Renderizar objetos en el canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas para pantallas retina
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Aplicar transformaciones
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // Dibujar fondo con gradiente sutil
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(30, 58, 138, 0.1)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar objetos
    validObjects.forEach((obj) => {
      const x = (obj.position.x * canvas.width) / 100;
      const y = (obj.position.y * canvas.height) / 100;
      
      // Determinar color y tamaño basado en el tipo
      let color = '#3B82F6'; // Azul por defecto
      let size = 4;
      
      if (obj.type === 'asteroid') {
        color = obj.isHazardous ? '#EF4444' : '#F97316';
        size = obj.isHazardous ? 6 : 4;
      } else if (obj.type === 'satellite') {
        color = '#3B82F6';
        size = 4;
      } else if (obj.type === 'debris') {
        color = '#6B7280';
        size = 3;
      }

      // Dibujar objeto
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Agregar borde para objetos peligrosos
      if (obj.isHazardous) {
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Agregar brillo sutil
      ctx.beginPath();
      ctx.arc(x - 1, y - 1, size / 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
    });

    ctx.restore();
  }, [validObjects, zoom, offset, showTrajectories]);

  // Eventos del mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && lastPos) {
      const deltaX = e.clientX - lastPos.x;
      const deltaY = e.clientY - lastPos.y;
      setOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setLastPos(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * scale)));
  };

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
        <div className="text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Error al cargar el mapa</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header con controles */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="text-white font-semibold">Mapa del Cielo</h3>
          <span className="text-gray-400 text-sm">({validObjects.length} objetos)</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoom(1)}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            {showHelp ? 'Ocultar' : 'Mostrar'} Ayuda
          </button>
        </div>
      </div>

      {/* Canvas container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-96 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />
        
        {/* Mensaje de ayuda */}
        {showHelp && (
          <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-white max-w-xs">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Navegación
            </h4>
            <div className="space-y-1 text-xs text-gray-300">
              <p>• Arrastra para mover el mapa</p>
              <p>• Rueda del ratón para hacer zoom</p>
              <p>• Haz clic en objetos para ver detalles</p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-2 text-blue-400 hover:text-blue-300 text-xs"
            >
              Entendido
            </button>
          </div>
        )}

        {/* Leyenda mejorada */}
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-white">
          <h4 className="font-semibold text-sm mb-3">Leyenda</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Satélites</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Asteroides</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
              <span>Peligrosos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Basura Espacial</span>
            </div>
          </div>
        </div>

        {/* Panel de objetos */}
        <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-white max-h-32 overflow-y-auto">
          <h3 className="font-semibold text-sm mb-2">Objetos en el mapa ({validObjects.length})</h3>
          {validObjects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {validObjects.slice(0, 12).map((obj, index) => (
                <button
                  key={obj.id || index}
                  onClick={() => setSelectedObject(obj)}
                  className={`text-left p-2 rounded-lg text-sm transition-all duration-200 ${
                    obj.isHazardous 
                      ? 'bg-red-900/50 border border-red-500/50 text-red-200 hover:bg-red-900/70' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600/50'
                  }`}
                >
                  <div className="font-medium truncate">{obj.name || `Objeto ${index + 1}`}</div>
                  <div className="text-xs opacity-75">{obj.type}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm mb-2">No hay objetos para mostrar</p>
              <p className="text-gray-500 text-xs">Los objetos espaciales aparecerán aquí cuando se carguen los datos</p>
            </div>
          )}
        </div>
      </div>

      {/* Panel de detalles del objeto seleccionado */}
      {selectedObject && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedObject.name}</h3>
              <button
                onClick={() => setSelectedObject(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white capitalize">{selectedObject.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Posición:</span>
                <span className="text-white">({selectedObject.position.x.toFixed(2)}, {selectedObject.position.y.toFixed(2)})</span>
              </div>
              {selectedObject.magnitude && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Magnitud:</span>
                  <span className="text-white">{selectedObject.magnitude}</span>
                </div>
              )}
              {selectedObject.distance && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Distancia:</span>
                  <span className="text-white">{selectedObject.distance} km</span>
                </div>
              )}
              {selectedObject.isHazardous && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-red-400 font-medium">Objeto Potencialmente Peligroso</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}