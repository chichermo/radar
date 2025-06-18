import { useI18n } from './i18n';
import type { MenuCategory, BadgeTranslations } from '@/types/menu';

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
      title: t('navigation.dashboard'),
      items: [
        {
          title: t('navigation.dashboard'),
          href: '/',
          icon: 'Home',
          description: t('dashboard.description'),
          badge: 'Principal'
        },
        {
          title: t('navigation.metrics'),
          href: '/metrics',
          icon: 'BarChart3',
          description: 'Análisis detallado de datos',
          badge: 'Pro'
        }
      ]
    },
    {
      title: t('categories.ai'),
      items: [
        {
          title: t('navigation.ai_predictions'),
          href: '/ai-predictions',
          icon: 'Brain',
          description: t('categories.ai_predictions_desc'),
          badge: 'Premium'
        },
        {
          title: t('navigation.pattern_analysis'),
          href: '/pattern-analysis',
          icon: 'Target',
          description: t('categories.pattern_analysis_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.climate_predictions'),
          href: '/climate-predictions',
          icon: 'TrendingUp',
          description: t('categories.climate_predictions_desc'),
          badge: 'Enterprise'
        },
        {
          title: t('navigation.auto_classification'),
          href: '/auto-classification',
          icon: 'Tags',
          description: t('categories.auto_classification_desc'),
          badge: 'AI'
        },
        {
          title: t('navigation.signal_detection'),
          href: '/signal-detection',
          icon: 'Search',
          description: t('categories.signal_detection_desc'),
          badge: 'Premium'
        }
      ]
    },
    {
      title: t('categories.visualization'),
      items: [
        {
          title: t('navigation.orbital'),
          href: '/orbital',
          icon: 'Globe',
          description: t('categories.orbital_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.skymap'),
          href: '/skymap',
          icon: 'Map',
          description: t('categories.skymap_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.jwst'),
          href: '/jwst',
          icon: 'Camera',
          description: t('categories.jwst_desc'),
          badge: 'NASA'
        },
        {
          title: t('navigation.vera_rubin'),
          href: '/vera-rubin',
          icon: 'Camera',
          description: t('categories.vera_rubin_desc'),
          badge: 'Nuevo'
        }
      ]
    },
    {
      title: t('categories.phenomena'),
      items: [
        {
          title: t('navigation.space_weather'),
          href: '/space-weather',
          icon: 'Sun',
          description: t('categories.space_weather_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.asteroids'),
          href: '/asteroids',
          icon: 'Circle',
          description: t('categories.asteroids_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.space_debris'),
          href: '/space-debris',
          icon: 'Circle',
          description: t('categories.space_debris_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.supernovae'),
          href: '/supernovae',
          icon: 'Star',
          description: t('categories.supernovae_desc'),
          badge: 'Pro'
        },
        {
          title: t('navigation.earthquakes'),
          href: '/earthquakes',
          icon: 'Activity',
          description: t('categories.earthquakes_desc'),
          badge: 'Pro'
        }
      ]
    },
    {
      title: "Tecnología Espacial",
      items: [
        {
          title: t('navigation.starlink'),
          href: '/starlink',
          icon: 'Satellite',
          description: 'Seguimiento de constelaciones',
          badge: 'Pro'
        },
        {
          title: t('navigation.tiangong'),
          href: '/tiangong',
          icon: 'Building',
          description: 'Tiangong - Estación espacial china',
          badge: 'Pro'
        },
        {
          title: t('navigation.mars_missions'),
          href: '/mars-missions',
          icon: 'Circle',
          description: 'Perseverance, Curiosity, etc.',
          badge: 'NASA'
        },
        {
          title: t('navigation.interstellar_probes'),
          href: '/interstellar-probes',
          icon: 'Rocket',
          description: 'Voyager, New Horizons',
          badge: 'Premium'
        },
        {
          title: t('navigation.reusable_rockets'),
          href: '/reusable-rockets',
          icon: 'Rocket',
          description: 'SpaceX, Blue Origin',
          badge: 'Pro'
        }
      ]
    },
    {
      title: t('categories.integration'),
      items: [
        {
          title: t('navigation.global_integration'),
          href: '/global-integration',
          icon: 'Globe2',
          description: t('categories.global_integration_desc'),
          badge: 'Enterprise'
        },
        {
          title: t('navigation.nasa_apod'),
          href: '/nasa-apod',
          icon: 'ImageIcon',
          description: t('categories.nasa_apod_desc'),
          badge: 'NASA'
        }
      ]
    },
    {
      title: t('categories.settings'),
      items: [
        {
          title: t('navigation.legal'),
          href: '/settings',
          icon: 'Settings',
          description: t('categories.legal_desc'),
          badge: 'Admin'
        }
      ]
    }
  ];
}; 