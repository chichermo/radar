"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Circle, Star, Globe, Search, Filter, Info, TrendingUp, Eye, Database, Target, Zap, Activity, RefreshCw, Download } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import PageLayout from '@/components/PageLayout';

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

// Datos actualizados para estadísticas (enero 2024)
const exoplanetStats = {
  totalDiscovered: 5676,
  confirmed: 4321,
  candidates: 1355,
  habitableZone: 172,
  thisYear: 156,
  nearest: 1.3
};

export default function ExoplanetsPage() {
  const { t } = useI18n();
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
      
      // Intentar obtener datos reales de la API
      const response = await fetch('/api/exoplanets');
      if (response.ok) {
        const data = await response.json();
        setExoplanets(data);
      } else {
        // Base de datos expandida de exoplanetas
        const fallbackData: Exoplanet[] = [
          // EXOPLANETAS ALTAMENTE HABITABLES (Destacados)
          {
            pl_name: "K2-18b",
            hostname: "K2-18",
            pl_orbper: 32.9,
            pl_rade: 2.61,
            pl_masse: 8.63,
            pl_dens: 2.67,
            pl_eqt: 265,
            discoverymethod: "Transit",
            disc_year: 2015,
            pl_orbincl: 89.6,
            pl_orbsmax: 0.1429,
            st_teff: 3457,
            st_rad: 0.41,
            st_mass: 0.36,
            st_dist: 124,
            pl_letter: "b",
            sy_pnum: 1,
            pl_status: "Confirmed"
          },
          {
            pl_name: "TOI-700d",
            hostname: "TOI-700",
            pl_orbper: 37.4,
            pl_rade: 1.19,
            pl_masse: 1.72,
            pl_dens: 5.51,
            pl_eqt: 268,
            discoverymethod: "Transit",
            disc_year: 2020,
            pl_orbincl: 89.7,
            pl_orbsmax: 0.163,
            st_teff: 3480,
            st_rad: 0.42,
            st_mass: 0.42,
            st_dist: 101.4,
            pl_letter: "d",
            sy_pnum: 3,
            pl_status: "Confirmed"
          },
          {
            pl_name: "Kepler-442b",
            hostname: "Kepler-442",
            pl_orbper: 112.3,
            pl_rade: 1.34,
            pl_masse: 2.36,
            pl_dens: 4.8,
            pl_eqt: 233,
            discoverymethod: "Transit",
            disc_year: 2015,
            pl_orbincl: 89.9,
            pl_orbsmax: 0.409,
            st_teff: 4402,
            st_rad: 0.6,
            st_mass: 0.61,
            st_dist: 1206,
            pl_letter: "b",
            sy_pnum: 1,
            pl_status: "Confirmed"
          },
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
          }
        ];
        setExoplanets(fallbackData);
      }
    } catch (error) {
      console.error('Error fetching exoplanet data:', error);
      // Usar datos de fallback en caso de error
      const fallbackData: Exoplanet[] = [
        {
          pl_name: "K2-18b",
          hostname: "K2-18",
          pl_orbper: 32.9,
          pl_rade: 2.61,
          pl_masse: 8.63,
          pl_dens: 2.67,
          pl_eqt: 265,
          discoverymethod: "Transit",
          disc_year: 2015,
          pl_orbincl: 89.6,
          pl_orbsmax: 0.1429,
          st_teff: 3457,
          st_rad: 0.41,
          st_mass: 0.36,
          st_dist: 124,
          pl_letter: "b",
          sy_pnum: 1,
          pl_status: "Confirmed"
        }
      ];
      setExoplanets(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortExoplanets = () => {
    let filtered = exoplanets;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(planet =>
        planet.pl_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        planet.hostname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por método de descubrimiento
    if (filterMethod !== 'all') {
      filtered = filtered.filter(planet => planet.discoverymethod === filterMethod);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'habitability':
          return getHabitabilityScore(b) - getHabitabilityScore(a);
        case 'disc_year':
          return b.disc_year - a.disc_year;
        case 'pl_rade':
          return b.pl_rade - a.pl_rade;
        case 'pl_masse':
          return b.pl_masse - a.pl_masse;
        case 'st_dist':
          return a.st_dist - b.st_dist;
        case 'pl_eqt':
          return b.pl_eqt - a.pl_eqt;
        default:
          return 0;
      }
    });

    setFilteredExoplanets(filtered);
  };

  const getPlanetType = (mass: number, radius: number) => {
    if (mass < 0.1) return 'Sub-Tierra';
    if (mass < 2) return 'Tierra';
    if (mass < 10) return 'Neptuno';
    return 'Júpiter';
  };

  const getHabitabilityScore = (planet: Exoplanet) => {
    let score = 0;
    
    // Temperatura ideal (0-50°C)
    if (planet.pl_eqt >= 273 && planet.pl_eqt <= 323) score += 30;
    else if (planet.pl_eqt >= 250 && planet.pl_eqt <= 350) score += 20;
    
    // Tamaño similar a la Tierra (0.8-1.5 R⊕)
    if (planet.pl_rade >= 0.8 && planet.pl_rade <= 1.5) score += 25;
    else if (planet.pl_rade >= 0.5 && planet.pl_rade <= 2.0) score += 15;
    
    // Masa similar a la Tierra (0.5-2 M⊕)
    if (planet.pl_masse >= 0.5 && planet.pl_masse <= 2.0) score += 25;
    else if (planet.pl_masse >= 0.1 && planet.pl_masse <= 5.0) score += 15;
    
    // Distancia a la estrella (zona habitable)
    const habitableDistance = planet.pl_orbsmax >= 0.8 && planet.pl_orbsmax <= 1.5;
    if (habitableDistance) score += 20;
    
    return Math.min(score, 100);
  };

  const getSpecialInfo = (planet: Exoplanet) => {
    const specialPlanets: { [key: string]: { highlight: string; description: string; icon: string; color: string } } = {
      'K2-18b': {
        highlight: '🌊 Posible Océano de Agua',
        description: 'Detectada agua en la atmósfera. Primer planeta con agua confirmada fuera del sistema solar.',
        icon: '🌊',
        color: 'bg-blue-600/20 border-blue-500/30'
      },
      'TOI-700d': {
        highlight: '🪐 Zona Habitable Confirmada',
        description: 'Planeta rocoso en la zona habitable de su estrella. Tamaño similar a la Tierra.',
        icon: '🪐',
        color: 'bg-green-600/20 border-green-500/30'
      },
      'Kepler-442b': {
        highlight: '⭐ Alta Habitabilidad',
        description: 'Uno de los planetas más prometedores para la vida. Condiciones similares a la Tierra.',
        icon: '⭐',
        color: 'bg-purple-600/20 border-purple-500/30'
      },
      'Kepler-186f': {
        highlight: '🌍 Primer Planeta Tierra',
        description: 'Primer planeta del tamaño de la Tierra descubierto en la zona habitable.',
        icon: '🌍',
        color: 'bg-cyan-600/20 border-cyan-500/30'
      },
      'Proxima Centauri b': {
        highlight: '🌌 Más Cercano a la Tierra',
        description: 'Exoplaneta más cercano a nuestro sistema solar. Solo 4.2 años luz de distancia.',
        icon: '🌌',
        color: 'bg-pink-600/20 border-pink-500/30'
      }
    };
    
    return specialPlanets[planet.pl_name] || null;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Exoplanetas</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora el catálogo de exoplanetas confirmados y candidatos, filtra por método de descubrimiento y ordena por habitabilidad, año, masa, radio y más.</p>
      </div>

      {/* Filtros y catálogo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel de filtros */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Filter className="h-5 w-5 text-blue-400" /> Filtros</h2>
            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-2 block">Buscar planeta</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nombre del planeta o estrella"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-2 block">Método de descubrimiento</label>
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">Todos</option>
                <option value="Transit">Tránsito</option>
                <option value="Radial Velocity">Velocidad radial</option>
                <option value="Imaging">Imagen directa</option>
                <option value="Microlensing">Microlente</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-2 block">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="habitability">Habitabilidad</option>
                <option value="disc_year">Año de descubrimiento</option>
                <option value="pl_rade">Radio</option>
                <option value="pl_masse">Masa</option>
                <option value="st_dist">Distancia</option>
                <option value="pl_eqt">Temperatura</option>
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
          </div>
        </div>
        {/* Catálogo de exoplanetas */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Database className="h-5 w-5 text-blue-400" /> Catálogo de exoplanetas</h2>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="loading-spinner" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExoplanets.map((planet) => {
                  const specialInfo = getSpecialInfo(planet);
                  const habitabilityScore = getHabitabilityScore(planet);
                  return (
                    <div
                      key={planet.pl_name}
                      className={`p-4 rounded-xl border transition-colors ${
                        specialInfo 
                          ? specialInfo.color 
                          : 'bg-gray-700/30 border-gray-600/30 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{planet.pl_name}</h3>
                            {specialInfo && (
                              <span className="text-lg">{specialInfo.icon}</span>
                            )}
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
                              {planet.discoverymethod}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
                              {planet.disc_year}
                            </span>
                            {parseInt(habitabilityScore.toString()) > 70 && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-400/10 text-purple-400 border border-purple-400/20">
                                🌟 Prometedor
                              </span>
                            )}
                          </div>
                          {specialInfo && (
                            <div className="mb-3 p-3 bg-black/20 rounded-lg border border-white/10">
                              <p className="text-sm font-semibold text-cyan-400 mb-1">
                                {specialInfo.highlight}
                              </p>
                              <p className="text-xs text-gray-300">
                                {specialInfo.description}
                              </p>
                            </div>
                          )}
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
                            <span className={`font-semibold ${
                              parseInt(habitabilityScore.toString()) > 80 ? 'text-green-400' :
                              parseInt(habitabilityScore.toString()) > 60 ? 'text-yellow-400' :
                              'text-gray-400'
                            }`}>
                              Habitabilidad: {habitabilityScore}%
                            </span>
                            <span>Periodo: {planet.pl_orbper.toFixed(1)} días</span>
                          </div>
                        </div>
                        <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 