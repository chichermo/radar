"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, Download, Share2, Satellite, AlertTriangle, CheckCircle, Cpu, Sun, Bell, BarChart3, Sparkles, Star, Info, ArrowRight, Play, BookOpen, Globe, Rocket, Users, TrendingUp, Zap, Shield, Eye, Brain, Camera, Activity, MapPin, Clock, Database, Calculator, Settings, HelpCircle, ChevronRight, ChevronDown, Menu, X, Search, Filter, Grid, List, Heart, Bookmark, Share, Download as DownloadIcon, Eye as EyeIcon, Star as StarIcon, Globe as GlobeIcon, Rocket as RocketIcon, Users as UsersIcon, TrendingUp as TrendingUpIcon, Zap as ZapIcon, Shield as ShieldIcon, Eye as EyeIcon2, Brain as BrainIcon, Camera as CameraIcon, Activity as ActivityIcon, MapPin as MapPinIcon, Clock as ClockIcon, Database as DatabaseIcon, Calculator as CalculatorIcon, Settings as SettingsIcon, HelpCircle as HelpCircleIcon } from 'lucide-react';
import styles from './page.module.css';
import { useMenuCategories } from '@/lib/menu-categories';

// Componente de tiempo seguro
function SafeTimeDisplay() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleString('es-ES'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p className={styles.timeDisplay}>{time}</p>;
}

// Componente de métrica
function MetricCard({ title, value, icon: Icon, color, description }: {
  title: string;
  value: string;
  icon: any;
  color: string;
  description: string;
}) {
  const getIconColor = () => {
    switch (color) {
      case 'green': return '#34d399';
      case 'red': return '#f87171';
      case 'yellow': return '#fbbf24';
      case 'blue': return '#60a5fa';
      default: return '#60a5fa';
    }
  };

  return (
    <div className={styles.metricCard}>
      <div className={styles.metricHeader}>
        <h3 className={styles.metricTitle}>{title}</h3>
        <Icon className={styles.metricIcon} style={{ color: getIconColor() }} />
      </div>
      <p className={styles.metricValue}>{value}</p>
      <p className={styles.metricDescription}>{description}</p>
    </div>
  );
}

// Componente de guía de navegación
function NavigationGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card p-6 mb-8 border-l-4 border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <HelpCircle className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">¿Cómo navegar?</h3>
            <p className="text-gray-300 text-sm">Descubre todas las funcionalidades del dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <Star className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium text-sm">Favoritos</p>
                <p className="text-gray-400 text-xs">Acceso rápido a las secciones más importantes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <Search className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-white font-medium text-sm">Búsqueda Global</p>
                <p className="text-gray-400 text-xs">Encuentra cualquier sección o herramienta</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <Menu className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-white font-medium text-sm">Menú Lateral</p>
                <p className="text-gray-400 text-xs">Navegación completa por categorías</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de estadísticas rápidas
function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-card p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Globe className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">50+</h3>
        <p className="text-gray-400 text-sm">Secciones Disponibles</p>
      </div>
      <div className="glass-card p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Rocket className="h-6 w-6 text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">24/7</h3>
        <p className="text-gray-400 text-sm">Monitoreo en Tiempo Real</p>
      </div>
      <div className="glass-card p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Users className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">100%</h3>
        <p className="text-gray-400 text-sm">Datos Reales</p>
      </div>
      <div className="glass-card p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-6 w-6 text-yellow-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Enterprise</h3>
        <p className="text-gray-400 text-sm">Calidad Profesional</p>
      </div>
    </div>
  );
}

// Simulación de favoritos y estados (en un caso real, vendría de backend o localStorage)
const FAVORITE_KEYS = ['/', '/metrics', '/ai-predictions', '/earthquakes', '/satellite-map', '/people-in-space'];
const SECTION_STATUS: Record<string, 'ok' | 'warning' | 'error' | 'simulated'> = {
  '/earthquakes': 'ok',
  '/ai-predictions': 'ok',
  '/satellite-map': 'simulated',
  '/iss-location': 'simulated',
  '/people-in-space': 'simulated',
  // ... puedes expandir según APIs
};

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const menuCategories = useMenuCategories();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showGuide, setShowGuide] = useState(true);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const handleShare = () => {
    setIsSharing(true);
    setTimeout(() => setIsSharing(false), 2000);
  };

  // Flatten all items for búsqueda global y favoritos
  const allItems = menuCategories.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.title })));
  const filteredItems = search
    ? allItems.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
      )
    : allItems;
  const favorites = allItems.filter(item => FAVORITE_KEYS.includes(item.href));

  return (
    <div className="wrapper mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      {/* Header mejorado */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="title gradient-text text-4xl sm:text-5xl font-bold mb-2">COSMIC DATA</h1>
            <p className="text-gray-400 text-sm sm:text-base">Enterprise Edition - Monitoreo Espacial Avanzado</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Explora el cosmos con datos en tiempo real. Navega por las secciones para descubrir todo lo que tenemos para ti.
        </p>
      </div>

      {/* Guía de navegación */}
      {showGuide && <NavigationGuide />}

      {/* Estadísticas rápidas */}
      <QuickStats />

      {/* Controles de búsqueda y vista */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar sección, herramienta o recurso..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-80 pl-10 pr-4 py-3 rounded-lg border border-blue-500/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-gray-300">Favoritos</span>
        </div>
      </div>

      {/* Accesos rápidos a favoritos */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-300">
          <Star className="h-5 w-5 text-yellow-400" />
          Accesos Rápidos
        </h2>
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {favorites.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`group block glass-card p-6 h-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-yellow-400/20 hover:border-yellow-400/40 relative ${
                viewMode === 'list' ? 'flex items-center gap-4' : ''
              }`}
            >
              <div className={`flex items-center gap-3 mb-4 ${viewMode === 'list' ? 'mb-0' : ''}`}>
                <div className="p-2 bg-yellow-400/20 rounded-lg">
                  <item.icon className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-white group-hover:text-yellow-200 transition-colors">
                      {item.title}
                    </span>
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                  {viewMode === 'list' && (
                    <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-yellow-300 transition-colors" />
              </div>
              {viewMode === 'grid' && (
                <>
                  <p className="text-gray-300 text-sm mb-3 min-h-[40px]">{item.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-400/20 text-yellow-300 group-hover:bg-yellow-400/40 group-hover:text-white transition-colors">
                    Favorito
                  </span>
                </>
              )}
              {/* Estado de la sección */}
              <SectionStatusBadge status={SECTION_STATUS[item.href] || 'ok'} />
            </a>
          ))}
        </div>
      </div>

      {/* Secciones filtradas por búsqueda global */}
      <div className="space-y-12">
        {menuCategories.map((category) => {
          const items = filteredItems.filter(item => item.category === category.title);
          if (items.length === 0) return null;
          return (
            <section key={category.title}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-300">
                <Sparkles className="h-5 w-5 text-blue-400" />
                {category.title}
              </h2>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group block glass-card p-6 h-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-blue-500/10 hover:border-blue-500/30 relative ${
                      viewMode === 'list' ? 'flex items-center gap-4' : ''
                    }`}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${viewMode === 'list' ? 'mb-0' : ''}`}>
                      <div className="p-2 bg-blue-400/20 rounded-lg">
                        <item.icon className="h-6 w-6 text-blue-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {item.title}
                          </span>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-200 group-hover:bg-blue-600/50 group-hover:text-white transition-colors">
                            {item.badge}
                          </span>
                        </div>
                        {viewMode === 'list' && (
                          <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    {viewMode === 'grid' && (
                      <p className="text-gray-300 text-sm mb-3 min-h-[40px]">{item.description}</p>
                    )}
                    {/* Estado de la sección */}
                    <SectionStatusBadge status={SECTION_STATUS[item.href] || 'ok'} />
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer informativo */}
      <div className="mt-16 text-center">
        <div className="glass-card p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-2">¿Necesitas ayuda?</h3>
          <p className="text-gray-300 text-sm mb-4">
            Explora todas las secciones del menú lateral o usa la búsqueda global para encontrar lo que necesitas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm">Ayuda</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Documentación</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar el estado de la sección
function SectionStatusBadge({ status }: { status: 'ok' | 'warning' | 'error' | 'simulated' }) {
  if (status === 'ok') return (
    <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
      <CheckCircle className="h-3 w-3" /> OK
    </span>
  );
  if (status === 'simulated') return (
    <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
      <Info className="h-3 w-3" /> Simulado
    </span>
  );
  if (status === 'warning') return (
    <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400">
      <AlertTriangle className="h-3 w-3" /> Advertencia
    </span>
  );
  if (status === 'error') return (
    <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400">
      <AlertTriangle className="h-3 w-3" /> Error
    </span>
  );
  return null;
}
