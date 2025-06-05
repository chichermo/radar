import { AlertCircle, Clock, MapPin, Radio } from 'lucide-react';

// Mock data - esto será reemplazado por datos reales de la API
const mockSignals = [
  {
    id: 1,
    frequency: '1420.405751 MHz',
    strength: -85,
    bandwidth: '2.4 kHz',
    source: 'Desconocido',
    location: {
      lat: 40.7128,
      lng: -74.0060
    },
    timestamp: '2024-02-25T20:15:00Z',
    status: 'investigando',
    description: 'Señal pulsante con patrón no identificado'
  },
  {
    id: 2,
    frequency: '408.0 MHz',
    strength: -92,
    bandwidth: '1.0 MHz',
    source: 'Posible interferencia',
    location: {
      lat: 34.0522,
      lng: -118.2437
    },
    timestamp: '2024-02-25T19:45:00Z',
    status: 'resuelto',
    description: 'Interferencia de transmisión terrestre'
  }
];

const statusColors = {
  investigando: 'bg-yellow-500',
  resuelto: 'bg-green-500',
  crítico: 'bg-red-500'
};

export default function SignalsPage() {
  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Señales Detectadas
        </h1>
        <p className="text-gray-300">
          Monitoreo en tiempo real de señales anómalas y eventos electromagnéticos.
          Sistema de alerta y análisis automático de patrones.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Señales Recientes
            </h2>
            <div className="space-y-4">
              {mockSignals.map((signal) => (
                <div
                  key={signal.id}
                  className="p-4 bg-gray-700 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Radio className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-white">
                          {signal.frequency}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {signal.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColors[signal.status as keyof typeof statusColors]
                        } text-white`}
                      >
                        {signal.status}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(signal.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Fuerza</p>
                      <p className="text-white">{signal.strength} dBm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Ancho de Banda</p>
                      <p className="text-white">{signal.bandwidth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Fuente</p>
                      <p className="text-white">{signal.source}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Ubicación</p>
                      <p className="text-white">
                        {signal.location.lat.toFixed(2)}°,{' '}
                        {signal.location.lng.toFixed(2)}°
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
              Filtros
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Rango de Frecuencia
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-lg border-gray-600 bg-gray-700 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-lg border-gray-600 bg-gray-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Estado
                </label>
                <select className="w-full rounded-lg border-gray-600 bg-gray-700 text-white">
                  <option>Todos</option>
                  <option>Investigando</option>
                  <option>Resuelto</option>
                  <option>Crítico</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Fuerza Mínima
                </label>
                <input
                  type="range"
                  min="-120"
                  max="-40"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Estadísticas
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-medium text-white mb-2">Hoy</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Señales detectadas</p>
                    <p className="text-lg font-medium text-white">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">En investigación</p>
                    <p className="text-lg font-medium text-white">3</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-medium text-white mb-2">Alertas</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">2 señales no identificadas</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">1 señal crítica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 