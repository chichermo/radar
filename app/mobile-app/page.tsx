"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Download, 
  Star, 
  Users, 
  Globe, 
  Rocket, 
  Satellite, 
  Eye, 
  Zap, 
  Bell, 
  Settings, 
  Share2, 
  Heart, 
  MessageCircle, 
  Camera, 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Headphones, 
  Tablet, 
  Monitor, 
  Watch, 
  Speaker, 
  Wifi, 
  Bluetooth, 
  Battery, 
  Power, 
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
  ArrowRight, 
  CheckCircle, 
  ExternalLink, 
  MapPin, 
  Info, 
  ChevronRight, 
  Timer, 
  Trash2, 
  AlertCircle, 
  XCircle, 
  HelpCircle, 
  CheckSquare, 
  Square, 
  Circle, 
  Home, 
  Building, 
  TestTube, 
  Microscope, 
  Atom, 
  Dna, 
  Archive, 
  FileText, 
  SortAsc, 
  SortDesc, 
  PieChart, 
  LineChart, 
  BarChart, 
  Layers, 
  Grid, 
  List, 
  Map, 
  Search, 
  RefreshCw, 
  Download as DownloadIcon, 
  AlertTriangle, 
  Database, 
  TrendingUp, 
  Activity, 
  Calendar, 
  Target, 
  Shield, 
  Crown, 
  Award, 
  Brain, 
  History, 
  Filter, 
  Triangle, 
  Hexagon, 
  Rocket as RocketIcon, 
  Shield as ShieldIcon, 
  Zap as ZapIcon, 
  Users as UsersIcon, 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  Grid as GridIcon, 
  List as ListIcon, 
  Layers as LayersIcon, 
  PieChart as PieChartIcon
} from 'lucide-react';

interface AppFeature {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'available' | 'beta' | 'coming_soon';
  rating: number;
  downloads: number;
}

const appFeatures: AppFeature[] = [
  {
    id: 'real-time-alerts',
    name: 'Alertas en Tiempo Real',
    description: 'Notificaciones push de eventos espaciales importantes',
    icon: Bell,
    status: 'available',
    rating: 4.8,
    downloads: 125000
  },
  {
    id: 'satellite-tracking',
    name: 'Seguimiento de Satélites',
    description: 'Rastrea satélites en tiempo real con tu ubicación',
    icon: Satellite,
    status: 'available',
    rating: 4.9,
    downloads: 89000
  },
  {
    id: 'space-weather',
    name: 'Clima Espacial',
    description: 'Monitoreo de tormentas solares y actividad solar',
    icon: Star,
    status: 'available',
    rating: 4.7,
    downloads: 67000
  },
  {
    id: 'asteroid-alerts',
    name: 'Alertas de Asteroides',
    description: 'Notificaciones de asteroides cercanos a la Tierra',
    icon: Globe,
    status: 'beta',
    rating: 4.6,
    downloads: 45000
  },
  {
    id: 'vr-experiences',
    name: 'Experiencias VR',
    description: 'Realidad virtual para explorar el espacio',
    icon: Eye,
    status: 'coming_soon',
    rating: 0,
    downloads: 0
  },
  {
    id: 'social-features',
    name: 'Funciones Sociales',
    description: 'Comparte descubrimientos y conecta con otros',
    icon: Users,
    status: 'available',
    rating: 4.5,
    downloads: 78000
  }
];

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlatform, setSelectedPlatform] = useState('ios');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-600/20 text-green-400';
      case 'beta': return 'bg-yellow-600/20 text-yellow-400';
      case 'coming_soon': return 'bg-blue-600/20 text-blue-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">COSMIC DATA Mobile</h1>
            <p className="text-gray-300 max-w-xl">
              Lleva el universo en tu bolsillo con nuestra aplicación móvil
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-600/20 text-green-400">
              <Smartphone className="h-4 w-4 mr-1" />
              Disponible
            </Badge>
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
              4.8 ★
            </Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card">
          <TabsTrigger value="overview">Descripción General</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="download">Descargar</TabsTrigger>
          <TabsTrigger value="screenshots">Capturas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Descripción de la App</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  COSMIC DATA Mobile es tu compañero perfecto para explorar el cosmos. 
                  Con notificaciones en tiempo real, seguimiento de satélites y alertas 
                  de eventos espaciales, nunca te perderás nada del universo.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-white text-2xl font-bold">4.8</div>
                    <div className="text-gray-400 text-sm">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-white text-2xl font-bold">250K+</div>
                    <div className="text-gray-400 text-sm">Descargas</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-white text-2xl font-bold">15+</div>
                    <div className="text-gray-400 text-sm">Características</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-white text-2xl font-bold">24/7</div>
                    <div className="text-gray-400 text-sm">Monitoreo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Características Principales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Alertas en tiempo real de eventos espaciales',
                    'Seguimiento de satélites con tu ubicación',
                    'Monitoreo de clima espacial',
                    'Notificaciones de asteroides cercanos',
                    'Modo offline para datos básicos',
                    'Sincronización con tu cuenta web',
                    'Widgets personalizables',
                    'Modo oscuro automático'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appFeatures.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={feature.id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FeatureIcon className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status === 'available' ? 'Disponible' :
                         feature.status === 'beta' ? 'Beta' : 'Próximamente'}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Rating</div>
                        <div className="text-white font-semibold flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {feature.rating}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Descargas</div>
                        <div className="text-white font-semibold">
                          {feature.downloads.toLocaleString('es-ES')}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={feature.status === 'coming_soon'}
                    >
                      {feature.status === 'available' ? 'Usar' :
                       feature.status === 'beta' ? 'Probar Beta' : 'Próximamente'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="download" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Descargar Aplicación</CardTitle>
              <CardDescription className="text-gray-300">
                Disponible para iOS y Android
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-black/20 rounded-lg">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-white font-semibold text-lg mb-2">iOS</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Requiere iOS 14.0 o superior
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tamaño:</span>
                      <span className="text-white">45.2 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Versión:</span>
                      <span className="text-white">2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-white">4.8 ★</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    App Store
                  </Button>
                </div>

                <div className="text-center p-6 bg-black/20 rounded-lg">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-white font-semibold text-lg mb-2">Android</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Requiere Android 8.0 o superior
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tamaño:</span>
                      <span className="text-white">38.7 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Versión:</span>
                      <span className="text-white">2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-white">4.7 ★</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Google Play
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-blue-600/20 rounded-lg border border-blue-500">
                <h4 className="text-white font-semibold mb-2">QR Code para Descarga Rápida</h4>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-black" />
                  </div>
                  <div className="text-gray-300 text-sm">
                    Escanea este código QR con tu dispositivo móvil para descargar la aplicación directamente.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screenshots" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Capturas de Pantalla</CardTitle>
              <CardDescription className="text-gray-300">
                Vista previa de la interfaz de la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Dashboard Principal', desc: 'Vista general de datos espaciales' },
                  { title: 'Seguimiento de Satélites', desc: 'Mapa interactivo de satélites' },
                  { title: 'Alertas en Tiempo Real', desc: 'Notificaciones de eventos' },
                  { title: 'Clima Espacial', desc: 'Monitoreo de actividad solar' },
                  { title: 'Configuración', desc: 'Personalización de la app' },
                  { title: 'Perfil de Usuario', desc: 'Gestión de cuenta y preferencias' }
                ].map((screenshot, i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-[9/16] bg-black/20 rounded-lg border border-gray-600 flex items-center justify-center">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <div className="text-gray-400 text-sm">{screenshot.title}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{screenshot.title}</div>
                      <div className="text-gray-400 text-sm">{screenshot.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 