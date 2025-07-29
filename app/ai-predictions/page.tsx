"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { TrendingUp, AlertTriangle, RefreshCw, Sun } from 'lucide-react';

export default function AIPredictionsPage() {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAIPredictions();
  }, []);

  const fetchAIPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/ai-predictions');
      if (response.ok) {
        const data = await response.json();
        setPredictions(data.predictions || []);
      } else {
        throw new Error('No se pudieron obtener datos de predicciones IA');
      }
    } catch (error) {
      console.error('Error fetching AI predictions:', error);
      setError('No se pudieron cargar los datos de predicciones IA');
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando predicciones IA...</p>
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
            onClick={fetchAIPredictions}
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
            <h1 className="text-3xl font-bold text-white mb-2">Predicciones IA (NASA DONKI)</h1>
            <p className="text-gray-300 max-w-xl">
              Notificaciones y eventos solares/anómalos detectados por la NASA (DONKI). Estos datos provienen en tiempo real de la API oficial de la NASA.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={fetchAIPredictions}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </button>
          </div>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>Eventos y Alertas Solares</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {predictions.length === 0 ? (
            <div className="text-center text-gray-300 py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Sin Datos Disponibles</h2>
              <p>No hay eventos recientes disponibles en este momento.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {predictions.map((item: any, idx: number) => (
                <div key={item.messageID || idx} className="p-4 bg-gray-800/50 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-2 md:mb-0">
                    <div className="text-white font-semibold">{item.messageType || 'Tipo desconocido'}</div>
                    <div className="text-gray-300 text-sm">{item.messageBody?.slice(0, 120) || 'Sin descripción'}...</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-400">{item.messageIssueTime ? new Date(item.messageIssueTime).toLocaleString() : 'Fecha desconocida'}</div>
                    <div className="text-xs text-gray-400">ID: {item.messageID}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
