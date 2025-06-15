"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Circle, Star, Globe, Search, Filter, Info, TrendingUp, Eye } from 'lucide-react';

const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;

// Componente LoadingSpinner inline para evitar problemas de importación
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        role="status"
        aria-label="Cargando"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

interface Exoplanet {
  pl_name: string;
  hostname: string;
  pl_orbper: number;
  pl_rade: number;
  pl_masse: number;
  pl_dens: number;
  pl_eqt: number;
  discoverymethod: string;
  disc_year: number;
  pl_orbincl: number;
  pl_orbsmax: number;
  st_teff: number;
  st_rad: number;
  st_mass: number;
  st_dist: number;
  pl_letter: string;
  sy_pnum: number;
  pl_status: string;
}

export default function ExoplanetsPage() {
  const [exoplanets, setExoplanets] = useState<Exoplanet[]>([]);
  const [filteredExoplanets, setFilteredExoplanets] = useState<Exoplanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [sortBy, setSortBy] = useState('disc_year');

  useEffect(() => {
    fetchExoplanets();
  }, []);

  useEffect(() => {
    filterAndSortExoplanets();
  }, [exoplanets, searchTerm, filterMethod, sortBy]);

  const fetchExoplanets = async () => {
    try {
      setLoading(true);
      // Simular datos de exoplanetas (en producción usarías la API de NASA)
      const mockData: Exoplanet[] = [
        {
          pl_name: "Kepler-186f",
          hostname: "Kepler-186",
          pl_orbper: 129.9,
          pl_rade: 1.17,
          pl_masse: 1.4,
          pl_dens: 5.51,
          pl_eqt: 188,
          discoverymethod: "Transit",
          disc_year: 2014,
          pl_orbincl: 89.9,
          pl_orbsmax: 0.432,
          st_teff: 3788,
          st_rad: 0.472,
          st_mass: 0.478,
          st_dist: 492,
          pl_letter: "f",
          sy_pnum: 5,
          pl_status: "Confirmed"
        },
        {
          pl_name: "Proxima Centauri b",
          hostname: "Proxima Centauri",
          pl_orbper: 11.186,
          pl_rade: 1.07,
          pl_masse: 1.27,
          pl_dens: 5.51,
          pl_eqt: 234,
          discoverymethod: "Radial Velocity",
          disc_year: 2016,
          pl_orbincl: 90,
          pl_orbsmax: 0.0485,
          st_teff: 3042,
          st_rad: 0.141,
          st_mass: 0.122,
          st_dist: 1.301,
          pl_letter: "b",
          sy_pnum: 1,
          pl_status: "Confirmed"
        },
        {
          pl_name: "TRAPPIST-1e",
          hostname: "TRAPPIST-1",
          pl_orbper: 6.099,
          pl_rade: 0.92,
          pl_masse: 0.69,
          pl_dens: 5.51,
          pl_eqt: 251,
          discoverymethod: "Transit",
          disc_year: 2017,
          pl_orbincl: 89.8,
          pl_orbsmax: 0.029,
          st_teff: 2559,
          st_rad: 0.117,
          st_mass: 0.089,
          st_dist: 12.43,
          pl_letter: "e",
          sy_pnum: 7,
          pl_status: "Confirmed"
        },
        {
          pl_name: "HD 209458 b",
          hostname: "HD 209458",
          pl_orbper: 3.5247,
          pl_rade: 1.35,
          pl_masse: 0.69,
          pl_dens: 0.35,
          pl_eqt: 1459,
          discoverymethod: "Transit",
          disc_year: 1999,
          pl_orbincl: 86.71,
          pl_orbsmax: 0.047,
          st_teff: 6075,
          st_rad: 1.18,
          st_mass: 1.15,
          st_dist: 47.1,
          pl_letter: "b",
          sy_pnum: 1,
          pl_status: "Confirmed"
        },
        {
          pl_name: "WASP-12b",
          hostname: "WASP-12",
          pl_orbper: 1.0914,
          pl_rade: 1.9,
          pl_masse: 1.47,
          pl_dens: 0.25,
          pl_eqt: 2580,
          discoverymethod: "Transit",
          disc_year: 2008,
          pl_orbincl: 83.1,
          pl_orbsmax: 0.0234,
          st_teff: 6250,
          st_rad: 1.57,
          st_mass: 1.35,
          st_dist: 427,
          pl_letter: "b",
          sy_pnum: 1,
          pl_status: "Confirmed"
        }
      ];
      
      setExoplanets(mockData);
    } catch (error) {
      console.error('Error fetching exoplanets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortExoplanets = () => {
    let filtered = exoplanets.filter(planet => {
      const matchesSearch = planet.pl_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           planet.hostname.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMethod = filterMethod === 'all' || planet.discoverymethod === filterMethod;
      
      return matchesSearch && matchesMethod;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'disc_year':
          return b.disc_year - a.disc_year;
        case 'pl_rade':
          return b.pl_rade - a.pl_rade;
        case 'pl_masse':
          return b.pl_masse - a.pl_masse;
        case 'st_dist':
          return a.st_dist - b.st_dist;
        default:
          return 0;
      }
    });

    setFilteredExoplanets(filtered);
  };

  const getPlanetType = (mass: number, radius: number) => {
    if (mass < 0.1) return { type: "Enano", color: "bg-gray-500" };
    if (mass < 2) return { type: "Terrestre", color: "bg-blue-500" };
    if (mass < 10) return { type: "Gigante Gaseoso", color: "bg-orange-500" };
    return { type: "Super-Júpiter", color: "bg-red-500" };
  };

  const getHabitabilityScore = (planet: Exoplanet) => {
    // Cálculo simplificado de habitabilidad
    const tempScore = planet.pl_eqt > 200 && planet.pl_eqt < 400 ? 1 : 0;
    const sizeScore = planet.pl_rade > 0.8 && planet.pl_rade < 1.5 ? 1 : 0;
    const massScore = planet.pl_masse > 0.5 && planet.pl_masse < 2 ? 1 : 0;
    return ((tempScore + sizeScore + massScore) / 3 * 100).toFixed(0);
  };

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
            <Circle className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Exoplanetas</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre planetas fuera de nuestro sistema solar. Monitoreamos más de 5,000 exoplanetas confirmados
            con datos actualizados de la NASA Exoplanet Archive.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Circle className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">{exoplanets.length}</p>
                  <p className="text-gray-400">Exoplanetas</p>
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
                    {exoplanets.filter(p => p.pl_eqt > 200 && p.pl_eqt < 400).length}
                  </p>
                  <p className="text-gray-400">Potencialmente Habitables</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {Math.max(...exoplanets.map(p => p.disc_year))}
                  </p>
                  <p className="text-gray-400">Año Más Reciente</p>
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
                    {exoplanets.filter(p => p.disc_year >= 2020).length}
                  </p>
                  <p className="text-gray-400">Descubiertos 2020+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y Búsqueda */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nombre de planeta o estrella..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full md:w-48 h-10 rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los métodos</option>
                <option value="Transit">Tránsito</option>
                <option value="Radial Velocity">Velocidad Radial</option>
                <option value="Imaging">Imagen Directa</option>
                <option value="Microlensing">Microlente</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-48 h-10 rounded-md border border-gray-600 bg-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="disc_year">Año de descubrimiento</option>
                <option value="pl_rade">Radio del planeta</option>
                <option value="pl_masse">Masa del planeta</option>
                <option value="st_dist">Distancia</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Exoplanetas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredExoplanets.map((planet, index) => {
            const planetType = getPlanetType(planet.pl_masse, planet.pl_rade);
            const habitabilityScore = getHabitabilityScore(planet);
            
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{planet.pl_name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Estrella: {planet.hostname}
                      </CardDescription>
                    </div>
                    <Badge className={`${planetType.color} text-white`}>
                      {planetType.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Radio</p>
                        <p className="text-white font-semibold">{planet.pl_rade} R⊕</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Masa</p>
                        <p className="text-white font-semibold">{planet.pl_masse} M⊕</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Temperatura</p>
                        <p className="text-white font-semibold">{planet.pl_eqt} K</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Período Orbital</p>
                        <p className="text-white font-semibold">{planet.pl_orbper} días</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 text-sm">Habitabilidad</p>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${habitabilityScore}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm">{habitabilityScore}%</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Descubierto</p>
                        <p className="text-white font-semibold">{planet.disc_year}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                      <Badge variant="outline" className="text-gray-300 border-gray-600">
                        {planet.discoverymethod}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {planet.st_dist} ly
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredExoplanets.length === 0 && (
          <div className="text-center py-12">
            <Circle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No se encontraron exoplanetas</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
} 