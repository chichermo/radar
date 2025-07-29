"use client";
import { useState, useEffect } from 'react';
import { Circle, Activity, TrendingUp, AlertCircle, Rocket, Globe, Award, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import React from 'react';

const missions = [
  {
    name: 'Perseverance',
    agency: 'NASA',
    launch: '2020-07-30',
    status: 'Activo',
    achievements: ['Primer helicóptero en Marte (Ingenuity)', 'Búsqueda de vida pasada', 'Recolección de muestras'],
    link: 'https://mars.nasa.gov/mars2020/'
  },
  {
    name: 'Curiosity',
    agency: 'NASA',
    launch: '2011-11-26',
    status: 'Activo',
    achievements: ['Descubrimiento de compuestos orgánicos', 'Estudio del clima y geología marciana'],
    link: 'https://mars.nasa.gov/msl/'
  },
  {
    name: 'InSight',
    agency: 'NASA',
    launch: '2018-05-05',
    status: 'Finalizado',
    achievements: ['Primer sismómetro en Marte', 'Estudio del interior marciano'],
    link: 'https://mars.nasa.gov/insight/'
  },
  {
    name: 'Mars Express',
    agency: 'ESA',
    launch: '2003-06-02',
    status: 'Activo',
    achievements: ['Descubrimiento de agua congelada', 'Estudio de la atmósfera marciana'],
    link: 'https://www.esa.int/Science_Exploration/Space_Science/Mars_Express'
  },
  {
    name: 'Tianwen-1',
    agency: 'CNSA',
    launch: '2020-07-23',
    status: 'Activo',
    achievements: ['Primer rover chino en Marte (Zhurong)', 'Estudio del suelo y atmósfera'],
    link: 'http://www.cnsa.gov.cn/'
  }
];

export default function MarsMissionsPage() {
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
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Misiones a Marte</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora todas las misiones enviadas a Marte, sus descubrimientos, vehículos y datos científicos.</p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
              <Circle className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t('mars.title')}
              </h1>
              <p className="text-gray-400">{t('mars.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-gray-400 text-sm">{t('mars.active_missions')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">2021</p>
                <p className="text-gray-400 text-sm">{t('mars.last_arrival')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">225M km</p>
                <p className="text-gray-400 text-sm">{t('mars.average_distance')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <Circle className="h-6 w-6 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-gray-400 text-sm">{t('mars.active_rovers')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Misiones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {missions.map((mission, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-3">{mission.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{t('mars.agency')}: {mission.agency}</p>
                <p className="text-gray-400 text-sm">{t('mars.arrival')}: {mission.launch}</p>
                <p className="text-gray-400 text-sm">{t('mars.status')}: {mission.status}</p>
                <p className="text-gray-300 text-sm">{t('mars.achievements')}:</p>
                <ul className="text-xs text-gray-300 mb-2 list-disc list-inside">
                  {mission.achievements.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
              <a 
                href={mission.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mt-2"
              >
                <ExternalLink className="w-4 h-4 mr-1" /> Ver más
              </a>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">{t('mars.mars_exploration')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">{t('mars.scientific_objectives')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('mars.scientific_objectives_description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3">{t('mars.advanced_technology')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('mars.advanced_technology_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 