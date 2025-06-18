"use client";
import { useState, useEffect } from 'react';
import { Cpu, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function MachineLearningPage() {
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
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 h-64"></div>
              <div className="bg-gray-800 rounded-lg p-6 h-64"></div>
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
              <Cpu className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('ml.title')}
              </h1>
              <p className="text-gray-400">{t('ml.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-gray-400 text-sm">{t('ml.accuracy')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">10M+</p>
                <p className="text-gray-400 text-sm">{t('ml.processed_data')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-gray-400 text-sm">{t('ml.monitoring')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <Cpu className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-gray-400 text-sm">{t('ml.active_models')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aplicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">{t('ml.anomaly_detection')}</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">{t('ml.algorithm')}: Isolation Forest</p>
              <p className="text-gray-400 text-sm">{t('ml.accuracy')}: 98%</p>
              <p className="text-gray-400 text-sm">{t('ml.time')}: {'<'} 1ms</p>
              <p className="text-gray-300 text-sm">{t('ml.anomaly_detection_description')}</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">{t('ml.object_classification')}</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">{t('ml.algorithm')}: CNN</p>
              <p className="text-gray-400 text-sm">{t('ml.accuracy')}: 94%</p>
              <p className="text-gray-400 text-sm">{t('ml.categories')}: 15</p>
              <p className="text-gray-300 text-sm">{t('ml.object_classification_description')}</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">{t('ml.trajectory_prediction')}</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">{t('ml.algorithm')}: LSTM</p>
              <p className="text-gray-400 text-sm">{t('ml.accuracy')}: 92%</p>
              <p className="text-gray-400 text-sm">{t('ml.horizon')}: 7 {t('ml.days')}</p>
              <p className="text-gray-300 text-sm">{t('ml.trajectory_prediction_description')}</p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">{t('ml.ai_in_space_exploration')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">{t('ml.automation')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('ml.automation_description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-400 mb-3">{t('ml.discoveries')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('ml.discoveries_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 