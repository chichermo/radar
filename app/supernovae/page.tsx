"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { Star, Zap, AlertTriangle, BarChart3, RefreshCw } from 'lucide-react';

export default function SupernovaePage() {
  const [supernovaeData, setSupernovaeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSupernovaeData();
  }, []);

  const fetchSupernovaeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener datos reales de supernovas
      const response = await fetch('/api/supernovae');
      if (response.ok) {
        const data = await response.json();
        setSupernovaeData(data);
      } else {
        throw new Error('No se pudieron obtener datos de supernovas');
      }
    } catch (error) {
      console.error('Error fetching supernovae data:', error);
      setError('No se pudieron cargar los datos de supernovas');
      setSupernovaeData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos de supernovas...</p>
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
            onClick={fetchSupernovaeData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Supernovas</h1>
            <p className="text-gray-300 max-w-xl">
              Descubrimientos y monitoreo de supernovas recientes
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchSupernovaeData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Supernovas Recientes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Supernovas Recientes Descubiertas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supernovaeData && supernovaeData.length > 0 ? (
              supernovaeData.map((sn: any, index: number) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold">{sn.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        sn.importancia === 'Muy Alta' ? 'bg-red-500/20 text-red-400' :
                        sn.importancia === 'Alta' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {sn.importancia}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                        {sn.tipo}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{sn.date} - Descubierta por {sn.discoverer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-semibold">Mag {sn.magnitude}</p>
                    <p className="text-xs text-gray-400">{sn.status}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Galaxia:</span>
                    <p className="text-white">{sn.galaxy}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Distancia:</span>
                    <p className="text-white">{sn.distance}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Estado:</span>
                    <p className="text-white">{sn.status}</p>
                  </div>
                </div>
                {sn.note && (
                  <div className="mt-2 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                    <p className="text-xs text-yellow-400">{sn.note}</p>
                  </div>
                )}
              </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Cargando supernovas reales...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de Supernovas */}
      <Card className="glass-card mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Estadísticas de Descubrimientos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">5</p>
              <p className="text-gray-400 text-sm mt-1">Este mes</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-blue-400">~50</p>
              <p className="text-gray-400 text-sm mt-1">Por año (promedio)</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-green-400">Type Ia</p>
              <p className="text-gray-400 text-sm mt-1">Tipo más común</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-3xl font-bold text-purple-400">24h</p>
              <p className="text-gray-400 text-sm mt-1">Tiempo promedio de detección</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 