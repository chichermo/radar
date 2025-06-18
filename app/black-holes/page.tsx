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

export default function BlackHolesPage() {
  const { t } = useI18n();
  const [blackHoles, setBlackHoles] = useState<BlackHole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchBlackHoles();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const fetchBlackHoles = async () => {
    try {
      setLoading(true);
      // Simular datos de agujeros negros
      const mockData: BlackHole[] = [
        {
          name: "Sagittarius A*",
          type: "Supermasivo",
          mass: 4.154e6,
          distance: 26000,
          discovered: 1974,
          description: "Agujero negro supermasivo en el centro de la Vía Láctea. Recientemente fotografiado por el Event Horizon Telescope.",
          status: "Activo",
          lastEvent: "2022-05-12: Primera imagen directa publicada",
          coordinates: {
            ra: "17h 45m 40.0409s",
            dec: "-29° 00' 28.118\""
          }
        },
        {
          name: "M87*",
          type: "Supermasivo",
          mass: 6.5e9,
          distance: 55000000,
          discovered: 1918,
          description: "Agujero negro supermasivo en el centro de la galaxia M87. Primera imagen de un agujero negro en la historia.",
          status: "Activo",
          lastEvent: "2019-04-10: Primera imagen de agujero negro",
          coordinates: {
            ra: "12h 30m 49.4234s",
            dec: "+12° 23' 28.043\""
          }
        },
        {
          name: "Cygnus X-1",
          type: "Estelar",
          mass: 21.2,
          distance: 6000,
          discovered: 1964,
          description: "Uno de los primeros candidatos a agujero negro identificados. Sistema binario con una estrella supergigante.",
          status: "Activo",
          lastEvent: "2021-02-18: Medición precisa de masa",
          coordinates: {
            ra: "19h 58m 21.6756s",
            dec: "+35° 12' 05.775\""
          }
        },
        {
          name: "GW150914",
          type: "Binario",
          mass: 62,
          distance: 1300000000,
          discovered: 2015,
          description: "Primera detección directa de ondas gravitacionales de la fusión de dos agujeros negros.",
          status: "Fusionado",
          lastEvent: "2015-09-14: Detección de ondas gravitacionales",
          coordinates: {
            ra: "01h 57m 41.1s",
            dec: "-59° 27' 18.6\""
          }
        },
        {
          name: "TON 618",
          type: "Supermasivo",
          mass: 6.6e10,
          distance: 10400000000,
          discovered: 1957,
          description: "Uno de los agujeros negros más masivos conocidos. Cuásar extremadamente brillante.",
          status: "Activo",
          lastEvent: "2020-03-15: Estudio de disco de acreción",
          coordinates: {
            ra: "12h 28m 24.97s",
            dec: "+31° 28' 37.7\""
          }
        },
        {
          name: "V404 Cygni",
          type: "Estelar",
          mass: 9.0,
          distance: 7800,
          discovered: 1989,
          description: "Agujero negro de masa estelar que experimenta frecuentes erupciones de rayos X.",
          status: "Variable",
          lastEvent: "2019-06-15: Erupción de rayos X",
          coordinates: {
            ra: "20h 24m 03.83s",
            dec: "+33° 52' 01.8\""
          }
        }
      ];
      
      setBlackHoles(mockData);
    } catch (error) {
      console.error('Error fetching black holes:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
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
                    <p className="text-2xl font-bold text-white">{blackHoleStats.totalObserved.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-red-400">{blackHoleStats.supermassive.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-blue-400">{blackHoleStats.stellar.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-purple-400">{blackHoleStats.binary.toLocaleString()}</p>
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

            {/* Información adicional */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">{t('blackholes.additional_info')}</CardTitle>
                <CardDescription className="text-gray-400">{t('blackholes.info_description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-400">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      {t('blackholes.info_1')}
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm text-green-400">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      {t('blackholes.info_2')}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <p className="text-sm text-purple-400">
                      <Database className="h-4 w-4 inline mr-1" />
                      {t('blackholes.info_3')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 