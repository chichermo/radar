"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ClientWrapper from './ClientWrapper';
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
  X,
  Eye,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';

// Menú reorganizado por categorías lógicas
const menuCategories = [
  {
    title: "Vista General",
    items: [
      {
        title: 'Dashboard',
        href: '/',
        icon: Home,
        description: 'Vista general del sistema'
      },
      {
        title: 'Métricas Históricas',
        href: '/metrics',
        icon: BarChart3,
        description: 'Análisis de datos históricos'
      }
    ]
  },
  {
    title: "Visualización Espacial",
    items: [
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
        title: 'James Webb',
        href: '/jwst',
        icon: Camera,
        description: 'Telescopio Espacial James Webb'
      }
    ]
  },
  {
    title: "Monitoreo en Tiempo Real",
    items: [
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
        title: 'Clima Espacial',
        href: '/space-weather',
        icon: Sun,
        description: 'Condiciones del clima espacial'
      }
    ]
  },
  {
    title: "Amenazas y Riesgos",
    items: [
      {
        title: 'Asteroides NEO',
        href: '/asteroids',
        icon: AlertCircle,
        description: 'Objetos cercanos a la Tierra'
      },
      {
        title: 'Basura Espacial',
        href: '/space-debris',
        icon: AlertTriangle,
        description: 'Objetos espaciales en órbita'
      }
    ]
  },
  {
    title: "Investigación y Descubrimientos",
    items: [
      {
        title: 'NASA APOD',
        href: '/nasa-apod',
        icon: ImageIcon,
        description: 'Imagen astronómica del día'
      },
      {
        title: 'SETI',
        href: '/seti',
        icon: Search,
        description: 'Búsqueda de inteligencia extraterrestre'
      },
      {
        title: 'Hallazgos Arqueológicos',
        href: '/archaeology',
        icon: History,
        description: 'Descubrimientos recientes'
      }
    ]
  },
  {
    title: "Configuración",
    items: [
      {
        title: 'Configuración',
        href: '/settings',
        icon: Settings,
        description: 'Ajustes del sistema'
      }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [objectCount, setObjectCount] = useState<number | null>(null);

  useEffect(() => {
    // Solo generar el número aleatorio en el cliente para evitar errores de hidratación
    setObjectCount(Math.floor(Math.random() * 1000) + 500);
  }, []);

  return (
    <>
      {/* Botón de menú móvil mejorado */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gray-800/90 backdrop-blur-sm text-white border border-gray-700 hover:bg-gray-700/90 transition-all duration-200 shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar mejorado */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-gray-900/95 backdrop-blur-sm text-white transform transition-all duration-300 ease-in-out z-40
        border-r border-gray-700/50 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header mejorado */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <img 
                src="/logorad.png" 
                alt="Cosmic Eye Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                COSMIC EYE
              </h1>
            </div>
            <p className="text-gray-400 text-sm">Monitoreo de anomalías espaciales</p>
          </div>

          {/* Navegación por categorías */}
          <nav className="space-y-6">
            {menuCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`
                          group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30 shadow-lg' 
                            : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/30 border border-transparent'
                          }
                        `}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={`
                          p-1.5 rounded-lg mr-3 transition-all duration-200
                          ${isActive 
                            ? 'bg-blue-600/20 text-blue-400' 
                            : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300'
                          }
                        `}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="flex-1">{item.title}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer con información adicional */}
          <div className="absolute bottom-6 left-6 right-6">
            <ClientWrapper>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Sistema Activo</span>
                </div>
                <p className="text-xs text-gray-500">
                  Monitoreando {objectCount !== null ? objectCount : '...'} objetos espaciales
                </p>
              </div>
            </ClientWrapper>
          </div>
        </div>
      </div>

      {/* Overlay mejorado para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 