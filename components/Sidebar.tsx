"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Globe, 
  Map, 
  Satellite, 
  Radio, 
  Sun, 
  AlertCircle,
  Settings,
  Newspaper,
  Search,
  History,
  Home,
  Image as ImageIcon,
  AlertTriangle,
  FlaskConical,
  Moon,
  Bell,
  Rocket,
  Globe2,
  Layers,
  Radar,
  Cloud,
  Camera,
  Calendar,
  Info,
  HomeIcon,
  MapIcon,
  CalendarIcon,
  SignalIcon,
  SparklesIcon,
  SunIcon,
  TrashIcon,
  CogIcon,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Globe,
    description: 'Vista general del sistema'
  },
  {
    title: 'Visualización Orbital',
    href: '/orbital',
    icon: Globe,
    description: 'Posición de satélites en tiempo real'
  },
  {
    title: 'Mapa del Cielo',
    href: '/skymap',
    icon: Map,
    description: 'Visualización de objetos espaciales'
  },
  {
    title: 'Próximos Pasos',
    href: '/passes',
    icon: Satellite,
    description: 'Próximos pasos satelitales'
  },
  {
    title: 'Señales Detectadas',
    href: '/signals',
    icon: Radio,
    description: 'Monitoreo de señales anómalas'
  },
  {
    title: 'NASA APOD',
    href: '/nasa-apod',
    icon: ImageIcon,
    description: 'Imagen astronómica del día'
  },
  {
    title: 'Asteroides NEO',
    href: '/asteroids',
    icon: AlertCircle,
    description: 'Objetos cercanos a la Tierra'
  },
  {
    title: 'Clima Espacial',
    href: '/space-weather',
    icon: Sun,
    description: 'Condiciones del clima espacial'
  },
  {
    title: 'Basura Espacial',
    href: '/space-debris',
    icon: AlertTriangle,
    description: 'Objetos espaciales en órbita'
  },
  {
    title: 'SETI',
    href: '/seti',
    icon: Search,
    description: 'Datos de radioastronomía'
  },
  {
    title: 'Hallazgos Arqueológicos',
    href: '/archaeology',
    icon: History,
    description: 'Descubrimientos recientes'
  },
  {
    title: 'Configuración',
    href: '/settings',
    icon: Settings,
    description: 'Ajustes del sistema'
  },
  {
    title: 'James Webb',
    href: '/jwst',
    icon: Camera,
    description: 'Información sobre el Telescopio Espacial James Webb'
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8">Espacio Anomalías</h1>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 