"use client";
import React, { useState, useEffect } from 'react';
import { Bell, Menu, Moon, Settings, Sun, Search, User, LogOut, Globe, X, ChevronDown, ChevronUp, Home, Microscope, BookOpen, Play, BarChart, Code, Image as ImageIcon, Video, Brain, Atom, GraduationCap, Star, Eye, Sparkles, Download, Book, Activity, ChevronRight, HelpCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotificationBell, useNotifications } from './NotificationService';
import { useGamification } from './GamificationSystem';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Vista general del sistema'
  },
  {
    name: 'Exploración',
    href: '#',
    icon: Globe,
    description: 'Explorar el cosmos',
    children: [
      {
        name: 'Exoplanetas',
        href: '/exoplanets',
        icon: Globe,
        description: 'Descubrir planetas extrasolares',
        badge: 'Nuevo'
      },
      {
        name: 'Asteroides',
        href: '/asteroids',
        icon: Star,
        description: 'Monitorear objetos cercanos'
      },
      {
        name: 'Agujeros Negros',
        href: '/black-holes',
        icon: Eye,
        description: 'Estudiar singularidades'
      },
      {
        name: 'Supernovas',
        href: '/supernovae',
        icon: Sparkles,
        description: 'Explosiones estelares'
      },
      {
        name: 'Sismos en Tiempo Real',
        href: '/earthquakes',
        icon: Activity,
        description: 'Actividad sísmica global'
      }
    ]
  },
  {
    name: 'Ciencia',
    href: '#',
    icon: Microscope,
    description: 'Investigación científica',
    children: [
      {
        name: 'Carl Sagan',
        href: '/carl-sagan',
        icon: Brain,
        description: 'Legado del divulgador científico',
        badge: 'Popular'
      },
      {
        name: 'Vera Rubin',
        href: '/vera-rubin',
        icon: Atom,
        description: 'Materia oscura y galaxias'
      },
      {
        name: 'Educación',
        href: '/education',
        icon: GraduationCap,
        description: 'Recursos educativos'
      }
    ]
  },
  {
    name: 'Herramientas',
    href: '#',
    icon: Settings,
    description: 'Utilidades y calculadoras',
    children: [
      {
        name: 'Calculadoras',
        href: '/tools',
        icon: BarChart,
        description: 'Herramientas de cálculo'
      },
      {
        name: 'Simulaciones',
        href: '/simulations',
        icon: Play,
        description: 'Simulaciones interactivas'
      },
      {
        name: 'Exportar Datos',
        href: '/data-export',
        icon: Download,
        description: 'Descargar información'
      },
      {
        name: 'API',
        href: '/api',
        icon: Code,
        description: 'Interfaz de programación'
      }
    ]
  },
  {
    name: 'Recursos',
    href: '#',
    icon: BookOpen,
    description: 'Material educativo',
    children: [
      {
        name: 'Documentales',
        href: '/documentaries',
        icon: Video,
        description: 'Contenido audiovisual'
      },
      {
        name: 'Biblioteca',
        href: '/library',
        icon: Book,
        description: 'Libros y papers'
      },
      {
        name: 'Galería',
        href: '/gallery',
        icon: ImageIcon,
        description: 'Imágenes del cosmos'
      }
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { addNotification } = useNotifications();
  const { addExperience } = useGamification();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Obtener notificaciones reales
  useEffect(() => {
    const fetchRealNotifications = async () => {
      try {
        // Obtener datos reales de múltiples fuentes
        const [asteroidResponse, spaceWeatherResponse] = await Promise.allSettled([
          fetch('/api/nasa-asteroids'),
          fetch('/api/space-weather')
        ]);

        // Procesar notificaciones de asteroides peligrosos
        if (asteroidResponse.status === 'fulfilled') {
          const asteroidData = await asteroidResponse.value.json();
          if (asteroidData.success && asteroidData.data) {
            const hazardousAsteroids = Object.values(asteroidData.data.near_earth_objects || {})
              .flat()
              .filter((asteroid: any) => asteroid.is_potentially_hazardous_asteroid);
            
            if (hazardousAsteroids.length > 0) {
              addNotification({
                type: 'warning',
                title: 'Asteroides Cercanos',
                message: `${hazardousAsteroids.length} asteroides potencialmente peligrosos detectados`
              });
              addExperience(10);
            }
          }
        }

        // Procesar notificaciones de clima espacial
        if (spaceWeatherResponse.status === 'fulfilled') {
          const weatherData = await spaceWeatherResponse.value.json();
          if (weatherData.success && weatherData.data) {
            if (weatherData.data.kp && weatherData.data.kp.length > 0) {
              const latestKp = weatherData.data.kp[0];
              if (latestKp.kp_index >= 5) {
                addNotification({
                  type: 'warning',
                  title: 'Alerta de Clima Espacial',
                  message: `Tormenta geomagnética detectada - Índice Kp: ${latestKp.kp_index}`
                });
                addExperience(15);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching real notifications:', error);
      }
    };

    fetchRealNotifications();
    
    // Actualizar notificaciones cada 30 minutos
    const interval = setInterval(fetchRealNotifications, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [addNotification, addExperience]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addNotification({
        type: 'info',
        title: 'Búsqueda',
        message: `Buscando: ${searchQuery}`
      });
      addExperience(5);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    addNotification({
      type: 'info',
      title: 'Tema Cambiado',
      message: `Cambiado a modo ${!isDark ? 'oscuro' : 'claro'}`
    });
    addExperience(3);
  };

  return (
    <>
      {/* Navegación principal */}
      <div className="glass-nav fixed top-0 left-0 right-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 104 0 2 2 0 00-4 0z" />
                </svg>
              </div>
              <Link href="/" className="text-lg sm:text-xl font-bold gradient-text">
                Espacio Anomalías
              </Link>
            </div>

            {/* Navegación central - Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={`nav-item flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive(item.href) ? 'bg-blue-500/20 text-blue-400' : 'text-white hover:text-blue-400'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        {expandedItems.includes(item.name) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {/* Dropdown */}
                      {expandedItems.includes(item.name) && (
                        <div className="absolute top-full left-0 mt-2 w-80 glass-card border border-white/10 rounded-lg shadow-xl z-50">
                          <div className="p-4">
                            <div className="grid grid-cols-1 gap-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/5 ${
                                    isActive(child.href) ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'
                                  }`}
                                >
                                  <child.icon className="w-5 h-5" />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium">{child.name}</span>
                                      {child.badge && (
                                        <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                          {child.badge}
                                        </span>
                                      )}
                                    </div>
                                    {child.description && (
                                      <p className="text-xs text-gray-400 mt-1">{child.description}</p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`nav-item flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive(item.href) ? 'bg-blue-500/20 text-blue-400' : 'text-white hover:text-blue-400'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Acciones del usuario */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Búsqueda - Solo desktop */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-700/50 rounded-xl px-3 py-1.5 border border-gray-600/50">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none w-48 lg:w-64"
                />
              </div>

              {/* Indicador de estado del sistema - Solo desktop */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">En línea</span>
              </div>

              {/* Notificaciones */}
              <NotificationBell />

              {/* Tema */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Configuración */}
              <Link
                href="/settings"
                className={`p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                  pathname === '/settings' 
                    ? 'text-blue-400 bg-blue-900/20 border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Settings className="h-5 w-5" />
              </Link>

              {/* Perfil de usuario */}
              <button
                type="button"
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Menú móvil */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil mejorado */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 glass-card border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {/* Búsqueda móvil */}
            <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl px-3 py-2 border border-gray-600/50">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none flex-1"
              />
            </div>

            {/* Estado del sistema móvil */}
            <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Sistema Operativo</span>
              </div>
              <span className="text-green-400 text-xs">En línea</span>
            </div>

            {/* Navegación móvil */}
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="border-b border-white/10 pb-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className="flex items-center justify-between w-full p-3 text-left text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {expandedItems.includes(item.name) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      
                      {expandedItems.includes(item.name) && (
                        <div className="ml-6 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                isActive(child.href) ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-white/5'
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <child.icon className="w-4 h-4" />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm">{child.name}</span>
                                  {child.badge && (
                                    <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                {child.description && (
                                  <p className="text-xs text-gray-400 mt-1">{child.description}</p>
                                )}
                              </div>
                              <ChevronRight className="w-3 h-3 text-gray-500" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive(item.href) ? 'bg-blue-500/20 text-blue-400' : 'text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-500" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Acciones rápidas móviles */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/help"
                  className="flex items-center gap-2 p-3 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="text-sm">Ayuda</span>
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 p-3 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="h-4 w-4" />
                  <span className="text-sm">FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para cerrar menú móvil */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
} 