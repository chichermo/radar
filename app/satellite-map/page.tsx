"use client";
import { useState, useEffect } from "react";
import { Satellite, Globe, AlertTriangle, RefreshCw } from "lucide-react";

interface SatelliteData {
  id: string;
  name: string;
  type: string;
  country: string;
  launch_date: string;
  orbit_type: string;
  altitude: number;
  inclination: number;
  period: number;
}

export default function SatelliteMapPage() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSatellites = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/space-track');
      const result = await response.json();
      
      if (result.success && result.data.satellites) {
        setSatellites(result.data.satellites);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSatellites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Mapeando objetos espaciales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Mapa de Satélites</h1>
          <p className="text-lg text-gray-300">Rastreo de objetos espaciales en órbita terrestre</p>
          <button
            onClick={fetchSatellites}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {satellites.map((satellite) => (
            <div key={satellite.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Satellite className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">{satellite.name}</h3>
                </div>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {satellite.type}
                </span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">País:</span>
                  <span className="text-white">{satellite.country}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Altitud:</span>
                  <span className="text-white">{satellite.altitude.toLocaleString()} km</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Tipo de órbita:</span>
                  <span className="text-white">{satellite.orbit_type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 