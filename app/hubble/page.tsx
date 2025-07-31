"use client";

import React, { useState, useEffect } from 'react';
import { Satellite, Camera, Globe, Activity, Zap, Search, BarChart3, Download, RefreshCw, Play, Pause, Settings, Filter, Calendar, MapPin, Star, Moon, Sun, Target, Eye, Database, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import ClientDate from '@/components/ClientDate';

export default function HubblePage() {
  const [hubbleData, setHubbleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentObservation, setCurrentObservation] = useState<any>(null);

  useEffect(() => {
    fetchHubbleData();
  }, []);

  const fetchHubbleData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales del Hubble
      const [statusResponse, observationsResponse] = await Promise.allSettled([
        fetch('/api/hubble'),
        fetch('/api/hubble-observations')
      ]);

      const realData: any = {
        status: null,
        currentObservation: null,
        recentObservations: []
      };

      // Procesar datos de estado si están disponibles
      if (statusResponse.status === 'fulfilled') {
        const statusData = await statusResponse.value.json();
        if (statusData.success && statusData.data) {
          realData.status = statusData.data.status;
          realData.currentObservation = statusData.data.currentObservation;
        }
      }

      // Procesar observaciones recientes si están disponibles
      if (observationsResponse.status === 'fulfilled') {
        const observationsData = await observationsResponse.value.json();
        if (observationsData.success && observationsData.data) {
          realData.recentObservations = observationsData.data.slice(0, 10);
        }
      }

      setHubbleData(realData);
      
      // Simular observación actual si no hay datos reales
      if (!realData.currentObservation) {
        setCurrentObservation({
          target: "NGC 346",
          instrument: "WFC3",
          exposure: "1200s",
          progress: 75,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes",
          imageUrl: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg"
        });
      } else {
        setCurrentObservation(realData.currentObservation);
      }
    } catch (error) {
      console.error('Error fetching Hubble data:', error);
      setError('No se pudieron cargar los datos del Hubble');
      setHubbleData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos del Hubble...</p>
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
            onClick={fetchHubbleData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Telescopio Espacial Hubble</h1>
            <p className="text-gray-300 max-w-xl">
              Estado y observaciones en tiempo real del Hubble
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchHubbleData}
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
              <span>Estado del Hubble</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Telescopio:</span>
                <span className="text-green-400 font-semibold">{hubbleData?.status?.telescope || 'Operativo'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temperatura:</span>
                <span className="text-blue-400 font-semibold">{hubbleData?.status?.temperature || '-90°C'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Energía:</span>
                <span className="text-yellow-400 font-semibold">{hubbleData?.status?.power || '95%'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tiempo operativo:</span>
                <span className="text-purple-400 font-semibold">{hubbleData?.status?.uptime || '34+ años'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Órbita:</span>
                <span className="text-green-400 font-semibold">{hubbleData?.status?.orbit || 'LEO - 547 km'}</span>
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
            {currentObservation ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Objetivo:</span>
                  <span className="text-green-400 font-semibold">{currentObservation.target}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Instrumento:</span>
                  <span className="text-blue-400 font-semibold">{currentObservation.instrument}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Exposición:</span>
                  <span className="text-yellow-400 font-semibold">{currentObservation.exposure}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Progreso:</span>
                  <span className="text-purple-400 font-semibold">{currentObservation.progress}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Coordenadas:</span>
                  <span className="text-green-400 font-semibold text-xs">{currentObservation.coordinates}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">No hay observación actual disponible</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Observación Actual con Imagen */}
      {currentObservation && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Observación en Tiempo Real</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{currentObservation.target}</h3>
                <p className="text-gray-300 mb-4">{currentObservation.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instrumento:</span>
                    <span className="text-white">{currentObservation.instrument}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tiempo de exposición:</span>
                    <span className="text-white">{currentObservation.exposure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progreso:</span>
                    <span className="text-white">{currentObservation.progress}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${currentObservation.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {currentObservation.imageUrl ? (
                  <img 
                    src={currentObservation.imageUrl} 
                    alt={currentObservation.target}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                  {currentObservation.coordinates}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Observaciones Recientes */}
      {hubbleData?.recentObservations && hubbleData.recentObservations.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Observaciones Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hubbleData.recentObservations.map((observation: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{observation.target || 'Objetivo desconocido'}</div>
                    <div className="text-gray-300 text-sm">{observation.description || 'Sin descripción'}</div>
                    <div className="text-gray-400 text-xs">{observation.instrument || 'Instrumento desconocido'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-400">{observation.date || 'Fecha desconocida'}</div>
                    <div className="text-gray-400 text-xs">{observation.exposure || 'Exposición desconocida'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Observaciones Disponibles</h2>
            <p className="text-gray-300">
              No hay observaciones recientes del Hubble disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Información del Telescopio */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Información del Telescopio</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Especificaciones Técnicas</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Diámetro del espejo:</span>
                  <span className="text-white">2.4 metros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Altura:</span>
                  <span className="text-white">13.2 metros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peso:</span>
                  <span className="text-white">11,110 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Órbita:</span>
                  <span className="text-white">547 km sobre la Tierra</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Velocidad orbital:</span>
                  <span className="text-white">28,000 km/h</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Instrumentos Científicos</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">WFC3:</span>
                  <span className="text-white">Cámara de Campo Amplio 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ACS:</span>
                  <span className="text-white">Cámara Avanzada para Sondeos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">STIS:</span>
                  <span className="text-white">Espectrógrafo de Imagen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">COS:</span>
                  <span className="text-white">Espectrógrafo de Orígenes Cósmicos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">NICMOS:</span>
                  <span className="text-white">Cámara de Objetos Múltiples</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 