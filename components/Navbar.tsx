"use client";
import { Bell, Menu, Moon, Settings, Sun, Search, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Agregar o remover la clase que controla la visibilidad del sidebar
    document.querySelector('main')?.classList.toggle('ml-64');
    document.querySelector('aside')?.classList.toggle('hidden');
  };

  return (
    <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 fixed w-full z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Lado izquierdo */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Barra de búsqueda */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-700/50 rounded-xl px-3 py-1.5 border border-gray-600/50">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar objetos espaciales..."
                className="bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none w-64"
              />
            </div>
          </div>

          {/* Centro - Título */}
          <div className="flex-1 flex justify-center lg:justify-start lg:ml-8">
            <div className="flex items-center space-x-3">
              <img 
                src="/logorad.png" 
                alt="Cosmic Eye Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-lg font-semibold text-white hidden sm:block">
                COSMIC EYE
              </h1>
            </div>
          </div>

          {/* Lado derecho - Acciones */}
          <div className="flex items-center space-x-2">
            {/* Indicador de estado del sistema */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Online</span>
            </div>

            {/* Notificaciones */}
            <button
              type="button"
              className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </button>

            {/* Tema */}
            <button
              type="button"
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <Sun className="h-5 w-5" />
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
          </div>
        </div>
      </div>
    </nav>
  );
} 