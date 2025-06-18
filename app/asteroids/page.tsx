"use client";
import { AlertTriangle, ArrowRight, Globe, Radar, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getNeoAsteroids } from '../../services/neoAsteroids';
import { formatNumber, formatDate, formatTimeOnly } from '@/utils/formatters';
import { useI18n } from '@/lib/i18n';

// Mock data - esto será reemplazado por datos reales de la API de NASA
const mockNeos = [
  {
    id: '2024-BR1',
    name: '2024 BR1',
    diameter: 120,
    distance: 0.0234,
    velocity: 12.5,
    hazard: false,
    approach_date: '2024-02-26T15:30:00Z',
    orbit_body: 'Earth',
    magnitude: 19.2,
    last_updated: '2024-02-25T12:00:00Z'
  },
  {
    id: '2024-AA2',
    name: '2024 AA2',
    diameter: 45,
    distance: 0.0156,
    velocity: 8.7,
    hazard: true,
    approach_date: '2024-02-27T08:15:00Z',
    orbit_body: 'Earth',
    magnitude: 20.1,
    last_updated: '2024-02-25T12:00:00Z'
  }
];

const hazardLevels = {
  low: 'bg-green-500/10 text-green-400',
  medium: 'bg-yellow-500/10 text-yellow-400',
  high: 'bg-red-500/10 text-red-400'
};

export default function AsteroidsPage() {
  const { t } = useI18n();
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNeoAsteroids();
        if (data && data.near_earth_objects) {
          // Unir todos los días en un solo array
          const all = Object.values(data.near_earth_objects).flat();
          setAsteroids(all);
        } else {
          // Si no hay datos reales, usar mock data
          setAsteroids(mockNeos);
        }
      } catch (error) {
        console.error('Error cargando asteroides:', error);
        setAsteroids(mockNeos);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Función helper para obtener el diámetro de forma segura
  const getDiameter = (ast: any) => {
    try {
      if (ast.estimated_diameter?.meters?.estimated_diameter_max) {
        return Math.round(ast.estimated_diameter.meters.estimated_diameter_max);
      }
      if (ast.diameter) {
        return ast.diameter;
      }
      return 'N/A';
    } catch {
      return 'N/A';
    }
  };

  // Función helper para obtener la distancia de forma segura
  const getDistance = (ast: any) => {
    try {
      if (ast.close_approach_data?.[0]?.miss_distance?.kilometers) {
        return formatNumber(Math.round(ast.close_approach_data[0].miss_distance.kilometers));
      }
      if (ast.distance) {
        return formatNumber(Math.round(ast.distance * 149597870.7));
      }
      return 'N/A';
    } catch {
      return 'N/A';
    }
  };

  // Función helper para obtener la velocidad de forma segura
  const getVelocity = (ast: any) => {
    try {
      if (ast.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour) {
        return ast.close_approach_data[0].relative_velocity.kilometers_per_hour;
      }
      if (ast.velocity) {
        return ast.velocity;
      }
      return 'N/A';
    } catch {
      return 'N/A';
    }
  };

  // Función helper para obtener la fecha de acercamiento de forma segura
  const getApproachDate = (ast: any) => {
    try {
      if (ast.close_approach_data?.[0]?.close_approach_date_full) {
        return ast.close_approach_data[0].close_approach_date_full;
      }
      if (ast.approach_date) {
        return formatDate(new Date(ast.approach_date));
      }
      return 'N/A';
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('asteroids.title')}
        </h1>
        <p className="text-gray-300">
          {t('asteroids.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('asteroids.upcoming_approaches')}
            </h2>
            <div className="space-y-4">
              {asteroids.map((ast: any, index: number) => (
                <div
                  key={ast.id || index}
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-white">
                          {ast.name || `${t('asteroids.asteroid')} ${index + 1}`}
                        </h3>
                        {(ast.is_potentially_hazardous_asteroid || ast.hazard) && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400">
                            {t('asteroids.potentially_hazardous')}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">{t('asteroids.diameter')}</p>
                          <p className="text-white">{getDiameter(ast)} {t('asteroids.meters')}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">{t('asteroids.distance')}</p>
                          <p className="text-white">{getDistance(ast)} {t('asteroids.km')}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">{t('asteroids.velocity')}</p>
                          <p className="text-white">{getVelocity(ast)} {t('asteroids.kmh')}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">{t('asteroids.magnitude')}</p>
                          <p className="text-white">{ast.absolute_magnitude_h || ast.magnitude || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{t('asteroids.approach')}</p>
                      <p className="text-white">{getApproachDate(ast)}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t('asteroids.last_update')}: {formatTimeOnly(new Date())}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('asteroids.statistics')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <h3 className="font-medium text-white">{t('asteroids.total_neos')}</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">28,000+</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <h3 className="font-medium text-white">{t('asteroids.potentially_hazardous_title')}</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">2,300+</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Radar className="h-5 w-5 text-green-400" />
                  <h3 className="font-medium text-white">{t('asteroids.monitored')}</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">100%</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium text-white">{t('asteroids.active_missions')}</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">5</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t('asteroids.filters')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('asteroids.max_distance')}
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>{t('asteroids.distance_option_1')}</option>
                  <option>{t('asteroids.distance_option_2')}</option>
                  <option>{t('asteroids.distance_option_3')}</option>
                  <option>{t('asteroids.distance_option_4')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('asteroids.min_size')}
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>{t('asteroids.size_option_1')}</option>
                  <option>{t('asteroids.size_option_2')}</option>
                  <option>{t('asteroids.size_option_3')}</option>
                  <option>{t('asteroids.size_option_4')}</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-600" />
                  <span className="text-sm text-gray-300">
                    {t('asteroids.only_hazardous')}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">{t('asteroids.neos_table_title')}</h2>
        <p className="text-xs text-gray-400 mb-4">{t('asteroids.data_source')}</p>
        {loading ? (
          <div className="text-white">{t('asteroids.loading')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-300">{t('asteroids.table_name')}</th>
                  <th className="px-4 py-2 text-left text-gray-300">{t('asteroids.table_date')}</th>
                  <th className="px-4 py-2 text-left text-gray-300">{t('asteroids.table_size')}</th>
                  <th className="px-4 py-2 text-left text-gray-300">{t('asteroids.table_distance')}</th>
                  <th className="px-4 py-2 text-left text-gray-300">{t('asteroids.table_risk')}</th>
                </tr>
              </thead>
              <tbody>
                {asteroids.map((ast: any, index: number) => (
                  <tr key={ast.id || index} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{ast.name || `${t('asteroids.asteroid')} ${index + 1}`}</td>
                    <td className="px-4 py-2 text-gray-300">{getApproachDate(ast)}</td>
                    <td className="px-4 py-2 text-gray-300">{getDiameter(ast)}</td>
                    <td className="px-4 py-2 text-gray-300">{getDistance(ast)}</td>
                    <td className="px-4 py-2 text-red-400">{(ast.is_potentially_hazardous_asteroid || ast.hazard) ? t('asteroids.yes') : t('asteroids.no')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 