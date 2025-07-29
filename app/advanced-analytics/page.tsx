import React from 'react'
import { BarChart3, TrendingUp, PieChart, Activity, Database, Target, Users, Globe } from 'lucide-react'

export default function AdvancedAnalyticsPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Analítica Avanzada</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora análisis avanzados de datos espaciales, tendencias y visualizaciones interactivas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Métricas Principales */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Métricas en Tiempo Real</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
                <div className="text-sm text-blue-700">Usuarios Activos</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">89%</div>
                <div className="text-sm text-green-700">Tiempo Online</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">5.2K</div>
                <div className="text-sm text-purple-700">Consultas/día</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">12.4s</div>
                <div className="text-sm text-orange-700">Tiempo Respuesta</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold">Tendencias de Datos</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Consultas de Exoplanetas</h3>
                  <p className="text-sm text-gray-600">+23% vs mes anterior</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+23%</div>
                  <div className="text-sm text-gray-500">2.1K consultas</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Alertas de Clima Espacial</h3>
                  <p className="text-sm text-gray-600">+15% vs mes anterior</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+15%</div>
                  <div className="text-sm text-gray-500">156 alertas</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Visualizaciones 3D</h3>
                  <p className="text-sm text-gray-600">+8% vs mes anterior</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+8%</div>
                  <div className="text-sm text-gray-500">892 sesiones</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Distribución de Uso</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Exoplanetas</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Clima Espacial</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Satélites</span>
                <span className="font-medium">22%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Asteroides</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold">Alertas Activas</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-red-900">Tormenta Solar</div>
                  <div className="text-sm text-red-700">Hace 2 horas</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-yellow-900">Asteroides Cercanos</div>
                  <div className="text-sm text-yellow-700">Hace 4 horas</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-blue-900">Nuevo Exoplaneta</div>
                  <div className="text-sm text-blue-700">Hace 6 horas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis Detallado */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Análisis Detallado</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Análisis de Datos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Procesamiento avanzado de datos astronómicos con machine learning
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Precisión</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Datos Procesados</span>
                <span className="font-medium">2.1TB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tiempo Procesamiento</span>
                <span className="font-medium">1.2s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-900">Predicciones</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Modelos de IA para predecir eventos espaciales
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Precisión Predicciones</span>
                <span className="font-medium">87.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Eventos Predichos</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tiempo Anticipación</span>
                <span className="font-medium">24h</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Análisis de Usuarios</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Comportamiento y preferencias de los usuarios
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Usuarios Únicos</span>
                <span className="font-medium">12.4K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tiempo Promedio</span>
                <span className="font-medium">8.5 min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Retención</span>
                <span className="font-medium">76%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exportación y Reportes */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Exportación y Reportes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Generar Reportes</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Reporte Diario
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Reporte Semanal
              </button>
              <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Reporte Mensual
              </button>
              <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Reporte Personalizado
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Exportar Datos</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Exportar CSV
              </button>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Exportar PDF
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Exportar JSON
              </button>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                API Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">¿Necesitas Analytics Personalizados?</h2>
        <p className="text-lg mb-6">
          Nuestro equipo puede crear dashboards y reportes específicos para tus necesidades
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
          Contactar Equipo
        </button>
      </div>
    </div>
  )
} 