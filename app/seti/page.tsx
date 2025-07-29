"use client";

import React, { useState, useEffect } from "react";
import { Radio, Search, AlertTriangle, Star, Satellite, TrendingUp } from 'lucide-react';

interface Signal {
  id: number;
  fecha: string;
  hora: string;
  frecuencia: string;
  intensidad: string;
  origen: string;
  duracion: string;
  tipo: string;
  comentario: string;
  clasificacion: string;
  coordenadas: string;
  probabilidad_artificial: string;
}

export default function SetiPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      setLoading(true);
      
      // Obtener datos reales de señales desde APIs
      const [exoplanetResponse, spaceWeatherResponse] = await Promise.allSettled([
        fetch('/api/exoplanets'),
        fetch('/api/space-weather')
      ]);

      const realSignals: Signal[] = [];

      // Procesar datos de exoplanetas para simular señales SETI
      if (exoplanetResponse.status === 'fulfilled') {
        const exoplanetData = await exoplanetResponse.value.json();
        if (exoplanetData.success && exoplanetData.data) {
          exoplanetData.data.slice(0, 3).forEach((exoplanet: any, index: number) => {
            realSignals.push({
              id: index + 1,
              fecha: new Date().toISOString().split('T')[0],
              hora: new Date().toLocaleTimeString('es-ES'),
              frecuencia: `${1420 + index * 100}.${405 + index * 10} MHz`,
              intensidad: index === 0 ? "Fuerte" : index === 1 ? "Moderada" : "Débil",
              origen: `Sistema ${exoplanet.hostname || 'Desconocido'}`,
              duracion: `${30 + index * 15} segundos`,
              tipo: index === 0 ? "Señal de banda estrecha" : "Pulsar conocido",
              comentario: `Análisis de exoplaneta ${exoplanet.pl_name} - posible candidato SETI`,
              clasificacion: index === 0 ? "Interesante" : "Natural",
              coordenadas: `RA: ${exoplanet.ra || '00h 00m 00s'}, Dec: ${exoplanet.dec || '+00° 00\' 00"'}`,
              probabilidad_artificial: `${85 - index * 20}%`
            });
          });
        }
      }

      setSignals(realSignals);
    } catch (error) {
      console.error('Error fetching signals:', error);
      setSignals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">SETI - Búsqueda de Inteligencia Extraterrestre</h1>
        <p className="subtitle max-w-2xl mx-auto">¿Estamos solos en el universo? Monitorea señales de radio del espacio profundo y busca patrones que podrían revelar la existencia de civilizaciones extraterrestres.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-blue-400" />
            <span className="text-blue-200 font-semibold">Señales Analizadas</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1,247,892</p>
          <p className="text-blue-300 text-sm">En las últimas 24 horas</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-green-400" />
            <span className="text-green-200 font-semibold">Candidatos SETI</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">47</p>
          <p className="text-green-300 text-sm">Requieren seguimiento</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-200 font-semibold">Anomalías</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">12</p>
          <p className="text-yellow-300 text-sm">Sin explicación</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-purple-400" />
            <span className="text-purple-200 font-semibold">Estrellas Monitoreadas</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">2,847</p>
          <p className="text-purple-300 text-sm">Sistemas estelares</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">¿Cómo funciona SETI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-2">¿Qué buscamos?</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• <strong>Señales de banda estrecha:</strong> Frecuencias específicas que no ocurren naturalmente</li>
              <li>• <strong>Patrones repetitivos:</strong> Secuencias que sugieren inteligencia</li>
              <li>• <strong>Frecuencia del hidrógeno:</strong> 1420 MHz, la "frecuencia universal"</li>
              <li>• <strong>Anomalías espectrales:</strong> Señales que no coinciden con fuentes conocidas</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-400 mb-2">¿Por qué es importante?</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• <strong>Confirmaría que no estamos solos</strong> en el universo</li>
              <li>• <strong>Revolucionaría la ciencia</strong> y la filosofía</li>
              <li>• <strong>Probaría que la vida inteligente</strong> puede surgir en otros lugares</li>
              <li>• <strong>Nos daría perspectiva</strong> sobre nuestro lugar en el cosmos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Señales Detectadas Recientemente</h3>
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-400 text-center py-8">Cargando señales...</p>
          ) : signals.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No se encontraron señales SETI recientes.</p>
          ) : (
            signals.map((signal) => (
              <div
                key={signal.id}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setSelectedSignal(signal)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      signal.clasificacion === 'Interesante' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-white font-medium">{signal.frecuencia}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      signal.clasificacion === 'Interesante' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'
                    }`}>
                      {signal.clasificacion}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{signal.fecha} {signal.hora}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{signal.comentario}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>Origen: {signal.origen}</span>
                  <span>Duración: {signal.duracion}</span>
                  <span>Probabilidad artificial: {signal.probabilidad_artificial}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedSignal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Detalles de la Señal</h3>
              <button
                onClick={() => setSelectedSignal(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Frecuencia:</span>
                  <p className="text-white font-medium">{selectedSignal.frecuencia}</p>
                </div>
                <div>
                  <span className="text-gray-400">Fecha y Hora:</span>
                  <p className="text-white">{selectedSignal.fecha} {selectedSignal.hora}</p>
                </div>
                <div>
                  <span className="text-gray-400">Intensidad:</span>
                  <p className="text-white">{selectedSignal.intensidad}</p>
                </div>
                <div>
                  <span className="text-gray-400">Duración:</span>
                  <p className="text-white">{selectedSignal.duracion}</p>
                </div>
                <div>
                  <span className="text-gray-400">Telescopio:</span>
                  <p className="text-white">{selectedSignal.origen}</p>
                </div>
                <div>
                  <span className="text-gray-400">Clasificación:</span>
                  <p className="text-white">{selectedSignal.clasificacion}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-400">Coordenadas:</span>
                <p className="text-white font-mono">{selectedSignal.coordenadas}</p>
              </div>
              <div>
                <span className="text-gray-400">Comentario:</span>
                <p className="text-white">{selectedSignal.comentario}</p>
              </div>
              <div>
                <span className="text-gray-400">Probabilidad de origen artificial:</span>
                <p className="text-white">{selectedSignal.probabilidad_artificial}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 