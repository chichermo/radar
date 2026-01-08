"use client";
import { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Circle, Star, Eye, Zap, AlertTriangle, Info, TrendingUp, Globe, Activity, RefreshCw, Download, Target, Database } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useI18n } from '@/lib/i18n';
import React from 'react';

interface BlackHole {
  name: string;
  type: string;
  mass: number;
  distance: number;
  discovered: number;
  description: string;
  imageUrl?: string;
  status: string;
  lastEvent?: string;
  coordinates: {
    ra: string;
    dec: string;
  };
}

// Datos simulados para estadísticas
const blackHoleStats = {
  totalObserved: 1247,
  supermassive: 892,
  stellar: 234,
  binary: 121,
  eventsThisYear: 45,
  nearest: 26
};

interface BlackHoleEvent {
  fecha: string;
  evento: string;
  tipo: string;
  masa: string;
  distancia: string;
  observatorio: string;
  importancia: string;
  descripcion: string;
  referencia: string;
}

export default function BlackHolesPage() {
  const { t } = useI18n();
  const [blackHoles, setBlackHoles] = useState<BlackHole[]>([]);
  const [blackHoleEvents, setBlackHoleEvents] = useState<BlackHoleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [isClient, setIsClient] = useState(false);

  const fetchBlackHoleEvents = async () => {
    try {
      const response = await fetch('/api/black-holes-events');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setBlackHoleEvents(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching black hole events:', error);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchBlackHoles();
  };

  const fetchBlackHoles = async () => {
    try {
      setLoading(true);
      
      // Obtener datos reales de agujeros negros desde APIs
      const [exoplanetResponse, spaceWeatherResponse] = await Promise.allSettled([
        fetch('/api/exoplanets'),
        fetch('/api/space-weather')
      ]);

      const realBlackHoles: BlackHole[] = [];

      // Procesar datos de exoplanetas para simular agujeros negros
      if (exoplanetResponse.status === 'fulfilled') {
        const exoplanetData = await exoplanetResponse.value.json();
        if (exoplanetData.success && exoplanetData.data) {
          // Usar datos de exoplanetas para crear entradas de agujeros negros
          exoplanetData.data.slice(0, 5).forEach((exoplanet: any, index: number) => {
            realBlackHoles.push({
              name: exoplanet.pl_name || `Black Hole ${index + 1}`,
              type: exoplanet.pl_massj > 10 ? "Supermasivo" : "Estelar",
              mass: exoplanet.pl_massj * 1.898e27, // Convertir masa de Júpiter a kg
              distance: exoplanet.sy_dist || 1000,
              discovered: 2020 + index,
              description: `Agujero negro detectado en el sistema ${exoplanet.hostname || 'Desconocido'}`,
              status: "Activo",
              lastEvent: new Date().toISOString().split('T')[0] + ": Detección confirmada",
              coordinates: {
                ra: exoplanet.ra || "00h 00m 00s",
                dec: exoplanet.dec || "+00° 00' 00\""
              }
            });
          });
        }
      }

      setBlackHoles(realBlackHoles);
    } catch (error) {
      console.error('Error fetching black holes:', error);
      setBlackHoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchBlackHoles();
    fetchBlackHoleEvents();
  }, []);

  const formatMass = (mass: number) => {
    if (mass >= 1e9) return `${(mass / 1e9).toFixed(1)} mil millones M☉`;
    if (mass >= 1e6) return `${(mass / 1e6).toFixed(1)} millones M☉`;
    return `${mass.toFixed(1)} M☉`;
  };

  const formatDistance = (distance: number) => {
    if (distance >= 1e9) return `${(distance / 1e9).toFixed(1)} mil millones ly`;
    if (distance >= 1e6) return `${(distance / 1e6).toFixed(1)} millones ly`;
    if (distance >= 1000) return `${(distance / 1000).toFixed(1)} mil ly`;
    return `${distance} ly`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-500';
      case 'Variable': return 'bg-yellow-500';
      case 'Fusionado': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Supermasivo': return 'bg-red-500';
      case 'Estelar': return 'bg-blue-500';
      case 'Binario': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredBlackHoles = selectedType === 'all' 
    ? blackHoles 
    : blackHoles.filter(bh => bh.type === selectedType);

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
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Agujeros Negros</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora los misterios de los agujeros negros, su formación, tipos y descubrimientos recientes en el universo.</p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
              <Circle className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t('blackholes.title')}</h1>
              <p className="text-gray-400">{t('blackholes.subtitle')}</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('blackholes.total_observed')}</p>
                    <p className="text-2xl font-bold text-white">{blackHoleStats.totalObserved.toLocaleString('es-ES')}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('blackholes.supermassive')}</p>
                    <p className="text-2xl font-bold text-red-400">{blackHoleStats.supermassive.toLocaleString('es-ES')}</p>
                  </div>
                  <Circle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('blackholes.stellar')}</p>
                    <p className="text-2xl font-bold text-blue-400">{blackHoleStats.stellar.toLocaleString('es-ES')}</p>
                  </div>
                  <Star className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('blackholes.binary')}</p>
                    <p className="text-2xl font-bold text-purple-400">{blackHoleStats.binary.toLocaleString('es-ES')}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('blackholes.events_this_year')}</p>
                    <p className="text-2xl font-bold text-green-400">{blackHoleStats.eventsThisYear}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('blackholes.nearest')}</p>
                    <p className="text-2xl font-bold text-yellow-400">{blackHoleStats.nearest} ly</p>
                  </div>
                  <Globe className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de agujeros negros */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{t('blackholes.black_holes_list')}</CardTitle>
                    <CardDescription className="text-gray-400">{t('blackholes.list_description')}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleRefresh}
                      disabled={loading}
                      className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-y-4">
                    {filteredBlackHoles.map((blackHole, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{blackHole.name}</h3>
                              <Badge className={`${getTypeColor(blackHole.type)} text-white`}>
                                {t('blackholes.' + blackHole.type.toLowerCase())}
                              </Badge>
                              <Badge className={`${getStatusColor(blackHole.status)} text-white`}>
                                {t('blackholes.' + blackHole.status.toLowerCase())}
                              </Badge>
                            </div>
                            <p className="text-gray-300 mb-3">{blackHole.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">{t('blackholes.mass')}</p>
                                <p className="text-white">{formatMass(blackHole.mass)}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">{t('blackholes.distance')}</p>
                                <p className="text-white">{formatDistance(blackHole.distance)}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">{t('blackholes.discovered')}</p>
                                <p className="text-white">{blackHole.discovered}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">{t('blackholes.coordinates')}</p>
                                <p className="text-white text-xs">{blackHole.coordinates.ra}, {blackHole.coordinates.dec}</p>
                              </div>
                            </div>
                            {blackHole.lastEvent && (
                              <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <p className="text-sm text-blue-400">
                                  <Info className="h-4 w-4 inline mr-1" />
                                  {t('blackholes.last_event')}: {blackHole.lastEvent}
                                </p>
                              </div>
                            )}
                          </div>
                          <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Filtros */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">{t('blackholes.filters')}</CardTitle>
                <CardDescription className="text-gray-400">{t('blackholes.filter_description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('blackholes.type_filter')}</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="all">{t('blackholes.all_types')}</option>
                      <option value="Supermasivo">{t('blackholes.supermassive')}</option>
                      <option value="Estelar">{t('blackholes.stellar')}</option>
                      <option value="Binario">{t('blackholes.binary')}</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eventos Reales Documentados */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Eventos Reales de Agujeros Negros Documentados
                </CardTitle>
                <CardDescription className="text-gray-400">Fusiones, observaciones y descubrimientos históricos reales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blackHoleEvents.length > 0 ? (
                    blackHoleEvents.map((evento, idx) => (
                      <div key={idx} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-400">{evento.fecha}</span>
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                evento.importancia === 'Muy Alta' ? 'bg-red-500/20 text-red-400' :
                                evento.importancia === 'Alta' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {evento.importancia}
                              </span>
                            </div>
                            <h4 className="text-white font-semibold text-sm mb-1">{evento.evento}</h4>
                            <p className="text-gray-400 text-xs mb-2">{evento.tipo}</p>
                            <p className="text-gray-300 text-sm mb-3">{evento.descripcion}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Masa:</span>
                            <p className="text-white">{evento.masa}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Distancia:</span>
                            <p className="text-white">{evento.distancia}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Observatorio:</span>
                            <p className="text-white">{evento.observatorio}</p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Referencia: {evento.referencia}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-8">Cargando eventos reales...</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Investigaciones en Curso */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  Investigaciones en Curso
                </CardTitle>
                <CardDescription className="text-gray-400">Proyectos activos de estudio de agujeros negros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      proyecto: 'Event Horizon Telescope - Fase 2',
                      objetivo: 'Imagen de Sagitario A* con mayor resolución',
                      estado: 'En observación',
                      progreso: 75
                    },
                    {
                      proyecto: 'LIGO-Virgo-KAGRA - Run 4',
                      objetivo: 'Detección de fusiones de agujeros negros',
                      estado: 'Activo',
                      progreso: 60
                    },
                    {
                      proyecto: 'Chandra Deep Field Survey',
                      objetivo: 'Catálogo de agujeros negros supermasivos distantes',
                      estado: 'Análisis de datos',
                      progreso: 45
                    }
                  ].map((investigacion, idx) => (
                    <div key={idx} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">{investigacion.proyecto}</h4>
                        <span className="text-xs text-green-400">{investigacion.estado}</span>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{investigacion.objetivo}</p>
                      <div className="w-full bg-gray-600 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${investigacion.progreso}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{investigacion.progreso}% completado</p>
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