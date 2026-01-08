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
      
      // Obtener datos reales de señales SETI
      const response = await fetch('/api/seti-signals');
      
      if (!response.ok) {
        throw new Error('Error al obtener señales SETI');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        // Mapear datos reales al formato esperado
        const realSignals: Signal[] = data.data.map((signal: any, index: number) => ({
          id: index + 1,
          fecha: signal.fecha,
          hora: signal.hora,
          frecuencia: signal.frecuencia,
          intensidad: signal.intensidad,
          origen: signal.origen,
          duracion: signal.duracion,
          tipo: signal.tipo,
          comentario: signal.comentario,
          clasificacion: signal.clasificacion,
          coordenadas: signal.coordenadas,
          probabilidad_artificial: signal.probabilidad_artificial
        }));
        
        setSignals(realSignals);
      } else {
        setSignals([]);
      }
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

      {/* Casos Históricos Documentados */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          Señales SETI Históricas Documentadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {signals.length > 0 ? signals.slice(0, 3).map((signal) => (
            <div key={signal.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-yellow-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold mb-1">{signal.frecuencia}</h3>
                  <span className="text-xs text-gray-400">Origen: {signal.origen}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  signal.clasificacion === 'Interesante' || signal.clasificacion === 'Muy Interesante' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {signal.clasificacion}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-3">{signal.comentario}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Fecha:</span>
                  <span className="text-white">{signal.fecha} {signal.hora}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Duración:</span>
                  <span className="text-white">{signal.duracion}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Probabilidad artificial:</span>
                  <span className="text-yellow-400">{signal.probabilidad_artificial}</span>
                </div>
                <div className="text-gray-400 mt-2">
                  <span className="text-gray-500">Coordenadas:</span> {signal.coordenadas}
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-400 col-span-2 text-center py-4">Cargando señales históricas...</p>
          )}
        </div>
      </div>
      
      {/* Casos en Curso - Solo información real de proyectos activos */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          Proyectos SETI Activos (Información Real)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'BL-2020',
              title: 'Breakthrough Listen - BLC1',
              status: 'Análisis completado',
              priority: 'Media',
              fecha: '2019-2020',
              descripcion: 'Señal BLC1 detectada desde Próxima Centauri. Análisis completo publicado en Nature Astronomy (2021). No se ha vuelto a detectar.',
              equipo: 'Breakthrough Listen',
              resultado: 'Probable origen terrestre',
              referencia: 'Nature Astronomy, 2021'
            }
          ].map((caso) => (
            <div key={caso.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-yellow-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold mb-1">{caso.title}</h3>
                  <span className="text-xs text-gray-400">ID: {caso.id}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  caso.priority === 'Alta' ? 'bg-red-500/20 text-red-400' :
                  caso.priority === 'Media' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {caso.priority}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-3">{caso.descripcion}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Estado:</span>
                  <span className="text-yellow-400">{caso.status}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Equipo:</span>
                  <span className="text-white">{caso.equipo}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Progreso:</span>
                  <span className="text-blue-400">{caso.progreso}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${caso.progreso}%` }}
                  ></div>
                </div>
                <div className="text-gray-400 mt-2">
                  <span className="text-yellow-400">Próxima acción:</span> {caso.proximaAccion}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proyectos SETI Activos */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Satellite className="h-5 w-5 text-blue-400" />
          Proyectos SETI Activos en el Mundo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              nombre: 'Breakthrough Listen',
              ubicacion: 'Green Bank, USA',
              estado: 'Activo',
              telescopios: ['Green Bank Telescope', 'Parkes Observatory'],
              objetivo: 'Escaneo de 1 millón de estrellas cercanas',
              ultimaActualizacion: '2024-01-15',
              descubrimientos: 0
            },
            {
              nombre: 'SETI@home',
              ubicacion: 'Distribuido (BOINC)',
              estado: 'Pausado',
              telescopios: ['Arecibo (histórico)'],
              objetivo: 'Análisis distribuido de señales',
              ultimaActualizacion: '2020-03-31',
              descubrimientos: 0
            },
            {
              nombre: 'FAST SETI',
              ubicacion: 'Guizhou, China',
              estado: 'Activo',
              telescopios: ['FAST (500m)'],
              objetivo: 'Búsqueda en frecuencias 1-3 GHz',
              ultimaActualizacion: '2024-01-14',
              descubrimientos: 0
            },
            {
              nombre: 'SETI Institute',
              ubicacion: 'Mountain View, USA',
              estado: 'Activo',
              telescopios: ['ATA (Allen Telescope Array)'],
              objetivo: 'Monitoreo continuo de candidatos',
              ultimaActualizacion: '2024-01-15',
              descubrimientos: 0
            },
            {
              nombre: 'MeerKAT SETI',
              ubicacion: 'Sudáfrica',
              estado: 'Activo',
              telescopios: ['MeerKAT Array'],
              objetivo: 'Búsqueda en frecuencias bajas',
              ultimaActualizacion: '2024-01-13',
              descubrimientos: 0
            },
            {
              nombre: 'VLA SETI',
              ubicacion: 'Nuevo México, USA',
              estado: 'Activo',
              telescopios: ['Very Large Array'],
              objetivo: 'Seguimiento de candidatos prometedores',
              ultimaActualizacion: '2024-01-15',
              descubrimientos: 0
            }
          ].map((proyecto, idx) => (
            <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">{proyecto.nombre}</h3>
                <span className={`w-2 h-2 rounded-full ${
                  proyecto.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-500'
                }`}></span>
              </div>
              <p className="text-gray-400 text-xs mb-2">{proyecto.ubicacion}</p>
              <div className="space-y-1 text-xs text-gray-300 mb-3">
                <p><span className="text-gray-400">Telescopios:</span> {proyecto.telescopios.join(', ')}</p>
                <p><span className="text-gray-400">Objetivo:</span> {proyecto.objetivo}</p>
                <p><span className="text-gray-400">Última actualización:</span> {proyecto.ultimaActualizacion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Señales Detectadas Recientemente */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Radio className="h-5 w-5 text-blue-400" />
            Señales Detectadas Recientemente
          </h3>
          <button
            onClick={fetchSignals}
            disabled={loading}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white disabled:opacity-50"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-400 text-center py-8">Cargando señales...</p>
          ) : signals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-2">No se encontraron señales SETI recientes.</p>
              <p className="text-gray-500 text-sm">Los datos se actualizan automáticamente cada hora</p>
            </div>
          ) : (
            signals.map((signal) => (
              <div
                key={signal.id}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setSelectedSignal(signal)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      signal.clasificacion === 'Interesante' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-white font-medium font-mono">{signal.frecuencia}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      signal.clasificacion === 'Interesante' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' : 'bg-green-900/50 text-green-300 border border-green-500/30'
                    }`}>
                      {signal.clasificacion}
                    </span>
                    <span className="text-xs text-gray-500">Prob: {signal.probabilidad_artificial}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{signal.fecha} {signal.hora}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{signal.comentario}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Origen:</span>
                    <p className="text-white">{signal.origen}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Duración:</span>
                    <p className="text-white">{signal.duracion}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Tipo:</span>
                    <p className="text-white">{signal.tipo}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Intensidad:</span>
                    <p className="text-white">{signal.intensidad}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <span className="text-xs text-gray-400">Coordenadas: {signal.coordenadas}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Noticias y Actualizaciones SETI */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Noticias y Actualizaciones SETI
        </h3>
        <div className="space-y-4">
          {[
            {
              fecha: '2021-10-25',
              titulo: 'Análisis de BLC1 publicado en Nature Astronomy',
              descripcion: 'Estudio completo de la señal BLC1 de Próxima Centauri concluye probable origen terrestre',
              fuente: 'Nature Astronomy',
              categoria: 'Publicación Científica',
              link: 'https://www.nature.com/articles/s41550-021-01508-8'
            },
            {
              fecha: '2018-06-01',
              titulo: 'Breakthrough Listen publica datos de 1,327 estrellas cercanas',
              descripcion: 'Primera publicación de datos del proyecto Breakthrough Listen con análisis de 692 estrellas',
              fuente: 'Breakthrough Initiatives',
              categoria: 'Publicación de Datos'
            },
            {
              fecha: '2017-08-17',
              titulo: 'Detección de FRB 121102 - Primera ráfaga de radio rápida repetitiva',
              descripcion: 'Confirmación del origen extragaláctico de FRB 121102, importante para SETI',
              fuente: 'Nature',
              categoria: 'Detección'
            },
            {
              fecha: '2003-03-03',
              titulo: 'Señal SHGb02+14a detectada por SETI@home',
              descripcion: 'Una de las señales SETI más enigmáticas, nunca explicada completamente',
              fuente: 'SETI@home',
              categoria: 'Detección Histórica'
            }
          ].map((noticia, idx) => (
            <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-green-500/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">{noticia.fecha}</span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {noticia.categoria}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold mb-1">{noticia.titulo}</h4>
                  <p className="text-gray-300 text-sm">{noticia.descripcion}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Fuente: {noticia.fuente}</p>
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