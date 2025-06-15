import dynamic from 'next/dynamic';

const MapboxSatelliteMap = dynamic(() => import('../../components/MapboxSatelliteMap'), { ssr: false });

export default function SatelliteMapPage() {
  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Mapa de Rutas de Satélites</h1>
      <p className="text-xs text-gray-400 mb-4">Visualización de rutas de satélites usando Mapbox. Datos de ejemplo. Integraremos trayectorias reales próximamente.</p>
      <MapboxSatelliteMap />
    </div>
  );
} 