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
  Camera
} from 'lucide-react'

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
    color: 'bg-blue-500'
  },
  {
    title: 'Mapa del Cielo',
    description: 'Explora el cielo como un astrónomo. Ve asteroides, satélites y otros objetos espaciales representados como puntos brillantes en un mapa interactivo.',
    href: '/skymap',
    icon: Map,
    color: 'bg-purple-500'
  },
  {
    title: 'Telescopio James Webb',
    description: 'Descubre las increíbles imágenes del telescopio más poderoso del mundo. Ve galaxias lejanas, nebulosas y exoplanetas como nunca antes.',
    href: '/jwst',
    icon: Camera,
    color: 'bg-indigo-500'
  },
  {
    title: 'Próximos Pasos',
    description: '¿Cuándo pasará la Estación Espacial Internacional sobre tu casa? Descubre cuándo y dónde mirar para ver satélites a simple vista.',
    href: '/passes',
    icon: Satellite,
    color: 'bg-green-500'
  },
  {
    title: 'Señales Detectadas',
    description: 'Monitorea señales de radio misteriosas del espacio. ¿Será una estrella pulsante, una galaxia distante o algo más extraordinario?',
    href: '/signals',
    icon: Radio,
    color: 'bg-red-500'
  },
  {
    title: 'NASA APOD',
    description: 'Cada día, una nueva imagen asombrosa del universo. Desde nebulosas coloridas hasta galaxias en colisión, descubre la belleza del cosmos.',
    href: '/nasa-apod',
    icon: Sun,
    color: 'bg-yellow-500'
  },
  {
    title: 'Asteroides NEO',
    description: 'Vigila rocas espaciales que se acercan a la Tierra. Aprende sobre asteroides potencialmente peligrosos y cómo los científicos los monitorean.',
    href: '/asteroids',
    icon: AlertCircle,
    color: 'bg-orange-500'
  },
  {
    title: 'Clima Espacial',
    description: '¿Cómo está el clima en el espacio? Monitorea tormentas solares, auroras boreales y eventos que pueden afectar satélites y comunicaciones.',
    href: '/space-weather',
    icon: Sun,
    color: 'bg-indigo-500'
  },
  {
    title: 'SETI - Búsqueda de Vida',
    description: '¿Estamos solos en el universo? Explora señales misteriosas y anomalías que podrían ser evidencia de civilizaciones extraterrestres.',
    href: '/seti',
    icon: Search,
    color: 'bg-pink-500'
  },
  {
    title: 'Hallazgos Arqueológicos',
    description: 'Descubre artefactos antiguos y misterios arqueológicos que desafían nuestra comprensión de la historia humana y civilizaciones perdidas.',
    href: '/archaeology',
    icon: History,
    color: 'bg-teal-500'
  }
]

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-10 ml-64">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Radar de Anomalías Espaciales
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Bienvenido a tu ventana al cosmos. Esta plataforma te permite explorar el universo, 
          monitorear señales misteriosas del espacio y descubrir los últimos hallazgos científicos. 
          Desde satélites en órbita hasta posibles señales de vida extraterrestre, aquí encontrarás 
          todo lo que necesitas para convertirte en un explorador espacial desde tu computadora.
        </p>
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg max-w-2xl mx-auto">
          <p className="text-blue-200 text-sm">
            💡 <strong>Consejo:</strong> Haz clic en cualquier sección para explorar. Cada una te 
            explicará en términos simples qué estás viendo y por qué es importante.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className={`flex flex-col items-start justify-between rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-200 shadow-sm hover:shadow-2xl hover:scale-[1.04] hover:border-primary hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 group focus:outline-none focus:ring-2 focus:ring-primary/60`}
          >
            <div className={`rounded-full p-2 mb-4 text-white bg-opacity-80 ${section.color} group-hover:scale-110 transition-transform duration-200`}>
              <section.icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">{section.title}</h2>
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-200 leading-relaxed">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">¿Cómo usar esta plataforma?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Para Principiantes</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Empieza con "NASA APOD" para ver imágenes hermosas</li>
              <li>• Explora "Mapa del Cielo" para entender qué hay arriba</li>
              <li>• Revisa "Próximos Pasos" para ver satélites desde tu casa</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Para Exploradores</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Sumérgete en "SETI" para buscar vida extraterrestre</li>
              <li>• Analiza "Señales Detectadas" para encontrar anomalías</li>
              <li>• Estudia "Asteroides NEO" para entender amenazas espaciales</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
