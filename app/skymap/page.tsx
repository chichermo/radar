"use client";

import React, { useState, useEffect } from 'react';
import SkyMap from '@/components/SkyMap';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { fetchAllSpaceObjects } from '@/services/spaceData';
import type { SpaceObject } from '@/types/space';

export default function SkyMapPage() {
  const [objects, setObjects] = useState<SpaceObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);
  const [showTrajectories, setShowTrajectories] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllSpaceObjects();
        setObjects(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos espaciales');
        console.error(err);
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mapa del Espacio</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <SkyMap 
            objects={filteredObjects}
            showTrajectories={showTrajectories}
          />
        </div>
        
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showHazardousOnly}
                  onChange={(e) => setShowHazardousOnly(e.target.checked)}
                  className="form-checkbox"
                />
                <span>Mostrar solo objetos peligrosos</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTrajectories}
                  onChange={(e) => setShowTrajectories(e.target.checked)}
                  className="form-checkbox"
                />
                <span>Mostrar trayectorias</span>
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
            <div className="space-y-2">
              <p>Total de objetos: {stats.total}</p>
              <p>Objetos peligrosos: {stats.hazardous}</p>
              <p>Asteroides: {stats.asteroids}</p>
              <p>Satélites: {stats.satellites}</p>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Información</h2>
            <p className="text-sm text-gray-600">
              Los datos se actualizan automáticamente cada 5 minutos.
              Los objetos peligrosos están marcados en rojo.
              Las trayectorias muestran el movimiento previsto en las próximas 24 horas.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 