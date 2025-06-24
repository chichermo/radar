"use client";
import { useState, useEffect } from 'react';
import { Building, Activity, TrendingUp, AlertCircle } from 'lucide-react';

export default function TiangongPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 h-64 border border-gray-700/50"></div>
              <div className="bg-gray-800/50 rounded-lg p-6 h-64 border border-gray-700/50"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
              <Building className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Estación Espacial China
              </h1>
              <p className="text-gray-400">Tiangong - Seguimiento en tiempo real</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">Operacional</p>
                <p className="text-gray-400 text-sm">Estado</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-gray-400 text-sm">Módulos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">400 km</p>
                <p className="text-gray-400 text-sm">Altitud</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Building className="h-6 w-6 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">2022</p>
                <p className="text-gray-400 text-sm">Año de lanzamiento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información de la estación */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-4">Especificaciones Técnicas</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Masa total</p>
                <p className="text-white font-semibold">~100 toneladas</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Longitud</p>
                <p className="text-white font-semibold">~55 metros</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Inclinación orbital</p>
                <p className="text-white font-semibold">41.5°</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Período orbital</p>
                <p className="text-white font-semibold">~92 minutos</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-4">Módulos Principales</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-white font-semibold">Tianhe (Núcleo)</h3>
                <p className="text-gray-400 text-sm">Módulo principal de control y habitación</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-white font-semibold">Wentian (Laboratorio 1)</h3>
                <p className="text-gray-400 text-sm">Módulo de experimentos científicos</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-white font-semibold">Mengtian (Laboratorio 2)</h3>
                <p className="text-gray-400 text-sm">Módulo adicional de experimentos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Estación Espacial Tiangong</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Historia</h3>
              <p className="text-gray-300 leading-relaxed">
                Tiangong es la primera estación espacial modular de China. El módulo principal Tianhe 
                fue lanzado en abril de 2021, seguido por los módulos de laboratorio Wentian y Mengtian 
                en 2022. La estación está diseñada para operar durante al menos 10 años.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Misiones</h3>
              <p className="text-gray-300 leading-relaxed">
                La estación ha albergado múltiples tripulaciones de taikonautas chinos y ha realizado 
                numerosos experimentos científicos en microgravedad. Está preparada para futuras 
                misiones internacionales y colaboraciones científicas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 