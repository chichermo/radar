"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Globe, 
  Rocket, 
  Satellite, 
  Star, 
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
  Smartphone, 
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
  Download, 
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

interface VRExperience {
  id: string;
  name: string;
  description: string;
  category: 'space_walk' | 'planet_exploration' | 'space_station' | 'solar_system' | 'galaxy_tour';
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  devices: string[];
  rating: number;
  users: number;
  image: string;
  features: string[];
}

const vrExperiences: VRExperience[] = [
  {
    id: 'space-walk-iss',
    name: 'Paseo Espacial en la ISS',
    description: 'Experimenta una caminata espacial real alrededor de la Estación Espacial Internacional',
    category: 'space_walk',
    duration: 45,
    difficulty: 'intermediate',
    devices: ['Oculus Quest', 'HTC Vive', 'Valve Index'],
    rating: 4.8,
    users: 15420,
    image: '/vr/space-walk-iss.jpg',
    features: ['Física realista', 'Audio espacial', 'Interacción con herramientas', 'Vista de la Tierra']
  },
  {
    id: 'mars-exploration',
    name: 'Exploración de Marte',
    description: 'Explora la superficie marciana con los rovers de la NASA',
    category: 'planet_exploration',
    duration: 60,
    difficulty: 'beginner',
    devices: ['Oculus Quest', 'HTC Vive', 'PSVR2'],
    rating: 4.9,
    users: 23450,
    image: '/vr/mars-exploration.jpg',
    features: ['Terreno real de Marte', 'Rovers interactivos', 'Análisis de muestras', 'Paisajes marcianos']
  },
  {
    id: 'solar-system-tour',
    name: 'Tour del Sistema Solar',
    description: 'Viaja por todos los planetas del sistema solar a escala real',
    category: 'solar_system',
    duration: 90,
    difficulty: 'beginner',
    devices: ['Oculus Quest', 'HTC Vive', 'Valve Index', 'PSVR2'],
    rating: 4.7,
    users: 18930,
    image: '/vr/solar-system-tour.jpg',
    features: ['Escala real', 'Información planetaria', 'Órbitas animadas', 'Fenómenos astronómicos']
  },
  {
    id: 'galaxy-exploration',
    name: 'Exploración Galáctica',
    description: 'Navega por la Vía Láctea y descubre exoplanetas',
    category: 'galaxy_tour',
    duration: 120,
    difficulty: 'advanced',
    devices: ['Valve Index', 'HTC Vive Pro'],
    rating: 4.6,
    users: 8760,
    image: '/vr/galaxy-exploration.jpg',
    features: ['Mapa galáctico real', 'Exoplanetas confirmados', 'Nebulosas', 'Agujeros negros']
  },
  {
    id: 'tianhe-station',
    name: 'Estación Tiangong',
    description: 'Explora la estación espacial china Tiangong',
    category: 'space_station',
    duration: 30,
    difficulty: 'intermediate',
    devices: ['Oculus Quest', 'HTC Vive'],
    rating: 4.5,
    users: 12340,
    image: '/vr/tianhe-station.jpg',
    features: ['Módulos reales', 'Experimentos científicos', 'Vista de China', 'Telemetría en tiempo real']
  },
  {
    id: 'james-webb-telescope',
    name: 'Telescopio James Webb',
    description: 'Opera el telescopio espacial más avanzado del mundo',
    category: 'space_station',
    duration: 75,
    difficulty: 'advanced',
    devices: ['Valve Index', 'HTC Vive Pro'],
    rating: 4.9,
    users: 5670,
    image: '/vr/james-webb.jpg',
    features: ['Operaciones reales', 'Imágenes infrarrojas', 'Análisis espectral', 'Descubrimientos']
  }
];

export default function VirtualRealityPage() {
  const [activeTab, setActiveTab] = useState('experiences');
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<string>('Oculus Quest');
  const [vrLoaded, setVrLoaded] = useState(false);

  useEffect(() => {
    if (isVRMode && selectedExperience) {
      setVrLoaded(false);
      const timer = setTimeout(() => {
        setVrLoaded(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVRMode, selectedExperience]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-600/20 text-green-400';
      case 'intermediate': return 'bg-yellow-600/20 text-yellow-400';
      case 'advanced': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'space_walk': return Rocket;
      case 'planet_exploration': return Globe;
      case 'space_station': return Satellite;
      case 'solar_system': return Star;
      case 'galaxy_tour': return Star;
      default: return Globe;
    }
  };

  const startVRExperience = (experienceId: string) => {
    setSelectedExperience(experienceId);
    setIsVRMode(true);
    // Simular inicio de experiencia VR
    setTimeout(() => {
      console.log('VR Experience started:', experienceId);
    }, 1000);
  };

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Realidad Virtual Espacial</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora el universo en 3D y realidad virtual con experiencias inmersivas.</p>
      </div>
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Realidad Virtual Espacial</h1>
            <p className="text-gray-300 max-w-xl">
              Experiencias inmersivas que te llevan al espacio sin salir de casa
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
              <Eye className="h-4 w-4 mr-1" />
              VR Activo
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-400">
              {vrExperiences.length} Experiencias
            </Badge>
          </div>
        </div>
      </div>

      {isVRMode && selectedExperience && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button 
              onClick={() => setIsVRMode(false)}
              className="bg-red-600 hover:bg-red-700"
            >
              Salir VR
            </Button>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              {!vrLoaded ? (
                <>
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <div className="text-white text-xl font-semibold">
                    Cargando experiencia VR...
                  </div>
                  <div className="text-gray-400 mt-2">
                    {vrExperiences.find(e => e.id === selectedExperience)?.name}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl text-white font-bold mb-4">¡Próximamente!</div>
                  <div className="text-gray-400">La experiencia VR estará disponible en una próxima actualización.</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card">
          <TabsTrigger value="experiences">Experiencias</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="experiences" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vrExperiences.map((experience) => {
              const CategoryIcon = getCategoryIcon(experience.category);
              return (
                <Card key={experience.id} className="glass-card hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{experience.name}</CardTitle>
                      </div>
                      <Badge className={getDifficultyColor(experience.difficulty)}>
                        {experience.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      {experience.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <Eye className="h-12 w-12 mx-auto mb-2" />
                        <div className="text-sm">Vista Previa VR</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Duración</div>
                        <div className="text-white font-semibold">{experience.duration} min</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Usuarios</div>
                        <div className="text-white font-semibold">{experience.users.toLocaleString('es-ES')}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Rating</div>
                        <div className="text-white font-semibold flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {experience.rating}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Dispositivos</div>
                        <div className="text-white font-semibold">{experience.devices.length}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Características:</div>
                      <div className="flex flex-wrap gap-1">
                        {experience.features.slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {experience.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{experience.features.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => startVRExperience(experience.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Iniciar Experiencia
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Dispositivos VR Soportados</CardTitle>
              <CardDescription className="text-gray-300">
                Configura y gestiona tus dispositivos de realidad virtual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Oculus Quest 3', status: 'connected', battery: 85, resolution: '2064x2208' },
                  { name: 'HTC Vive Pro 2', status: 'connected', battery: 100, resolution: '2448x2448' },
                  { name: 'Valve Index', status: 'disconnected', battery: 0, resolution: '1440x1600' },
                  { name: 'PSVR2', status: 'available', battery: 0, resolution: '2000x2040' },
                  { name: 'Meta Quest Pro', status: 'connected', battery: 72, resolution: '1800x1920' },
                  { name: 'Pico 4', status: 'available', battery: 0, resolution: '2160x2160' }
                ].map((device, i) => (
                  <Card key={i} className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-white font-semibold">{device.name}</div>
                        <Badge className={
                          device.status === 'connected' ? 'bg-green-600/20 text-green-400' :
                          device.status === 'available' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-gray-600/20 text-gray-400'
                        }>
                          {device.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Resolución:</span>
                          <span className="text-white">{device.resolution}</span>
                        </div>
                        {device.battery > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Batería:</span>
                            <span className="text-white">{device.battery}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        {device.status === 'connected' ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Conectado
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Wifi className="h-4 w-4 mr-1" />
                            Conectar
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Paseos Espaciales', icon: Rocket, count: 3, description: 'Experiencias de caminatas espaciales realistas' },
              { name: 'Exploración Planetaria', icon: Globe, count: 5, description: 'Explora planetas del sistema solar' },
              { name: 'Estaciones Espaciales', icon: Satellite, count: 4, description: 'Visita estaciones espaciales en órbita' },
              { name: 'Sistema Solar', icon: Star, count: 2, description: 'Tours completos del sistema solar' },
              { name: 'Exploración Galáctica', icon: Star, count: 3, description: 'Viajes por la Vía Láctea' },
              { name: 'Telescopios Espaciales', icon: Eye, count: 2, description: 'Opera telescopios espaciales' }
            ].map((category, i) => (
              <Card key={i} className="glass-card hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <category.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{category.name}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">{category.count} experiencias</div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Explorar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Configuración VR</CardTitle>
              <CardDescription className="text-gray-300">
                Ajusta la configuración de tu experiencia de realidad virtual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Configuración de Dispositivo</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm">Dispositivo Principal</label>
                      <select 
                        value={currentDevice}
                        onChange={(e) => setCurrentDevice(e.target.value)}
                        className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white"
                      >
                        <option value="Oculus Quest">Oculus Quest 3</option>
                        <option value="HTC Vive">HTC Vive Pro 2</option>
                        <option value="Valve Index">Valve Index</option>
                        <option value="PSVR2">PlayStation VR2</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-white text-sm">Calidad Gráfica</label>
                      <select className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white">
                        <option value="low">Baja (60 FPS)</option>
                        <option value="medium">Media (90 FPS)</option>
                        <option value="high">Alta (120 FPS)</option>
                        <option value="ultra">Ultra (144 FPS)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-white text-sm">Campo de Visión</label>
                      <input type="range" min="90" max="120" defaultValue="110" className="w-full mt-1" />
                      <div className="text-gray-400 text-xs mt-1">110°</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-4">Configuración de Audio</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm">Audio Espacial</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-300 text-sm">Habilitar audio 3D</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-white text-sm">Volumen Master</label>
                      <input type="range" min="0" max="100" defaultValue="75" className="w-full mt-1" />
                      <div className="text-gray-400 text-xs mt-1">75%</div>
                    </div>
                    
                    <div>
                      <label className="text-white text-sm">Efectos de Sonido</label>
                      <input type="range" min="0" max="100" defaultValue="80" className="w-full mt-1" />
                      <div className="text-gray-400 text-xs mt-1">80%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Configuración de Movimiento</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-white text-sm">Sensibilidad de Movimiento</label>
                    <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full mt-1" />
                    <div className="text-gray-400 text-xs mt-1">1.0x</div>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm">Comfort Mode</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-gray-300 text-sm">Reducir mareo</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm">Boundary System</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-gray-300 text-sm">Mostrar límites</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Aplicar Configuración
                </Button>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restaurar Predeterminados
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 