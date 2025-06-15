"use client";
import { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Satellite, Eye, MapPin, Clock, Signal, Globe, TrendingUp, Info, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;

interface StarlinkSatellite {
  id: string;
  name: string;
  noradId: string;
  launchDate: string;
  altitude: number;
  inclination: number;
  status: string;
  constellation: string;
  lastUpdate: string;
  position: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
}

interface Constellation {
  name: string;
  totalSatellites: number;
  activeSatellites: number;
  coverage: string;
  status: string;
}

export default function StarlinkPage() {
  const [satellites, setSatellites] = useState<StarlinkSatellite[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConstellation, setSelectedConstellation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStarlinkData();
  }, []);

  const fetchStarlinkData = async () => {
    try {
      setLoading(true);
      // Simular datos de Starlink
      const mockSatellites: StarlinkSatellite[] = [
        {
          id: "STL-001",
          name: "Starlink-1",
          noradId: "44235",
          launchDate: "2019-05-24",
          altitude: 550,
          inclination: 53,
          status: "Activo",
          constellation: "Starlink v1.0",
          lastUpdate: "2024-01-15T10:30:00Z",
          position: { latitude: 45.0, longitude: -75.0, altitude: 550 }
        },
        {
          id: "STL-002",
          name: "Starlink-2",
          noradId: "44236",
          launchDate: "2019-05-24",
          altitude: 550,
          inclination: 53,
          status: "Activo",
          constellation: "Starlink v1.0",
          lastUpdate: "2024-01-15T10:30:00Z",
          position: { latitude: 44.8, longitude: -74.8, altitude: 550 }
        },
        {
          id: "STL-1001",
          name: "Starlink-1001",
          noradId: "44713",
          launchDate: "2020-01-07",
          altitude: 550,
          inclination: 53,
          status: "Activo",
          constellation: "Starlink v1.0",
          lastUpdate: "2024-01-15T10:30:00Z",
          position: { latitude: 46.2, longitude: -76.1, altitude: 550 }
        },
        {
          id: "STL-2001",
          name: "Starlink-2001",
          noradId: "45600",
          launchDate: "2021-01-20",
          altitude: 570,
          inclination: 70,
          status: "Activo",
          constellation: "Starlink v1.5",
          lastUpdate: "2024-01-15T10:30:00Z",
          position: { latitude: 43.5, longitude: -73.2, altitude: 570 }
        },
        {
          id: "STL-3001",
          name: "Starlink-3001",
          noradId: "52000",
          launchDate: "2022-01-06",
          altitude: 530,
          inclination: 53,
          status: "Activo",
          constellation: "Starlink v2.0",
          lastUpdate: "2024-01-15T10:30:00Z",
          position: { latitude: 47.1, longitude: -77.5, altitude: 530 }
        },
        {
          id: "STL-4001",
          name: "Starlink-4001",
          noradId: "55000",
          launchDate: "2023-02-27",
          altitude: 525,
          inclination: 43,
          status: "Activo",
          constellation: "Starlink v2.0",
          lastUpdate: "2024-01-15T10:30:00Z",
          position: { latitude: 42.8, longitude: -72.9, altitude: 525 }
        }
      ];

      const mockConstellations: Constellation[] = [
        {
          name: "Starlink v1.0",
          totalSatellites: 1584,
          activeSatellites: 1450,
          coverage: "Global",
          status: "Operacional"
        },
        {
          name: "Starlink v1.5",
          totalSatellites: 720,
          activeSatellites: 680,
          coverage: "Global",
          status: "Operacional"
        },
        {
          name: "Starlink v2.0",
          totalSatellites: 29988,
          activeSatellites: 1200,
          coverage: "En desarrollo",
          status: "Despliegue"
        }
      ];
      
      setSatellites(mockSatellites);
      setConstellations(mockConstellations);
    } catch (error) {
      console.error('Error fetching Starlink data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-500';
      case 'Inactivo': return 'bg-red-500';
      case 'Mantenimiento': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getConstellationColor = (constellation: string) => {
    switch (constellation) {
      case 'Starlink v1.0': return 'bg-blue-500';
      case 'Starlink v1.5': return 'bg-green-500';
      case 'Starlink v2.0': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredSatellites = satellites.filter(satellite => {
    const matchesSearch = satellite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         satellite.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesConstellation = selectedConstellation === 'all' || satellite.constellation === selectedConstellation;
    return matchesSearch && matchesConstellation;
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
            <Satellite className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Starlink Tracker</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seguimiento en tiempo real de la constelación de satélites Starlink de SpaceX. 
            Monitoreando más de 4,000 satélites en órbita terrestre.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Satellite className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {constellations.reduce((sum, c) => sum + c.totalSatellites, 0)}
                  </p>
                  <p className="text-gray-400">Total Satélites</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Signal className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {constellations.reduce((sum, c) => sum + c.activeSatellites, 0)}
                  </p>
                  <p className="text-gray-400">Activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{constellations.length}</p>
                  <p className="text-gray-400">Constelaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">99.8%</p>
                  <p className="text-gray-400">Tiempo Activo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Constelaciones */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Constelaciones Starlink</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {constellations.map((constellation, index) => (
                <Card key={index} className="bg-gray-700/50 border-gray-600">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{constellation.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {constellation.coverage}
                        </CardDescription>
                      </div>
                      <Badge className={`${getConstellationColor(constellation.name)} text-white`}>
                        {constellation.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total:</span>
                        <span className="text-white font-semibold">{constellation.totalSatellites}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Activos:</span>
                        <span className="text-green-400 font-semibold">{constellation.activeSatellites}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(constellation.activeSatellites / constellation.totalSatellites) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar satélite por nombre o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <Select value={selectedConstellation} onValueChange={setSelectedConstellation}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Constelación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las constelaciones</SelectItem>
                  {constellations.map((constellation, index) => (
                    <SelectItem key={index} value={constellation.name}>
                      {constellation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Satélites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSatellites.map((satellite, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-lg">{satellite.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      ID: {satellite.id} | NORAD: {satellite.noradId}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`${getStatusColor(satellite.status)} text-white`}>
                      {satellite.status}
                    </Badge>
                    <Badge className={`${getConstellationColor(satellite.constellation)} text-white`}>
                      {satellite.constellation}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Altitud</p>
                      <p className="text-white font-semibold">{satellite.altitude} km</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Inclinación</p>
                      <p className="text-white font-semibold">{satellite.inclination}°</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Latitud</p>
                      <p className="text-white font-semibold">{satellite.position.latitude.toFixed(2)}°</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Longitud</p>
                      <p className="text-white font-semibold">{satellite.position.longitude.toFixed(2)}°</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-400">Lanzamiento:</span>
                      <span className="text-white ml-2">
                        {new Date(satellite.launchDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-400">Última actualización:</span>
                      <span className="text-white ml-2">
                        {new Date(satellite.lastUpdate).toLocaleString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSatellites.length === 0 && (
          <div className="text-center py-12">
            <Satellite className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No se encontraron satélites</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}

        {/* Información Adicional */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Acerca de Starlink
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Cobertura Global</h4>
                <p className="text-gray-300">
                  Starlink proporciona acceso a internet de alta velocidad en todo el mundo, 
                  especialmente en áreas rurales y remotas.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Tecnología Avanzada</h4>
                <p className="text-gray-300">
                  Los satélites utilizan tecnología de comunicación láser entre satélites 
                  y antenas phased array para máxima eficiencia.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Sostenibilidad</h4>
                <p className="text-gray-300">
                  Los satélites están diseñados para desorbitar automáticamente al final de su vida útil, 
                  minimizando la basura espacial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 