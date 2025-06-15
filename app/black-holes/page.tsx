"use client";
import { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Circle, Star, Eye, Zap, AlertTriangle, Info, TrendingUp, Globe } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

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

export default function BlackHolesPage() {
  const [blackHoles, setBlackHoles] = useState<BlackHole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchBlackHoles();
  }, []);

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
            <Circle className="w-12 h-12 text-red-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Agujeros Negros</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora los agujeros negros más fascinantes del universo. Desde los supermasivos en el centro de galaxias
            hasta los estelares que se forman de estrellas colapsadas.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Circle className="w-8 h-8 text-red-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{blackHoles.length}</p>
                  <p className="text-gray-400">Agujeros Negros</p>
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
                    {blackHoles.filter(bh => bh.type === 'Supermasivo').length}
                  </p>
                  <p className="text-gray-400">Supermasivos</p>
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
                    {blackHoles.filter(bh => bh.type === 'Estelar').length}
                  </p>
                  <p className="text-gray-400">Estelares</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {blackHoles.filter(bh => bh.status === 'Activo').length}
                  </p>
                  <p className="text-gray-400">Activos</p>
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
                <TabsTrigger value="all" className="text-white">Todos</TabsTrigger>
                <TabsTrigger value="Supermasivo" className="text-white">Supermasivos</TabsTrigger>
                <TabsTrigger value="Estelar" className="text-white">Estelares</TabsTrigger>
                <TabsTrigger value="Binario" className="text-white">Binarios</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Lista de Agujeros Negros */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBlackHoles.map((blackHole, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-red-500 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">{blackHole.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      Descubierto en {blackHole.discovered}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`${getTypeColor(blackHole.type)} text-white`}>
                      {blackHole.type}
                    </Badge>
                    <Badge className={`${getStatusColor(blackHole.status)} text-white`}>
                      {blackHole.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {blackHole.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Masa</p>
                      <p className="text-white font-semibold">{formatMass(blackHole.mass)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Distancia</p>
                      <p className="text-white font-semibold">{formatDistance(blackHole.distance)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-400 text-sm">Coordenadas</p>
                      <p className="text-white text-sm font-mono">
                        RA: {blackHole.coordinates.ra}
                      </p>
                      <p className="text-white text-sm font-mono">
                        Dec: {blackHole.coordinates.dec}
                      </p>
                    </div>
                  </div>
                  
                  {blackHole.lastEvent && (
                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex items-start">
                        <Info className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Último Evento</p>
                          <p className="text-white text-sm">{blackHole.lastEvent}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlackHoles.length === 0 && (
          <div className="text-center py-12">
            <Circle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No se encontraron agujeros negros</h3>
            <p className="text-gray-500">Intenta seleccionar un tipo diferente</p>
          </div>
        )}

        {/* Información Educativa */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="w-5 h-5 mr-2" />
              ¿Qué son los Agujeros Negros?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Agujeros Negros Supermasivos</h4>
                <p className="text-gray-300">
                  Se encuentran en el centro de la mayoría de galaxias, con masas de millones a miles de millones de veces la del Sol.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Agujeros Negros Estelares</h4>
                <p className="text-gray-300">
                  Se forman cuando estrellas masivas colapsan al final de su vida, con masas típicas de 3-20 veces la del Sol.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Agujeros Negros Binarios</h4>
                <p className="text-gray-300">
                  Sistemas de dos agujeros negros que orbitan entre sí, eventualmente fusionándose y emitiendo ondas gravitacionales.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 