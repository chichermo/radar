import React from 'react'
import { Users, Share2, MessageCircle, Heart, Star, Globe, Camera, Award } from 'lucide-react'

export default function SocialIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Integración Social</h1>
          <p className="text-xl text-gray-600">
            Conecta con otros entusiastas del espacio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comunidad */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">Comunidad COSMIC DATA</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">12.4K</div>
                  <div className="text-sm text-blue-700">Miembros</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">1.2K</div>
                  <div className="text-sm text-green-700">Discusiones</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">5.6K</div>
                  <div className="text-sm text-purple-700">Fotos Compartidas</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">MJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">María José</span>
                        <span className="text-sm text-gray-500">hace 2 horas</span>
                      </div>
                      <p className="text-gray-700 mb-2">
                        ¡Acabo de observar Júpiter con mi telescopio! Las bandas atmosféricas eran increíbles. 
                        ¿Alguien más lo vio esta noche?
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <Heart className="w-4 h-4" />
                          <span>24</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>8</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600">
                          <Share2 className="w-4 h-4" />
                          <span>Compartir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">CA</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Carlos Astronauta</span>
                        <span className="text-sm text-gray-500">hace 4 horas</span>
                      </div>
                      <p className="text-gray-700 mb-2">
                        Nuevo descubrimiento de exoplaneta confirmado por el equipo de COSMIC DATA. 
                        ¡K2-18b muestra signos prometedores de habitabilidad!
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <Heart className="w-4 h-4" />
                          <span>156</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>32</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600">
                          <Share2 className="w-4 h-4" />
                          <span>Compartir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-semibold">Logros</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-900">Primer Observador</div>
                    <div className="text-sm text-yellow-700">Observaste 10 objetos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">Fotógrafo Espacial</div>
                    <div className="text-sm text-blue-700">Compartiste 5 fotos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-900">Comunicador</div>
                    <div className="text-sm text-green-700">Participaste en 20 discusiones</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold">Eventos Próximos</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900">Observación Lunar</div>
                  <div className="text-sm text-gray-600">Mañana, 20:00 UTC</div>
                  <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    Unirse
                  </button>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900">Webinar: Exoplanetas</div>
                  <div className="text-sm text-gray-600">Sábado, 15:00 UTC</div>
                  <button className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                    Unirse
                  </button>
                </div>

                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="font-medium text-gray-900">Charla: Clima Espacial</div>
                  <div className="text-sm text-gray-600">Domingo, 18:00 UTC</div>
                  <button className="mt-2 px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                    Unirse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Funciones Sociales */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Funciones Sociales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compartir Fotos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Comparte tus observaciones astronómicas
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Subir Foto
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Foros</h3>
              <p className="text-sm text-gray-600 mb-4">
                Participa en discusiones especializadas
              </p>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Ver Foros
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grupos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Únete a grupos por intereses
              </p>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Explorar Grupos
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Logros</h3>
              <p className="text-sm text-gray-600 mb-4">
                Desbloquea logros y insignias
              </p>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Ver Logros
              </button>
            </div>
          </div>
        </div>

        {/* Integración con Redes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Integración con Redes Sociales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Compartir en Redes</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <span>Compartir en Facebook</span>
                </button>
                <button className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 flex items-center justify-center gap-2">
                  <span>Compartir en Twitter</span>
                </button>
                <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center justify-center gap-2">
                  <span>Compartir en Instagram</span>
                </button>
                <button className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 flex items-center justify-center gap-2">
                  <span>Compartir en LinkedIn</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Configuración de Privacidad</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Perfil público</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Mostrar observaciones</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Mostrar ubicación</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Recibir notificaciones</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">¿Listo para Conectar?</h2>
          <p className="text-lg mb-6">
            Únete a nuestra comunidad de entusiastas del espacio y comparte tus descubrimientos
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
            Unirse a la Comunidad
          </button>
        </div>
      </div>
    </div>
  )
} 