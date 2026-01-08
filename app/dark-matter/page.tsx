"use client";
import { useState, useEffect } from 'react';
import { Atom, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface DarkMatterData {
  experiment: string;
  status: string;
  sensitivity: string;
  lastUpdate: string;
  description: string;
}

export default function DarkMatterPage() {
  const { t } = useI18n();
  const [darkMatterData, setDarkMatterData] = useState<DarkMatterData[]>([
    {
      experiment: "LUX-ZEPLIN (LZ)",
      status: "Activo",
      sensitivity: "1.4×10^-48 cm²",
      lastUpdate: "2024-01-15",
      description: "Detector de xenón líquido en el Laboratorio Sanford"
    },
    {
      experiment: "XENONnT",
      status: "Activo",
      sensitivity: "1.1×10^-47 cm²",
      lastUpdate: "2024-01-10",
      description: "Experimento en el Laboratorio Nacional Gran Sasso"
    },
    {
      experiment: "PandaX-4T",
      status: "Activo",
      sensitivity: "3.8×10^-47 cm²",
      lastUpdate: "2024-01-12",
      description: "Detector en el Laboratorio Jinping"
    },
    {
      experiment: "ADMX",
      status: "Activo",
      sensitivity: "2.9×10^-17 eV/c²",
      lastUpdate: "2024-01-08",
      description: "Búsqueda de axiones en la Universidad de Washington"
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-6 h-48 border border-gray-700/50"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
              <Atom className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t('darkmatter.title')}
              </h1>
              <p className="text-gray-400">{t('darkmatter.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.active_experiments')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">10^-48</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.sensitivity')} (cm²)</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.detections')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Atom className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">85%</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.universe_matter')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Experimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {darkMatterData.map((experiment, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{experiment.experiment}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  experiment.status === 'Activo' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {experiment.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">{t('darkmatter.sensitivity')}</p>
                  <p className="text-white font-mono text-sm">{experiment.sensitivity}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">{t('darkmatter.last_update')}</p>
                  <p className="text-white text-sm">{experiment.lastUpdate}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">{t('darkmatter.description')}</p>
                  <p className="text-gray-300 text-sm">{experiment.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resultados Recientes */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-400" />
            Resultados y Actualizaciones Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                fecha: '2024-01-15',
                experimento: 'LUX-ZEPLIN',
                resultado: 'Nuevo límite de exclusión establecido',
                detalle: 'LZ establece el límite más estricto hasta la fecha para WIMPs de 10-100 GeV',
                importancia: 'Alta'
              },
              {
                fecha: '2024-01-12',
                experimento: 'XENONnT',
                resultado: 'Análisis de datos Run 3 completado',
                detalle: 'Procesamiento de 5.5 toneladas-año de exposición sin señales de materia oscura',
                importancia: 'Media'
              },
              {
                fecha: '2024-01-10',
                experimento: 'PandaX-4T',
                resultado: 'Publicación de resultados de búsqueda de axiones',
                detalle: 'Nuevos límites en el rango de masas de axiones solares',
                importancia: 'Media'
              },
              {
                fecha: '2024-01-08',
                experimento: 'ADMX',
                resultado: 'Mejora en sensibilidad de detección',
                detalle: 'Actualización del sistema de amplificación cuántica aumenta sensibilidad',
                importancia: 'Alta'
              }
            ].map((resultado, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{resultado.fecha}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    resultado.importancia === 'Alta' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {resultado.importancia}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">{resultado.experimento}</h3>
                <p className="text-purple-400 text-sm mb-2">{resultado.resultado}</p>
                <p className="text-gray-300 text-xs">{resultado.detalle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos Experimentos */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            Próximos Experimentos y Actualizaciones
          </h2>
          <div className="space-y-4">
            {[
              {
                experimento: 'DARWIN',
                estado: 'En desarrollo',
                descripcion: 'Detector de xenón líquido de próxima generación con 50 toneladas',
                lanzamiento: '2028 (estimado)',
                objetivo: 'Detección directa de materia oscura'
              },
              {
                experimento: 'LZ Upgrade',
                estado: 'Planificado',
                descripcion: 'Expansión del detector LZ para aumentar sensibilidad',
                lanzamiento: '2026',
                objetivo: 'Mejorar límites de exclusión'
              },
              {
                experimento: 'SuperCDMS SNOLAB',
                estado: 'En construcción',
                descripcion: 'Detector criogénico para WIMPs de baja masa',
                lanzamiento: '2025',
                objetivo: 'Búsqueda de materia oscura ligera'
              }
            ].map((experimento, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{experimento.experimento}</h3>
                  <span className="text-xs text-yellow-400">{experimento.estado}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{experimento.descripcion}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Lanzamiento estimado: <span className="text-white">{experimento.lanzamiento}</span></span>
                  <span className="text-blue-400">{experimento.objetivo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 