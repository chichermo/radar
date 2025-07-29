import React from 'react'
import { Settings, User, Palette, Bell, Globe, Star, Satellite, Zap } from 'lucide-react'

export default function PersonalizationPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Personalización</h1>
        <p className="subtitle max-w-2xl mx-auto">Adapta COSMIC DATA a tus preferencias y necesidades, configura notificaciones y personaliza tu dashboard.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Perfil de Usuario */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Perfil de Usuario</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de Usuario
              </label>
              <input
                type="text"
                defaultValue="Astronauta123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de Experiencia
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Principiante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
                <option>Experto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intereses Principales
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Exoplanetas</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Clima Espacial</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Satélites</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Asteroides</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                placeholder="Ciudad, País"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Configuración de Notificaciones */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Notificaciones</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Alertas Push</h3>
                <p className="text-sm text-gray-600">Notificaciones en tiempo real</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Alertas por Email</h3>
                <p className="text-sm text-gray-600">Resúmenes diarios y semanales</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Sonidos</h3>
                <p className="text-sm text-gray-600">Efectos de sonido para alertas</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Apariencia */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">Apariencia</h2>
        
        <div className="metricsGrid">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Tema</h3>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                <input type="radio" name="theme" defaultChecked className="text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium">Claro</div>
                  <div className="text-sm text-gray-600">Tema claro por defecto</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                <input type="radio" name="theme" className="text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium">Oscuro</div>
                  <div className="text-sm text-gray-600">Tema oscuro para observación</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                <input type="radio" name="theme" className="text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium">Automático</div>
                  <div className="text-sm text-gray-600">Se adapta al sistema</div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Idioma</h3>
            </div>
            
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Español</option>
              <option>English</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>Português</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-900">Configuración Avanzada</h3>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Modo de alto contraste</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Animaciones reducidas</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Auto-guardado</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Personalizado */}
      <div className="glass-card p-6 mb-8">
        <h2 className="sectionTitle flex items-center gap-2 mb-4">
          <Star className="sectionIcon" />
          Dashboard Personalizado
        </h2>
        <div className="metricsGrid">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Exoplanetas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Widgets de exoplanetas favoritos
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Configurar
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Clima Espacial</h3>
            <p className="text-sm text-gray-600 mb-4">
              Alertas de actividad solar
            </p>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Configurar
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Satellite className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Satélites</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tracking de satélites favoritos
            </p>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Configurar
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Asteroides</h3>
            <p className="text-sm text-gray-600 mb-4">
              Monitoreo de objetos cercanos
            </p>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Configurar
            </button>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Guardar Configuración
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Exportar Preferencias
              </button>
              <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Restaurar Predeterminados
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Sincronización</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Sincronizar con Nube
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Importar Configuración
              </button>
              <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Compartir Perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">¿Te Gusta tu Experiencia Personalizada?</h2>
        <p className="text-lg mb-6">Comparte tus configuraciones con otros usuarios y descubre nuevas personalizaciones</p>
        <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-gray-100">
          Compartir Configuración
        </button>
      </div>
    </div>
  )
} 