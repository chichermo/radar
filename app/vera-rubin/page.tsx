"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Database, AlertTriangle, TrendingUp, Eye, Clock, Target, Star, Globe, Activity, Zap, Search, BarChart3, Download, RefreshCw, Play, Pause, Settings, Filter, Calendar, MapPin, Satellite, Moon, Sun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n';
import ClientDate from '@/components/ClientDate';

export default function VeraRubinPage() {
  const [veraRubinData, setVeraRubinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVeraRubinData();
  }, []);

  const fetchVeraRubinData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar obtener datos reales de Vera Rubin desde APIs disponibles
      const [alertsResponse, imagesResponse, statsResponse] = await Promise.allSettled([
        fetch('/api/vera-rubin/alerts'),
        fetch('/api/vera-rubin/images'),
        fetch('/api/vera-rubin/stats')
      ]);

      const realData: any = {
        statistics: {
          totalObservations: 0,
          alertsTonight: 0,
          objectsCataloged: 0,
          dataProcessed: '0 TB',
          uptime: '0%',
          discoveries: 0
        },
        realTimeData: {
          currentObservation: null,
          tonightSchedule: [],
          recentAlerts: []
        }
      };

      // Procesar datos de alertas si están disponibles
      if (alertsResponse.status === 'fulfilled') {
        const alertsData = await alertsResponse.value.json();
        if (alertsData.success && alertsData.data) {
          realData.realTimeData.recentAlerts = alertsData.data.slice(0, 5);
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

      setVeraRubinData(realData);
    } catch (error) {
      console.error('Error fetching Vera Rubin data:', error);
      setError('No se pudieron cargar los datos de Vera Rubin');
      setVeraRubinData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando datos del Observatorio Vera Rubin...</p>
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
            onClick={fetchVeraRubinData}
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
            <h1 className="text-3xl font-bold text-white mb-2">Observatorio Vera Rubin</h1>
            <p className="text-gray-300 max-w-xl">
              Monitoreo en tiempo real del Legacy Survey of Space and Time (LSST)
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button 
                onClick={fetchVeraRubinData}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Observaciones Totales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {veraRubinData?.statistics?.totalObservations?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Observaciones realizadas</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Alertas Esta Noche</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {veraRubinData?.statistics?.alertsTonight?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Alertas generadas</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Objetos Catalogados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {veraRubinData?.statistics?.objectsCataloged?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Objetos en catálogo</p>
          </CardContent>
        </Card>
      </div>

      {/* Estado del Telescopio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Estado del Telescopio</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Estado:</span>
                <span className="text-green-400 font-semibold">Operativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tiempo activo:</span>
                <span className="text-blue-400 font-semibold">
                  {veraRubinData?.statistics?.uptime || '0%'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Datos procesados:</span>
                <span className="text-purple-400 font-semibold">
                  {veraRubinData?.statistics?.dataProcessed || '0 TB'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Descubrimientos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {veraRubinData?.statistics?.discoveries?.toLocaleString('es-ES') || '0'}
            </div>
            <p className="text-gray-300 text-sm mt-2">Descubrimientos confirmados</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Recientes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Alertas Recientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {veraRubinData?.realTimeData?.recentAlerts?.length > 0 ? (
            <div className="space-y-4">
              {veraRubinData.realTimeData.recentAlerts.map((alert: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-semibold">{alert.type || 'Alerta'}</div>
                      <div className="text-gray-300 text-sm">{alert.object || 'Objeto desconocido'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{alert.magnitude || 'N/A'}</div>
                    <div className="text-gray-300 text-sm">{alert.time || 'Tiempo desconocido'}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">No hay alertas recientes disponibles</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 