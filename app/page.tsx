"use client";

import React, { useState, useEffect } from 'react';
import { AchievementsPanel, GamificationProvider } from '@/components/GamificationSystem';
import { useNotifications } from '@/components/NotificationService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n';
import { 
  Globe, 
  Satellite, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Zap, 
  Shield, 
  Database,
  Eye,
  Brain,
  Target,
  Search,
  Camera,
  Circle,
  Waves,
  Atom,
  Rocket,
  Sun,
  Cloud,
  Star,
  Crown,
  Award,
  Clock,
  RefreshCw,
  Download,
  Settings,
  Bell,
  Users,
  BarChart3,
  Map,
  Layers,
  Radar,
  CloudRain,
  Wind,
  Thermometer,
  Gauge,
  SatelliteDish,
  Radio,
  FlaskConical,
  Moon,
  Calendar,
  Info,
  ChevronRight,
  Play,
  Pause,
  Square,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Volume1,
  Volume,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  Battery,
  BatteryCharging,
  Power,
  PowerOff,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  QrCode,
  CreditCard,
  Wallet,
  Coins,
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  Zap as ZapIcon,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

/* Definir un array de objetos TLE (mock) para el Globe */
const mockTLEObjects = [
  {
    id: 1,
    name: 'ISS',
    tle: '1 25544U 98067A   24001.50000000  .00000000  00000+0  00000+0 0    02\n2 25544  51.6400   0.0000 0000001   0.0000   0.0000 15.50000000    01',
    position: { lat: 51.5074, lng: -0.1278, alt: 408 },
    velocity: { x: 7.66, y: 0, z: 0 },
    status: 'Operativo',
    type: 'Estación Espacial',
    country: 'Internacional',
    launch_date: '1998-11-20',
    mission: 'Investigación y habitabilidad espacial',
    last_update: '2024-01-01T12:00:00Z'
  },
  {
    id: 2,
    name: 'STARLINK-1234',
    tle: '1 44713U 19074A   24001.50000000  .00000000  00000+0  00000+0 0    02\n2 44713  52.9979   0.0000 0000001   0.0000   0.0000 14.50000000    01',
    position: { lat: 40.7128, lng: -74.0060, alt: 550 },
    velocity: { x: 7.8, y: 0, z: 0 },
    status: 'Operativo',
    type: 'Satélite de Comunicaciones',
    country: 'Estados Unidos',
    launch_date: '2019-05-24',
    mission: 'Internet satelital global',
    last_update: '2024-01-01T12:00:00Z'
  },
  {
    id: 3,
    name: 'GPS IIR-20',
    tle: '1 28474U 04062A   24001.50000000  .00000000  00000+0  00000+0 0    02\n2 28474  55.0000   0.0000 0000001   0.0000   0.0000 12.00000000    01',
    position: { lat: 0, lng: 0, alt: 20200 },
    velocity: { x: 3.87, y: 0, z: 0 },
    status: 'Operativo',
    type: 'Sistema de Navegación',
    country: 'Estados Unidos',
    launch_date: '2004-11-06',
    mission: 'Navegación GPS',
    last_update: '2024-01-01T12:00:00Z'
  }
];

// Hook para formatear fechas de manera consistente
const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Mexico_City'
    };
    setFormattedDate(now.toLocaleDateString('es-ES', options));
  }, []);

  return formattedDate;
};

// Datos de características principales
const mainFeatures = [
  {
    title: "Seguimiento de Asteroides",
    description: "Monitoreo en tiempo real de objetos cercanos a la Tierra con datos de NASA y ESA",
    icon: Circle,
    href: "/asteroids",
    color: "from-red-500 to-orange-500",
    badge: "NASA"
  },
  {
    title: "Mapa Estelar 3D",
    description: "Explora el universo con nuestro mapa estelar interactivo basado en datos reales",
    icon: Star,
    href: "/skymap",
    color: "from-blue-500 to-purple-500",
    badge: "Pro"
  },
  {
    title: "Predicciones con IA",
    description: "Análisis avanzado de patrones espaciales usando inteligencia artificial",
    icon: Brain,
    href: "/ai-predictions",
    color: "from-green-500 to-teal-500",
    badge: "Premium"
  },
  {
    title: "Observatorio Vera Rubin",
    description: "Acceso a datos del telescopio más potente del mundo para detectar anomalías",
    icon: Camera,
    href: "/vera-rubin",
    color: "from-purple-500 to-pink-500",
    badge: "Nuevo"
  },
  {
    title: "Clima Espacial",
    description: "Monitoreo de tormentas solares y eventos espaciales que afectan la Tierra",
    icon: Sun,
    href: "/space-weather",
    color: "from-yellow-500 to-orange-500",
    badge: "Pro"
  },
  {
    title: "Análisis de Patrones",
    description: "Detección automática de anomalías y patrones en datos astronómicos",
    icon: Target,
    href: "/pattern-analysis",
    color: "from-indigo-500 to-blue-500",
    badge: "Pro"
  }
];

// Estadísticas en tiempo real
const liveStats = [
  { label: "Asteroides Monitoreados", value: "28,000+", icon: Circle },
  { label: "Satélites Activos", value: "4,500+", icon: Satellite },
  { label: "Fuentes de Datos", value: "15+", icon: Database },
  { label: "Usuarios Activos", value: "10k+", icon: Users }
];

export default function HomePage() {
  const { t } = useI18n();
  const { sendNotification, sendSpaceAlert } = useNotifications();
  const [isClient, setIsClient] = useState(false);
  const formattedDate = useFormattedDate();

  // Notificaciones mock para mostrar en el dashboard
  const [notifications] = useState([
    {
      message: t('dashboard.notification1'),
      timestamp: '2 min'
    },
    {
      message: t('dashboard.notification2'),
      timestamp: '5 min'
    },
    {
      message: t('dashboard.notification3'),
      timestamp: '10 min'
    }
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GamificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Fondo animado de estrellas */}
          <div className="absolute inset-0 bg-[url('/stars.jpg')] bg-cover bg-center opacity-30"></div>
          
          <div className="relative z-10 px-6 py-20">
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  COSMIC EYE
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Tu ventana al universo en tiempo real. Monitorea asteroides, explora el cosmos 
                  y descubre los secretos del espacio con datos de NASA, ESA y más.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a 
                  href="/skymap" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Explorar el Cielo
                </a>
                <a 
                  href="/pricing" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  <Crown className="w-5 h-5" />
                  Ver Planes
                </a>
              </div>

              {/* Estadísticas en tiempo real */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {liveStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Características principales */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Explora el Universo
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Accede a herramientas avanzadas de monitoreo espacial y análisis de datos 
                utilizadas por profesionales y entusiastas de la astronomía.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded">
                        {feature.badge}
                      </span>
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={feature.href}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Explorar <ArrowRight className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de datos en tiempo real */}
        <section className="px-6 py-20 bg-gray-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Datos en Tiempo Real
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Última actualización: {formattedDate}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dashboard principal */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-900/30 rounded-lg border border-green-500/20">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white font-medium">Asteroides detectados hoy</div>
                        <div className="text-gray-300 text-sm">3 nuevos objetos cercanos a la Tierra</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
                      <Satellite className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Satélites activos</div>
                        <div className="text-gray-300 text-sm">4,521 satélites en órbita</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-white font-medium">Clima espacial</div>
                        <div className="text-gray-300 text-sm">Actividad solar normal</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enlaces rápidos */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Acceso Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="/faq" className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-blue-400" />
                        <span className="text-white">Preguntas Frecuentes</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="/chat" className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-400" />
                        <span className="text-white">Comunidad</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="/pricing" className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                        <span className="text-white">Planes y Precios</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer de la página de inicio */}
        <footer className="px-6 py-12 border-t border-gray-700">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              COSMIC EYE - Monitoreo espacial en tiempo real
            </p>
            <p className="text-sm text-gray-500">
              Datos proporcionados por NASA, ESA, Space-Track.org y otras agencias espaciales
            </p>
          </div>
        </footer>
      </div>
    </GamificationProvider>
  );
}
