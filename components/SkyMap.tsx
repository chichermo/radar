"use client";

import React, { useState, useRef } from 'react';
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
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
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
                <p><span className="text-gray-400">X:</span> {selectedObject.position.x?.toFixed(2)}</p>
                <p><span className="text-gray-400">Y:</span> {selectedObject.position.y?.toFixed(2)}</p>
                <p><span className="text-gray-400">Z:</span> {selectedObject.position.z?.toFixed(2)}</p>
              </>
            )}
            {selectedObject.isHazardous && (
              <p className="text-red-400 font-semibold">⚠️ Objeto peligroso</p>
            )}
          </div>
          <button
            onClick={() => setSelectedObject(null)}
            className="mt-3 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Cerrar
          </button>
        </div>
      )}

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
            <p className="text-gray-400 text-sm">No hay objetos para mostrar</p>
          )}
        </div>
      </div>

      {/* Contador de objetos */}
      <div className="absolute top-4 left-4 bg-gray-800/80 border border-gray-600 rounded px-3 py-1">
        <p className="text-sm text-gray-300">
          {validObjects.length} objetos en el mapa
        </p>
      </div>
    </div>
  );
}