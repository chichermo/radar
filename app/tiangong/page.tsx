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
  MapPin,
  Clock,
  Database
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function TiangongPage() {
  const [tiangongData, setTiangongData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTiangongData();
  }, []);

  const fetchTiangongData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de Tiangong
      const [tiangongResponse, modulesResponse, statsResponse] = await Promise.allSettled([
        fetch('/api/tiangong'),
        fetch('/api/tiangong-modules'),
        fetch('/api/tiangong-stats')
      ]);

      const realData: any = {
        statistics: {
          totalModules: 0,
          totalCrew: 0,
          daysInOrbit: 0,
          experiments: 0,
          spacewalks: 0,
          visitors: 0,
          mass: 0,
          length: 0,
          power: 0,
          coverage: 0
        },
        modules: []
      };

      // Procesar datos de Tiangong si están disponibles
      if (tiangongResponse.status === 'fulfilled') {
        const tiangongData = await tiangongResponse.value.json();
        if (tiangongData.success && tiangongData.data) {
          realData.statistics = {
            ...realData.statistics,
            ...tiangongData.statistics
          };
        }
      }

      // Procesar datos de módulos si están disponibles
      if (modulesResponse.status === 'fulfilled') {
        const modulesData = await modulesResponse.value.json();
        if (modulesData.success && modulesData.data) {
          realData.modules = modulesData.data;
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

      setTiangongData(realData);
    } catch (error) {
      console.error('Error fetching Tiangong data:', error);
      setError('No se pudieron cargar los datos de Tiangong');
      setTiangongData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos de Tiangong...</p>
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
            onClick={fetchTiangongData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Estación Espacial Tiangong</h1>
            <p className="text-gray-300 max-w-xl">
              Monitoreo y estado de la estación espacial china Tiangong
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchTiangongData}
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
              <span>Módulos Totales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {tiangongData?.statistics?.totalModules?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Módulos en la estación</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Tripulación</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {tiangongData?.statistics?.totalCrew?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Astronautas a bordo</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Días en Órbita</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {tiangongData?.statistics?.daysInOrbit?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Desde el lanzamiento</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Experimentos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {tiangongData?.statistics?.experiments?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Realizados a bordo</p>
          </CardContent>
        </Card>
      </div>

      {/* Módulos */}
      {tiangongData?.modules && tiangongData.modules.length > 0 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Módulos de la Estación</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tiangongData.modules.map((module: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{module.name || 'Módulo desconocido'}</div>
                    <div className="text-gray-300 text-sm">{module.purpose || 'Propósito desconocido'}</div>
                    <div className="text-gray-400 text-xs">{module.status || 'Estado desconocido'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-400">{module.crew || 0} tripulantes</div>
                    <div className="text-gray-400 text-xs">{module.launchDate || 'Fecha desconocida'}</div>
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
              No hay datos de módulos de Tiangong disponibles en este momento.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 