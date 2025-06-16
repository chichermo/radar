"use client";

// Sistema de internacionalización simplificado para Next.js 13
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos
interface TranslationData {
  [key: string]: any;
}

interface I18nContextType {
  locale: string;
  t: (key: string) => string;
  changeLanguage: (newLocale: string) => void;
  availableLanguages: Array<{ code: string; name: string }>;
}

// Traducciones
const translations: Record<string, TranslationData> = {
  es: {
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      view: "Ver",
      refresh: "Actualizar",
      download: "Descargar",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
      export: "Exportar",
      import: "Importar",
      settings: "Configuración",
      profile: "Perfil",
      logout: "Cerrar sesión",
      language: "Idioma"
    },
    navigation: {
      dashboard: "Panel de Control",
      metrics: "Métricas Avanzadas",
      ai_predictions: "Predicciones IA",
      pattern_analysis: "Análisis de Patrones",
      climate_predictions: "Predicciones Climáticas",
      auto_classification: "Clasificación Automática",
      signal_detection: "Detección de Señales",
      orbital: "Visualización Orbital",
      skymap: "Mapa del Cielo",
      jwst: "James Webb",
      vera_rubin: "Vera C. Rubin",
      exoplanets: "Exoplanetas",
      black_holes: "Agujeros Negros",
      gravitational_waves: "Ondas Gravitacionales",
      dark_matter: "Materia Oscura",
      neutrinos: "Neutrinos Cósmicos",
      starlink: "Starlink",
      tiangong: "Tiangong",
      mars_missions: "Misiones a Marte",
      interstellar_probes: "Sondas Interestelares",
      reusable_rockets: "Cohetes Reutilizables",
      space_weather: "Clima Espacial",
      asteroids: "Asteroides",
      space_debris: "Basura Espacial",
      supernovae: "Supernovas",
      earthquakes: "Sismos",
      global_integration: "Integración Global",
      nasa_apod: "NASA APOD",
      pricing: "Precios",
      legal: "Legal"
    },
    dashboard: {
      title: "COSMIC EYE - Monitoreo Espacial",
      subtitle: "Plataforma avanzada de monitoreo espacial con IA",
      welcome: "Bienvenido al Panel de Control",
      description: "Monitoreo en tiempo real de objetos espaciales y anomalías",
      total_satellites: "Total de Satélites",
      active_alerts: "Alertas Activas",
      launches_2024: "Lanzamientos 2024",
      debris_tracked: "Basura Rastreada",
      prediction_accuracy: "Precisión de Predicción",
      response_time: "Tiempo de Respuesta",
      uptime: "Tiempo Activo",
      data_points: "Puntos de Datos"
    }
  },
  en: {
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      refresh: "Refresh",
      download: "Download",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      export: "Export",
      import: "Import",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      language: "Language"
    },
    navigation: {
      dashboard: "Dashboard",
      metrics: "Advanced Metrics",
      ai_predictions: "AI Predictions",
      pattern_analysis: "Pattern Analysis",
      climate_predictions: "Climate Predictions",
      auto_classification: "Auto Classification",
      signal_detection: "Signal Detection",
      orbital: "Orbital Visualization",
      skymap: "Sky Map",
      jwst: "James Webb",
      vera_rubin: "Vera C. Rubin",
      exoplanets: "Exoplanets",
      black_holes: "Black Holes",
      gravitational_waves: "Gravitational Waves",
      dark_matter: "Dark Matter",
      neutrinos: "Cosmic Neutrinos",
      starlink: "Starlink",
      tiangong: "Tiangong",
      mars_missions: "Mars Missions",
      interstellar_probes: "Interstellar Probes",
      reusable_rockets: "Reusable Rockets",
      space_weather: "Space Weather",
      asteroids: "Asteroids",
      space_debris: "Space Debris",
      supernovae: "Supernovae",
      earthquakes: "Earthquakes",
      global_integration: "Global Integration",
      nasa_apod: "NASA APOD",
      pricing: "Pricing",
      legal: "Legal"
    },
    dashboard: {
      title: "COSMIC EYE - Space Monitoring",
      subtitle: "Advanced space monitoring platform with AI",
      welcome: "Welcome to the Dashboard",
      description: "Real-time monitoring of space objects and anomalies",
      total_satellites: "Total Satellites",
      active_alerts: "Active Alerts",
      launches_2024: "Launches 2024",
      debris_tracked: "Debris Tracked",
      prediction_accuracy: "Prediction Accuracy",
      response_time: "Response Time",
      uptime: "Uptime",
      data_points: "Data Points"
    }
  }
};

// Contexto de internacionalización
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Hook para usar traducciones
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Función para obtener traducción anidada
const getNestedTranslation = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
};

// Proveedor de internacionalización
interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState('es');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Recuperar idioma del localStorage si está disponible
    const savedLocale = localStorage.getItem('cosmic-eye-locale');
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations[locale], key);
    return typeof translation === 'string' ? translation : key;
  };

  const changeLanguage = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
      if (isClient) {
        localStorage.setItem('cosmic-eye-locale', newLocale);
      }
    }
  };

  const availableLanguages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  const value: I18nContextType = {
    locale,
    t,
    changeLanguage,
    availableLanguages
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}; 