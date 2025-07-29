"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  Globe, 
  Microscope, 
  Settings, 
  BookOpen, 
  Search, 
  Star, 
  ChevronRight, 
  ChevronDown,
  HelpCircle,
  Info,
  User,
  Bell,
  Settings as SettingsIcon,
  Sun,
  Moon
} from 'lucide-react';

interface MobileNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  badge?: string;
  children?: MobileNavItem[];
}

const mobileNavItems: MobileNavItem[] = [
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
        icon: Globe,
        description: 'Monitorear objetos cercanos'
      },
      {
        name: 'Agujeros Negros',
        href: '/black-holes',
        icon: Globe,
        description: 'Estudiar singularidades'
      },
      {
        name: 'Supernovas',
        href: '/supernovae',
        icon: Globe,
        description: 'Explosiones estelares'
      },
      {
        name: 'Sismos en Tiempo Real',
        href: '/earthquakes',
        icon: Globe,
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
        icon: Microscope,
        description: 'Legado del divulgador científico',
        badge: 'Popular'
      },
      {
        name: 'Vera Rubin',
        href: '/vera-rubin',
        icon: Microscope,
        description: 'Materia oscura y galaxias'
      },
      {
        name: 'Educación',
        href: '/education',
        icon: Microscope,
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
        icon: Settings,
        description: 'Herramientas de cálculo'
      },
      {
        name: 'Simulaciones',
        href: '/simulations',
        icon: Settings,
        description: 'Simulaciones interactivas'
      },
      {
        name: 'Exportar Datos',
        href: '/data-export',
        icon: Settings,
        description: 'Descargar información'
      },
      {
        name: 'API',
        href: '/api',
        icon: Settings,
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
        icon: BookOpen,
        description: 'Contenido audiovisual'
      },
      {
        name: 'Biblioteca',
        href: '/library',
        icon: BookOpen,
        description: 'Libros y papers'
      },
      {
        name: 'Galería',
        href: '/gallery',
        icon: BookOpen,
        description: 'Imágenes del cosmos'
      }
    ]
  }
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(true);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm text-white border border-blue-500/30 hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Abrir menú de navegación"
      >
        <Menu size={20} />
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel del menú */}
          <div className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl text-white transform transition-transform duration-300 ease-out border-r border-blue-500/20 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header del menú */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 12a2 2 0 104 0 2 2 0 00-4 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold gradient-text">COSMIC DATA</h1>
                    <p className="text-xs text-gray-400">Enterprise Edition</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contenido del menú */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Búsqueda móvil */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar sección..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                </div>

                {/* Estado del sistema */}
                <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Sistema Operativo</span>
                  </div>
                  <span className="text-green-400 text-xs">En línea</span>
                </div>

                {/* Navegación */}
                <nav className="space-y-2">
                  {mobileNavItems.map((item) => (
                    <div key={item.name} className="border-b border-white/10 pb-2">
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleExpanded(item.name)}
                            className="flex items-center justify-between w-full p-3 text-left text-white hover:bg-white/5 rounded-lg transition-colors"
                            aria-expanded={expandedItems.includes(item.name)}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5" />
                              <div>
                                <span className="font-medium">{item.name}</span>
                                {item.description && (
                                  <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                                )}
                              </div>
                            </div>
                            {expandedItems.includes(item.name) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
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
                                  onClick={() => setIsOpen(false)}
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
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <div>
                            <span className="font-medium">{item.name}</span>
                            {item.description && (
                              <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                            )}
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Acciones rápidas */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">Acciones Rápidas</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/help"
                      className="flex items-center gap-2 p-3 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="text-sm">Ayuda</span>
                    </Link>
                    <Link
                      href="/faq"
                      className="flex items-center gap-2 p-3 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Info className="h-4 w-4" />
                      <span className="text-sm">FAQ</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 p-3 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <SettingsIcon className="h-4 w-4" />
                      <span className="text-sm">Ajustes</span>
                    </Link>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 p-3 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors"
                    >
                      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      <span className="text-sm">Tema</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer del menú */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Versión Enterprise</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400">Protegido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 