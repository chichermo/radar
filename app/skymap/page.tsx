"use client";

import React from 'react';
import SkyMap from '@/components/SkyMap';
import { Star, Eye, Info } from 'lucide-react';

export default function SkyMapPage() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-400" />
              Mapa Estelar Interactivo
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Explora el firmamento en tiempo real con nuestro mapa estelar 3D. 
              Visualiza estrellas, constelaciones y objetos celestes con datos astronómicos precisos. 
              Navega libremente por el cosmos y descubre las maravillas del universo.
            </p>
          </div>
        </div>
      </header>

      {/* Panel de información */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-lg border border-blue-500/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Navegación 3D</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Arrastra para rotar la vista, usa la rueda del mouse para hacer zoom y 
            haz clic en las estrellas para obtener información detallada.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur-sm rounded-lg border border-green-500/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Datos Reales</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Todas las estrellas mostradas tienen posiciones, magnitudes y 
            tipos espectrales basados en datos astronómicos reales.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Info className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Constelaciones</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Activa las líneas de constelaciones para ver cómo los antiguos 
            conectaron las estrellas para formar figuras en el cielo.
          </p>
        </div>
      </div>

      {/* Mapa estelar principal */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden">
        <div className="h-[700px] relative">
          <SkyMap />
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Características del Mapa</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Más de 200 estrellas con datos reales</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Filtros por magnitud estelar</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Líneas de constelaciones interactivas</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Información detallada de cada estrella</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Renderizado 3D con efectos de partículas</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Estrellas Destacadas</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Sirius</span>
              <span className="text-blue-400">-1.46 mag</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Canopus</span>
              <span className="text-blue-400">-0.74 mag</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Arcturus</span>
              <span className="text-blue-400">-0.05 mag</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Vega</span>
              <span className="text-blue-400">0.03 mag</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Capella</span>
              <span className="text-blue-400">0.08 mag</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 