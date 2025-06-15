"use client";

import React from 'react';

export default function SignalsPage() {
  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Señales y Sonidos Espaciales</h1>
      <p className="text-xs text-gray-400 mb-4">Panel experimental para visualizar y escuchar señales espaciales. Los audios y espectrogramas son solo para fines educativos. Derechos de audio pertenecen a sus respectivas fuentes (NASA, SETI, SKA, etc).</p>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Ejemplo de Espectrograma</h2>
        <div className="w-full max-w-lg h-48 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 rounded-lg border border-gray-700 flex items-center justify-center">
          <div className="text-center text-gray-300">
            <div className="text-4xl mb-2">📊</div>
            <p>Espectrograma de señal espacial</p>
            <p className="text-sm text-gray-400">(Simulación visual)</p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-white font-medium mb-2">Reproductor de Audio Simulado</h3>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
              <span className="text-white">▶️</span>
            </button>
            <div className="flex-1 bg-gray-600 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
            </div>
            <span className="text-gray-300 text-sm">00:00 / 02:30</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Señal de radio pulsante - Frecuencia: 1420 MHz</p>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Tipos de Señales Detectadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-green-400 font-medium mb-2">🔴 Señales Pulsantes</h3>
            <p className="text-gray-300 text-sm">Pulsos regulares que pueden indicar objetos astronómicos como púlsares.</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-blue-400 font-medium mb-2">📡 Señales Repetitivas</h3>
            <p className="text-gray-300 text-sm">Patrones que se repiten en intervalos regulares.</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-yellow-400 font-medium mb-2">🌌 Señales de Banda Ancha</h3>
            <p className="text-gray-300 text-sm">Señales que cubren un amplio rango de frecuencias.</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-purple-400 font-medium mb-2">🎵 Tones Modulados</h3>
            <p className="text-gray-300 text-sm">Señales con variaciones en amplitud o frecuencia.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Integración Futura</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Integración con SETI para señales reales</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Filtros avanzados por tipo de señal</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Análisis en tiempo real de frecuencias</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Base de datos de señales conocidas</span>
          </div>
        </div>
      </div>
    </div>
  );
} 