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
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-600/20 rounded-xl">
              <Atom className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t('darkmatter.title')}
              </h1>
              <p className="text-gray-400">{t('darkmatter.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.active_experiments')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">10^-48</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.sensitivity')} (cm²)</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-gray-400 text-sm">{t('darkmatter.detections')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
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
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{experiment.experiment}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  experiment.status === 'Activo' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
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

        {/* Información adicional */}
        <div className="mt-12 bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">{t('darkmatter.what_is_dark_matter')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">{t('darkmatter.the_problem')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('darkmatter.problem_description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">{t('darkmatter.the_experiments')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('darkmatter.experiments_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 