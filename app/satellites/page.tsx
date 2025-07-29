"use client";

import React, { useState, useEffect } from 'react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;
import { 
  Satellite, 
  Globe, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  RefreshCw,
  Download,
  Filter,
  Search,
  MapPin,
  Clock,
  Users,
  Database
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function SatellitesPage() {
  const [satellitesData, setSatellitesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSatellitesData();
  }, []);

  const fetchSatellitesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de satélites
      const [satellitesResponse, launchesResponse, statsResponse] = await Promise.allSettled([
        fetch('/api/satellites'),
        fetch('/api/recent-launches'),
        fetch('/api/satellite-stats')
      ]);

      const realData: any = {
        statistics: {
          totalSatellites: 0,
          activeSatellites: 0,
          inactiveSatellites: 0,
          lowEarthOrbit: 0,
          mediumEarthOrbit: 0,
          geostationaryOrbit: 0,
          debrisTracked: 0,
          launches2024: 0,
          countries: 0,
          operators: 0
        },
        categories: [],
        recentLaunches: []
      };

      // Procesar datos de satélites si están disponibles
      if (satellitesResponse.status === 'fulfilled') {
        const satellitesData = await satellitesResponse.value.json();
        if (satellitesData.success && satellitesData.data) {
          realData.statistics = {
            ...realData.statistics,
            ...satellitesData.statistics
          };
          realData.categories = satellitesData.categories || [];
        }
      }

      // Procesar datos de lanzamientos si están disponibles
      if (launchesResponse.status === 'fulfilled') {
        const launchesData = await launchesResponse.value.json();
        if (launchesData.success && launchesData.data) {
          realData.recentLaunches = launchesData.data.slice(0, 10);
        }
      }

      // Procesar datos de estadísticas si están disponibles
      if (statsResponse.status === 'fulfilled') {
        const statsData = await statsResponse.value.json();
        if (statsData.success && statsData.data) {
          realData.statistics = {
            ...realData.statistics,
            ...statsData.data
          };
        }
      }

      setSatellitesData(realData);
    } catch (error) {
      console.error('Error fetching satellites data:', error);
      setError('No se pudieron cargar los datos de satélites');
      setSatellitesData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos de satélites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">{error}</p>
          <button 
            onClick={fetchSatellitesData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Satélites</h1>
            <p className="text-gray-300 max-w-xl">
              Monitoreo y seguimiento de satélites en órbita terrestre
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchSatellitesData}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Satellite className="h-5 w-5" />
              <span>Total Satélites</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {satellitesData?.statistics?.totalSatellites?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Satélites en órbita</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Satélites Activos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {satellitesData?.statistics?.activeSatellites?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Operativos</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Basura Espacial</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">
              {satellitesData?.statistics?.debrisTracked?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Objetos rastreados</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Lanzamientos 2024</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {satellitesData?.statistics?.launches2024?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Misiones este año</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribución por Órbita */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Distribución por Órbita</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Órbita Terrestre Baja (LEO):</span>
                <span className="text-blue-400 font-semibold">
                  {satellitesData?.statistics?.lowEarthOrbit?.toLocaleString('es-ES') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Órbita Terrestre Media (MEO):</span>
                <span className="text-green-400 font-semibold">
                  {satellitesData?.statistics?.mediumEarthOrbit?.toLocaleString('es-ES') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Órbita Geoestacionaria (GEO):</span>
                <span className="text-purple-400 font-semibold">
                  {satellitesData?.statistics?.geostationaryOrbit?.toLocaleString('es-ES') || '0'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Operadores y Países</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Países operadores:</span>
                <span className="text-yellow-400 font-semibold">
                  {satellitesData?.statistics?.countries?.toLocaleString('es-ES') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Operadores totales:</span>
                <span className="text-orange-400 font-semibold">
                  {satellitesData?.statistics?.operators?.toLocaleString('es-ES') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Satélites inactivos:</span>
                <span className="text-red-400 font-semibold">
                  {satellitesData?.statistics?.inactiveSatellites?.toLocaleString('es-ES') || '0'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categorías de Satélites */}
      {satellitesData?.categories && satellitesData.categories.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Categorías de Satélites</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {satellitesData.categories.map((category: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-${category.color || 'blue'}-400`}></div>
                    <div>
                      <div className="text-white font-semibold">{category.name}</div>
                      <div className="text-gray-300 text-sm">{category.count} satélites</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lanzamientos Recientes */}
      {satellitesData?.recentLaunches && satellitesData.recentLaunches.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Lanzamientos Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satellitesData.recentLaunches.map((launch: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{launch.name || 'Satélite desconocido'}</div>
                    <div className="text-gray-300 text-sm">
                      Operador: {launch.operator || 'Desconocido'} • País: {launch.country || 'N/A'}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Propósito: {launch.purpose || 'Desconocido'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      launch.status === 'Active' ? 'text-green-400' : 
                      launch.status === 'Inactive' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {launch.status || 'Desconocido'}
                    </div>
                    <div className="text-gray-400 text-xs">{launch.launchDate || 'Fecha desconocida'}</div>
                    <div className="text-gray-300 text-xs">{launch.orbit || 'Órbita desconocida'}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Satellite className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sin Datos Disponibles</h2>
            <p className="text-gray-300">
              No hay datos de satélites disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}