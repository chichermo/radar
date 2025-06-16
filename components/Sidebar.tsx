"use client";
import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  Eye,
  Zap,
  Shield,
  BarChart3,
  Activity,
  Brain,
  MessageCircle,
  Star,
  Circle,
  Waves,
  SatelliteDish,
  Cpu,
  Network,
  Target,
  Lightbulb,
  Atom,
  Magnet,
  Radiation,
  Snowflake,
  TrendingUp,
  Tags,
  Building,
  Crown,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
  Database
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

// Componente wrapper para evitar errores de hidratación
const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient ? <>{children}</> : null;
};

// Menú reorganizado por categorías lógicas
const menuCategories = [
  {
    title: "Dashboard Principal",
    items: [
      {
        title: 'Panel de Control',
        href: '/',
        icon: Home,
        description: 'Vista general del sistema',
        badge: 'Principal'
      },
      {
        title: 'Métricas Avanzadas',
        href: '/metrics',
        icon: BarChart3,
        description: 'Análisis detallado de datos',
        badge: 'Pro'
      }
    ]
  },
  {
    title: "Inteligencia Artificial",
    items: [
      {
        title: 'Predicciones IA',
        href: '/ai-predictions',
        icon: Brain,
        description: 'Modelos predictivos avanzados',
        badge: 'Premium'
      },
      {
        title: 'Análisis de Patrones',
        href: '/pattern-analysis',
        icon: Target,
        description: 'Detección de anomalías',
        badge: 'Pro'
      },
      {
        title: 'Predicciones Climáticas',
        href: '/climate-predictions',
        icon: TrendingUp,
        description: 'Modelos avanzados',
        badge: 'Enterprise'
      },
      {
        title: 'Clasificación Automática',
        href: '/auto-classification',
        icon: Tags,
        description: 'Objetos celestes',
        badge: 'AI'
      },
      {
        title: 'Detección de Señales',
        href: '/signal-detection',
        icon: Search,
        description: 'SETI mejorado',
        badge: 'Premium'
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
        description: 'Posición de satélites en tiempo real',
        badge: 'Pro'
      },
      {
        title: 'Mapa del Cielo',
        href: '/skymap',
        icon: Map,
        description: 'Visualización de objetos espaciales',
        badge: 'Pro'
      },
      {
        title: 'James Webb',
        href: '/jwst',
        icon: Camera,
        description: 'Telescopio Espacial James Webb',
        badge: 'NASA'
      },
      {
        title: 'Vera C. Rubin',
        href: '/vera-rubin',
        icon: Camera,
        description: 'Legacy Survey of Space and Time (LSST)',
        badge: 'Nuevo'
      }
    ]
  },
  {
    title: "Exploración y Descubrimientos",
    items: [
      {
        title: 'Exoplanetas',
        href: '/exoplanets',
        icon: Circle,
        description: 'Planetas fuera del sistema solar',
        badge: 'Pro'
      },
      {
        title: 'Agujeros Negros',
        href: '/black-holes',
        icon: Circle,
        description: 'Monitoreo de eventos y descubrimientos',
        badge: 'Premium'
      },
      {
        title: 'Ondas Gravitacionales',
        href: '/gravitational-waves',
        icon: Waves,
        description: 'Detecciones de LIGO/Virgo',
        badge: 'Premium'
      },
      {
        title: 'Materia Oscura',
        href: '/dark-matter',
        icon: Atom,
        description: 'Investigaciones y experimentos',
        badge: 'Enterprise'
      },
      {
        title: 'Neutrinos Cósmicos',
        href: '/neutrinos',
        icon: Snowflake,
        description: 'Detecciones de IceCube',
        badge: 'Enterprise'
      }
    ]
  },
  {
    title: "Tecnología Espacial",
    items: [
      {
        title: 'Starlink Tracker',
        href: '/starlink',
        icon: Satellite,
        description: 'Seguimiento de constelaciones',
        badge: 'Pro'
      },
      {
        title: 'Estación Espacial China',
        href: '/tiangong',
        icon: Building,
        description: 'Tiangong - Estación espacial china',
        badge: 'Pro'
      },
      {
        title: 'Misiones a Marte',
        href: '/mars-missions',
        icon: Circle,
        description: 'Perseverance, Curiosity, etc.',
        badge: 'NASA'
      },
      {
        title: 'Sondas Interestelares',
        href: '/interstellar-probes',
        icon: Rocket,
        description: 'Voyager, New Horizons',
        badge: 'Premium'
      },
      {
        title: 'Cohetes Reutilizables',
        href: '/reusable-rockets',
        icon: Rocket,
        description: 'SpaceX, Blue Origin',
        badge: 'Pro'
      }
    ]
  },
  {
    title: "Fenómenos Espaciales",
    items: [
      {
        title: 'Clima Espacial',
        href: '/space-weather',
        icon: Sun,
        description: 'Tormentas solares y actividad',
        badge: 'Pro'
      },
      {
        title: 'Asteroides',
        href: '/asteroids',
        icon: Circle,
        description: 'Objetos cercanos a la Tierra',
        badge: 'Pro'
      },
      {
        title: 'Basura Espacial',
        href: '/space-debris',
        icon: Circle,
        description: 'Seguimiento de desechos',
        badge: 'Pro'
      },
      {
        title: 'Supernovas',
        href: '/supernovae',
        icon: Star,
        description: 'Explosiones estelares',
        badge: 'Premium'
      }
    ]
  },
  {
    title: "Monitoreo Terrestre",
    items: [
      {
        title: 'Monitoreo de Sismos',
        href: '/earthquakes',
        icon: Activity,
        description: 'Terremotos y actividad sísmica',
        badge: 'Pro'
      }
    ]
  },
  {
    title: "Integración Global",
    items: [
      {
        title: 'APIs Múltiples',
        href: '/global-integration',
        icon: Database,
        description: 'NASA, ESA, JAXA, Roscosmos',
        badge: 'Enterprise'
      }
    ]
  },
  {
    title: "Comunidad e Interacción",
    items: [
      {
        title: 'Chat Interactivo',
        href: '/chat',
        icon: MessageCircle,
        description: 'Comunidad y sugerencias',
        badge: 'Beta'
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
        description: 'Imagen astronómica del día',
        badge: 'NASA'
      },
      {
        title: 'SETI',
        href: '/seti',
        icon: Search,
        description: 'Búsqueda de inteligencia extraterrestre',
        badge: 'SETI'
      },
      {
        title: 'Hallazgos Arqueológicos',
        href: '/archaeology',
        icon: History,
        description: 'Descubrimientos recientes',
        badge: 'Nuevo'
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
        description: 'Ajustes del sistema',
        badge: 'Admin'
      }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [objectCount, setObjectCount] = useState<number | null>(null);
  const [systemStatus, setSystemStatus] = useState('Operativo');
  const [uptime, setUptime] = useState('99.9%');

  useEffect(() => {
    // Solo generar el número aleatorio en el cliente para evitar errores de hidratación
    setObjectCount(Math.floor(Math.random() * 1000) + 500);
  }, []);

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'enterprise': return 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white';
      case 'pro': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'ai': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'beta': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black';
      case 'nuevo': return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white';
      case 'nasa': return 'bg-gradient-to-r from-red-600 to-blue-600 text-white';
      case 'seti': return 'bg-gradient-to-r from-green-600 to-blue-600 text-white';
      case 'admin': return 'bg-gradient-to-r from-gray-600 to-gray-800 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <>
      {/* Botón de menú móvil mejorado */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm text-white border border-blue-500/30 hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar mejorado */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl text-white transform transition-all duration-500 ease-out z-40
        border-r border-blue-500/20 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Header mejorado */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <img 
                  src="/logorad.png" 
                  alt="Cosmic Eye Logo" 
                  className="w-10 h-10 rounded-xl shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  COSMIC EYE
                </h1>
                <p className="text-xs text-gray-400 font-medium">Enterprise Edition</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sistema {systemStatus}</span>
              <span>•</span>
              <span>Uptime: {uptime}</span>
            </div>
          </div>

          {/* Navegación por categorías scrollable */}
          <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {menuCategories.map((category) => (
              <div key={category.title} className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center">
                  <Sparkles className="h-3 w-3 mr-2 text-blue-400" />
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
                          group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-200 border border-blue-500/40 shadow-lg' 
                            : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-blue-800/30 hover:text-white hover:border-gray-600/30 border border-transparent'
                          }
                        `}
                        onClick={() => setIsOpen(false)}
                      >
                        {/* Efecto de brillo en hover */}
                        <div className={`
                          absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-purple-500/0 
                          transition-all duration-500 transform -skew-x-12 -translate-x-full
                          ${isActive ? 'translate-x-0' : 'group-hover:translate-x-full'}
                        `}></div>
                        
                        <div className={`
                          p-2 rounded-lg mr-3 transition-all duration-300 relative z-10
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 text-blue-300 shadow-lg' 
                            : 'bg-gray-700/50 text-gray-400 group-hover:bg-gradient-to-r group-hover:from-blue-600/30 group-hover:to-purple-600/30 group-hover:text-blue-300'
                          }
                        `}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 relative z-10">
                          <div className="flex items-center justify-between">
                            <span>{item.title}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getBadgeColor(item.badge)}`}>
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                        
                        {isActive && (
                          <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        )}
                        
                        <ChevronRight className={`
                          h-4 w-4 ml-2 transition-transform duration-300 relative z-10
                          ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}
                        `} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer con información adicional */}
          <div className="mt-6 pt-4 border-t border-blue-500/20">
            {/* Selector de idioma */}
            <div className="mb-4">
              <LanguageSelector />
            </div>
            
            <ClientWrapper>
              <div className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 rounded-xl p-4 border border-blue-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-300">Estado del Sistema</span>
                  </div>
                  <Crown className="h-4 w-4 text-yellow-400" />
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Objetos monitoreados:</span>
                    <span className="text-blue-300 font-semibold">{objectCount !== null ? objectCount.toLocaleString() : '...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Algoritmos activos:</span>
                    <span className="text-green-300 font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Anomalías detectadas:</span>
                    <span className="text-red-300 font-semibold">23</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-600/30">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Versión Enterprise</span>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-green-400" />
                      <span className="text-green-400">Protegido</span>
                    </div>
                  </div>
                </div>
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