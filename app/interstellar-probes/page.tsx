"use client";
import { useState, useEffect } from 'react';
import { Rocket, Activity, TrendingUp, AlertCircle, Globe, Award, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

const probes = [
  {
    name: 'Voyager 1',
    agency: 'NASA',
    launch: '1977-09-05',
    status: 'Activo',
    distance: '24,000,000,000 km',
    speed: '61,000 km/h',
    achievements: ['Primera nave en el espacio interestelar', 'Imágenes de Júpiter y Saturno', 'Golden Record'],
    link: 'https://voyager.jpl.nasa.gov/'
  },
  {
    name: 'Voyager 2',
    agency: 'NASA',
    launch: '1977-08-20',
    status: 'Activo',
    distance: '20,000,000,000 km',
    speed: '55,000 km/h',
    achievements: ['Única nave que visitó Urano y Neptuno', 'Golden Record'],
    link: 'https://voyager.jpl.nasa.gov/'
  },
  {
    name: 'Pioneer 10',
    agency: 'NASA',
    launch: '1972-03-02',
    status: 'Finalizado',
    distance: '12,000,000,000 km',
    speed: '43,000 km/h',
    achievements: ['Primera nave en cruzar el cinturón de asteroides', 'Primera en sobrevolar Júpiter'],
    link: 'https://www.nasa.gov/mission_pages/pioneer-10/'
  },
  {
    name: 'New Horizons',
    agency: 'NASA',
    launch: '2006-01-19',
    status: 'Activo',
    distance: '7,900,000,000 km',
    speed: '58,000 km/h',
    achievements: ['Primer sobrevuelo de Plutón', 'Imágenes del Cinturón de Kuiper'],
    link: 'https://www.nasa.gov/mission_pages/newhorizons/'
  }
];

export default function InterstellarProbesPage() {
  const { t } = useI18n();
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 h-64 border border-gray-700/50"></div>
              <div className="bg-gray-800/50 rounded-lg p-6 h-64 border border-gray-700/50"></div>
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
              <Rocket className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t('interstellar.title')}
              </h1>
              <p className="text-gray-400">{t('interstellar.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-gray-400 text-sm">{t('interstellar.interstellar_probes')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">1977</p>
                <p className="text-gray-400 text-sm">{t('interstellar.first_launch')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">23B km</p>
                <p className="text-gray-400 text-sm">{t('interstellar.voyager_1_distance')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Rocket className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">46 {t('interstellar.years')}</p>
                <p className="text-gray-400 text-sm">{t('interstellar.longest_mission')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sondas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {probes.map((probe, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-3">{probe.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{t('interstellar.launch')}: {probe.launch}</p>
                <p className="text-gray-400 text-sm">{t('interstellar.status')}: {probe.status}</p>
                <p className="text-gray-400 text-sm">{t('interstellar.distance')}: {probe.distance}</p>
                <p className="text-gray-400 text-sm">{t('interstellar.speed')}: {probe.speed}</p>
                <ul className="text-xs text-gray-300 mb-2 list-disc list-inside">
                  {probe.achievements.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-2">
                  <a href={probe.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" /> Ver más
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">{t('interstellar.interstellar_exploration')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">{t('interstellar.scientific_legacy')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('interstellar.scientific_legacy_description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">{t('interstellar.future')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('interstellar.future_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 