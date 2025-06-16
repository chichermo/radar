"use client";

import { useState } from 'react';
import { Download, FileText, Database, Calendar, Filter, Settings } from 'lucide-react';
import CardComponents from '@/components/ui/card2';
const { Card, CardContent, CardDescription, CardHeader, CardTitle } = CardComponents;

interface ExportJob {
  id: string;
  name: string;
  type: 'csv' | 'json' | 'xlsx' | 'pdf';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  size?: string;
  downloadUrl?: string;
}

interface DataSource {
  id: string;
  name: string;
  description: string;
  recordCount: number;
  lastUpdated: Date;
  available: boolean;
}

export function DataExporter() {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [exportType, setExportType] = useState<'csv' | 'json' | 'xlsx' | 'pdf'>('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const dataSources: DataSource[] = [
    {
      id: 'exoplanets',
      name: 'Exoplanetas',
      description: 'Datos de planetas fuera del sistema solar',
      recordCount: 5432,
      lastUpdated: new Date(),
      available: true
    },
    {
      id: 'satellites',
      name: 'Satélites',
      description: 'Posiciones y datos de satélites en órbita',
      recordCount: 15420,
      lastUpdated: new Date(),
      available: true
    },
    {
      id: 'asteroids',
      name: 'Asteroides',
      description: 'Objetos cercanos a la Tierra',
      recordCount: 8923,
      lastUpdated: new Date(),
      available: true
    },
    {
      id: 'space-weather',
      name: 'Clima Espacial',
      description: 'Datos de actividad solar y tormentas geomagnéticas',
      recordCount: 2341,
      lastUpdated: new Date(),
      available: true
    },
    {
      id: 'vera-rubin',
      name: 'Vera C. Rubin',
      description: 'Alertas y observaciones del LSST',
      recordCount: 2847,
      lastUpdated: new Date(),
      available: true
    },
    {
      id: 'gravitational-waves',
      name: 'Ondas Gravitacionales',
      description: 'Detecciones de LIGO/Virgo',
      recordCount: 156,
      lastUpdated: new Date(),
      available: true
    }
  ];

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleExport = async () => {
    if (selectedSources.length === 0) {
      alert('Selecciona al menos una fuente de datos');
      return;
    }

    setIsExporting(true);
    const jobId = `export-${Date.now()}`;
    const newJob: ExportJob = {
      id: jobId,
      name: `Exportación ${exportType.toUpperCase()} - ${new Date().toLocaleDateString()}`,
      type: exportType,
      status: 'pending',
      progress: 0,
      createdAt: new Date()
    };

    setExportJobs(prev => [newJob, ...prev]);

    // Simular proceso de exportación
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExportJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              progress: i, 
              status: i === 100 ? 'completed' : 'processing',
              completedAt: i === 100 ? new Date() : undefined,
              size: i === 100 ? '2.4 MB' : undefined,
              downloadUrl: i === 100 ? `#download-${jobId}` : undefined
            }
          : job
      ));
    }

    setIsExporting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'processing': return '⏳';
      case 'failed': return '❌';
      default: return '⏸️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Download className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-white">Exportador de Datos</h2>
            <p className="text-gray-400">Exporta datos espaciales en múltiples formatos</p>
          </div>
        </div>
      </div>

      {/* Configuración de Exportación */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Configuración de Exportación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fuentes de Datos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Fuentes de Datos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {dataSources.map((source) => (
                <div
                  key={source.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSources.includes(source.id)
                      ? 'bg-blue-600/20 border-blue-500'
                      : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => handleSourceToggle(source.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{source.name}</h4>
                      <p className="text-sm text-gray-400">{source.description}</p>
                      <p className="text-xs text-gray-500">
                        {source.recordCount.toLocaleString()} registros
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded border-2 ${
                      selectedSources.includes(source.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedSources.includes(source.id) && (
                        <div className="w-full h-full bg-blue-500 rounded-sm" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Exportación */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Formato de Exportación</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['csv', 'json', 'xlsx', 'pdf'] as const).map((type) => (
                <div
                  key={type}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    exportType === type
                      ? 'bg-blue-600/20 border-blue-500'
                      : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setExportType(type)}
                >
                  <div className="text-center">
                    <FileText className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <span className="text-white font-medium">{type.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rango de Fechas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Rango de Fechas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Botón de Exportación */}
          <div className="flex justify-center">
            <button
              onClick={handleExport}
              disabled={isExporting || selectedSources.length === 0}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center transition-colors"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Datos
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Historial de Exportaciones */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Historial de Exportaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exportJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(job.status)}</span>
                  <div>
                    <h4 className="font-medium text-white">{job.name}</h4>
                    <p className="text-sm text-gray-400">
                      {job.createdAt.toLocaleString()} • {job.type.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {job.status === 'processing' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">{job.progress}%</span>
                    </div>
                  )}
                  
                  <span className={`text-sm font-medium ${getStatusColor(job.status)}`}>
                    {job.status === 'completed' ? 'Completado' :
                     job.status === 'processing' ? 'Procesando' :
                     job.status === 'failed' ? 'Fallido' : 'Pendiente'}
                  </span>
                  
                  {job.status === 'completed' && job.downloadUrl && (
                    <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {exportJobs.length === 0 && (
              <div className="text-center py-8">
                <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-gray-400 mb-2">No hay exportaciones</h3>
                <p className="text-gray-500">Configura y ejecuta tu primera exportación</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 