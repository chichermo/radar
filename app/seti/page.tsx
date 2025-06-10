"use client";

import React, { useState } from "react";
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

const mockSignals: Signal[] = [
  {
    id: 1,
    fecha: "2024-02-27",
    hora: "14:32:15",
    frecuencia: "1420.405 MHz",
    intensidad: "Fuerte",
    origen: "Telescopio FAST, China",
    duracion: "47 segundos",
    tipo: "Señal de banda estrecha",
    comentario: "Frecuencia del hidrógeno neutro - posible candidato SETI",
    clasificacion: "Interesante",
    coordenadas: "RA: 18h 36m 56s, Dec: +38° 47' 01\"",
    probabilidad_artificial: "85%"
  },
  {
    id: 2,
    fecha: "2024-02-25",
    hora: "09:15:42",
    frecuencia: "1665.402 MHz",
    intensidad: "Moderada",
    origen: "Observatorio de Arecibo, Puerto Rico",
    duracion: "12 minutos",
    tipo: "Pulsar conocido",
    comentario: "PSR B1919+21 - confirmado como fuente natural",
    clasificacion: "Natural",
    coordenadas: "RA: 19h 21m 44s, Dec: +21° 53' 02\"",
    probabilidad_artificial: "2%"
  }
];

export default function SetiPage() {
  const [signals] = useState<Signal[]>(mockSignals);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          SETI - Búsqueda de Inteligencia Extraterrestre
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          ¿Estamos solos en el universo? Esta es la pregunta más profunda que la humanidad puede hacerse. 
          Aquí monitoreamos señales de radio del espacio profundo, buscando patrones que podrían revelar 
          la existencia de civilizaciones extraterrestres.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-blue-400" />
            <span className="text-blue-200 font-semibold">Señales Analizadas</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1,247,892</p>
          <p className="text-blue-300 text-sm">En las últimas 24 horas</p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-green-400" />
            <span className="text-green-200 font-semibold">Candidatos SETI</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">47</p>
          <p className="text-green-300 text-sm">Requieren seguimiento</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-200 font-semibold">Anomalías</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">12</p>
          <p className="text-yellow-300 text-sm">Sin explicación</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
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
          {signals.map((signal) => (
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
          ))}
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