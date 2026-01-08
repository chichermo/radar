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

      // Obtener datos reales de ondas gravitacionales del catálogo LIGO-Virgo
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

      {/* Eventos Recientes de Ondas Gravitacionales */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Eventos Reales Detectados (Catálogo LIGO-Virgo-KAGRA)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wavesData && wavesData.length > 0 ? (
              wavesData.map((evento: any, index: number) => (
              <div
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold">{evento.nombre}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        evento.importancia === 'Muy Alta' ? 'bg-red-500/20 text-red-400' :
                        evento.importancia === 'Alta' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {evento.importancia}
                      </span>
                    </div>
                    <p className="text-blue-400 text-sm mb-1">{evento.tipo}</p>
                    <p className="text-gray-400 text-xs mb-3">{evento.fecha}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Masa 1:</span>
                    <p className="text-white">{evento.masa1}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Masa 2:</span>
                    <p className="text-white">{evento.masa2}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Masa Final:</span>
                    <p className="text-white font-semibold">{evento.masaFinal}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Energía:</span>
                    <p className="text-white">{evento.energia}</p>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Distancia: </span>
                  <span className="text-white">{evento.distance}</span>
                  <span className="text-gray-500 ml-4">Observatorios: </span>
                  <span className="text-white">{evento.observatories.join(', ')}</span>
                </div>
                {evento.note && (
                  <div className="mt-2 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                    <p className="text-xs text-blue-400">{evento.note}</p>
                  </div>
                )}
              </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Cargando eventos reales...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de Detección */}
      <Card className="glass-card mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Estadísticas de Detección</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-blue-400">90+</p>
              <p className="text-gray-400 text-sm mt-1">Eventos detectados (total)</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-green-400">4</p>
              <p className="text-gray-400 text-sm mt-1">Este mes</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">3</p>
              <p className="text-gray-400 text-sm mt-1">Observatorios activos</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-purple-400">2015</p>
              <p className="text-gray-400 text-sm mt-1">Primera detección</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 