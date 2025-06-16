"use client";

import React, { useState, useEffect } from 'react';
import { AchievementsPanel, GamificationProvider } from '@/components/GamificationSystem';
import { useNotifications } from '@/components/NotificationService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n.tsx';
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
  Barcode,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Bitcoin,
  Ethereum,
  Litecoin,
  Dogecoin,
  Ripple,
  Cardano,
  Polkadot,
  Chainlink,
  Uniswap,
  PancakeSwap,
  SushiSwap,
  Curve,
  Aave,
  Compound,
  Maker,
  Yearn,
  Synthetix,
  Balancer,
  Kyber,
  Bancor,
  Loopring,
  ZkSync,
  Optimism,
  Arbitrum,
  Polygon,
  Avalanche,
  Fantom,
  Solana,
  Terra,
  Cosmos,
  Polkadot as PolkadotIcon,
  Binance,
  Coinbase,
  Kraken,
  Gemini,
  Bitfinex,
  Huobi,
  OKEx,
  KuCoin,
  Bybit,
  FTX,
  Robinhood,
  Webull,
  TD,
  Fidelity,
  Vanguard,
  Schwab,
  ETRADE,
  Interactive,
  Tastyworks,
  Thinkorswim,
  Ally,
  SoFi,
  M1,
  Public,
  Cash,
  Square as SquareIcon,
  Stripe,
  PayPal,
  Venmo,
  Zelle,
  ApplePay,
  GooglePay,
  SamsungPay,
  Alipay,
  WeChat,
  Line,
  Kakao,
  Grab,
  GoJek,
  Ola,
  Uber,
  Lyft,
  DoorDash,
  Grubhub,
  UberEats,
  Postmates,
  Instacart,
  Amazon,
  Walmart,
  Target as TargetIcon,
  Costco,
  Sam,
  BJs,
  Kroger,
  Safeway,
  Albertsons,
  Publix,
  Wegmans,
  HEB,
  Meijer,
  HyVee,
  Giant,
  Stop,
  Shop,
  Food,
  Lion,
  Weis,
  Tops,
  Price,
  Chopper,
  Save,
  A,
  Lot,
  Dollar,
  General,
  Family,
  Dollar as DollarIcon,
  Tree,
  Fresh,
  Market,
  Trader,
  Joe,
  Whole,
  Foods,
  Sprouts,
  Farmers,
  Natural,
  Grocers,
  Earth,
  Fare,
  Natural as NaturalIcon,
  Grocers as GrocersIcon,
  Earth as EarthIcon,
  Fare as FareIcon,
  Natural as NaturalIcon2,
  Grocers as GrocersIcon2,
  Earth as EarthIcon2,
  Fare as FareIcon2,
  Natural as NaturalIcon3,
  Grocers as GrocersIcon3,
  Earth as EarthIcon3,
  Fare as FareIcon3,
  Natural as NaturalIcon4,
  Grocers as GrocersIcon4,
  Earth as EarthIcon4,
  Fare as FareIcon4,
  Natural as NaturalIcon5,
  Grocers as GrocersIcon5,
  Earth as EarthIcon5,
  Fare as FareIcon5,
  Natural as NaturalIcon6,
  Grocers as GrocersIcon6,
  Earth as EarthIcon6,
  Fare as FareIcon6,
  Natural as NaturalIcon7,
  Grocers as GrocersIcon7,
  Earth as EarthIcon7,
  Fare as FareIcon7,
  Natural as NaturalIcon8,
  Grocers as GrocersIcon8,
  Earth as EarthIcon8,
  Fare as FareIcon8,
  Natural as NaturalIcon9,
  Grocers as GrocersIcon9,
  Earth as EarthIcon9,
  Fare as FareIcon9,
  Natural as NaturalIcon10,
  Grocers as GrocersIcon10,
  Earth as EarthIcon10,
  Fare as FareIcon10
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
      message: 'Nuevo satélite detectado en órbita baja',
      timestamp: '2 min'
    },
    {
      message: 'Actualización de datos orbitales completada',
      timestamp: '5 min'
    },
    {
      message: 'Sistema de IA predictiva optimizado',
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
                  <span>Sistema Operativo</span>
                </div>
                <span>•</span>
                <span>Última actualización: {formattedDate}</span>
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
                    <p className="text-green-400 text-sm">+12 hoy</p>
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
                    <p className="text-red-400 text-sm">3 críticas</p>
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
                    <p className="text-green-400 text-sm">+8 este mes</p>
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
                    <p className="text-yellow-400 text-sm">+1.2K nuevo</p>
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
                    <span>Visualización Orbital en Tiempo Real</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monitoreo de objetos espaciales y sus trayectorias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-400">Visualización 3D de objetos espaciales</p>
                      <p className="text-sm text-gray-500 mt-2">Cargando datos en tiempo real...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alertas recientes */}
              <Card className="bg-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span>Alertas Recientes</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Eventos importantes detectados por el sistema
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
                            <h4 className="text-white font-medium">{alert.type}</h4>
                            <span className="text-gray-400 text-sm">{alert.time}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{alert.satellite}</p>
                          <p className="text-gray-500 text-sm">{alert.description}</p>
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
                    <span>Estado del Sistema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Servidores</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">Operativo</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Base de datos</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">Sincronizada</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">APIs externas</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">Conectadas</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">IA Predictiva</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm">Activa</span>
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
                    <span>Notificaciones</span>
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
                      <p className="text-gray-400 text-sm text-center py-4">No hay notificaciones nuevas</p>
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
