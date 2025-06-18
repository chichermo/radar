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
  Zap as ZapIcon
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
                <p className="text-gray-400">{t('dashboard.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>{t('dashboard.operating_system')}</span>
                </div>
                <span>•</span>
                <span>{t('dashboard.last_update')}: {formattedDate}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-colors">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/30 text-gray-400 hover:bg-gray-600/50 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Estadísticas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('dashboard.total_satellites')}</p>
                    <p className="text-3xl font-bold text-white">4,852</p>
                    <p className="text-green-400 text-sm">{t('dashboard.plus_today')}</p>
                  </div>
                  <Satellite className="h-12 w-12 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('dashboard.active_alerts')}</p>
                    <p className="text-3xl font-bold text-red-400">23</p>
                    <p className="text-red-400 text-sm">{t('dashboard.critical_alerts')}</p>
                  </div>
                  <AlertTriangle className="h-12 w-12 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('dashboard.launches_2024')}</p>
                    <p className="text-3xl font-bold text-green-400">156</p>
                    <p className="text-green-400 text-sm">{t('dashboard.plus_this_month')}</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{t('dashboard.debris_tracked')}</p>
                    <p className="text-3xl font-bold text-yellow-400">128K</p>
                    <p className="text-yellow-400 text-sm">{t('dashboard.plus_new')}</p>
                  </div>
                  <Activity className="h-12 w-12 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Panel izquierdo */}
            <div className="lg:col-span-2 space-y-6">
              {/* Visualización orbital */}
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span>{t('dashboard.orbital_visualization')}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t('dashboard.orbital_monitoring')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-400">{t('dashboard.visualization_3d')}</p>
                      <p className="text-sm text-gray-500 mt-2">{t('dashboard.loading_realtime')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alertas recientes */}
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span>{t('alerts.recent_alerts')}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t('alerts.important_events')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: 'Riesgo de colisión',
                        satellite: 'STARLINK-1234',
                        severity: 'Alta',
                        time: '2 min',
                        description: 'Posible colisión con objeto desconocido'
                      },
                      {
                        id: 2,
                        type: 'Anomalía detectada',
                        satellite: 'ISS',
                        severity: 'Media',
                        time: '15 min',
                        description: 'Variación inusual en parámetros orbitales'
                      },
                      {
                        id: 3,
                        type: 'Nuevo objeto',
                        satellite: 'Objeto NEO-2024-001',
                        severity: 'Baja',
                        time: '1h',
                        description: 'Nuevo objeto cercano a la Tierra detectado'
                      }
                    ].map((alert) => (
                      <div key={alert.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.severity === 'Alta' ? 'bg-red-400' :
                          alert.severity === 'Media' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">{t('alerts.' + alert.type)}</h4>
                            <span className="text-gray-400 text-sm">{alert.time}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{alert.satellite}</p>
                          <p className="text-gray-500 text-sm">{t('alerts.' + alert.description)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panel derecho */}
            <div className="space-y-6">
              {/* Estado del sistema */}
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-green-400" />
                    <span>{t('system.status')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('system.servers')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">{t('system.operational')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('system.database')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">{t('system.synced')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('system.external_apis')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">{t('system.connected')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('system.ai')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">{t('system.active')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logros y gamificación */}
              <AchievementsPanel />

              {/* Notificaciones */}
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-blue-400" />
                    <span>{t('dashboard.notifications')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification, index) => (
                      <div key={index} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{notification.timestamp}</p>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-gray-400 text-sm text-center py-4">{t('dashboard.no_new_notifications')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </GamificationProvider>
  );
}
