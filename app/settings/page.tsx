import { Bell, Globe, MapPin, Moon, Settings, Sun } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Configuración
        </h1>
        <p className="text-gray-300">
          Personaliza tu experiencia en el dashboard de monitoreo espacial.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">
                  Ubicación y Observación
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ubicación del Observador
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Latitud"
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Longitud"
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Altitud (metros)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zona Horaria
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <option>UTC</option>
                    <option>UTC-8 (PST)</option>
                    <option>UTC-5 (EST)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (CET)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Bell className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">
                  Alertas y Notificaciones
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <span className="text-gray-300">
                      Alertas de Objetos Cercanos
                    </span>
                  </label>
                  <p className="mt-1 text-sm text-gray-400">
                    Recibe notificaciones cuando objetos se acerquen a la Tierra.
                  </p>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <span className="text-gray-300">
                      Alertas de Clima Espacial
                    </span>
                  </label>
                  <p className="mt-1 text-sm text-gray-400">
                    Notificaciones sobre eventos solares y geomagnéticos.
                  </p>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <span className="text-gray-300">
                      Alertas de Basura Espacial
                    </span>
                  </label>
                  <p className="mt-1 text-sm text-gray-400">
                    Avisos sobre objetos de alto riesgo y eventos de fragmentación.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Método de Notificación
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <option>Navegador</option>
                    <option>Email</option>
                    <option>Ambos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">
                  Preferencias de Visualización
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tema
                  </label>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg">
                      <Sun className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">Claro</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg">
                      <Moon className="h-4 w-4 text-blue-400" />
                      <span className="text-white">Oscuro</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Unidades
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                      <option>Métrico</option>
                      <option>Imperial</option>
                    </select>
                    <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                      <option>Kilómetros</option>
                      <option>Millas</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Densidad de Información
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <option>Básica</option>
                    <option>Normal</option>
                    <option>Detallada</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Resumen de Configuración
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Ubicación</h3>
                <p className="text-sm text-gray-300">
                  No configurada
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Alertas</h3>
                <p className="text-sm text-gray-300">
                  Notificaciones del navegador activas
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Visualización</h3>
                <p className="text-sm text-gray-300">
                  Tema oscuro, unidades métricas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Información
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Versión</h3>
                <p className="text-sm text-gray-300">
                  Dashboard v1.0.0
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Fuentes de Datos</h3>
                <p className="text-sm text-gray-300">
                  NASA, ESA, SETI, y otras fuentes oficiales
                </p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">Actualización</h3>
                <p className="text-sm text-gray-300">
                  Última actualización: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 