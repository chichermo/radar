import { useI18n } from './i18n';
import type { MenuCategory, BadgeTranslations } from '@/types/menu';
import {
  Home, BarChart3, TrendingUp, Satellite, AlertTriangle, Wifi, Building, Globe, Star, Sun, Flame, Circle, Atom, Zap, Rocket, RefreshCw, Eye, Camera, Search, Radio, Brain, Tag, Map, Play, BookOpen, User, Archive, Clock, Image as ImageIcon, Library, Smartphone, Download, MessageCircle, Folder, Share2, Settings, Bell, DollarSign, HelpCircle
} from 'lucide-react';

// Hook para obtener las categorías del menú con traducciones
export const useMenuCategories = (): MenuCategory[] => {
  const { t } = useI18n();
  
  const BADGE_TRANSLATIONS: BadgeTranslations = {
    Principal: t('badges.main'),
    Pro: t('badges.pro'),
    Premium: t('badges.premium'),
    Enterprise: t('badges.enterprise'),
    AI: t('badges.ai'),
    Nuevo: t('badges.new'),
    NASA: t('badges.nasa'),
    Admin: t('badges.admin'),
  };

  return [
    {
      title: 'Dashboard',
      items: [
        { title: 'Vista General', href: '/', icon: Home, description: 'Dashboard principal', badge: '' },
        { title: 'Métricas', href: '/metrics', icon: BarChart3, description: 'Métricas del sistema', badge: '' },
        { title: 'Analytics', href: '/analytics', icon: TrendingUp, description: 'Análisis avanzado', badge: '' }
      ]
    },
    {
      title: 'Objetos Espaciales',
      items: [
        { title: 'Satélites', href: '/satellites', icon: Satellite, description: 'Seguimiento de satélites', badge: '' },
        { title: 'Basura Espacial', href: '/space-debris', icon: AlertTriangle, description: 'Monitoreo de basura espacial', badge: '' },
        { title: 'Starlink', href: '/starlink', icon: Wifi, description: 'Constelación Starlink', badge: '' },
        { title: 'Tiangong', href: '/tiangong', icon: Building, description: 'Estación espacial china', badge: '' },
        { title: 'Asteroides', href: '/asteroids', icon: Globe, description: 'Asteroides cercanos a la Tierra', badge: '' },
        { title: 'Exoplanetas', href: '/exoplanets', icon: Star, description: 'Planetas fuera del sistema solar', badge: '' }
      ]
    },
    {
      title: 'Fenómenos Espaciales',
      items: [
        { title: 'Clima Espacial', href: '/space-weather', icon: Sun, description: 'Actividad solar y tormentas', badge: '' },
        { title: 'Fenómenos Extremos', href: '/extreme-phenomena', icon: Flame, description: 'Fenómenos extremos', badge: '' },
        { title: 'Agujeros Negros', href: '/black-holes', icon: Circle, description: 'Estudio de agujeros negros', badge: '' },
        { title: 'Supernovas', href: '/supernovae', icon: Star, description: 'Explosiones estelares', badge: '' },
        { title: 'Materia Oscura', href: '/dark-matter', icon: Atom, description: 'Investigación de materia oscura', badge: '' },
        { title: 'Neutrinos', href: '/neutrinos', icon: Zap, description: 'Detección de neutrinos', badge: '' }
      ]
    },
    {
      title: 'Misiones Espaciales',
      items: [
        { title: 'Misiones a Marte', href: '/mars-missions', icon: Globe, description: 'Exploración del planeta rojo', badge: '' },
        { title: 'Sondas Interestelares', href: '/interstellar-probes', icon: Rocket, description: 'Misiones interestelares', badge: '' },
        { title: 'Cohetes Reutilizables', href: '/reusable-rockets', icon: RefreshCw, description: 'Tecnología de cohetes', badge: '' },
        { title: 'JWST', href: '/jwst', icon: Eye, description: 'Telescopio espacial James Webb', badge: '' },
        { title: 'Vera Rubin', href: '/vera-rubin', icon: Camera, description: 'Observatorio Vera Rubin', badge: '' }
      ]
    },
    {
      title: 'Investigación',
      items: [
        { title: 'SETI', href: '/seti', icon: Search, description: 'Búsqueda de inteligencia extraterrestre', badge: '' },
        { title: 'Análisis de Señales y Patrones', href: '/signal-detection', icon: Radio, description: 'Análisis de señales espaciales', badge: '' },
        { title: 'Análisis de Patrones', href: '/pattern-analysis', icon: BarChart3, description: 'Identificación de patrones', badge: '' },
        { title: 'Machine Learning', href: '/machine-learning', icon: Brain, description: 'IA para análisis espacial', badge: '' },
        { title: 'Auto-clasificación', href: '/auto-classification', icon: Tag, description: 'Clasificación automática', badge: '' },
        { title: 'Predicciones IA', href: '/ai-predictions', icon: TrendingUp, description: 'Predicciones con IA', badge: '' }
      ]
    },
    {
      title: 'Herramientas',
      items: [
        { title: 'Mapa Satelital', href: '/satellite-map', icon: Map, description: 'Visualización de satélites', badge: '' },
        { title: 'Mapa del Cielo', href: '/skymap', icon: Star, description: 'Mapa estelar interactivo', badge: '' },
        { title: 'Globo Interactivo', href: '/globe', icon: Globe, description: 'Globo terrestre 3D', badge: '' },
        { title: 'Simulaciones', href: '/simulations', icon: Play, description: 'Simulaciones espaciales', badge: '' },
        { title: 'Realidad Virtual', href: '/virtual-reality', icon: Eye, description: 'Experiencias VR', badge: '' },
        { title: 'Herramientas Profesionales', href: '/professional-tools', icon: Camera, description: 'Herramientas para investigadores', badge: '' }
      ]
    },
    {
      title: 'Educación',
      items: [
        { title: 'Centro Educativo', href: '/education', icon: BookOpen, description: 'Recursos educativos', badge: '' },
        { title: 'Carl Sagan', href: '/carl-sagan', icon: User, description: 'Legado de Carl Sagan', badge: '' },
        { title: 'Datos Históricos', href: '/historical-data', icon: Archive, description: 'Historia espacial', badge: '' },
        { title: 'Línea de Tiempo', href: '/timeline', icon: Clock, description: 'Cronología espacial', badge: '' },
        { title: 'Galería', href: '/gallery', icon: ImageIcon, description: 'Galería de imágenes', badge: '' },
        { title: 'Recursos', href: '/resources', icon: Library, description: 'Biblioteca de recursos', badge: '' }
      ]
    },
    {
      title: 'Aplicación Móvil',
      items: [
        { title: 'COSMIC DATA Mobile', href: '/mobile-app', icon: Smartphone, description: 'App móvil', badge: '' },
        { title: 'Descargar App', href: '/download', icon: Download, description: 'Descargar aplicación', badge: '' },
        { title: 'Características', href: '/features', icon: Star, description: 'Funcionalidades de la app', badge: '' }
      ]
    },
    {
      title: 'Comunidad',
      items: [
        { title: 'Chat', href: '/chat', icon: MessageCircle, description: 'Chat en tiempo real', badge: '' },
        { title: 'Proyectos', href: '/projects', icon: Folder, description: 'Proyectos comunitarios', badge: '' },
        { title: 'Integración Social', href: '/social', icon: Share2, description: 'Redes sociales', badge: '' },
        { title: 'Personalización', href: '/personalization', icon: Settings, description: 'Configuración personal', badge: '' }
      ]
    },
    {
      title: 'Configuración',
      items: [
        { title: 'Ajustes', href: '/settings', icon: Settings, description: 'Configuración del sistema', badge: '' },
        { title: 'Notificaciones', href: '/notifications', icon: Bell, description: 'Gestión de notificaciones', badge: '' },
        { title: 'Precios', href: '/pricing', icon: DollarSign, description: 'Planes y precios', badge: '' },
        { title: 'FAQ', href: '/faq', icon: HelpCircle, description: 'Preguntas frecuentes', badge: '' }
      ]
    }
  ];
}; 