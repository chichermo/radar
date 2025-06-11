"use client";

import React, { useState, useEffect } from 'react';
import SpaceObjectsTable from '@/components/SpaceObjectsTable';
import SpaceObjectsGlobe from '@/components/SpaceObjectsGlobe';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchAllSpaceObjects } from '@/services/spaceData';
import type { SpaceObject } from '@/types/space';
import { Globe, Table, Eye, EyeOff } from 'lucide-react';

export default function SkyMapPage() {
  const [objects, setObjects] = useState<SpaceObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'globe' | 'split'>('split');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllSpaceObjects();
        setObjects(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err : new Error('Error desconocido al cargar datos espaciales');
        setError(errorMessage);
        console.error('Error en SkyMapPage:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000); // Actualizar cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Objetos Espaciales
          </h1>
          <p className="text-gray-300">
            Visualización interactiva de objetos espaciales en tiempo real. 
            Monitorea asteroides, satélites y otros objetos cercanos a la Tierra.
          </p>
        </header>
        <LoadingSpinner message="Cargando datos espaciales..." size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Objetos Espaciales
            </h1>
            <p className="text-gray-300">
              Visualización interactiva de objetos espaciales en tiempo real. 
              Monitorea asteroides, satélites y otros objetos cercanos a la Tierra.
            </p>
          </div>
          
          {/* Controles de vista */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Tabla</span>
            </button>
            
            <button
              onClick={() => setViewMode('globe')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'globe'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>3D</span>
            </button>
            
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Dividido</span>
            </button>
          </div>
        </div>
      </header>

      {error && (
        <ErrorDisplay 
          error={error} 
          title="Error al cargar datos espaciales"
          onDismiss={() => setError(null)}
        />
      )}

      {/* Contenido según el modo de vista */}
      {viewMode === 'table' && (
        <div className="w-full">
          <SpaceObjectsTable 
            objects={objects}
            error={error ? error.toString() : undefined}
          />
        </div>
      )}

      {viewMode === 'globe' && (
        <div className="w-full h-[600px]">
          <SpaceObjectsGlobe 
            objects={objects}
            className="w-full h-full"
          />
        </div>
      )}

      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mapa 3D */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Vista 3D
            </h2>
            <div className="h-[500px]">
              <SpaceObjectsGlobe 
                objects={objects}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
              <Table className="w-5 h-5 mr-2" />
              Datos Detallados
            </h2>
            <div className="h-[500px] overflow-y-auto">
              <SpaceObjectsTable 
                objects={objects}
                error={error ? error.toString() : undefined}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 