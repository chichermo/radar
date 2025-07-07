"use client";
import { useState, useEffect } from "react";
import { AlertTriangle, Globe, Zap, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n';
import ClientDate from '@/components/ClientDate';

interface AsteroidData {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
    };
  }>;
}

export default function AsteroidsPage() {
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    hazardous: 0,
    averageSize: 0
  });

  const fetchAsteroids = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/nasa-asteroids');
      const result = await response.json();
      
      if (result.success && result.data.near_earth_objects) {
        const allAsteroids: AsteroidData[] = [];
        Object.values(result.data.near_earth_objects).forEach((dayAsteroids: any) => {
          allAsteroids.push(...dayAsteroids);
        });
        
        setAsteroids(allAsteroids);
        
        const hazardous = allAsteroids.filter(a => a.is_potentially_hazardous_asteroid).length;
        const avgSize = allAsteroids.reduce((sum, a) => {
          return sum + (a.estimated_diameter.kilometers.estimated_diameter_max + 
                       a.estimated_diameter.kilometers.estimated_diameter_min) / 2;
        }, 0) / allAsteroids.length;
        
        setStats({
          total: allAsteroids.length,
          hazardous,
          averageSize: avgSize
        });
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsteroids();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Analizando asteroides cercanos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Asteroides Cercanos</h1>
          <p className="text-lg text-gray-300">Monitoreo de objetos cercanos a la Tierra (NEOs)</p>
          <button
            onClick={fetchAsteroids}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
            <p className="text-gray-300">Total de Asteroides</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.hazardous}</h3>
            <p className="text-gray-300">Potencialmente Peligrosos</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white">{stats.averageSize.toFixed(2)} km</h3>
            <p className="text-gray-300">Tamaño Promedio</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {asteroids.map((asteroid) => (
            <div key={asteroid.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{asteroid.name}</h3>
                {asteroid.is_potentially_hazardous_asteroid && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    Peligroso
                  </span>
                )}
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Magnitud:</span>
                  <span className="text-white">{asteroid.absolute_magnitude_h}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Tamaño:</span>
                  <span className="text-white">
                    {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - 
                    {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                  </span>
                </div>
                
                {asteroid.close_approach_data[0] && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Próximo acercamiento:</span>
                      <span className="text-white">
                        <ClientDate 
                          date={asteroid.close_approach_data[0].close_approach_date} 
                          type="date" 
                          options={{
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }}
                        />
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Velocidad:</span>
                      <span className="text-white">
                        {parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(1)} km/s
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Distancia mínima:</span>
                      <span className="text-white">
                        {parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 