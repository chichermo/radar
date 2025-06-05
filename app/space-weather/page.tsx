import { Activity, AlertTriangle, Cloud, Sun, Wind } from 'lucide-react';

// Mock data - esto será reemplazado por datos reales de las APIs de NASA/ESA
const mockSpaceWeather = {
  solar_activity: {
    flares: {
      current: 'B1.2',
      last_24h: ['C2.1', 'B8.4', 'B3.2'],
      forecast: 'Bajo'
    },
    sunspots: {
      count: 42,
      regions: ['AR3576', 'AR3578', 'AR3580'],
      forecast: 'Estable'
    },
    coronal_holes: {
      count: 2,
      forecast: 'Moderado'
    }
  },
  geomagnetic: {
    current: 'Kp2',
    last_24h: ['Kp3', 'Kp2', 'Kp1'],
    forecast: 'Tranquilo'
  },
  radiation: {
    current: 'S1',
    last_24h: ['S1', 'S1', 'S1'],
    forecast: 'Bajo'
  },
  alerts: [
    {
      id: 1,
      type: 'CME',
      level: 'Moderado',
      description: 'Eyección de masa coronal detectada, posible impacto en 48-72 horas',
      timestamp: '2024-02-25T10:30:00Z'
    },
    {
      id: 2,
      type: 'Flares',
      level: 'Bajo',
      description: 'Actividad de llamaradas solares aumentando en la región AR3576',
      timestamp: '2024-02-25T08:15:00Z'
    }
  ]
};

const activityLevels = {
  Bajo: 'bg-green-500/10 text-green-400',
  Moderado: 'bg-yellow-500/10 text-yellow-400',
  Alto: 'bg-red-500/10 text-red-400'
};

export default function SpaceWeatherPage() {
  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Clima Espacial en Tiempo Real
        </h1>
        <p className="text-gray-300">
          Monitoreo de actividad solar, condiciones geomagnéticas y alertas
          espaciales que pueden afectar a la Tierra.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sun className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">
                  Actividad Solar
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Llamaradas Solares</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-lg font-medium text-white">
                      {mockSpaceWeather.solar_activity.flares.current}
                    </p>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
                      {mockSpaceWeather.solar_activity.flares.forecast}
                    </span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    {mockSpaceWeather.solar_activity.flares.last_24h.map(
                      (flare, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-400"
                        >
                          {flare}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Manchas Solares</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-lg font-medium text-white">
                      {mockSpaceWeather.solar_activity.sunspots.count} regiones
                    </p>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
                      {mockSpaceWeather.solar_activity.sunspots.forecast}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mockSpaceWeather.solar_activity.sunspots.regions.map(
                      (region) => (
                        <span
                          key={region}
                          className="text-xs bg-gray-700 px-2 py-1 rounded"
                        >
                          {region}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Wind className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">
                  Condiciones Geomagnéticas
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Índice Kp Actual</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-lg font-medium text-white">
                      {mockSpaceWeather.geomagnetic.current}
                    </p>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
                      {mockSpaceWeather.geomagnetic.forecast}
                    </span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    {mockSpaceWeather.geomagnetic.last_24h.map(
                      (kp, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-400"
                        >
                          {kp}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nivel de Radiación</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-lg font-medium text-white">
                      {mockSpaceWeather.radiation.current}
                    </p>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
                      {mockSpaceWeather.radiation.forecast}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">
                Alertas Activas
              </h2>
            </div>
            <div className="space-y-4">
              {mockSpaceWeather.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-white">
                          {alert.type}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400">
                          {alert.level}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">
                        {alert.description}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Pronóstico
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">24 Horas</h3>
                <p className="text-sm text-gray-300">
                  Condiciones geomagnéticas tranquilas. Baja probabilidad de
                  llamaradas solares significativas. Monitoreo continuo de la
                  región AR3576.
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">48-72 Horas</h3>
                <p className="text-sm text-gray-300">
                  Posible impacto de CME detectada. Se espera actividad
                  geomagnética moderada. Mantener monitoreo de condiciones
                  espaciales.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Efectos en la Tierra
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Comunicaciones</h3>
                <p className="text-sm text-gray-300">
                  Condiciones normales. No se esperan interrupciones en
                  comunicaciones por radio o satélite.
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Auroras</h3>
                <p className="text-sm text-gray-300">
                  Baja probabilidad de auroras visibles en latitudes medias.
                  Posible actividad en regiones polares.
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">GPS</h3>
                <p className="text-sm text-gray-300">
                  Precisión GPS normal. No se esperan degradaciones
                  significativas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 