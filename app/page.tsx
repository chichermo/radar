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
  Search
} from 'lucide-react'

/* Definir un array de objetos TLE (mock) para el Globe */
const mockTLEObjects = [
  { TLE_LINE1: "1 25544U 98067A   20123.45678901  .00000000  00000-0  00000-0 0  9999", TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567", OBJECT_NAME: "ISS (ZARYA)" },
  /* Agrega más objetos si es necesario */
]

const sections = [
  {
    title: 'Visualización Orbital',
    description: 'Posición actual de satélites en tiempo real usando datos TLE',
    href: '/orbital',
    icon: GlobeIcon,
    color: 'bg-blue-500'
  },
  {
    title: 'Mapa del Cielo',
    description: 'Visualización de objetos espaciales como puntos en el cielo',
    href: '/skymap',
    icon: Map,
    color: 'bg-purple-500'
  },
  {
    title: 'Próximos Pasos',
    description: 'Próximos pasos satelitales sobre tu ubicación',
    href: '/passes',
    icon: Satellite,
    color: 'bg-green-500'
  },
  {
    title: 'Señales Detectadas',
    description: 'Monitoreo en tiempo real de señales anómalas',
    href: '/signals',
    icon: Radio,
    color: 'bg-red-500'
  },
  {
    title: 'NASA APOD',
    description: 'Imagen astronómica del día de la NASA',
    href: '/nasa-apod',
    icon: Sun,
    color: 'bg-yellow-500'
  },
  {
    title: 'Asteroides NEO',
    description: 'Objetos cercanos a la Tierra y alertas',
    href: '/neo',
    icon: AlertCircle,
    color: 'bg-orange-500'
  },
  {
    title: 'Clima Espacial',
    description: 'Condiciones actuales del clima espacial',
    href: '/space-weather',
    icon: Sun,
    color: 'bg-indigo-500'
  },
  {
    title: 'SETI',
    description: 'Datos de radioastronomía y búsqueda de señales',
    href: '/seti',
    icon: Search,
    color: 'bg-pink-500'
  },
  {
    title: 'Hallazgos Arqueológicos',
    description: 'Últimos descubrimientos arqueológicos verificados',
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
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Plataforma integral de monitoreo espacial y descubrimiento científico.
          Explora el cosmos, monitorea señales anómalas y descubre los últimos hallazgos.
        </p>
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
              <h2 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-200">{section.title}</h2>
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-200">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
