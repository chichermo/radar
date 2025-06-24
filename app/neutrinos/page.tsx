"use client";
import { useState, useEffect } from 'react';
import { Snowflake, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface NeutrinoData {
  detector: string;
  location: string;
  status: string;
  events: number;
  lastUpdate: string;
  description: string;
}

export default function NeutrinosPage() {
  const { t } = useI18n();
  const [neutrinoData, setNeutrinoData] = useState<NeutrinoData[]>([
    {
      detector: "IceCube",
      location: "Antártida",
      status: "Activo",
      events: 156,
      lastUpdate: "2024-01-15",
      description: "Detector de neutrinos enterrado en el hielo antártico"
    },
    {
      detector: "Super-Kamiokande",
      location: "Japón",
      status: "Activo",
      events: 89,
      lastUpdate: "2024-01-12",
      description: "Detector de agua ultra-pura en mina subterránea"
    },
    {
      detector: "ANTARES",
      location: "Mediterráneo",
      status: "Activo",
      events: 23,
      lastUpdate: "2024-01-10",
      description: "Telescopio de neutrinos submarino"
    },
    {
      detector: "KM3NeT",
      location: "Mediterráneo",
      status: "En construcción",
      events: 0,
      lastUpdate: "2024-01-08",
      description: "Red de telescopios de neutrinos en desarrollo"
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
            <div className="p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
              <Snowflake className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t('neutrinos.title')}
              </h1>
              <p className="text-gray-400">{t('neutrinos.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">268</p>
                <p className="text-gray-400 text-sm">{t('neutrinos.total_events')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-gray-400 text-sm">{t('neutrinos.active_detectors')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-gray-400 text-sm">{t('neutrinos.icecube_events')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Snowflake className="h-6 w-6 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-white">1 km³</p>
                <p className="text-gray-400 text-sm">{t('neutrinos.icecube_volume')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detectores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neutrinoData.map((detector, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{detector.detector}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  detector.status === 'Activo' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {detector.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">{t('neutrinos.location')}</p>
                  <p className="text-white text-sm">{detector.location}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">{t('neutrinos.detected_events')}</p>
                  <p className="text-white font-bold text-lg">{detector.events}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">{t('neutrinos.last_update')}</p>
                  <p className="text-white text-sm">{detector.lastUpdate}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">{t('neutrinos.description')}</p>
                  <p className="text-gray-300 text-sm">{detector.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">{t('neutrinos.what_are_cosmic_neutrinos')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">{t('neutrinos.cosmic_messengers')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('neutrinos.cosmic_messengers_description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">{t('neutrinos.icecube_observatory')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('neutrinos.icecube_observatory_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 