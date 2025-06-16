"use client";

import React from 'react';
import { Camera } from 'lucide-react';

export default function VeraRubinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Vera C. Rubin Observatory</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            El Legacy Survey of Space and Time (LSST) del Observatorio Vera C. Rubin está revolucionando 
            la astronomía con su capacidad de mapear todo el cielo visible cada pocas noches.
          </p>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Especificaciones del Telescopio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">Telescopio</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Apertura: 8.4 metros</li>
                <li>• Campo de visión: 9.6 grados²</li>
                <li>• Filtros: u, g, r, i, z, y</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-2">Cámara LSST</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 3.2 gigapíxeles</li>
                <li>• 189 sensores CCD</li>
                <li>• 15 segundos por imagen</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Producción de Datos</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 15 TB por noche</li>
                <li>• 20 millones de alertas/noche</li>
                <li>• 37 mil millones de objetos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 