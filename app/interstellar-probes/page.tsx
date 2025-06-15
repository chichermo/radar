"use client";
import { useState, useEffect } from 'react';
import { Rocket, Activity, TrendingUp, AlertCircle } from 'lucide-react';

export default function InterstellarProbesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 h-64"></div>
              <div className="bg-gray-800 rounded-lg p-6 h-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-600/20 rounded-xl">
              <Rocket className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Sondas Interestelares
              </h1>
              <p className="text-gray-400">Voyager, New Horizons y más exploradores</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-gray-400 text-sm">Sondas Interestelares</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">1977</p>
                <p className="text-gray-400 text-sm">Primer lanzamiento</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">23B km</p>
                <p className="text-gray-400 text-sm">Distancia Voyager 1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Rocket className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">46 años</p>
                <p className="text-gray-400 text-sm">Misión más larga</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sondas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">Voyager 1</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Lanzamiento: 1977</p>
              <p className="text-gray-400 text-sm">Estado: Activo</p>
              <p className="text-gray-400 text-sm">Distancia: 23.8B km</p>
              <p className="text-gray-300 text-sm">Primera sonda en el espacio interestelar</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">Voyager 2</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Lanzamiento: 1977</p>
              <p className="text-gray-400 text-sm">Estado: Activo</p>
              <p className="text-gray-400 text-sm">Distancia: 19.9B km</p>
              <p className="text-gray-300 text-sm">Única sonda en visitar Urano y Neptuno</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">New Horizons</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Lanzamiento: 2006</p>
              <p className="text-gray-400 text-sm">Estado: Activo</p>
              <p className="text-gray-400 text-sm">Distancia: 8.5B km</p>
              <p className="text-gray-300 text-sm">Primera sonda en visitar Plutón</p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">Exploración Interestelar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Legado Científico</h3>
              <p className="text-gray-300 leading-relaxed">
                Las sondas Voyager han revolucionado nuestro entendimiento del sistema solar exterior 
                y han proporcionado datos únicos sobre el medio interestelar. Sus misiones continúan 
                enviando datos científicos valiosos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Futuro</h3>
              <p className="text-gray-300 leading-relaxed">
                Las sondas continuarán viajando por el espacio interestelar durante miles de años, 
                llevando mensajes de la humanidad a posibles civilizaciones extraterrestres en forma 
                de discos dorados con información sobre la Tierra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 