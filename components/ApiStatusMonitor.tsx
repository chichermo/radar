"use client";

import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle, XCircle, Clock, Zap, Globe, RefreshCw } from 'lucide-react';

interface ApiStatus {
  name: string;
  endpoint: string;
  status: 'online' | 'warning' | 'offline' | 'checking';
  responseTime: number;
  lastCheck: Date;
  uptime: number;
  errorRate: number;
}

export default function ApiStatusMonitor() {
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const apiEndpoints = [
    { name: 'Personas en el Espacio', endpoint: '/api/people-in-space' },
    { name: 'Sismos en Tiempo Real', endpoint: '/api/earthquakes' },
    { name: 'Clima Espacial', endpoint: '/api/space-weather' },
    { name: 'Asteroides NASA', endpoint: '/api/nasa-asteroids' },
    { name: 'Ubicación ISS', endpoint: '/api/iss-location' },
    { name: 'JWST Status', endpoint: '/api/jwst' },
    { name: 'Hubble Status', endpoint: '/api/hubble' },
    { name: 'Exoplanetas', endpoint: '/api/exoplanets' },
    { name: 'Predicciones IA', endpoint: '/api/ai-predictions' },
    { name: 'Space Track', endpoint: '/api/space-track' }
  ];

  const checkApiStatus = async (endpoint: string): Promise<Partial<ApiStatus>> => {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          status: responseTime > 2000 ? 'warning' : 'online',
          responseTime,
          lastCheck: new Date(),
          uptime: 99.5 + Math.random() * 0.5, // Simular uptime
          errorRate: Math.random() * 2 // Simular error rate bajo
        };
      } else {
        return {
          status: 'warning',
          responseTime,
          lastCheck: new Date(),
          uptime: 95 + Math.random() * 4,
          errorRate: Math.random() * 10
        };
      }
    } catch (error) {
      return {
        status: 'offline',
        responseTime: Date.now() - startTime,
        lastCheck: new Date(),
        uptime: 80 + Math.random() * 15,
        errorRate: Math.random() * 20
      };
    }
  };

  const checkAllApis = async () => {
    setIsLoading(true);
    const statusPromises = apiEndpoints.map(async (api) => {
      const status = await checkApiStatus(api.endpoint);
      return {
        name: api.name,
        endpoint: api.endpoint,
        status: 'checking' as const,
        responseTime: 0,
        lastCheck: new Date(),
        uptime: 0,
        errorRate: 0,
        ...status
      };
    });

    const results = await Promise.all(statusPromises);
    setApiStatuses(results);
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    checkAllApis();
    const interval = setInterval(checkAllApis, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ApiStatus['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'checking':
        return <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: ApiStatus['status']) => {
    switch (status) {
      case 'online':
        return 'border-l-green-500 bg-green-500/5';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-500/5';
      case 'offline':
        return 'border-l-red-500 bg-red-500/5';
      case 'checking':
        return 'border-l-blue-500 bg-blue-500/5';
    }
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 500) return 'text-green-400';
    if (responseTime < 1500) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatResponseTime = (time: number) => {
    if (time < 1000) return `${time}ms`;
    return `${(time / 1000).toFixed(1)}s`;
  };

  const getOverallStatus = () => {
    const onlineCount = apiStatuses.filter(api => api.status === 'online').length;
    const warningCount = apiStatuses.filter(api => api.status === 'warning').length;
    const offlineCount = apiStatuses.filter(api => api.status === 'offline').length;
    
    if (offlineCount > 0) return 'critical';
    if (warningCount > 2) return 'warning';
    return 'healthy';
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-blue-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Monitor de APIs</h3>
            <p className="text-sm text-gray-300">Estado en tiempo real de los servicios</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            overallStatus === 'healthy' 
              ? 'bg-green-500/20 text-green-300' 
              : overallStatus === 'warning'
              ? 'bg-yellow-500/20 text-yellow-300'
              : 'bg-red-500/20 text-red-300'
          }`}>
            {overallStatus === 'healthy' ? 'Sistemas OK' : overallStatus === 'warning' ? 'Degradado' : 'Crítico'}
          </div>
          <button
            onClick={checkAllApis}
            disabled={isLoading}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-blue-300 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Resumen de estado */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {apiStatuses.filter(api => api.status === 'online').length}
          </div>
          <div className="text-xs text-gray-400">En línea</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {apiStatuses.filter(api => api.status === 'warning').length}
          </div>
          <div className="text-xs text-gray-400">Advertencias</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">
            {apiStatuses.filter(api => api.status === 'offline').length}
          </div>
          <div className="text-xs text-gray-400">Fuera de línea</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {apiStatuses.length > 0 ? Math.round(apiStatuses.reduce((acc, api) => acc + api.uptime, 0) / apiStatuses.length) : 0}%
          </div>
          <div className="text-xs text-gray-400">Uptime promedio</div>
        </div>
      </div>

      {/* Lista de APIs */}
      <div className="space-y-3">
        {apiStatuses.map((api) => (
          <div
            key={api.endpoint}
            className={`p-4 rounded-lg border-l-4 transition-all ${getStatusColor(api.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(api.status)}
                <div>
                  <h4 className="font-medium text-white">{api.name}</h4>
                  <p className="text-xs text-gray-400">{api.endpoint}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className={`font-mono ${getResponseTimeColor(api.responseTime)}`}>
                    {formatResponseTime(api.responseTime)}
                  </div>
                  <div className="text-xs text-gray-400">Respuesta</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-semibold">
                    {api.uptime.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className={`font-semibold ${api.errorRate < 5 ? 'text-green-400' : api.errorRate < 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {api.errorRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Error Rate</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con información de última actualización */}
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
        <span>Última verificación: {lastUpdate.toLocaleTimeString()}</span>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Actualización automática cada minuto</span>
        </div>
      </div>
    </div>
  );
}