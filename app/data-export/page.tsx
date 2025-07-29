"use client";

import React, { useState, useEffect } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Calendar, Filter, Settings, Database, BarChart3, Image, Video, Archive } from 'lucide-react';
import { DataExporter } from '@/components/DataExporter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';

export default function DataExportPage() {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState<any[]>([]);
  const [realData, setRealData] = useState<any[]>([]);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Obtener datos reales de múltiples APIs
        const [asteroidResponse, exoplanetResponse, spaceWeatherResponse] = await Promise.allSettled([
          fetch('/api/nasa-asteroids'),
          fetch('/api/exoplanets'),
          fetch('/api/space-weather')
        ]);

        const realExportData: any[] = [];

        // Procesar datos de asteroides
        if (asteroidResponse.status === 'fulfilled') {
          const asteroidData = await asteroidResponse.value.json();
          if (asteroidData.success && asteroidData.data) {
            const asteroids = Object.values(asteroidData.data.near_earth_objects || {}).flat();
            realExportData.push({
              id: 'asteroids',
              name: 'Datos de Asteroides',
              data: {
                total: asteroids.length,
                hazardous: asteroids.filter((a: any) => a.is_potentially_hazardous_asteroid).length,
                averageSize: asteroids.reduce((sum: number, a: any) => sum + (a.estimated_diameter?.kilometers?.estimated_diameter_max || 0), 0) / asteroids.length
              },
              timestamp: new Date(),
              type: 'asteroids'
            });
          }
        }

        // Procesar datos de exoplanetas
        if (exoplanetResponse.status === 'fulfilled') {
          const exoplanetData = await exoplanetResponse.value.json();
          if (exoplanetData.success && exoplanetData.data) {
            realExportData.push({
              id: 'exoplanets',
              name: 'Datos de Exoplanetas',
              data: {
                total: exoplanetData.data.length,
                confirmed: exoplanetData.data.filter((e: any) => e.pl_status === 'Confirmed').length,
                candidates: exoplanetData.data.filter((e: any) => e.pl_status === 'Candidate').length
              },
              timestamp: new Date(),
              type: 'exoplanets'
            });
          }
        }

        // Procesar datos de clima espacial
        if (spaceWeatherResponse.status === 'fulfilled') {
          const weatherData = await spaceWeatherResponse.value.json();
          if (weatherData.success && weatherData.data) {
            realExportData.push({
              id: 'space-weather',
              name: 'Datos de Clima Espacial',
              data: {
                kpIndex: weatherData.data.kp?.[0]?.kp_index || 0,
                sunspots: weatherData.data.sunspots?.length || 0,
                alerts: weatherData.data.alerts?.length || 0
              },
              timestamp: new Date(),
              type: 'space-weather'
            });
          }
        }

        setRealData(realExportData);
      } catch (error) {
        console.error('Error fetching real data:', error);
        setRealData([]);
      }
    };

    fetchRealData();
  }, []);

  const handleExport = async (format: string, data: any[]) => {
    setIsExporting(true);
    
    try {
      // Simular proceso de exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Agregar a historial
      const exportRecord = {
        id: `export-${Date.now()}`,
        format,
        dataCount: data.length,
        timestamp: new Date(),
        status: 'completed'
      };
      
      setExportHistory(prev => [exportRecord, ...prev]);
      
      // Simular descarga
      const content = `Exportación completada: ${data.length} elementos en formato ${format.toUpperCase()}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `export-${format}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error en exportación:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const formats = [
    { id: 'csv', name: 'CSV', icon: FileSpreadsheet, description: 'Excel compatible', color: 'text-green-400' },
    { id: 'json', name: 'JSON', icon: FileJson, description: 'Datos estructurados', color: 'text-blue-400' },
    { id: 'pdf', name: 'PDF', icon: FileText, description: 'Reporte formateado', color: 'text-red-400' },
    { id: 'txt', name: 'Texto', icon: FileText, description: 'Formato simple', color: 'text-gray-400' },
  ];

  const dataTypes = [
    { id: 'observations', name: 'Observaciones', icon: Database, count: 2103 },
    { id: 'discoveries', name: 'Descubrimientos', icon: BarChart3, count: 38 },
    { id: 'statistics', name: 'Estadísticas', icon: BarChart3, count: 156 },
    { id: 'images', name: 'Imágenes', icon: Image, count: 1526 },
    { id: 'videos', name: 'Videos', icon: Video, count: 89 },
    { id: 'archives', name: 'Archivos', icon: Archive, count: 234 },
  ];

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      {/* Header */}
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Exportación de Datos</h1>
        <p className="subtitle max-w-2xl mx-auto">Exporta y descarga datos espaciales en múltiples formatos y consulta tu historial de exportaciones.</p>
      </div>
      {/* Exportador principal */}
      <div className="mb-8">
        <DataExporter data={realData} onExport={handleExport} />
      </div>
      {/* Formatos disponibles */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Formatos de Exportación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formats.map(format => (
            <div
              key={format.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
              }`}
              onClick={() => setSelectedFormat(format.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${format.color}`}>
                  <format.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">{format.name}</h4>
                  <p className="text-xs text-gray-400">{format.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Historial de exportaciones */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Historial de Exportaciones</h2>
        {exportHistory.length === 0 ? (
          <div className="text-center py-8">
            <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Sin exportaciones</h3>
            <p className="text-gray-400">Aún no has realizado ninguna exportación.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exportHistory.map(record => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Download className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Exportación {record.format.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {record.dataCount} elementos • {record.timestamp.toLocaleString('es-ES')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    record.status === 'completed' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {record.status === 'completed' ? 'Completado' : 'En progreso'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 