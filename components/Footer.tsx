"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Award, 
  Clock, 
  Activity, 
  Zap,
  Globe,
  Star,
  Crown,
  Heart,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

// Componente wrapper para evitar errores de hidratación
const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient ? <>{children}</> : null;
};

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Información de la empresa */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative">
                <img 
                  src="/logorad.png" 
                  alt="Cosmic Eye Logo" 
                  className="w-10 h-10 rounded-xl shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  COSMIC EYE
                </h3>
                <p className="text-sm text-gray-400">Enterprise Edition</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              Plataforma profesional de monitoreo espacial con inteligencia artificial avanzada. 
              Solución empresarial para observatorios, agencias espaciales y centros de investigación 
              líderes en el mundo.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Operativo</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Shield className="h-4 w-4" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Crown className="h-4 w-4" />
                <span>Enterprise</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Soluciones
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span>Planes Enterprise</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/ai-predictions" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span>IA Predictiva</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/global-integration" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span>Integración Global</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/pattern-analysis" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <span>Análisis Avanzado</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto y soporte */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-green-400" />
              Soporte
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/legal/attributions" className="text-gray-400 hover:text-green-400 transition-colors">
                  Atribuciones
                </Link>
              </li>
              <li>
                <a href="mailto:enterprise@cosmic-eye.com" className="text-gray-400 hover:text-green-400 transition-colors flex items-center group">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>Contacto Enterprise</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-blue-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Información de copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span>© {currentYear} COSMIC EYE Enterprise.</span>
                <span>•</span>
                <span>Todos los derechos reservados.</span>
              </div>
            </div>

            {/* Estado del sistema y versión */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="h-4 w-4" />
                <span>v2.1.0 Enterprise</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Zap className="h-4 w-4" />
                <span>Alta Disponibilidad</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Award className="h-4 w-4" />
                <span>Certificado ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Mensaje especial */}
          <div className="mt-6 pt-6 border-t border-blue-500/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm flex items-center justify-center">
                <Heart className="h-4 w-4 mr-2 text-red-400" />
                Desarrollado para la exploración del cosmos y el avance de la humanidad
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 z-50 hover:scale-110"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
} 