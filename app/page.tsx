"use client";

import React, { useState, useEffect } from 'react';
import { AchievementsPanel, GamificationProvider } from '@/components/GamificationSystem';
import { useNotifications } from '@/components/NotificationService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n';
import ClientDate from '@/components/ClientDate';
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
  ExternalLink,
  MapPin,
  Cpu,
  Network,
  Lightbulb,
  Magnet,
  Radiation,
  Snowflake,
  Calculator,
  BookOpen,
  Sparkles,
  MessageCircle,
  Filter,
  Share2,
  Triangle,
  Hexagon,
  Star as StarIcon
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

// Componente para mostrar la fecha de manera segura para hidratación
const SafeTimeDisplay = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="text-right">
        <p className="text-sm text-gray-400">Tiempo Universal</p>
        <p className="text-lg font-mono text-white">
          Cargando...
        </p>
      </div>
    );
  }

  return (
    <div className="text-right">
      <p className="text-sm text-gray-400">Tiempo Universal</p>
      <p className="text-lg font-mono text-white">
        <ClientDate 
          date={currentTime} 
          type="datetime" 
          options={{
            timeZone: 'UTC',
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }}
          locale="en-US"
        />
      </p>
    </div>
  );
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

// Componente de métrica con animación
const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = "blue",
  trend = "up",
  delay = 0 
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color?: string;
  trend?: "up" | "down";
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    cyan: "from-cyan-500 to-cyan-600"
  };

  return (
    <div 
      className={`card-premium p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} animate-pulse-glow`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          trend === "up" ? "text-green-400" : "text-red-400"
        }`}>
          <TrendingUp className={`h-4 w-4 ${trend === "down" ? "rotate-180" : ""}`} />
          <span>{change}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      
      <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full transition-all duration-1000`}
          style={{ width: isVisible ? "75%" : "0%" }}
        />
      </div>
    </div>
  );
};

// Componente de alerta con animación
const AlertCard = ({ 
  type, 
  title, 
  message, 
  time, 
  priority = "medium",
  delay = 0 
}: {
  type: "warning" | "error" | "info" | "success";
  title: string;
  message: string;
  time: string;
  priority?: "low" | "medium" | "high";
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const typeConfig = {
    warning: { icon: AlertTriangle, color: "from-yellow-500 to-orange-500", bg: "bg-yellow-500/10" },
    error: { icon: AlertTriangle, color: "from-red-500 to-pink-500", bg: "bg-red-500/10" },
    info: { icon: Eye, color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
    success: { icon: Shield, color: "from-green-500 to-emerald-500", bg: "bg-green-500/10" }
  };

  const priorityConfig = {
    low: "border-l-4 border-gray-400",
    medium: "border-l-4 border-yellow-400",
    high: "border-l-4 border-red-400"
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className={`glass-card p-4 ${priorityConfig[priority]} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${config.color} animate-glow`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <span className="text-xs text-gray-400">{time}</span>
          </div>
          <p className="text-sm text-gray-300 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Componente de actividad en tiempo real
const ActivityStream = () => {
  const activities = [
    { id: 1, type: "satellite", message: "Satélite GPS-3 SV06 detectado en órbita", time: "2 min ago", icon: Satellite },
    { id: 2, type: "signal", message: "Nueva señal de radio detectada en 1420 MHz", time: "5 min ago", icon: Radio },
    { id: 3, type: "asteroid", message: "Asteroid 2024 AB1 pasa cerca de la Tierra", time: "8 min ago", icon: Target },
    { id: 4, type: "spacecraft", message: "ISS completa órbita #123,456", time: "12 min ago", icon: Rocket },
    { id: 5, type: "research", message: "Nuevos datos de exoplanetas procesados", time: "15 min ago", icon: Brain }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-400" />
          <span>Actividad en Tiempo Real</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">En vivo</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-2 rounded-lg bg-blue-500/20">
              <activity.icon className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{activity.message}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de gráfico interactivo
const InteractiveChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  
  const periods = [
    { value: "1h", label: "1H" },
    { value: "24h", label: "24H" },
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-400" />
          <span>Análisis de Datos</span>
        </h3>
        <div className="flex space-x-1">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period.value
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Gráfico interactivo de datos espaciales</p>
          <p className="text-sm text-gray-500 mt-2">Período seleccionado: {selectedPeriod}</p>
        </div>
      </div>
    </div>
  );
};

// Componente de control de sistema
const SystemControls = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [autoAnalysis, setAutoAnalysis] = useState(true);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
        <Settings className="h-5 w-5 text-green-400" />
        <span>Controles del Sistema</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Monitoreo</span>
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isMonitoring ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isMonitoring ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Grabación</span>
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isRecording ? 'bg-red-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isRecording ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Análisis IA</span>
            <button
              onClick={() => setAutoAnalysis(!autoAnalysis)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoAnalysis ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoAnalysis ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="btn-premium w-full flex items-center justify-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Actualizar</span>
          </button>
          
          <button className="btn-secondary w-full flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
          
          <button className="btn-secondary w-full flex items-center justify-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Sistema Online</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Todos los sistemas funcionando correctamente</p>
          </div>
          
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400">Base de Datos</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">2.3TB de datos procesados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { t } = useI18n();

  const metrics = [
    {
      title: "Satélites Activos",
      value: "2,847",
      change: "+12",
      icon: Satellite,
      color: "blue",
      trend: "up" as const,
      delay: 100
    },
    {
      title: "Señales Detectadas",
      value: "156",
      change: "+8",
      icon: Radio,
      color: "green",
      trend: "up" as const,
      delay: 200
    },
    {
      title: "Anomalías",
      value: "3",
      change: "-2",
      icon: AlertTriangle,
      color: "orange",
      trend: "down" as const,
      delay: 300
    },
    {
      title: "Cobertura Global",
      value: "98.7%",
      change: "+0.3%",
      icon: Globe,
      color: "purple",
      trend: "up" as const,
      delay: 400
    }
  ];

  const alerts = [
    {
      type: "warning" as const,
      title: "Alta Actividad Solar",
      message: "Tormenta geomagnética detectada - monitoreo intensificado",
      time: "5 min ago",
      priority: "high" as const,
      delay: 500
    },
    {
      type: "info" as const,
      title: "Nuevo Satélite Detectado",
      message: "Starlink-4567 entró en órbita exitosamente",
      time: "12 min ago",
      priority: "medium" as const,
      delay: 600
    },
    {
      type: "success" as const,
      title: "Análisis Completado",
      message: "Datos de exoplanetas procesados - 3 nuevos candidatos",
      time: "25 min ago",
      priority: "low" as const,
      delay: 700
    }
  ];

  return (
    <div className="min-h-screen space-y-8">
      {/* Header con información en tiempo real */}
      <div className="glass-card p-6 animate-fade-in-scale">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              COSMIC EYE
              <span className="text-gradient ml-2">Dashboard</span>
            </h1>
            <p className="text-gray-300">
              Monitoreo avanzado de anomalías espaciales en tiempo real
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <SafeTimeDisplay />
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">SISTEMA ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-8">
          <InteractiveChart />
          <ActivityStream />
        </div>
        
        {/* Columna derecha */}
        <div className="space-y-8">
          <SystemControls />
          
          {/* Alertas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Bell className="h-5 w-5 text-orange-400" />
              <span>Alertas del Sistema</span>
            </h3>
            {alerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer con estadísticas adicionales */}
      <div className="glass-card p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-white">99.9%</p>
            <p className="text-sm text-gray-400">Uptime</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">2.3TB</p>
            <p className="text-sm text-gray-400">Datos Procesados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-sm text-gray-400">Señales Hoy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-sm text-gray-400">Monitoreo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
