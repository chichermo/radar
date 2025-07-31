"use client";

import React, { useState, useEffect } from 'react';
import { Satellite, Camera, Globe, Activity, Zap, Search, BarChart3, Download, RefreshCw, Play, Pause, Settings, Filter, Calendar, MapPin, Star, Moon, Sun, Target, Eye, Database, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import ClientDate from '@/components/ClientDate';

export default function JWSTPage() {
  const [jwstData, setJwstData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentObservation, setCurrentObservation] = useState<any>(null);

  useEffect(() => {
    fetchJWSTData();
  }, []);

  const fetchJWSTData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales del JWST
      const [statusResponse, observationsResponse] = await Promise.allSettled([
        fetch('/api/jwst'),
        fetch('/api/jwst-observations')
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

      setJwstData(realData);
      
      // Simular observación actual si no hay datos reales
      if (!realData.currentObservation) {
        setCurrentObservation({
          target: "NGC 346",
          instrument: "NIRCam",
          exposure: "2400s",
          progress: 85,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes - Observación en infrarrojo cercano",
          imageUrl: "https://cdn.pixabay.com/photo/2016/10/20/18/35/galaxy-1756274_960_720.jpg",
          scienceTheme: "Star Lifecycle"
        });
      } else {
        setCurrentObservation(realData.currentObservation);
      }
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
              Estado y observaciones en tiempo real del JWST
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
              <span>Estado del JWST</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Telescopio:</span>
                <span className="text-green-400 font-semibold">{jwstData?.status?.telescope || 'Operativo'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temperatura primaria:</span>
                <span className="text-blue-400 font-semibold">{jwstData?.status?.temperature?.primary || '-233°C'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temperatura secundaria:</span>
                <span className="text-blue-400 font-semibold">{jwstData?.status?.temperature?.secondary || '-266°C'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Combustible:</span>
                <span className="text-yellow-400 font-semibold">{jwstData?.status?.fuel || '95%'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Órbita:</span>
                <span className="text-green-400 font-semibold">{jwstData?.status?.orbit || 'L2 - 1.5M km'}</span>
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
                  <span className="text-gray-300">Tema científico:</span>
                  <span className="text-green-400 font-semibold">{currentObservation.scienceTheme}</span>
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
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tema científico:</span>
                    <span className="text-white">{currentObservation.scienceTheme}</span>
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
      {jwstData?.recentObservations && jwstData.recentObservations.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Observaciones Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jwstData.recentObservations.map((observation: any, index: number) => (
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
              No hay observaciones recientes del JWST disponibles en este momento.
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
                  <span className="text-gray-400">Diámetro del espejo primario:</span>
                  <span className="text-white">6.5 metros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Altura:</span>
                  <span className="text-white">8 metros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peso:</span>
                  <span className="text-white">6,200 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Órbita:</span>
                  <span className="text-white">Punto L2 de Lagrange</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distancia de la Tierra:</span>
                  <span className="text-white">1.5 millones de km</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Instrumentos Científicos</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">NIRCam:</span>
                  <span className="text-white">Cámara de Infrarrojo Cercano</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">NIRSpec:</span>
                  <span className="text-white">Espectrógrafo de Infrarrojo Cercano</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MIRI:</span>
                  <span className="text-white">Instrumento de Infrarrojo Medio</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FGS/NIRISS:</span>
                  <span className="text-white">Sensor de Guía Fina</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rango espectral:</span>
                  <span className="text-white">0.6 - 28.5 μm</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Temas Científicos */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Temas Científicos del JWST</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Objetivos Principales</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Universo Temprano:</span>
                    <p className="text-gray-300 text-sm">Observar las primeras galaxias y estrellas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Globe className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Exoplanetas:</span>
                    <p className="text-gray-300 text-sm">Caracterizar atmósferas de planetas extrasolares</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Moon className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Sistema Solar:</span>
                    <p className="text-gray-300 text-sm">Estudiar objetos del sistema solar</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Capacidades Únicas</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolución angular:</span>
                  <span className="text-white">0.1 arcosegundos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sensibilidad:</span>
                  <span className="text-white">100x más sensible que Spitzer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rango de longitudes de onda:</span>
                  <span className="text-white">0.6 - 28.5 micrómetros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tiempo de vida esperado:</span>
                  <span className="text-white">10+ años</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 