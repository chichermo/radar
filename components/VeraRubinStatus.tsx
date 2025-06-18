"use client";

import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';
import CardComponents from '@/components/ui/card2';
const { Card, CardHeader, CardTitle, CardDescription, CardContent } = CardComponents;

interface APIStatus {
  name: string;
  status: 'operational' | 'maintenance' | 'offline' | 'planned';
  description: string;
  expectedDate?: string;
}

const apiStatuses: APIStatus[] = [
  {
    name: 'LSST Data Access API',
    status: 'planned',
    description: 'API principal para acceso a datos del Legacy Survey of Space and Time',
    expectedDate: '2025'
  },
  {
    name: 'Alert Stream API',
    status: 'planned',
    description: 'Stream en tiempo real de alertas astronómicas',
    expectedDate: '2025'
  },
  {
    name: 'Image Archive API',
    status: 'planned',
    description: 'Acceso al archivo completo de imágenes del LSST',
    expectedDate: '2025'
  },
  {
    name: 'Object Catalog API',
    status: 'planned',
    description: 'API para consultar el catálogo de objetos astronómicos',
    expectedDate: '2025'
  }
];

export default function VeraRubinStatus() {
  const getStatusIcon = (status: APIStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'offline':
        return <WifiOff className="h-5 w-5 text-red-400" />;
      case 'planned':
        return <AlertTriangle className="h-5 w-5 text-blue-400" />;
      default:
        return <WifiOff className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: APIStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'maintenance':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'offline':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'planned':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusText = (status: APIStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'Operativo';
      case 'maintenance':
        return 'Mantenimiento';
      case 'offline':
        return 'Desconectado';
      case 'planned':
        return 'Planificado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Estado de las APIs</CardTitle>
            <CardDescription className="text-gray-400">
              Disponibilidad de servicios del Vera Rubin Observatory
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-sm font-medium">En Desarrollo</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiStatuses.map((api, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                {getStatusIcon(api.status)}
                <div>
                  <h4 className="text-white font-medium">{api.name}</h4>
                  <p className="text-gray-400 text-sm">{api.description}</p>
                  {api.expectedDate && (
                    <p className="text-blue-400 text-xs">Esperado: {api.expectedDate}</p>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(api.status)}`}>
                {getStatusText(api.status)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <h4 className="text-blue-300 font-medium mb-2">Información Importante</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• <strong>Estado actual:</strong> Telescopio en fase final de construcción</li>
            <li>• <strong>Inicio operaciones:</strong> Esperado en 2025</li>
            <li>• <strong>Datos actuales:</strong> Simulados para demostración</li>
            <li>• <strong>Actualización automática:</strong> Cuando las APIs estén disponibles</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 