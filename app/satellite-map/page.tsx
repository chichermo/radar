"use client";

import dynamicImport from 'next/dynamic';
import { useI18n } from '@/lib/i18n';

const MapboxSatelliteMap = dynamicImport(() => import('../../components/MapboxSatelliteMap'), { ssr: false });

// Configuración para deshabilitar la generación estática
export const dynamic = 'force-dynamic';

export default function SatelliteMapPage() {
  const { t } = useI18n();
  
  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold text-white mb-4">{t('satellitemap.title')}</h1>
      <p className="text-xs text-gray-400 mb-4">{t('satellitemap.description')}</p>
      <MapboxSatelliteMap />
    </div>
  );
} 