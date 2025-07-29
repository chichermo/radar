"use client";

import React, { useEffect, useState } from 'react';
import { Globe, Activity, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Earthquake {
  id: string;
  place: string;
  magnitude: number;
  depth: number;
  time: number;
  lat: number;
  lon: number;
}

export default function EarthquakesPage() {
  const [sismos, setSismos] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEarthquakes = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5&limit=100&orderby=time');
      const data = await res.json();
      const eqs: Earthquake[] = data.features
        .filter((f: any) => f.properties.mag >= 5)
        .map((f: any) => ({
          id: f.id,
          place: f.properties.place,
          magnitude: f.properties.mag,
          depth: f.geometry.coordinates[2],
          time: f.properties.time,
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
        }));
      setSismos(eqs);
    } catch (e) {
      setSismos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Sismos en Tiempo Real</h1>
        <p className="subtitle max-w-2xl mx-auto">
          Visualiza los últimos sismos detectados a nivel mundial (≥ 5.0), con detalles de magnitud, profundidad y ubicación. Datos actualizados en tiempo real desde USGS.
        </p>
      </div>
      <div className="metricsGrid mb-8">
        <div className="glass-card p-6 flex flex-col items-center">
          <Activity className="w-8 h-8 text-red-400 mb-2" />
          <div className="text-2xl font-bold text-white">{loading ? '...' : sismos.length}</div>
          <div className="text-gray-400 text-sm">Sismos ≥ 5.0 (últimas 24h)</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <Globe className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white">{loading ? '...' : sismos.filter(s => s.magnitude >= 6).length}</div>
          <div className="text-gray-400 text-sm">Magnitud ≥ 6.0</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <MapPin className="w-8 h-8 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">{loading ? '...' : Array.from(new Set(sismos.map(s => s.place))).length}</div>
          <div className="text-gray-400 text-sm">Regiones afectadas</div>
        </div>
      </div>
      {/* Mapa simulado */}
      <div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center"><Globe className="w-5 h-5 mr-2" />Mapa de Sismos (simulado)</h2>
        <div className="w-full h-56 bg-gradient-to-br from-blue-900 via-gray-900 to-black rounded-lg flex items-center justify-center relative">
          {!loading && sismos.map((s, i) => (
            <div key={s.id} className="absolute" style={{ left: `${20 + (i * 60 / (sismos.length || 1))}%`, top: `${30 + (i * 40 / (sismos.length || 1))}%` }}>
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" title={`${s.place} M${s.magnitude}`}></div>
            </div>
          ))}
          <span className="text-xs text-gray-400 absolute bottom-2 right-4">* Mapa ilustrativo</span>
        </div>
      </div>
      {/* Lista de sismos */}
      <div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center"><Activity className="w-5 h-5 mr-2" />Lista de Sismos</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Cargando datos en tiempo real...</div>
        ) : (
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Lugar</th>
                <th className="py-2">Magnitud</th>
                <th className="py-2">Profundidad (km)</th>
                <th className="py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {sismos.map((s) => (
                <tr key={s.id} className="hover:bg-gray-800/40">
                  <td className="py-2 font-semibold">{s.place}</td>
                  <td className="py-2 text-red-400 font-bold">{s.magnitude.toFixed(1)}</td>
                  <td className="py-2">{s.depth}</td>
                  <td className="py-2">{new Date(s.time).toLocaleString('es-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* CTA */}
      <div className="glass-card p-6 text-center">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center justify-center"><AlertTriangle className="w-5 h-5 mr-2" />¿Quieres recibir alertas de sismos?</h2>
        <p className="text-gray-300 mb-4">Activa las notificaciones para estar informado de eventos sísmicos importantes.</p>
        <Button className="bg-yellow-600 hover:bg-yellow-700">Activar Notificaciones</Button>
      </div>
    </div>
  );
}
