"use client";

import React, { useState, useEffect } from 'react';
import SkyMap from '@/components/SkyMap';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchAllSpaceObjects } from '@/services/spaceData';
import type { SpaceObject } from '@/types/space';

export default function SkyMapPage() {
  const [objects, setObjects] = useState<SpaceObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | null>(null);
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);
  const [showTrajectories, setShowTrajectories] = useState(true);

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

  const filteredObjects = showHazardousOnly 
    ? objects.filter(obj => obj.isHazardous)
    : objects;

  const stats = {
    total: objects.length,
    hazardous: objects.filter(obj => obj.isHazardous).length,
    asteroids: objects.filter(obj => obj.type === 'asteroid').length,
    satellites: objects.filter(obj => obj.type === 'satellite').length
  };

  if (loading) {
    return (
      <div className="space-y-6 ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Mapa del Cielo
          </h1>
          <p className="text-gray-300">
            Visualización de objetos espaciales en tiempo real. 
            Monitorea asteroides, satélites y otros objetos cercanos a la Tierra.
          </p>
        </header>
        <LoadingSpinner message="Cargando datos espaciales..." size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Mapa del Cielo
        </h1>
        <p className="text-gray-300">
          Visualización de objetos espaciales en tiempo real. 
          Monitorea asteroides, satélites y otros objetos cercanos a la Tierra.
        </p>
      </header>

      {error && (
        <ErrorDisplay 
          error={error} 
          title="Error al cargar datos espaciales"
          onDismiss={() => setError(null)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <SkyMap 
              objects={filteredObjects}
              showTrajectories={showTrajectories}
              error={error ? error.toString() : undefined}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showHazardousOnly}
                  onChange={(e) => setShowHazardousOnly(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">Mostrar solo objetos peligrosos</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTrajectories}
                  onChange={(e) => setShowTrajectories(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300">Mostrar trayectorias</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Estadísticas</h2>
            <div className="space-y-2 text-gray-300">
              <p>Total de objetos: <span className="text-white font-semibold">{stats.total}</span></p>
              <p>Objetos peligrosos: <span className="text-red-400 font-semibold">{stats.hazardous}</span></p>
              <p>Asteroides: <span className="text-orange-400 font-semibold">{stats.asteroids}</span></p>
              <p>Satélites: <span className="text-blue-400 font-semibold">{stats.satellites}</span></p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Información</h2>
            <div className="text-sm text-gray-400 space-y-2">
              <p>• Los datos se actualizan automáticamente cada 5 minutos</p>
              <p>• Los objetos peligrosos están marcados en rojo</p>
              <p>• Haz clic en un objeto para ver más detalles</p>
              <p>• Usa los filtros para personalizar la vista</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 