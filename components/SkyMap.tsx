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

  // Validar que objects sea un array
  const validObjects = Array.isArray(objects) ? objects : [];

  // Renderizar objetos en el canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar estrellas de fondo
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      const opacity = Math.random() * 0.8 + 0.2;

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Dibujar objetos espaciales
    validObjects.forEach((obj, index) => {
      if (!obj.position) return;

      // Convertir coordenadas 3D a 2D (simplificado)
      const x = (obj.position.x / 1000000) % canvas.width;
      const y = (obj.position.y / 1000000) % canvas.height;
      
      // Asegurar que esté dentro del canvas
      const finalX = Math.max(10, Math.min(canvas.width - 10, x));
      const finalY = Math.max(10, Math.min(canvas.height - 10, y));

      // Color según el tipo
      const color = obj.isHazardous ? '#ef4444' : 
                   obj.type === 'asteroid' ? '#f97316' : '#3b82f6';

      // Dibujar objeto
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(finalX, finalY, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Borde
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Etiqueta
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.fillText(obj.name || `Obj ${index + 1}`, finalX + 10, finalY - 5);

      // Indicador de peligro
      if (obj.isHazardous) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(finalX, finalY, 10, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });
  }, [validObjects]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gray-900">
      {/* Mostrar error si existe */}
      {error && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Canvas para el mapa del cielo */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
        onClick={(e) => {
          // Lógica para detectar clics en objetos
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Buscar objeto cercano
          const clickedObject = validObjects.find((obj, index) => {
            if (!obj.position) return false;
            const objX = (obj.position.x / 1000000) % canvas.width;
            const objY = (obj.position.y / 1000000) % canvas.height;
            const distance = Math.sqrt((x - objX) ** 2 + (y - objY) ** 2);
            return distance < 20;
          });
          
          if (clickedObject) {
            setSelectedObject(clickedObject);
          }
        }}
      />

      {/* Información del objeto seleccionado */}
      {selectedObject && (
        <div className="absolute top-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white max-w-sm">
          <h3 className="font-bold text-lg mb-2">{selectedObject.name}</h3>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-400">Tipo:</span> {selectedObject.type}</p>
            <p><span className="text-gray-400">ID:</span> {selectedObject.id}</p>
            {selectedObject.position && (
              <>
                <p><span className="text-gray-400">X:</span> {selectedObject.position.x?.toFixed(2)} km</p>
                <p><span className="text-gray-400">Y:</span> {selectedObject.position.y?.toFixed(2)} km</p>
                <p><span className="text-gray-400">Z:</span> {selectedObject.position.z?.toFixed(2)} km</p>
              </>
            )}
            {selectedObject.isHazardous && (
              <p className="text-red-400 font-semibold">⚠️ Objeto peligroso</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Haz clic en otro objeto para ver más detalles
            </p>
          </div>
          <button
            onClick={() => setSelectedObject(null)}
            className="mt-3 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Leyenda */}
      <div className="absolute top-4 left-4 bg-gray-800/90 border border-gray-600 rounded-lg p-3 text-white">
        <h4 className="font-semibold text-sm mb-2">Leyenda</h4>
        <div className="space-y-1 text-xs">
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
        </div>
      </div>

      {/* Lista de objetos en el mapa */}
      <div className="absolute bottom-4 left-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Objetos en el mapa ({validObjects.length})</h3>
        <div className="max-h-32 overflow-y-auto">
          {validObjects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {validObjects.slice(0, 12).map((obj, index) => (
                <button
                  key={obj.id || index}
                  onClick={() => setSelectedObject(obj)}
                  className={`text-left p-2 rounded text-sm transition-colors ${
                    obj.isHazardous 
                      ? 'bg-red-900/50 border border-red-500 text-red-200' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
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
    </div>
  );
}