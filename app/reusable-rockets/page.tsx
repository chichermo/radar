"use client";
import { useState, useEffect } from 'react';
import { Rocket, Activity, TrendingUp, AlertCircle } from 'lucide-react';

export default function ReusableRocketsPage() {
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
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Rocket className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Cohetes Reutilizables
              </h1>
              <p className="text-gray-400">SpaceX, Blue Origin y el futuro del lanzamiento espacial</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">200+</p>
                <p className="text-gray-400 text-sm">Aterrizajes exitosos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">90%</p>
                <p className="text-gray-400 text-sm">Reducción de costos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">15</p>
                <p className="text-gray-400 text-sm">Reutilizaciones máx</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Rocket className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">2015</p>
                <p className="text-gray-400 text-sm">Primer aterrizaje</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empresas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">SpaceX Falcon 9</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Primer vuelo: 2010</p>
              <p className="text-gray-400 text-sm">Aterrizajes: 200+</p>
              <p className="text-gray-400 text-sm">Reutilizaciones: 15</p>
              <p className="text-gray-300 text-sm">Cohete más reutilizado de la historia</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">Blue Origin New Shepard</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Primer vuelo: 2015</p>
              <p className="text-gray-400 text-sm">Aterrizajes: 20+</p>
              <p className="text-gray-400 text-sm">Reutilizaciones: 8</p>
              <p className="text-gray-300 text-sm">Turismo espacial suborbital</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">SpaceX Starship</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Desarrollo: Activo</p>
              <p className="text-gray-400 text-sm">Capacidad: 100+ ton</p>
              <p className="text-gray-400 text-sm">Destino: Marte</p>
              <p className="text-gray-300 text-sm">Cohete más potente jamás construido</p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">Revolución Espacial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Impacto Económico</h3>
              <p className="text-gray-300 leading-relaxed">
                Los cohetes reutilizables han revolucionado la industria espacial, reduciendo 
                drásticamente los costos de lanzamiento y haciendo el espacio más accesible 
                para empresas privadas y agencias gubernamentales.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Sostenibilidad</h3>
              <p className="text-gray-300 leading-relaxed">
                La reutilización de cohetes no solo reduce costos, sino que también minimiza 
                el impacto ambiental al reducir la cantidad de desechos espaciales y materiales 
                necesarios para cada misión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 