"use client";

import React from 'react';
import { AlertTriangle, Zap, Globe, Satellite, Activity, Bell, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const alertas = [
  {
    tipo: 'Colisión Satelital',
    mensaje: 'Posible colisión entre Starlink-1234 y Cosmos-2251',
    hora: 'Hace 2 min',
    icono: <Satellite className="w-6 h-6 text-red-400" />, color: 'bg-red-600/20 text-red-300'
  },
  {
    tipo: 'Tormenta Solar',
    mensaje: 'Tormenta geomagnética G3 activa. Riesgo para satélites y comunicaciones.',
    hora: 'Hace 5 min',
    icono: <Zap className="w-6 h-6 text-yellow-400" />, color: 'bg-yellow-600/20 text-yellow-300'
  },
  {
    tipo: 'Sismo',
    mensaje: 'Sismo M6.2 detectado cerca de Chile. Sin alerta de tsunami.',
    hora: 'Hace 10 min',
    icono: <Activity className="w-6 h-6 text-blue-400" />, color: 'bg-blue-600/20 text-blue-300'
  },
  {
    tipo: 'Alerta Meteoritos',
    mensaje: 'Lluvia de meteoritos prevista para esta noche (Perseidas).',
    hora: 'Hace 20 min',
    icono: <Globe className="w-6 h-6 text-purple-400" />, color: 'bg-purple-600/20 text-purple-300'
  },
  {
    tipo: 'Aviso General',
    mensaje: 'Nueva actualización de datos disponible en el dashboard.',
    hora: 'Hace 30 min',
    icono: <Bell className="w-6 h-6 text-green-400" />, color: 'bg-green-600/20 text-green-300'
  },
];

export default function RealTimeAlertsPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      {/* Header */}
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Alertas en Tiempo Real</h1>
        <p className="subtitle max-w-2xl mx-auto">
          Recibe notificaciones instantáneas sobre eventos astronómicos, espaciales y de seguridad global.
        </p>
      </div>
      {/* Feed de alertas */}
      <div className="space-y-4 mb-8">
        {alertas.map((alerta, i) => (
          <div key={i} className={`glass-card flex items-center gap-4 p-4 ${alerta.color}`}>
            <div>{alerta.icono}</div>
            <div className="flex-1">
              <div className="font-semibold text-white">{alerta.tipo}</div>
              <div className="text-gray-300 text-sm">{alerta.mensaje}</div>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">{alerta.hora}</div>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="glass-card p-6 text-center">
        <h2 className="text-lg font-semibold text-blue-400 mb-2 flex items-center justify-center"><AlertTriangle className="w-5 h-5 mr-2" />¿Quieres recibir alertas push?</h2>
        <p className="text-gray-300 mb-4">Activa las notificaciones para estar siempre informado de eventos críticos.</p>
        <Button className="bg-blue-600 hover:bg-blue-700">Activar Notificaciones</Button>
      </div>
    </div>
  );
} 