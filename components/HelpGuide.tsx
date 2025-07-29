"use client";

import React, { useState, useEffect } from 'react';
import { HelpCircle, X, ChevronRight, ChevronDown, Star, Search, Menu, Globe, Rocket, Users, Settings, BookOpen, Camera, Brain, Activity, MapPin, Clock, Database, Calculator, Info, Play, BarChart3, Eye, Sparkles, Radio, Waves, Atom, Sun, Circle, Building, Shield, Crown, TrendingUp, Target, Tags, Globe2, Satellite, Archive, History, Image as ImageIcon, DollarSign, User, MessageCircle } from 'lucide-react';

interface HelpStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: string;
}

const helpSteps: HelpStep[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Principal',
    description: 'Vista general con estadísticas y accesos rápidos',
    icon: Globe,
    color: 'blue',
    category: 'Navegación'
  },
  {
    id: 'favorites',
    title: 'Favoritos',
    description: 'Acceso rápido a las secciones más importantes',
    icon: Star,
    color: 'yellow',
    category: 'Navegación'
  },
  {
    id: 'search',
    title: 'Búsqueda Global',
    description: 'Encuentra cualquier sección o herramienta',
    icon: Search,
    color: 'purple',
    category: 'Navegación'
  },
  {
    id: 'sidebar',
    title: 'Menú Lateral',
    description: 'Navegación completa por categorías',
    icon: Menu,
    color: 'green',
    category: 'Navegación'
  },
  {
    id: 'observation',
    title: 'Observación Espacial',
    description: 'Satélites, mapas y señales espaciales',
    icon: Eye,
    color: 'blue',
    category: 'Funcionalidades'
  },
  {
    id: 'exploration',
    title: 'Exploración Espacial',
    description: 'Asteroides, exoplanetas y misiones espaciales',
    icon: Rocket,
    color: 'green',
    category: 'Funcionalidades'
  },
  {
    id: 'research',
    title: 'Investigación Científica',
    description: 'Materia oscura, neutrinos y telescopios',
    icon: Atom,
    color: 'purple',
    category: 'Funcionalidades'
  },
  {
    id: 'phenomena',
    title: 'Fenómenos Espaciales',
    description: 'Clima espacial, supernovas y sismos',
    icon: Sparkles,
    color: 'orange',
    category: 'Funcionalidades'
  },
  {
    id: 'telescopes',
    title: 'Telescopios & Observatorios',
    description: 'JWST, Vera Rubin y datos astronómicos',
    icon: Camera,
    color: 'cyan',
    category: 'Funcionalidades'
  },
  {
    id: 'ai',
    title: 'Inteligencia Artificial',
    description: 'Predicciones, análisis de patrones y clasificación',
    icon: Brain,
    color: 'pink',
    category: 'Funcionalidades'
  },
  {
    id: 'integration',
    title: 'Integración Global',
    description: 'Starlink, ISS y conectividad espacial',
    icon: Globe2,
    color: 'indigo',
    category: 'Funcionalidades'
  },
  {
    id: 'education',
    title: 'Educación & Legado',
    description: 'Carl Sagan, historia espacial y recursos',
    icon: BookOpen,
    color: 'emerald',
    category: 'Recursos'
  },
  {
    id: 'projects',
    title: 'Noticias & Proyectos',
    description: 'Proyectos espaciales y herramientas',
    icon: TrendingUp,
    color: 'amber',
    category: 'Recursos'
  },
  {
    id: 'settings',
    title: 'Configuración',
    description: 'Ajustes, chat IA y FAQ',
    icon: Settings,
    color: 'gray',
    category: 'Sistema'
  }
];

const categories = [
  { name: 'Navegación', color: 'blue' },
  { name: 'Funcionalidades', color: 'green' },
  { name: 'Recursos', color: 'purple' },
  { name: 'Sistema', color: 'gray' }
];

export default function HelpGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colorMap[color] || colorMap.blue;
  };

  const filteredSteps = selectedCategory 
    ? helpSteps.filter(step => step.category === selectedCategory)
    : helpSteps;

  return (
    <>
      {/* Botón flotante de ayuda */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </button>

      {/* Modal de ayuda */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Contenido del modal */}
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass-card border border-white/20 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <HelpCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Guía de Navegación</h2>
                  <p className="text-gray-300 text-sm">Descubre todas las funcionalidades del dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Filtros por categoría */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Filtrar por categoría:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === null
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    Todas
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.name
                          ? `${getColorClasses(category.color)}`
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de pasos de ayuda */}
              <div className="space-y-4">
                {filteredSteps.map((step) => (
                  <div key={step.id} className="glass-card border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getColorClasses(step.color)}`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-white">{step.title}</h4>
                          <p className="text-sm text-gray-300">{step.description}</p>
                        </div>
                      </div>
                      {expandedSteps.includes(step.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedSteps.includes(step.id) && (
                      <div className="px-4 pb-4 border-t border-white/10">
                        <div className="pt-4">
                          <h5 className="font-medium text-white mb-2">Cómo usar:</h5>
                          <div className="space-y-2 text-sm text-gray-300">
                            {step.id === 'dashboard' && (
                              <>
                                <p>• El dashboard principal muestra estadísticas en tiempo real</p>
                                <p>• Usa la búsqueda global para encontrar secciones</p>
                                <p>• Los favoritos te dan acceso rápido a funciones importantes</p>
                              </>
                            )}
                            {step.id === 'favorites' && (
                              <>
                                <p>• Los favoritos están marcados con estrellas amarillas</p>
                                <p>• Haz clic en cualquier tarjeta para acceder directamente</p>
                                <p>• Los favoritos se actualizan automáticamente</p>
                              </>
                            )}
                            {step.id === 'search' && (
                              <>
                                <p>• Escribe en el campo de búsqueda para filtrar secciones</p>
                                <p>• La búsqueda funciona por título y descripción</p>
                                <p>• Los resultados se muestran en tiempo real</p>
                              </>
                            )}
                            {step.id === 'sidebar' && (
                              <>
                                <p>• El menú lateral organiza todas las secciones por categorías</p>
                                <p>• Haz clic en las categorías para expandir/contraer</p>
                                <p>• En móviles, usa el botón de menú para acceder</p>
                              </>
                            )}
                            {step.id === 'observation' && (
                              <>
                                <p>• Monitorea satélites en tiempo real</p>
                                <p>• Visualiza mapas del cielo y objetos espaciales</p>
                                <p>• Analiza señales espaciales detectadas</p>
                              </>
                            )}
                            {step.id === 'exploration' && (
                              <>
                                <p>• Explora asteroides cercanos a la Tierra</p>
                                <p>• Descubre exoplanetas fuera del sistema solar</p>
                                <p>• Sigue misiones espaciales en tiempo real</p>
                              </>
                            )}
                            {step.id === 'research' && (
                              <>
                                <p>• Investiga materia oscura y neutrinos</p>
                                <p>• Accede a datos de telescopios avanzados</p>
                                <p>• Explora estaciones espaciales como Tiangong</p>
                              </>
                            )}
                            {step.id === 'phenomena' && (
                              <>
                                <p>• Monitorea el clima espacial y tormentas solares</p>
                                <p>• Sigue explosiones estelares y supernovas</p>
                                <p>• Observa actividad sísmica global</p>
                              </>
                            )}
                            {step.id === 'telescopes' && (
                              <>
                                <p>• Accede a imágenes del Telescopio James Webb</p>
                                <p>• Explora datos del Observatorio Vera Rubin</p>
                                <p>• Visualiza la foto del día de la NASA</p>
                              </>
                            )}
                            {step.id === 'ai' && (
                              <>
                                <p>• Usa modelos de IA para predicciones</p>
                                <p>• Analiza patrones y detecta anomalías</p>
                                <p>• Clasifica objetos celestes automáticamente</p>
                              </>
                            )}
                            {step.id === 'integration' && (
                              <>
                                <p>• Sigue constelaciones de satélites Starlink</p>
                                <p>• Monitorea la posición de la ISS</p>
                                <p>• Explora la conectividad espacial global</p>
                              </>
                            )}
                            {step.id === 'education' && (
                              <>
                                <p>• Aprende sobre el legado de Carl Sagan</p>
                                <p>• Explora la historia de la exploración espacial</p>
                                <p>• Accede a recursos educativos y documentación</p>
                              </>
                            )}
                            {step.id === 'projects' && (
                              <>
                                <p>• Descubre proyectos espaciales actuales</p>
                                <p>• Usa herramientas y calculadoras astronómicas</p>
                                <p>• Explora arqueología espacial</p>
                              </>
                            )}
                            {step.id === 'settings' && (
                              <>
                                <p>• Configura preferencias del sistema</p>
                                <p>• Chatea con IA para obtener ayuda</p>
                                <p>• Consulta preguntas frecuentes</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Consejos adicionales */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h3 className="font-semibold text-white mb-2">💡 Consejos adicionales:</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Usa el menú lateral para navegar por categorías</li>
                  <li>• Los badges indican el tipo de contenido (Pro, Premium, etc.)</li>
                  <li>• En móviles, usa el botón de menú para acceder a la navegación</li>
                  <li>• Los datos se actualizan en tiempo real desde APIs oficiales</li>
                  <li>• Usa la búsqueda global para encontrar rápidamente lo que necesitas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 