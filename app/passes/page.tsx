'use client';
import { Clock, MapPin, Satellite } from 'lucide-react';
import { useState } from 'react';

// Mock data - esto será reemplazado por datos reales de la API
const mockPasses = [
  {
    id: 1,
    satellite: 'ISS',
    startTime: '2024-02-25T20:30:00Z',
    endTime: '2024-02-25T20:35:00Z',
    maxElevation: 45,
    startAzimuth: 270,
    endAzimuth: 90,
    duration: 5,
    magnitude: -3.5
  },
  {
    id: 2,
    satellite: 'Starlink-1234',
    startTime: '2024-02-25T21:15:00Z',
    endTime: '2024-02-25T21:18:00Z',
    maxElevation: 30,
    startAzimuth: 240,
    endAzimuth: 120,
    duration: 3,
    magnitude: -1.2
  }
];

export default function PassesPage() {
  const [satellite, setSatellite] = useState('Todos');
  const [minElevation, setMinElevation] = useState(0);
  const [minMagnitude, setMinMagnitude] = useState(-6);

  const filteredPasses = mockPasses.filter(pass => {
    const satOk = satellite === 'Todos' || pass.satellite === satellite;
    const elevOk = pass.maxElevation >= minElevation;
    const magOk = pass.magnitude >= minMagnitude;
    return satOk && elevOk && magOk;
  });

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Próximos Pasos Satelitales
        </h1>
        <p className="text-gray-300">
          Predicción de próximos pasos de satélites sobre tu ubicación.
          Incluye información detallada sobre visibilidad y trayectoria.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Pasos Filtrados
            </h2>
            <div className="space-y-4">
              {filteredPasses.map((pass) => (
                <div key={pass.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">{pass.satellite}</h3>
                      <p className="text-gray-400 text-sm">Inicio: {new Date(pass.startTime).toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">Elevación máxima: {pass.maxElevation}°</p>
                      <p className="text-gray-400 text-sm">Magnitud: {pass.magnitude}</p>
                    </div>
                    <div className="text-sm text-gray-400">Duración: {pass.duration} min</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Satélites</label>
                <select className="w-full rounded-lg border-gray-600 bg-gray-700 text-white" value={satellite} onChange={e => setSatellite(e.target.value)}>
                  <option>Todos</option>
                  <option>ISS</option>
                  <option>Starlink-1234</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Elevación Mínima</label>
                <input type="range" min="0" max="90" value={minElevation} onChange={e => setMinElevation(Number(e.target.value))} className="w-full" />
                <span className="text-white ml-2">{minElevation}°</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Magnitud Mínima</label>
                <input type="range" min="-6" max="6" value={minMagnitude} onChange={e => setMinMagnitude(Number(e.target.value))} className="w-full" />
                <span className="text-white ml-2">{minMagnitude}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 