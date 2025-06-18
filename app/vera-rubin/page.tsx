"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Database, AlertTriangle, TrendingUp, Eye, Clock, Target, Star, Globe, Activity, Zap, Search, BarChart3, Download, RefreshCw } from 'lucide-react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;

// Datos simulados para Vera Rubin
const veraRubinData = {
  statistics: {
    totalObservations: 1247,
    alertsTonight: 23456,
    objectsCataloged: 37400000000,
    dataProcessed: '15.2 TB',
    uptime: '99.8%',
    discoveries: 156
  },
  recentDiscoveries: [
    {
      id: 1,
      type: 'Supernova',
      object: 'SN 2024A',
      magnitude: 18.5,
      time: '2h 15m',
      status: 'Confirmado',
      coordinates: 'RA: 12h 34m 56s, Dec: -45° 12\' 34"'
    },
    {
      id: 2,
      type: 'Asteroid',
      object: '2024 BK123',
      magnitude: 20.1,
      time: '4h 32m',
      status: 'Nuevo',
      coordinates: 'RA: 15h 22m 18s, Dec: +23° 45\' 12"'
    },
    {
      id: 3,
      type: 'Variable Star',
      object: 'V1234 Cyg',
      magnitude: 16.8,
      time: '6h 45m',
      status: 'Análisis',
      coordinates: 'RA: 20h 15m 33s, Dec: +38° 22\' 45"'
    }
  ],
  surveyProgress: {
    northernHemisphere: 45,
    southernHemisphere: 78,
    galacticPlane: 23,
    deepFields: 92
  },
  systemStatus: {
    telescope: 'Operativo',
    camera: 'Activa',
    dataPipeline: 'Procesando',
    weather: 'Óptimo'
  },
  capturedImages: [
    {
      id: 1,
      title: 'Galaxia NGC 4565 - "Galaxia Aguja"',
      type: 'Galaxia Espiral',
      filter: 'r-band',
      exposure: '15s',
      timestamp: '2024-01-15 03:42:15',
      coordinates: 'RA: 12h 36m 20.8s, Dec: +25° 59\' 15.7"',
      magnitude: 10.42,
      description: 'Galaxia espiral vista de canto, mostrando su delgado disco galáctico y bulbo central prominente.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop',
      status: 'Procesada'
    },
    {
      id: 2,
      title: 'Cúmulo Estelar M13 - Gran Cúmulo de Hércules',
      type: 'Cúmulo Globular',
      filter: 'g-band',
      exposure: '15s',
      timestamp: '2024-01-15 04:18:33',
      coordinates: 'RA: 16h 41m 41.2s, Dec: +36° 27\' 35.5"',
      magnitude: 5.8,
      description: 'Uno de los cúmulos globulares más brillantes del hemisferio norte, conteniendo cientos de miles de estrellas.',
      imageUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=300&fit=crop',
      status: 'Procesada'
    },
    {
      id: 3,
      title: 'Nebulosa M42 - Gran Nebulosa de Orión',
      type: 'Nebulosa de Emisión',
      filter: 'i-band',
      exposure: '15s',
      timestamp: '2024-01-15 05:23:47',
      coordinates: 'RA: 05h 35m 17.3s, Dec: -05° 23\' 27.9"',
      magnitude: 4.0,
      description: 'Región de formación estelar activa, visible a simple vista como una mancha difusa en la constelación de Orión.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      status: 'Procesada'
    },
    {
      id: 4,
      title: 'Supernova SN 2024A en NGC 4565',
      type: 'Supernova Tipo Ia',
      filter: 'r-band',
      exposure: '15s',
      timestamp: '2024-01-15 06:12:19',
      coordinates: 'RA: 12h 36m 22.1s, Dec: +25° 59\' 18.3"',
      magnitude: 18.5,
      description: 'Nueva supernova descubierta en la galaxia NGC 4565, posiblemente una explosión de enana blanca.',
      imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop',
      status: 'Nueva'
    },
    {
      id: 5,
      title: 'Asteroid 2024 BK123',
      type: 'Asteroide del Cinturón Principal',
      filter: 'g-band',
      exposure: '15s',
      timestamp: '2024-01-15 07:05:42',
      coordinates: 'RA: 15h 22m 18.3s, Dec: +23° 45\' 12.7"',
      magnitude: 20.1,
      description: 'Nuevo asteroide descubierto en el cinturón principal, con órbita entre Marte y Júpiter.',
      imageUrl: 'https://images.unsplash.com/photo-1614314107768-6018060b388b?w=400&h=300&fit=crop',
      status: 'Nuevo'
    },
    {
      id: 6,
      title: 'Campo Profundo LSST-DF-001',
      type: 'Campo Profundo',
      filter: 'z-band',
      exposure: '300s',
      timestamp: '2024-01-15 08:30:15',
      coordinates: 'RA: 02h 00m 00.0s, Dec: -04° 00\' 00.0"',
      magnitude: 24.5,
      description: 'Campo profundo para estudios de galaxias distantes y cosmología, con tiempo de exposición extendido.',
      imageUrl: 'https://images.unsplash.com/photo-1501869150797-9bbb64f782fd?w=400&h=300&fit=crop',
      status: 'Procesada'
    }
  ]
};

export default function VeraRubinPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operativo':
      case 'activa':
      case 'procesando':
      case 'óptimo':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'confirmado':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'nuevo':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'análisis':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
              <Camera className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Vera C. Rubin Observatory</h1>
              <p className="text-gray-400">Legacy Survey of Space and Time (LSST) - Revolucionando la astronomía</p>
            </div>
          </div>
          
          {/* Estado Actual del Telescopio */}
          <Card className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border-yellow-500/30 mb-6">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-yellow-400">Estado Actual del Telescopio</CardTitle>
                  <CardDescription className="text-yellow-300/70">
                    Información sobre la disponibilidad de datos en tiempo real
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-300 font-medium">Fase de Construcción y Pruebas</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    El telescopio Vera Rubin está actualmente en la fase final de construcción en Cerro Pachón, Chile. 
                    Se espera que comience operaciones científicas en <strong>2025</strong>.
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-300 font-medium">API No Disponible</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Las APIs oficiales del LSST aún no están disponibles públicamente. 
                    Los datos mostrados son simulados para demostración.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-300 font-medium">Preparado para el Futuro</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Tu sitio está preparado para integrar las APIs oficiales cuando estén disponibles. 
                    El sistema automáticamente cambiará a datos reales.
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-300 font-medium">Actualizaciones Automáticas</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Una vez operativo, podrás ver imágenes en tiempo real, alertas automáticas 
                    y estadísticas actualizadas cada noche.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <h4 className="text-blue-300 font-medium mb-2">¿Qué pasará cuando el telescopio esté operativo?</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Imágenes en tiempo real:</strong> Cada 15 segundos de exposición</li>
                  <li>• <strong>Alertas automáticas:</strong> Supernovas, asteroides, estrellas variables</li>
                  <li>• <strong>Datos masivos:</strong> 37 mil millones de objetos catalogados</li>
                  <li>• <strong>Actualizaciones continuas:</strong> 24/7 durante 10 años</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Observaciones</p>
                  <p className="text-2xl font-bold text-white">{veraRubinData.statistics.totalObservations.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Alertas</p>
                  <p className="text-2xl font-bold text-red-400">{veraRubinData.statistics.alertsTonight.toLocaleString()}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Objetos</p>
                  <p className="text-2xl font-bold text-green-400">{(veraRubinData.statistics.objectsCataloged / 1000000000).toFixed(1)}B</p>
                </div>
                <Star className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Datos</p>
                  <p className="text-2xl font-bold text-purple-400">{veraRubinData.statistics.dataProcessed}</p>
                </div>
                <Database className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Uptime</p>
                  <p className="text-2xl font-bold text-cyan-400">{veraRubinData.statistics.uptime}</p>
                </div>
                <Activity className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Descubrimientos</p>
                  <p className="text-2xl font-bold text-yellow-400">{veraRubinData.statistics.discoveries}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Especificaciones del telescopio */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Especificaciones del Telescopio</CardTitle>
                    <CardDescription className="text-gray-400">
                      Características técnicas del observatorio Vera C. Rubin
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-lg border border-blue-500/20">
                    <h3 className="font-semibold text-blue-400 mb-3 flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Telescopio
                    </h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Apertura:</span>
                        <span className="text-blue-400">8.4 metros</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Campo de visión:</span>
                        <span className="text-blue-400">9.6 grados²</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Filtros:</span>
                        <span className="text-blue-400">u, g, r, i, z, y</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Altitud:</span>
                        <span className="text-blue-400">2,713 m</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-600/10 to-green-800/10 rounded-lg border border-green-500/20">
                    <h3 className="font-semibold text-green-400 mb-3 flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Cámara LSST
                    </h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Resolución:</span>
                        <span className="text-green-400">3.2 GP</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sensores CCD:</span>
                        <span className="text-green-400">189</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tiempo exposición:</span>
                        <span className="text-green-400">15s</span>
                      </li>
                      <li className="flex justify-between">
                        <span>FOV:</span>
                        <span className="text-green-400">3.5°</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-600/10 to-purple-800/10 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Producción
                    </h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Datos/noche:</span>
                        <span className="text-purple-400">15 TB</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Alertas/noche:</span>
                        <span className="text-purple-400">20M</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Objetos totales:</span>
                        <span className="text-purple-400">37B</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Frecuencia:</span>
                        <span className="text-purple-400">3 días</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Imágenes Capturadas */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Imágenes Capturadas</CardTitle>
                    <CardDescription className="text-gray-400">
                      Últimas imágenes del telescopio Vera Rubin
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                      <Search className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {veraRubinData.capturedImages.map((image) => (
                    <div
                      key={image.id}
                      className="bg-gray-700/30 rounded-lg border border-gray-600/30 overflow-hidden hover:border-blue-500/30 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            image.status === 'Nueva' 
                              ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' 
                              : 'text-green-400 bg-green-400/10 border-green-400/20'
                          }`}>
                            {image.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">{image.title}</h3>
                        <p className="text-sm text-gray-300 mb-3">{image.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-3">
                          <div>
                            <span className="text-gray-500">Tipo:</span>
                            <span className="ml-1">{image.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Filtro:</span>
                            <span className="ml-1">{image.filter}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Exposición:</span>
                            <span className="ml-1">{image.exposure}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Magnitud:</span>
                            <span className="ml-1">{image.magnitude}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          <div>Coordenadas: {image.coordinates}</div>
                          <div>Timestamp: {image.timestamp}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-blue-600/20 text-blue-400 py-2 px-3 rounded border border-blue-500/30 hover:bg-blue-600/30 transition-colors text-sm">
                            <Eye className="h-3 w-3 inline mr-1" />
                            Ver Detalles
                          </button>
                          <button className="bg-gray-600/20 text-gray-400 py-2 px-3 rounded border border-gray-500/30 hover:bg-gray-600/30 transition-colors text-sm">
                            <Download className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Descubrimientos recientes */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Descubrimientos Recientes</CardTitle>
                <CardDescription className="text-gray-400">
                  Últimas detecciones del LSST
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {veraRubinData.recentDiscoveries.map((discovery) => (
                    <div
                      key={discovery.id}
                      className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-semibold text-white">{discovery.object}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(discovery.status)}`}>
                              {discovery.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 mb-1">{discovery.type}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Mag: {discovery.magnitude}</span>
                            <span>{discovery.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{discovery.coordinates}</p>
                        </div>
                        <button className="p-1 bg-blue-600/20 rounded border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                          <Eye className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progreso del survey */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Progreso del Survey</CardTitle>
                <CardDescription className="text-gray-400">
                  Estado de mapeo del cielo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Hemisferio Norte</span>
                      <span className="text-blue-400">{veraRubinData.surveyProgress.northernHemisphere}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${veraRubinData.surveyProgress.northernHemisphere}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Hemisferio Sur</span>
                      <span className="text-green-400">{veraRubinData.surveyProgress.southernHemisphere}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: `${veraRubinData.surveyProgress.southernHemisphere}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Plano Galáctico</span>
                      <span className="text-purple-400">{veraRubinData.surveyProgress.galacticPlane}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${veraRubinData.surveyProgress.galacticPlane}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Campos Profundos</span>
                      <span className="text-yellow-400">{veraRubinData.surveyProgress.deepFields}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${veraRubinData.surveyProgress.deepFields}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estado del sistema */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Estado del Sistema</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitoreo en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(veraRubinData.systemStatus).map(([key, status]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                      <span className="text-xs text-green-400">{status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 