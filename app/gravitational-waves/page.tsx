"use client";
import { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Waves, Star, Eye, Zap, AlertTriangle, Info, TrendingUp, Globe, Calendar, Activity, RefreshCw, Download, Target, Database } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface GravitationalWave {
  id: string;
  name: string;
  date: string;
  type: string;
  mass1: number;
  mass2: number;
  distance: number;
  significance: number;
  detectors: string[];
  description: string;
  status: string;
  coordinates: {
    ra: number;
    dec: number;
  };
}

// Datos simulados para estadísticas
const gravitationalWaveStats = {
  totalDetections: 89,
  confirmed: 67,
  candidates: 22,
  thisYear: 12,
  averageDistance: 450,
  highestSignificance: 32.4
};

export default function GravitationalWavesPage() {
  const [waves, setWaves] = useState<GravitationalWave[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchGravitationalWaves();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const fetchGravitationalWaves = async () => {
    try {
      setLoading(true);
      // Simular datos de ondas gravitacionales
      const mockData: GravitationalWave[] = [
        {
          id: "GW150914",
          name: "GW150914",
          date: "2015-09-14",
          type: "BBH",
          mass1: 36,
          mass2: 29,
          distance: 410,
          significance: 23.6,
          detectors: ["LIGO Hanford", "LIGO Livingston"],
          description: "Primera detección directa de ondas gravitacionales. Fusión de dos agujeros negros de masa estelar.",
          status: "Confirmado",
          coordinates: { ra: 24.4, dec: -59.5 }
        },
        {
          id: "GW151226",
          name: "GW151226",
          date: "2015-12-26",
          type: "BBH",
          mass1: 14.2,
          mass2: 7.5,
          distance: 440,
          significance: 13.1,
          detectors: ["LIGO Hanford", "LIGO Livingston"],
          description: "Segunda detección de fusión de agujeros negros binarios.",
          status: "Confirmado",
          coordinates: { ra: 85.2, dec: -69.1 }
        },
        {
          id: "GW170817",
          name: "GW170817",
          date: "2017-08-17",
          type: "BNS",
          mass1: 1.46,
          mass2: 1.27,
          distance: 40,
          significance: 32.4,
          detectors: ["LIGO Hanford", "LIGO Livingston", "Virgo"],
          description: "Primera detección de fusión de estrellas de neutrones con contraparte electromagnética.",
          status: "Confirmado",
          coordinates: { ra: 197.4, dec: -23.4 }
        },
        {
          id: "GW190521",
          name: "GW190521",
          date: "2019-05-21",
          type: "BBH",
          mass1: 85,
          mass2: 66,
          distance: 1500,
          significance: 14.7,
          detectors: ["LIGO Hanford", "LIGO Livingston", "Virgo"],
          description: "Fusión de agujeros negros más masiva detectada hasta la fecha.",
          status: "Confirmado",
          coordinates: { ra: 192.2, dec: 34.1 }
        },
        {
          id: "GW200105",
          name: "GW200105",
          date: "2020-01-05",
          type: "NSBH",
          mass1: 8.9,
          mass2: 1.9,
          distance: 280,
          significance: 12.8,
          detectors: ["LIGO Hanford", "LIGO Livingston", "Virgo"],
          description: "Primera detección confirmada de fusión agujero negro-estrella de neutrones.",
          status: "Confirmado",
          coordinates: { ra: 45.8, dec: -63.2 }
        },
        {
          id: "GW200115",
          name: "GW200115",
          date: "2020-01-15",
          type: "NSBH",
          mass1: 5.7,
          mass2: 1.5,
          distance: 300,
          significance: 11.5,
          detectors: ["LIGO Hanford", "LIGO Livingston", "Virgo"],
          description: "Segunda detección de fusión agujero negro-estrella de neutrones.",
          status: "Confirmado",
          coordinates: { ra: 78.3, dec: -12.1 }
        }
      ];
      
      setWaves(mockData);
    } catch (error) {
      console.error('Error fetching gravitational waves:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'BBH': return { name: 'Agujeros Negros Binarios', color: 'bg-red-500' };
      case 'BNS': return { name: 'Estrellas de Neutrones Binarias', color: 'bg-blue-500' };
      case 'NSBH': return { name: 'Agujero Negro + Estrella de Neutrones', color: 'bg-purple-500' };
      default: return { name: 'Desconocido', color: 'bg-gray-500' };
    }
  };

  const getSignificanceColor = (significance: number) => {
    if (significance >= 20) return 'text-green-400';
    if (significance >= 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatDistance = (distance: number) => {
    if (distance >= 1000) return `${(distance / 1000).toFixed(1)} mil Mpc`;
    return `${distance} Mpc`;
  };

  const filteredWaves = selectedType === 'all' 
    ? waves 
    : waves.filter(wave => wave.type === selectedType);

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
            <div className="p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
              <Waves className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Ondas Gravitacionales</h1>
              <p className="text-gray-400">Monitoreo de vibraciones del espacio-tiempo</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Detecciones</p>
                    <p className="text-2xl font-bold text-white">{gravitationalWaveStats.totalDetections.toLocaleString()}</p>
                  </div>
                  <Waves className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Confirmadas</p>
                    <p className="text-2xl font-bold text-green-400">{gravitationalWaveStats.confirmed.toLocaleString()}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Candidatos</p>
                    <p className="text-2xl font-bold text-yellow-400">{gravitationalWaveStats.candidates.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Este Año</p>
                    <p className="text-2xl font-bold text-blue-400">{gravitationalWaveStats.thisYear}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Dist. Promedio</p>
                    <p className="text-2xl font-bold text-cyan-400">{gravitationalWaveStats.averageDistance} Mpc</p>
                  </div>
                  <Globe className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Max Significancia</p>
                    <p className="text-2xl font-bold text-pink-400">{gravitationalWaveStats.highestSignificance}</p>
                  </div>
                  <Zap className="h-8 w-8 text-pink-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de filtros */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Filtros</CardTitle>
                <CardDescription className="text-gray-400">
                  Filtrar por tipo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`w-full p-3 rounded-lg border transition-colors text-left ${
                      selectedType === 'all'
                        ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                        : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Todos los tipos</span>
                      <span className="text-xs bg-gray-600/50 px-2 py-1 rounded">{waves.length}</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedType('BBH')}
                    className={`w-full p-3 rounded-lg border transition-colors text-left ${
                      selectedType === 'BBH'
                        ? 'bg-red-600/20 border-red-500/30 text-red-400'
                        : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Agujeros Negros Binarios</span>
                      <span className="text-xs bg-gray-600/50 px-2 py-1 rounded">{waves.filter(w => w.type === 'BBH').length}</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedType('BNS')}
                    className={`w-full p-3 rounded-lg border transition-colors text-left ${
                      selectedType === 'BNS'
                        ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                        : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Estrellas de Neutrones</span>
                      <span className="text-xs bg-gray-600/50 px-2 py-1 rounded">{waves.filter(w => w.type === 'BNS').length}</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedType('NSBH')}
                    className={`w-full p-3 rounded-lg border transition-colors text-left ${
                      selectedType === 'NSBH'
                        ? 'bg-purple-600/20 border-purple-500/30 text-purple-400'
                        : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>NS + BH</span>
                      <span className="text-xs bg-gray-600/50 px-2 py-1 rounded">{waves.filter(w => w.type === 'NSBH').length}</span>
                    </div>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="flex-1 p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button className="flex-1 p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de ondas gravitacionales */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Catálogo de Ondas Gravitacionales</CardTitle>
                    <CardDescription className="text-gray-400">
                      {filteredWaves.length} detecciones encontradas
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">Datos en tiempo real</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredWaves.map((wave) => {
                      const typeInfo = getTypeInfo(wave.type);
                      return (
                        <div
                          key={wave.id}
                          className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-purple-500/30 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-white">{wave.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color} text-white`}>
                                  {typeInfo.name}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20`}>
                                  {wave.status}
                                </span>
                              </div>
                              
                              <p className="text-gray-300 mb-3 text-sm">{wave.description}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                <div>
                                  <p className="text-xs text-gray-400">Masa 1</p>
                                  <p className="text-sm text-gray-300">{wave.mass1.toFixed(1)} M☉</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">Masa 2</p>
                                  <p className="text-sm text-gray-300">{wave.mass2.toFixed(1)} M☉</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">Distancia</p>
                                  <p className="text-sm text-gray-300">{formatDistance(wave.distance)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">Significancia</p>
                                  <p className={`text-sm font-medium ${getSignificanceColor(wave.significance)}`}>{wave.significance}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-400">
                                <span>Fecha: {wave.date}</span>
                                <span>Detectores: {wave.detectors.join(', ')}</span>
                              </div>
                            </div>
                            <button className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 transition-colors">
                              <Info className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 