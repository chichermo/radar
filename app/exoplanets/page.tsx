"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Circle, Star, Globe, Search, Filter, Info, TrendingUp, Eye, Database, Target, Zap, Activity, RefreshCw, Download } from 'lucide-react';

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

// Datos simulados para estadísticas
const exoplanetStats = {
  totalDiscovered: 5432,
  confirmed: 4123,
  candidates: 1309,
  habitableZone: 156,
  thisYear: 89,
  nearest: 1.3
};

export default function ExoplanetsPage() {
  const [exoplanets, setExoplanets] = useState<Exoplanet[]>([]);
  const [filteredExoplanets, setFilteredExoplanets] = useState<Exoplanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [sortBy, setSortBy] = useState('disc_year');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchExoplanets();
  }, []);

  useEffect(() => {
    filterAndSortExoplanets();
  }, [exoplanets, searchTerm, filterMethod, sortBy]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
    if (mass < 0.1) return "Enano";
    if (mass < 2) return "Terrestre";
    if (mass < 10) return "Gigante Gaseoso";
    return "Super-Júpiter";
  };

  const getHabitabilityScore = (planet: Exoplanet) => {
    // Cálculo simplificado de habitabilidad
    const tempScore = planet.pl_eqt > 200 && planet.pl_eqt < 400 ? 1 : 0;
    const sizeScore = planet.pl_rade > 0.8 && planet.pl_rade < 1.5 ? 1 : 0;
    const massScore = planet.pl_masse > 0.5 && planet.pl_masse < 2 ? 1 : 0;
    return ((tempScore + sizeScore + massScore) / 3 * 100).toFixed(0);
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
              <Circle className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Exoplanetas</h1>
              <p className="text-gray-400">Planetas fuera del sistema solar - Catálogo completo</p>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-2xl font-bold text-white">{exoplanetStats.totalDiscovered.toLocaleString()}</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Confirmados</p>
                    <p className="text-2xl font-bold text-green-400">{exoplanetStats.confirmed.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-yellow-400">{exoplanetStats.candidates.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Habitables</p>
                    <p className="text-2xl font-bold text-purple-400">{exoplanetStats.habitableZone}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Este Año</p>
                    <p className="text-2xl font-bold text-cyan-400">{exoplanetStats.thisYear}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Más Cercano</p>
                    <p className="text-2xl font-bold text-pink-400">{exoplanetStats.nearest} ly</p>
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
                  Refinar búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nombre del planeta..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Método de Descubrimiento</label>
                  <select
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="all">Todos los métodos</option>
                    <option value="Transit">Tránsito</option>
                    <option value="Radial Velocity">Velocidad Radial</option>
                    <option value="Imaging">Imagen Directa</option>
                    <option value="Microlensing">Microlente</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="disc_year">Año de Descubrimiento</option>
                    <option value="pl_rade">Radio del Planeta</option>
                    <option value="pl_masse">Masa del Planeta</option>
                    <option value="st_dist">Distancia</option>
                  </select>
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

          {/* Lista de exoplanetas */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Catálogo de Exoplanetas</CardTitle>
                    <CardDescription className="text-gray-400">
                      {filteredExoplanets.length} planetas encontrados
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
                    {filteredExoplanets.map((planet) => (
                      <div
                        key={planet.pl_name}
                        className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{planet.pl_name}</h3>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
                                {planet.discoverymethod}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
                                {planet.disc_year}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <p className="text-xs text-gray-400">Estrella</p>
                                <p className="text-sm text-gray-300">{planet.hostname}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Radio</p>
                                <p className="text-sm text-gray-300">{planet.pl_rade.toFixed(2)} R⊕</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Masa</p>
                                <p className="text-sm text-gray-300">{planet.pl_masse.toFixed(2)} M⊕</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Distancia</p>
                                <p className="text-sm text-gray-300">{planet.st_dist.toFixed(1)} ly</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <span>Tipo: {getPlanetType(planet.pl_masse, planet.pl_rade)}</span>
                              <span>Habitabilidad: {getHabitabilityScore(planet)}%</span>
                              <span>Período: {planet.pl_orbper.toFixed(1)} días</span>
                            </div>
                          </div>
                          <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                            <Info className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
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