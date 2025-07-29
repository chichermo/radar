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
  Users,
  Wifi,
  MapPin,
  Clock,
  Database,
  Rocket,
  Upload
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function StarlinkPage() {
  const [starlinkData, setStarlinkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStarlinkData();
  }, []);

  const fetchStarlinkData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de Starlink
      const [starlinkResponse, launchesResponse, statsResponse] = await Promise.allSettled([
        fetch('/api/starlink'),
        fetch('/api/starlink-launches'),
        fetch('/api/starlink-stats')
      ]);

      const realData: any = {
        statistics: {
          totalSatellites: 0,
          activeSatellites: 0,
          inactiveSatellites: 0,
          launches2024: 0,
          totalLaunches: 0,
          countries: 0,
          users: 0,
          coverage: 0,
          averageLatency: 0,
          downloadSpeed: 0,
          uploadSpeed: 0
        },
        constellations: [],
        recentLaunches: []
      };

      // Procesar datos de Starlink si están disponibles
      if (starlinkResponse.status === 'fulfilled') {
        const starlinkData = await starlinkResponse.value.json();
        if (starlinkData.success && starlinkData.data) {
          realData.statistics = {
            ...realData.statistics,
            ...starlinkData.statistics
          };
          realData.constellations = starlinkData.constellations || [];
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

      setStarlinkData(realData);
    } catch (error) {
      console.error('Error fetching Starlink data:', error);
      setError('No se pudieron cargar los datos de Starlink');
      setStarlinkData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos de Starlink...</p>
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
            onClick={fetchStarlinkData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Starlink</h1>
            <p className="text-gray-300 max-w-xl">
              Monitoreo de la constelación de satélites de SpaceX
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchStarlinkData}
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
              {starlinkData?.statistics?.totalSatellites?.toLocaleString('es-ES') || '0'}
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
              {starlinkData?.statistics?.activeSatellites?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Operativos</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Usuarios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {starlinkData?.statistics?.users?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Suscriptores</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Cobertura</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {starlinkData?.statistics?.coverage || '0'}%
            </div>
            <p className="text-gray-300 text-sm mt-2">Del planeta</p>
          </CardContent>
        </Card>
      </div>

      {/* Rendimiento de Red */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Wifi className="h-5 w-5" />
              <span>Velocidad de Descarga</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {starlinkData?.statistics?.downloadSpeed || '0'} Mbps
            </div>
            <p className="text-gray-300 text-sm mt-2">Promedio</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Velocidad de Subida</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {starlinkData?.statistics?.uploadSpeed || '0'} Mbps
            </div>
            <p className="text-gray-300 text-sm mt-2">Promedio</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Latencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-400">
              {starlinkData?.statistics?.averageLatency || '0'} ms
            </div>
            <p className="text-gray-300 text-sm mt-2">Promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Constelaciones */}
      {starlinkData?.constellations && starlinkData.constellations.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Constelaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {starlinkData.constellations.map((constellation: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-${constellation.color || 'blue'}-400`}></div>
                    <div>
                      <div className="text-white font-semibold">{constellation.name}</div>
                      <div className="text-gray-300 text-sm">{constellation.satellites} satélites</div>
                      <div className="text-gray-400 text-xs">{constellation.altitude} km • {constellation.inclination}°</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      constellation.status === 'Active' ? 'text-green-400' : 
                      constellation.status === 'Deploying' ? 'text-yellow-400' : 'text-blue-400'
                    }`}>
                      {constellation.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lanzamientos Recientes */}
      {starlinkData?.recentLaunches && starlinkData.recentLaunches.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Rocket className="h-5 w-5" />
              <span>Lanzamientos Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {starlinkData.recentLaunches.map((launch: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{launch.mission || 'Misión desconocida'}</div>
                    <div className="text-gray-300 text-sm">
                      {launch.satellites} satélites • {launch.rocket || 'Cohete desconocido'}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Órbita: {launch.orbit || 'Desconocida'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      launch.status === 'Success' ? 'text-green-400' : 
                      launch.status === 'Failure' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {launch.status || 'Desconocido'}
                    </div>
                    <div className="text-gray-400 text-xs">{launch.date || 'Fecha desconocida'}</div>
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
              No hay datos de Starlink disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 