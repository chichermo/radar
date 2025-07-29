import React from 'react'
import { Eye, Globe, Star, Satellite, Map, Compass, Camera, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VirtualExplorationPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Exploración Virtual</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora el universo desde la comodidad de tu hogar con experiencias VR, tours guiados y realidad aumentada.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Experiencias VR */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Experiencias VR</h2>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-4">
              <h3 className="font-medium text-white mb-2">Paseo por Marte</h3>
              <p className="text-sm text-gray-300 mb-3">
                Explora la superficie marciana con datos reales de las misiones
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">45 min</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700"><Play className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-medium text-white mb-2">Viaje Interestelar</h3>
              <p className="text-sm text-gray-300 mb-3">
                Navega entre estrellas y sistemas planetarios
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">90 min</span>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700"><Play className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-medium text-white mb-2">Estación Espacial</h3>
              <p className="text-sm text-gray-300 mb-3">
                Visita la ISS y experimenta la vida en el espacio
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">60 min</span>
                <Button size="sm" className="bg-green-600 hover:bg-green-700"><Play className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </div>
        {/* Tours Guiados */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Tours Guiados</h2>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-4">
              <h3 className="font-medium text-white mb-2">Sistema Solar</h3>
              <p className="text-sm text-gray-300 mb-3">
                Tour completo por todos los planetas y lunas
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">120 min</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Iniciar</Button>
              </div>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-medium text-white mb-2">Galaxias Lejanas</h3>
              <p className="text-sm text-gray-300 mb-3">
                Explora galaxias distantes y nebulosas
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">180 min</span>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">Iniciar</Button>
              </div>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-medium text-white mb-2">Agujeros Negros</h3>
              <p className="text-sm text-gray-300 mb-3">
                Experiencia inmersiva en torno a agujeros negros
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">75 min</span>
                <Button size="sm" className="bg-black hover:bg-gray-800 text-white">Iniciar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Experiencias Interactivas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">Experiencias Interactivas</h2>
        <div className="metricsGrid">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Fotografía Espacial</h3>
            <p className="text-sm text-gray-300 mb-4">
              Captura imágenes virtuales de objetos celestes
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Explorar</Button>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Satellite className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Control de Satélites</h3>
            <p className="text-sm text-gray-300 mb-4">
              Controla satélites virtuales en tiempo real
            </p>
            <Button className="bg-green-600 hover:bg-green-700">Explorar</Button>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Observatorio Virtual</h3>
            <p className="text-sm text-gray-300 mb-4">
              Usa telescopios virtuales para observar el cosmos
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">Explorar</Button>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Map className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Cartografía 3D</h3>
            <p className="text-sm text-gray-300 mb-4">
              Crea mapas 3D de regiones espaciales
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700">Explorar</Button>
          </div>
        </div>
      </div>
      {/* Realidad Aumentada */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">Realidad Aumentada</h2>
        <div className="metricsGrid">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Identificación de Estrellas</h3>
            <p className="text-gray-300 mb-4">
              Apunta tu dispositivo al cielo nocturno y obtén información en tiempo real sobre estrellas, 
              constelaciones y planetas visibles.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-white">Identificación automática de objetos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-white">Información detallada en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-white">Filtros por tipo de objeto</span>
              </div>
            </div>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Activar AR</Button>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Simulaciones Espaciales</h3>
            <p className="text-gray-300 mb-4">
              Visualiza fenómenos espaciales en tu entorno usando realidad aumentada.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm text-white">Simulación de eclipses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-white">Órbitas planetarias</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-white">Fases lunares</span>
              </div>
            </div>
            <Button className="mt-4 bg-green-600 hover:bg-green-700">Activar Simulaciones</Button>
          </div>
        </div>
      </div>
      {/* Estadísticas */}
      <div className="glass-card p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Experiencias Disponibles</h2>
        <div className="metricsGrid">
          <div>
            <div className="text-3xl font-bold mb-2 text-white">25+</div>
            <div className="text-sm opacity-90 text-gray-300">Experiencias VR</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2 text-white">15</div>
            <div className="text-sm opacity-90 text-gray-300">Tours Guiados</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2 text-white">50+</div>
            <div className="text-sm opacity-90 text-gray-300">Objetos Identificables</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2 text-white">10</div>
            <div className="text-sm opacity-90 text-gray-300">Simulaciones AR</div>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="glass-card p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-4 text-white">¿Listo para Explorar?</h2>
        <p className="text-lg mb-6 text-gray-300">Descarga la aplicación móvil para acceder a todas las experiencias de realidad virtual y aumentada</p>
        <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 font-semibold">Descargar App</Button>
      </div>
    </div>
  )
} 