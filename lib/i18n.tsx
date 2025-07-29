"use client";

// Sistema de internacionalización simplificado para Next.js 13
import { createContext, useContext, ReactNode } from 'react';

interface I18nContextType {
  locale: string;
  t: (key: string) => string;
  changeLanguage: (newLocale: string) => void;
  availableLanguages: Array<{ code: string; name: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const t = (key: string): string => {
    // Retornar texto directo en lugar de claves
    const translations: { [key: string]: string } = {
      // Dashboard
      'dashboard.title': 'COSMIC DATA',
      'dashboard.subtitle': 'Enterprise Edition - Monitoreo Espacial Avanzado',
      'dashboard.refresh': 'Actualizar',
      'dashboard.refreshing': 'Actualizando...',
      'dashboard.export': 'Exportar',
      'dashboard.exporting': 'Exportando...',
      'dashboard.share': 'Compartir',
      'dashboard.sharing': 'Compartiendo...',
      'dashboard.satellites': 'Satélites Activos',
      'dashboard.anomalies': 'Anomalías Detectadas',
      'dashboard.system': 'Estado del Sistema',
      'dashboard.cpu': 'Uso de CPU',
      'dashboard.spaceWeather': 'Clima Espacial',
      'dashboard.solarActivity': 'Actividad Solar',
      'dashboard.geomagneticField': 'Campo Geomagnético',
      'dashboard.radiation': 'Radiación',
      'dashboard.temperature': 'Temperatura',
      'dashboard.notifications': 'Notificaciones Recientes',
      'dashboard.newSatellite': 'Nuevo satélite detectado',
      'dashboard.starlinkSuccess': 'Starlink-1234 entró en órbita exitosamente',
      'dashboard.solarStorm': 'Actividad solar aumentada',
      'dashboard.solarStormDesc': 'Tormenta solar clase M2 detectada',
      'dashboard.systemUpdate': 'Actualización del sistema',
      'dashboard.systemUpdateDesc': 'Nuevos algoritmos de detección implementados',
      
      // Navbar
      'navbar.searchPlaceholder': 'Buscar...',
      'navbar.onlineStatus': 'En línea',
      'navbar.title': 'Espacio Anomalías',
      
      // Métricas
      'metrics.title': 'Métricas Avanzadas',
      'metrics.description': 'Análisis detallado de datos históricos y tendencias espaciales',
      'metrics.satellites': 'Satélites',
      'metrics.alerts': 'Alertas',
      'metrics.launches': 'Lanzamientos',
      'metrics.debris': 'Escombros',
      'metrics.accuracy': 'Precisión',
      'metrics.response': 'Respuesta',
      'metrics.uptime': 'Uptime',
      'metrics.data': 'Datos',
      
      // Alertas
      'alerts.recentAlerts': 'Alertas Recientes',
      'alerts.systemEvents': 'Eventos y notificaciones del sistema',
      'alerts.collisionRisk': 'Riesgo alto de colisión',
      'alerts.scheduledManeuver': 'Maniobra programada',
      'alerts.normalOperation': 'Operación normal',
      
      // Común
      'common.loading': 'Cargando...',
      'common.error': 'Error',
      'common.success': 'Éxito',
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.view': 'Ver',
      'common.refresh': 'Actualizar',
      'common.download': 'Descargar',
      'common.search': 'Buscar',
      'common.filter': 'Filtrar',
      'common.sort': 'Ordenar',
      'common.export': 'Exportar',
      'common.import': 'Importar',
      'common.settings': 'Configuración',
      'common.profile': 'Perfil',
      'common.logout': 'Cerrar sesión',
      'common.language': 'Idioma',
      'common.retry': 'Intentar de nuevo'
    };
    
    return translations[key] || key;
  };

  const changeLanguage = (newLocale: string) => {
    // No hacer nada por ahora, mantener español
  };

  const availableLanguages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  const value: I18nContextType = {
    locale: 'es',
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