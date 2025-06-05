"use client";
import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react';
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
    <nav className="bg-gray-800 border-b border-gray-700 fixed w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4">
              <h1 className="text-white font-semibold">Radar Espacial</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Sun className="h-5 w-5" />
            </button>
            <Link
              href="/settings"
              className={`text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                pathname === '/settings' ? 'text-white' : ''
              }`}
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 