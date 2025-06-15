"use client";
import { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Eye, MapPin, Clock, Zap, Globe, TrendingUp, Info, AlertTriangle, Flame } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;

interface Supernova {
  id: string;
  name: string;
  type: string;
  discoveryDate: string;
  distance: number;
  magnitude: number;
  hostGalaxy: string;
  status: string;
  description: string;
  coordinates: {
    ra: string;
    dec: string;
  };
  lightCurve?: {
    peakMagnitude: number;
    declineRate: number;
  };
}

export default function SupernovaePage() {
  const [supernovae, setSupernovae] = useState<Supernova[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSupernovae();
  }, []);

  const fetchSupernovae = async () => {
    try {
      setLoading(true);
      // Simular datos de supernovas
      const mockData: Supernova[] = [
        {
          id: "SN 1987A",
          name: "SN 1987A",
          type: "II",
          discoveryDate: "1987-02-23",
          distance: 168000,
          magnitude: 2.9,
          hostGalaxy: "Gran Nube de Magallanes",
          status: "Remanente",
          description: "Una de las supernovas más importantes de la historia. Primera supernova visible a simple vista desde SN 1604.",
          coordinates: { ra: "05h 35m 28.020s", dec: "-69° 16' 11.07\"" },
          lightCurve: { peakMagnitude: 2.9, declineRate: 0.008 }
        },
        {
          id: "SN 2011fe",
          name: "SN 2011fe",
          type: "Ia",
          discoveryDate: "2011-08-24",
          distance: 21000000,
          magnitude: 9.9,
          hostGalaxy: "M101",
          status: "Remanente",
          description: "Supernova de Tipo Ia muy cercana y brillante. Importante para el estudio de la expansión del universo.",
          coordinates: { ra: "14h 03m 05.809s", dec: "+54° 16' 25.21\"" },
          lightCurve: { peakMagnitude: 9.9, declineRate: 0.012 }
        },
        {
          id: "SN 2014J",
          name: "SN 2014J",
          type: "Ia",
          discoveryDate: "2014-01-21",
          distance: 11400000,
          magnitude: 10.5,
          hostGalaxy: "M82",
          status: "Remanente",
          description: "Supernova de Tipo Ia en la galaxia M82. Una de las más cercanas y brillantes en décadas.",
          coordinates: { ra: "09h 55m 42.217s", dec: "+69° 40' 26.56\"" },
          lightCurve: { peakMagnitude: 10.5, declineRate: 0.011 }
        },
        {
          id: "SN 2023ixf",
          name: "SN 2023ixf",
          type: "II",
          discoveryDate: "2023-05-19",
          distance: 21000000,
          magnitude: 14.1,
          hostGalaxy: "M101",
          status: "Activa",
          description: "Supernova de Tipo II reciente en la galaxia M101. Muy estudiada por su proximidad.",
          coordinates: { ra: "14h 03m 38.562s", dec: "+54° 18' 42.10\"" },
          lightCurve: { peakMagnitude: 14.1, declineRate: 0.015 }
        },
        {
          id: "SN 2024abc",
          name: "SN 2024abc",
          type: "Ib",
          discoveryDate: "2024-01-15",
          distance: 45000000,
          magnitude: 16.2,
          hostGalaxy: "NGC 4567",
          status: "Activa",
          description: "Supernova de Tipo Ib reciente. Estudiada para entender la evolución de estrellas masivas.",
          coordinates: { ra: "12h 36m 34.123s", dec: "+11° 15' 23.45\"" },
          lightCurve: { peakMagnitude: 16.2, declineRate: 0.020 }
        },
        {
          id: "SN 1604",
          name: "SN 1604 (Kepler)",
          type: "Ia",
          discoveryDate: "1604-10-09",
          distance: 20000,
          magnitude: -2.5,
          hostGalaxy: "Vía Láctea",
          status: "Remanente",
          description: "Última supernova observada en nuestra galaxia. Documentada por Johannes Kepler.",
          coordinates: { ra: "17h 30m 35.98s", dec: "-21° 28' 56.2\"" },
          lightCurve: { peakMagnitude: -2.5, declineRate: 0.010 }
        }
      ];
      
      setSupernovae(mockData);
    } catch (error) {
      console.error('Error fetching supernovae:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'Ia': return { name: 'Tipo Ia', color: 'bg-red-500', description: 'Enana blanca' };
      case 'Ib': return { name: 'Tipo Ib', color: 'bg-orange-500', description: 'Estrella masiva' };
      case 'Ic': return { name: 'Tipo Ic', color: 'bg-yellow-500', description: 'Estrella masiva' };
      case 'II': return { name: 'Tipo II', color: 'bg-blue-500', description: 'Supergigante roja' };
      default: return { name: 'Desconocido', color: 'bg-gray-500', description: 'Desconocido' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-green-500';
      case 'Remanente': return 'bg-purple-500';
      case 'Histórica': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDistance = (distance: number) => {
    if (distance >= 1000000) return `${(distance / 1000000).toFixed(1)} Mly`;
    if (distance >= 1000) return `${(distance / 1000).toFixed(1)} kly`;
    return `${distance} ly`;
  };

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude < 0) return 'text-yellow-300';
    if (magnitude < 5) return 'text-yellow-400';
    if (magnitude < 10) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredSupernovae = supernovae.filter(sn => {
    const matchesSearch = sn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sn.hostGalaxy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || sn.type === selectedType;
    return matchesSearch && matchesType;
  });

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
            <Star className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Supernovas</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explosiones estelares que iluminan el universo. Desde las históricas observadas por astrónomos antiguos
            hasta las más recientes detectadas por telescopios modernos.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{supernovae.length}</p>
                  <p className="text-gray-400">Supernovas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Flame className="w-8 h-8 text-red-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {supernovae.filter(sn => sn.status === 'Activa').length}
                  </p>
                  <p className="text-gray-400">Activas</p>
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
                    {supernovae.filter(sn => sn.type === 'Ia').length}
                  </p>
                  <p className="text-gray-400">Tipo Ia</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {Math.max(...supernovae.map(sn => new Date(sn.discoveryDate).getFullYear()))}
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nombre o galaxia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Tipo de supernova" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Ia">Tipo Ia</SelectItem>
                  <SelectItem value="Ib">Tipo Ib</SelectItem>
                  <SelectItem value="Ic">Tipo Ic</SelectItem>
                  <SelectItem value="II">Tipo II</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Supernovas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSupernovae.map((supernova, index) => {
            const typeInfo = getTypeInfo(supernova.type);
            
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-yellow-500 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl">{supernova.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {supernova.hostGalaxy} • {new Date(supernova.discoveryDate).toLocaleDateString('es-ES')}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`${typeInfo.color} text-white`}>
                        {typeInfo.name}
                      </Badge>
                      <Badge className={`${getStatusColor(supernova.status)} text-white`}>
                        {supernova.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {supernova.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Distancia</p>
                        <p className="text-white font-semibold">{formatDistance(supernova.distance)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Magnitud</p>
                        <p className={`font-semibold ${getMagnitudeColor(supernova.magnitude)}`}>
                          {supernova.magnitude}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Tipo</p>
                        <p className="text-white font-semibold">{typeInfo.description}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Descubrimiento</p>
                        <p className="text-white font-semibold">
                          {new Date(supernova.discoveryDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                    
                    {supernova.lightCurve && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Magnitud pico:</span>
                          <span className={`font-semibold ${getMagnitudeColor(supernova.lightCurve.peakMagnitude)}`}>
                            {supernova.lightCurve.peakMagnitude}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Tasa de declive:</span>
                          <span className="text-white font-semibold">
                            {supernova.lightCurve.declineRate} mag/día
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-400">Coordenadas:</span>
                        <span className="text-white ml-2 font-mono text-xs">
                          {supernova.coordinates.ra}, {supernova.coordinates.dec}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredSupernovae.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No se encontraron supernovas</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}

        {/* Información Educativa */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Tipos de Supernovas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-red-400 font-semibold mb-2">Tipo Ia</h4>
                <p className="text-gray-300 mb-4">
                  Explosión de una enana blanca que excede el límite de Chandrasekhar. 
                  Importantes para medir distancias cósmicas y estudiar la energía oscura.
                </p>
                
                <h4 className="text-orange-400 font-semibold mb-2">Tipo Ib/Ic</h4>
                <p className="text-gray-300 mb-4">
                  Explosión de estrellas masivas que han perdido sus capas externas de hidrógeno (Ib) 
                  o hidrógeno y helio (Ic).
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Tipo II</h4>
                <p className="text-gray-300 mb-4">
                  Explosión de supergigantes rojas que mantienen sus capas de hidrógeno. 
                  Producen remanentes de supernova y pueden formar agujeros negros o estrellas de neutrones.
                </p>
                
                <h4 className="text-yellow-400 font-semibold mb-2">Importancia Científica</h4>
                <p className="text-gray-300">
                  Las supernovas son cruciales para entender la evolución estelar, 
                  la nucleosíntesis de elementos pesados y la expansión del universo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 