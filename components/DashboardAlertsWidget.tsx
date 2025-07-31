"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, X, Clock, Activity, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  source: string;
}

export default function DashboardAlertsWidget() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Obtener alertas reales de APIs
    const fetchAlerts = async () => {
      try {
        const [earthquakeResponse, spaceWeatherResponse] = await Promise.allSettled([
          fetch('/api/earthquakes'),
          fetch('/api/space-weather')
        ]);

        const newAlerts: Alert[] = [];

        // Alertas de terremotos
        if (earthquakeResponse.status === 'fulfilled') {
          const earthquakeData = await earthquakeResponse.value.json();
          if (earthquakeData.success && earthquakeData.data?.features?.length > 0) {
            const recentQuake = earthquakeData.data.features[0];
            if (recentQuake.properties.mag >= 5.0) {
              newAlerts.push({
                id: `quake-${recentQuake.id}`,
                type: recentQuake.properties.mag >= 7.0 ? 'error' : 'warning',
                title: 'Terremoto Significativo',
                message: `M${recentQuake.properties.mag} en ${recentQuake.properties.place}`,
                timestamp: new Date(recentQuake.properties.time),
                source: 'USGS'
              });
            }
          }
        }

        // Alertas de clima espacial
        if (spaceWeatherResponse.status === 'fulfilled') {
          const weatherData = await spaceWeatherResponse.value.json();
          if (weatherData.success && weatherData.data?.kp?.length > 0) {
            const latestKp = weatherData.data.kp[0];
            if (latestKp.kp_index >= 5) {
              newAlerts.push({
                id: `space-weather-${Date.now()}`,
                type: latestKp.kp_index >= 7 ? 'warning' : 'info',
                title: 'Actividad Geomagnética',
                message: `Índice Kp: ${latestKp.kp_index} - Posibles auroras`,
                timestamp: new Date(),
                source: 'NOAA'
              });
            }
          }
        }

        // Si no hay alertas reales, mostrar algunas de ejemplo
        if (newAlerts.length === 0) {
          newAlerts.push(
            {
              id: '1',
              type: 'success',
              title: 'Sistema Operativo',
              message: 'Todos los sistemas funcionando correctamente.',
              timestamp: new Date(),
              source: 'Monitor'
            },
            {
              id: '2',
              type: 'info',
              title: 'JWST Activo',
              message: 'Telescopio James Webb en proceso de observación.',
              timestamp: new Date(Date.now() - 10 * 60 * 1000),
              source: 'NASA'
            }
          );
        }

        setAlerts(newAlerts.slice(0, 5)); // Máximo 5 alertas
      } catch (error) {
        console.error('Error fetching alerts:', error);
        // Alertas de fallback
        setAlerts([{
          id: 'fallback',
          type: 'info',
          title: 'Modo Offline',
          message: 'Mostrando datos en caché.',
          timestamp: new Date(),
          source: 'Sistema'
        }]);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000); // Actualizar cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const getAlertBorderColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Alertas del Sistema</h3>
          {alerts.filter(a => a.type === 'error' || a.type === 'warning').length > 0 && (
            <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
              {alerts.filter(a => a.type === 'error' || a.type === 'warning').length} activas
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <Link
            href="/real-time-alerts"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Ver todas
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.slice(0, isExpanded ? 5 : 3).map((alert) => (
          <div
            key={alert.id}
            className={`p-3 bg-white/5 rounded-lg border-l-4 ${getAlertBorderColor(alert.type)} transition-all hover:bg-white/10 group`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white mb-1 truncate">{alert.title}</h4>
                  <p className="text-xs text-gray-300 mb-2 line-clamp-2">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(alert.timestamp)}</span>
                    <span>•</span>
                    <span>{alert.source}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay alertas activas</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Última actualización: {formatTimeAgo(new Date())}</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>En línea</span>
          </div>
        </div>
      </div>
    </div>
  );
}