"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { Zap, AlertTriangle, BarChart3, RefreshCw } from 'lucide-react';

export default function GravitationalWavesPage() {
  const [wavesData, setWavesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWavesData();
  }, []);

  const fetchWavesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de ondas gravitacionales
      const response = await fetch('/api/gravitational-waves');
      if (response.ok) {
        const data = await response.json();
        setWavesData(data);
      } else {
        throw new Error('No se pudieron obtener datos de ondas gravitacionales');
      }
    } catch (error) {
      console.error('Error fetching gravitational waves data:', error);
      setError('No se pudieron cargar los datos de ondas gravitacionales');
      setWavesData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos de ondas gravitacionales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">{error}</p>
          <button 
            onClick={fetchWavesData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Ondas Gravitacionales</h1>
            <p className="text-gray-300 max-w-xl">
              Detección y monitoreo de eventos de ondas gravitacionales
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchWavesData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Ondas Gravitacionales */}
      {wavesData && wavesData.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Eventos Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wavesData.map((event: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{event.name || 'Evento'}</div>
                    <div className="text-gray-300 text-sm">{event.type || 'Tipo desconocido'}</div>
                    <div className="text-gray-400 text-xs">{event.date || 'Fecha desconocida'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-400">{event.amplitude || 'N/A'}</div>
                    <div className="text-gray-400 text-xs">{event.source || 'Fuente desconocida'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Datos Disponibles</h2>
            <p className="text-gray-300">
              No hay eventos recientes de ondas gravitacionales disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 