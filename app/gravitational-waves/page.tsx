"use client";
import { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Waves, Star, Eye, Zap, AlertTriangle, Info, TrendingUp, Globe, Calendar } from 'lucide-react';
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

export default function GravitationalWavesPage() {
  const [waves, setWaves] = useState<GravitationalWave[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchGravitationalWaves();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Waves className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Ondas Gravitacionales</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitoreo de ondas gravitacionales detectadas por LIGO, Virgo y KAGRA. 
            Explorando el universo a través de las vibraciones del espacio-tiempo.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Waves className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{waves.length}</p>
                  <p className="text-gray-400">Detecciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {waves.filter(w => w.type === 'BBH').length}
                  </p>
                  <p className="text-gray-400">Agujeros Negros</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Zap className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {waves.filter(w => w.type === 'BNS').length}
                  </p>
                  <p className="text-gray-400">Estrellas de Neutrones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {Math.max(...waves.map(w => new Date(w.date).getFullYear()))}
                  </p>
                  <p className="text-gray-400">Año Más Reciente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <Tabs value={selectedType} onValueChange={setSelectedType}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="all" className="text-white">Todas</TabsTrigger>
                <TabsTrigger value="BBH" className="text-white">Agujeros Negros</TabsTrigger>
                <TabsTrigger value="BNS" className="text-white">Estrellas de Neutrones</TabsTrigger>
                <TabsTrigger value="NSBH" className="text-white">Mixtas</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Lista de Ondas Gravitacionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWaves.map((wave, index) => {
            const typeInfo = getTypeInfo(wave.type);
            
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl">{wave.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {new Date(wave.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <Badge className={`${typeInfo.color} text-white`}>
                      {typeInfo.name}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {wave.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Masa 1</p>
                        <p className="text-white font-semibold">{wave.mass1} M☉</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Masa 2</p>
                        <p className="text-white font-semibold">{wave.mass2} M☉</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Distancia</p>
                        <p className="text-white font-semibold">{formatDistance(wave.distance)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Significancia</p>
                        <p className={`font-semibold ${getSignificanceColor(wave.significance)}`}>
                          {wave.significance} σ
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm">Detectores</p>
                      <div className="flex flex-wrap gap-2">
                        {wave.detectors.map((detector, idx) => (
                          <Badge key={idx} variant="outline" className="text-gray-300 border-gray-600">
                            {detector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-400 text-sm">Coordenadas</p>
                          <p className="text-white text-sm">
                            RA: {wave.coordinates.ra.toFixed(1)}°, Dec: {wave.coordinates.dec.toFixed(1)}°
                          </p>
                        </div>
                        <Badge className="bg-green-500 text-white">
                          {wave.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredWaves.length === 0 && (
          <div className="text-center py-12">
            <Waves className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No se encontraron detecciones</h3>
            <p className="text-gray-500">Intenta seleccionar un tipo diferente</p>
          </div>
        )}

        {/* Información Educativa */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="w-5 h-5 mr-2" />
              ¿Qué son las Ondas Gravitacionales?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">¿Qué son?</h4>
                <p className="text-gray-300">
                  Ondas en el tejido del espacio-tiempo causadas por eventos cósmicos violentos como fusiones de agujeros negros.
                </p>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">¿Cómo se detectan?</h4>
                <p className="text-gray-300">
                  Usando interferómetros láser gigantes como LIGO, Virgo y KAGRA que miden cambios infinitesimales en la longitud.
                </p>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">¿Por qué son importantes?</h4>
                <p className="text-gray-300">
                  Permiten observar el universo de una manera completamente nueva, revelando eventos invisibles a la luz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 