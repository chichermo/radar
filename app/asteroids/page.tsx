"use client";
import { AlertTriangle, ArrowRight, Globe, Radar, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getNeoAsteroids } from '../../services/neoAsteroids';
import { formatNumber, formatDate, formatTimeOnly } from '@/utils/formatters';

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
          Seguimiento de Asteroides y NEOs
        </h1>
        <p className="text-gray-300">
          Monitoreo en tiempo real de objetos cercanos a la Tierra (NEOs) y
          evaluación de riesgos de impacto.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Próximos Acercamientos
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
                          {ast.name || `Asteroide ${index + 1}`}
                        </h3>
                        {(ast.is_potentially_hazardous_asteroid || ast.hazard) && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400">
                            Potencialmente Peligroso
                          </span>
                        )}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Diámetro</p>
                          <p className="text-white">{getDiameter(ast)} metros</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Distancia</p>
                          <p className="text-white">{getDistance(ast)} km</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Velocidad</p>
                          <p className="text-white">{getVelocity(ast)} km/h</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Magnitud</p>
                          <p className="text-white">{ast.absolute_magnitude_h || ast.magnitude || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Acercamiento</p>
                      <p className="text-white">{getApproachDate(ast)}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Última actualización: {formatTimeOnly(new Date())}
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
              Estadísticas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <h3 className="font-medium text-white">NEOs Totales</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">28,000+</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <h3 className="font-medium text-white">Potencialmente Peligrosos</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">2,300+</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Radar className="h-5 w-5 text-green-400" />
                  <h3 className="font-medium text-white">Monitoreados</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">100%</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <h3 className="font-medium text-white">Misiones Activas</h3>
                </div>
                <p className="text-2xl font-bold text-white mt-2">5</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filtros
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Distancia Máxima
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>0.1 LD (Lunar Distance)</option>
                  <option>0.5 LD</option>
                  <option>1 LD</option>
                  <option>5 LD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tamaño Mínimo
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option>10 metros</option>
                  <option>50 metros</option>
                  <option>100 metros</option>
                  <option>1 kilómetro</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-600" />
                  <span className="text-sm text-gray-300">
                    Solo potencialmente peligrosos
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Asteroides Cercanos a la Tierra (NEO)</h2>
        <p className="text-xs text-gray-400 mb-4">Datos proporcionados por NASA/JPL (<a href='https://cneos.jpl.nasa.gov/' className='underline' target='_blank' rel='noopener noreferrer'>cneos.jpl.nasa.gov</a>)</p>
        {loading ? (
          <div className="text-white">Cargando asteroides...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-300">Nombre</th>
                  <th className="px-4 py-2 text-left text-gray-300">Fecha</th>
                  <th className="px-4 py-2 text-left text-gray-300">Tamaño (m)</th>
                  <th className="px-4 py-2 text-left text-gray-300">Distancia (km)</th>
                  <th className="px-4 py-2 text-left text-gray-300">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {asteroids.map((ast: any, index: number) => (
                  <tr key={ast.id || index} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{ast.name || `Asteroide ${index + 1}`}</td>
                    <td className="px-4 py-2 text-gray-300">{getApproachDate(ast)}</td>
                    <td className="px-4 py-2 text-gray-300">{getDiameter(ast)}</td>
                    <td className="px-4 py-2 text-gray-300">{getDistance(ast)}</td>
                    <td className="px-4 py-2 text-red-400">{(ast.is_potentially_hazardous_asteroid || ast.hazard) ? 'Sí' : 'No'}</td>
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