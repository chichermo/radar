"use client";

import React, { useState, useEffect } from 'react';
import { Satellite, Camera, Globe, Activity, Zap, Search, BarChart3, Download, RefreshCw, Play, Pause, Settings, Filter, Calendar, MapPin, Star, Moon, Sun, Target, Eye, Database, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import ClientDate from '@/components/ClientDate';

export default function JWSTPage() {
  const [jwstData, setJwstData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJWSTData();
  }, []);

  const fetchJWSTData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales del JWST
      const [statusResponse, discoveriesResponse] = await Promise.allSettled([
        fetch('/api/jwst'),
        fetch('/api/jwst-discoveries')
      ]);

      const realData: any = {
        status: null,
        currentObservation: null,
        recentDiscoveries: []
      };

      // Procesar datos de estado si están disponibles
      if (statusResponse.status === 'fulfilled') {
        const statusData = await statusResponse.value.json();
        if (statusData.success && statusData.data) {
          realData.status = statusData.data.status;
          realData.currentObservation = statusData.data.currentObservation;
        }
      }

      // Procesar descubrimientos recientes si están disponibles
      if (discoveriesResponse.status === 'fulfilled') {
        const discoveriesData = await discoveriesResponse.value.json();
        if (discoveriesData.success && discoveriesData.data) {
          realData.recentDiscoveries = discoveriesData.data.slice(0, 10);
        }
      }

      setJwstData(realData);
    } catch (error) {
      console.error('Error fetching JWST data:', error);
      setError('No se pudieron cargar los datos del JWST');
      setJwstData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos del JWST...</p>
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
            onClick={fetchJWSTData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Telescopio Espacial James Webb (JWST)</h1>
            <p className="text-gray-300 max-w-xl">
              Estado y descubrimientos recientes del JWST
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchJWSTData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estado del Telescopio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Estado</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Telescopio:</span>
                <span className="text-green-400 font-semibold">{jwstData?.status?.telescope || 'Desconocido'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temperatura primaria:</span>
                <span className="text-blue-400 font-semibold">{jwstData?.status?.temperature?.primary || 'N/A'} °C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Combustible:</span>
                <span className="text-yellow-400 font-semibold">{jwstData?.status?.fuel || 'N/A'}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Uptime:</span>
                <span className="text-purple-400 font-semibold">{jwstData?.status?.uptime || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Observación Actual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {jwstData?.currentObservation ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Objetivo:</span>
                  <span className="text-green-400 font-semibold">{jwstData.currentObservation.target || 'Desconocido'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Instrumento:</span>
                  <span className="text-blue-400 font-semibold">{jwstData.currentObservation.instrument || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Exposición:</span>
                  <span className="text-yellow-400 font-semibold">{jwstData.currentObservation.exposure || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Progreso:</span>
                  <span className="text-purple-400 font-semibold">{jwstData.currentObservation.progress || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Coordenadas:</span>
                  <span className="text-green-400 font-semibold">{jwstData.currentObservation.coordinates || 'N/A'}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">No hay observación actual disponible</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Descubrimientos Recientes */}
      {jwstData?.recentDiscoveries && jwstData.recentDiscoveries.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Descubrimientos Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jwstData.recentDiscoveries.map((discovery: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{discovery.title || 'Descubrimiento'}</div>
                    <div className="text-gray-300 text-sm">{discovery.description || 'Sin descripción'}</div>
                    <div className="text-gray-400 text-xs">{discovery.instrument || 'Instrumento desconocido'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-400">{discovery.significance || 'Importancia desconocida'}</div>
                    <div className="text-gray-400 text-xs">{discovery.date || 'Fecha desconocida'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Datos Disponibles</h2>
            <p className="text-gray-300">
              No hay descubrimientos recientes del JWST disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 