'use client'
import Dashboard from '@/components/Dashboard'
import Globe from '@/components/Globe'
import Link from 'next/link'
import { 
  Globe as GlobeIcon, 
  Map, 
  Satellite, 
  Radio, 
  Sun, 
  AlertCircle,
  Settings,
  History,
  Search,
  Camera,
  ArrowRight,
  Sparkles,
  BarChart3,
  Download,
  Bell
} from 'lucide-react'
import { menuCategories } from '@/components/Sidebar'
import { VoiceCommands } from '@/components/VoiceCommands';
import { AIPredictionsPanel } from '@/components/AIPredictions';
import { AchievementsPanel } from '@/components/GamificationSystem';
import { useNotifications } from '@/components/NotificationService';

/* Definir un array de objetos TLE (mock) para el Globe */
const mockTLEObjects = [
  { TLE_LINE1: "1 25544U 98067A   20123.45678901  .00000000  00000-0  00000-0 0  9999", TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567", OBJECT_NAME: "ISS (ZARYA)" },
  /* Agrega más objetos si es necesario */
]

const sections = [
  {
    title: 'Visualización Orbital',
    description: 'Observa en tiempo real dónde están los satélites alrededor de la Tierra. Como un GPS cósmico que te muestra la posición exacta de cada nave espacial.',
    href: '/orbital',
    icon: GlobeIcon,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    title: 'Mapa del Cielo',
    description: 'Explora el cielo como un astrónomo. Ve asteroides, satélites y otros objetos espaciales representados como puntos brillantes en un mapa interactivo.',
    href: '/skymap',
    icon: Map,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    title: 'Telescopio James Webb',
    description: 'Descubre las increíbles imágenes del telescopio más poderoso del mundo. Ve galaxias lejanas, nebulosas y exoplanetas como nunca antes.',
    href: '/jwst',
    icon: Camera,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  {
    title: 'Próximos Pasos',
    description: '¿Cuándo pasará la Estación Espacial Internacional sobre tu casa? Descubre cuándo y dónde mirar para ver satélites a simple vista.',
    href: '/passes',
    icon: Satellite,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  {
    title: 'Señales Detectadas',
    description: 'Monitorea señales de radio misteriosas del espacio. ¿Será una estrella pulsante, una galaxia distante o algo más extraordinario?',
    href: '/signals',
    icon: Radio,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  {
    title: 'NASA APOD',
    description: 'Cada día, una nueva imagen asombrosa del universo. Desde nebulosas coloridas hasta galaxias en colisión, descubre la belleza del cosmos.',
    href: '/nasa-apod',
    icon: Sun,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20'
  },
  {
    title: 'Asteroides NEO',
    description: 'Vigila rocas espaciales que se acercan a la Tierra. Aprende sobre asteroides potencialmente peligrosos y cómo los científicos los monitorean.',
    href: '/asteroids',
    icon: AlertCircle,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  {
    title: 'Clima Espacial',
    description: '¿Cómo está el clima en el espacio? Monitorea tormentas solares, auroras boreales y eventos que pueden afectar satélites y comunicaciones.',
    href: '/space-weather',
    icon: Sun,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  {
    title: 'SETI - Búsqueda de Vida',
    description: '¿Estamos solos en el universo? Explora señales misteriosas y anomalías que podrían ser evidencia de civilizaciones extraterrestres.',
    href: '/seti',
    icon: Search,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20'
  },
  {
    title: 'Hallazgos Arqueológicos',
    description: 'Descubre artefactos antiguos y misterios arqueológicos que desafían nuestra comprensión de la historia humana y civilizaciones perdidas.',
    href: '/archaeology',
    icon: History,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header mejorado */}
      <div className="relative overflow-hidden">
        {/* Fondo con estrellas animadas */}
        <div className="absolute inset-0 opacity-20">
          <div className="stars"></div>
        </div>
        
        <div className="relative z-10 text-center py-16 px-6">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/logorad.png" 
              alt="Cosmic Eye Logo" 
              className="w-16 h-16 rounded-2xl shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            COSMIC EYE
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Plataforma de monitoreo en tiempo real de objetos espaciales y señales anómalas. 
            Explora el cosmos desde la comodidad de tu pantalla.
          </p>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">1,247</div>
              <div className="text-sm text-gray-400">Objetos Rastreados</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="text-sm text-gray-400">Monitoreo Activo</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400">156</div>
              <div className="text-sm text-gray-400">Alertas Hoy</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Precisión</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secciones principales usando menuCategories */}
      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        {menuCategories.map((category) => (
          <section key={category.title}>
            <h2 className="text-2xl font-semibold mb-4 text-primary-light">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-8 transition-all duration-300 hover:scale-105 hover:border-gray-600/50 hover:bg-gray-800/70 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      <span className="text-sm font-medium">Explorar</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Footer con información adicional */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">¿Listo para explorar el cosmos?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Nuestro sistema de monitoreo espacial te mantiene informado sobre todo lo que sucede en el espacio exterior. 
                Desde satélites hasta asteroides, nunca te perderás nada importante.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Sistema Activo</span>
                </div>
                <div className="text-gray-500">•</div>
                <div className="text-gray-400 text-sm">Última actualización: hace 2 minutos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
