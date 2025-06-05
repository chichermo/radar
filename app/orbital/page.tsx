'use client';
import Globe from '@/components/Globe';
import { useState } from 'react';

// Mock data - esto será reemplazado por datos reales de la API
const mockTLEObjects = [
  {
    TLE_LINE1: "1 25544U 98067A   20123.45678901  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "ISS (ZARYA)"
  }
];

export default function OrbitalPage() {
  const [selected, setSelected] = useState<typeof mockTLEObjects[0] | null>(null);
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Visualización Orbital
        </h1>
        <p className="text-gray-300">
          Visualización en tiempo real de la posición de satélites usando datos TLE.
          Explora las órbitas y trayectorias de objetos espaciales alrededor de la Tierra.
        </p>
      </header>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div onClick={() => setSelected(mockTLEObjects[0])} className="cursor-pointer">
          <Globe objects={mockTLEObjects} />
        </div>
        {selected && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-blue-700 text-white">
            <h3 className="font-bold">{selected.OBJECT_NAME || 'Satélite'}</h3>
            <p>Altitud: 400km</p>
            <p>Inclinación: 51.6°</p>
            <button className="mt-2 px-3 py-1 bg-blue-700 rounded" onClick={() => setSelected(null)}>Cerrar</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-64">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Satélites Activos
          </h2>
          <div className="space-y-4">
            {mockTLEObjects.map((obj) => (
              <div
                key={obj.OBJECT_NAME}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-white">{obj.OBJECT_NAME}</h3>
                  <p className="text-sm text-gray-400">
                    Altitud: 400km • Inclinación: 51.6°
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  Última actualización: hace 5 min
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Información Técnica
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium text-white mb-2">Datos TLE</h3>
              <p className="text-sm text-gray-400 font-mono">
                {mockTLEObjects[0].TLE_LINE1}
              </p>
              <p className="text-sm text-gray-400 font-mono mt-1">
                {mockTLEObjects[0].TLE_LINE2}
              </p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium text-white mb-2">Estadísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Satélites activos</p>
                  <p className="text-lg font-medium text-white">1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Actualización</p>
                  <p className="text-lg font-medium text-white">Cada 5 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 