"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  BarChart3, 
  Code, 
  Download, 
  Upload, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  Star, 
  Globe, 
  Rocket, 
  Satellite, 
  Zap, 
  Bell, 
  Share2, 
  Heart, 
  MessageCircle, 
  Camera, 
  Video, 
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
  AlertTriangle, 
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

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'analysis' | 'simulation' | 'data' | 'visualization' | 'prediction';
  icon: any;
  status: 'available' | 'beta' | 'premium';
  users: number;
  rating: number;
  features: string[];
  api: boolean;
  documentation: string;
}

const professionalTools: Tool[] = [
  {
    id: 'orbital-calculator',
    name: 'Calculadora Orbital Avanzada',
    description: 'Herramienta para cálculos precisos de órbitas y trayectorias',
    category: 'analysis',
    icon: Rocket,
    status: 'available',
    users: 1250,
    rating: 4.9,
    features: ['Cálculo de órbitas', 'Maniobras espaciales', 'Análisis de combustible', 'Predicción de reentrada'],
    api: true,
    documentation: 'https://docs.cosmicdata.io/orbital-calculator'
  },
  {
    id: 'spectral-analyzer',
    name: 'Analizador Espectral',
    description: 'Análisis avanzado de espectros estelares y exoplanetarios',
    category: 'analysis',
    icon: Eye,
    status: 'premium',
    users: 890,
    rating: 4.8,
    features: ['Análisis espectral', 'Detección de elementos', 'Redshift calculation', 'Exoplanet characterization'],
    api: true,
    documentation: 'https://docs.cosmicdata.io/spectral-analyzer'
  },
  {
    id: 'collision-predictor',
    name: 'Predictor de Colisiones',
    description: 'Sistema de alerta temprana para colisiones espaciales',
    category: 'prediction',
    icon: AlertTriangle,
    status: 'available',
    users: 2340,
    rating: 4.7,
    features: ['Detección de colisiones', 'Análisis de riesgo', 'Alertas automáticas', 'Mitigación de amenazas'],
    api: true,
    documentation: 'https://docs.cosmicdata.io/collision-predictor'
  },
  {
    id: 'data-visualizer',
    name: 'Visualizador de Datos 3D',
    description: 'Herramienta para visualización avanzada de datos astronómicos',
    category: 'visualization',
    icon: Eye,
    status: 'available',
    users: 3450,
    rating: 4.6,
    features: ['Visualización 3D', 'Mapas interactivos', 'Animaciones', 'Exportación de datos'],
    api: false,
    documentation: 'https://docs.cosmicdata.io/data-visualizer'
  },
  {
    id: 'machine-learning-suite',
    name: 'Suite de Machine Learning',
    description: 'Herramientas de IA para análisis de datos astronómicos',
    category: 'analysis',
    icon: Brain,
    status: 'premium',
    users: 670,
    rating: 4.9,
    features: ['Análisis de patrones', 'Clasificación automática', 'Predicción de eventos', 'Modelos personalizados'],
    api: true,
    documentation: 'https://docs.cosmicdata.io/ml-suite'
  },
  {
    id: 'satellite-tracker',
    name: 'Rastreador de Satélites Pro',
    description: 'Seguimiento avanzado de satélites y objetos espaciales',
    category: 'data',
    icon: Satellite,
    status: 'available',
    users: 1890,
    rating: 4.8,
    features: ['TLE updates', 'Posición en tiempo real', 'Predicción de pasos', 'Análisis de órbita'],
    api: true,
    documentation: 'https://docs.cosmicdata.io/satellite-tracker'
  }
];

export default function ProfessionalToolsPage() {
  const [activeTab, setActiveTab] = useState('tools');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-600/20 text-green-400';
      case 'beta': return 'bg-yellow-600/20 text-yellow-400';
      case 'premium': return 'bg-purple-600/20 text-purple-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'analysis': return BarChart3;
      case 'simulation': return Rocket;
      case 'data': return Database;
      case 'visualization': return Eye;
      case 'prediction': return TrendingUp;
      default: return Settings;
    }
  };

  const filteredTools = selectedCategory === 'all' 
    ? professionalTools 
    : professionalTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Herramientas Profesionales</h1>
            <p className="text-gray-300 max-w-xl">
              Herramientas avanzadas para investigadores, científicos y profesionales del espacio
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
              <Code className="h-4 w-4 mr-1" />
              {professionalTools.length} Herramientas
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-400">
              {professionalTools.filter(t => t.status === 'available').length} Disponibles
            </Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card">
          <TabsTrigger value="tools">Herramientas</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="documentation">Documentación</TabsTrigger>
          <TabsTrigger value="pricing">Precios</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          <div className="flex space-x-2 mb-6">
            <Button 
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-blue-600' : 'bg-gray-600'}
            >
              Todas
            </Button>
            <Button 
              onClick={() => setSelectedCategory('analysis')}
              className={selectedCategory === 'analysis' ? 'bg-blue-600' : 'bg-gray-600'}
            >
              Análisis
            </Button>
            <Button 
              onClick={() => setSelectedCategory('simulation')}
              className={selectedCategory === 'simulation' ? 'bg-blue-600' : 'bg-gray-600'}
            >
              Simulación
            </Button>
            <Button 
              onClick={() => setSelectedCategory('data')}
              className={selectedCategory === 'data' ? 'bg-blue-600' : 'bg-gray-600'}
            >
              Datos
            </Button>
            <Button 
              onClick={() => setSelectedCategory('visualization')}
              className={selectedCategory === 'visualization' ? 'bg-blue-600' : 'bg-gray-600'}
            >
              Visualización
            </Button>
            <Button 
              onClick={() => setSelectedCategory('prediction')}
              className={selectedCategory === 'prediction' ? 'bg-blue-600' : 'bg-gray-600'}
            >
              Predicción
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <Card key={tool.id} className="glass-card hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ToolIcon className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(tool.status)}>
                        {tool.status === 'available' ? 'Disponible' :
                         tool.status === 'beta' ? 'Beta' : 'Premium'}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Usuarios</div>
                        <div className="text-white font-semibold">{tool.users.toLocaleString('es-ES')}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Rating</div>
                        <div className="text-white font-semibold flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {tool.rating}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Características:</div>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.slice(0, 2).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {tool.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tool.features.length - 2} más
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {tool.api && (
                        <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                          <Code className="h-3 w-3 mr-1" />
                          API
                        </Badge>
                      )}
                      <Button 
                        size="sm"
                        onClick={() => setSelectedTool(tool.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">API de Herramientas Profesionales</CardTitle>
              <CardDescription className="text-gray-300">
                Accede programáticamente a nuestras herramientas avanzadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Endpoints Disponibles</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Orbital Calculator', endpoint: '/api/orbital-calculator', method: 'POST' },
                      { name: 'Spectral Analyzer', endpoint: '/api/spectral-analyzer', method: 'POST' },
                      { name: 'Collision Predictor', endpoint: '/api/collision-predictor', method: 'GET' },
                      { name: 'Satellite Tracker', endpoint: '/api/satellite-tracker', method: 'GET' },
                      { name: 'ML Suite', endpoint: '/api/ml-suite', method: 'POST' }
                    ].map((api, i) => (
                      <div key={i} className="p-3 bg-black/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold">{api.name}</div>
                            <div className="text-gray-400 text-sm">{api.endpoint}</div>
                          </div>
                          <Badge className="bg-blue-600/20 text-blue-400">
                            {api.method}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-4">Configuración</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm">API Key</label>
                      <input 
                        type="text" 
                        placeholder="sk-..." 
                        className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm">Rate Limit</label>
                      <select className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white">
                        <option value="100">100 requests/hour</option>
                        <option value="1000">1000 requests/hour</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-white text-sm">Plan</label>
                      <select className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white">
                        <option value="free">Free</option>
                        <option value="pro">Professional</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Code className="h-4 w-4 mr-2" />
                      Generar API Key
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-600/20 rounded-lg border border-blue-500">
                <h4 className="text-white font-semibold mb-2">Ejemplo de Uso</h4>
                <pre className="text-gray-300 text-sm overflow-x-auto">
{`curl -X POST https://api.cosmicdata.io/orbital-calculator \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "satellite_id": "ISS",
    "maneuver_type": "orbit_raise",
    "delta_v": 100
  }'`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Documentación</CardTitle>
              <CardDescription className="text-gray-300">
                Guías completas para usar nuestras herramientas profesionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionalTools.map((tool) => (
                  <Card key={tool.id} className="glass-card">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <tool.icon className="h-6 w-6 text-blue-400" />
                        <div>
                          <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                          <CardDescription className="text-gray-300">
                            Documentación completa
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Guía de inicio</span>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Referencia API</span>
                          <Button size="sm" variant="outline">
                            <Code className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Ejemplos</span>
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Documentación
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Free</CardTitle>
                <CardDescription className="text-gray-300">
                  Para estudiantes y aficionados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">$0<span className="text-lg text-gray-400">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Acceso básico a herramientas
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    100 requests/hour API
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Documentación básica
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Soporte por email
                  </li>
                </ul>
                <Button className="w-full bg-gray-600 hover:bg-gray-700">
                  Comenzar Gratis
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-2 border-blue-500">
              <CardHeader>
                <CardTitle className="text-white">Professional</CardTitle>
                <CardDescription className="text-gray-300">
                  Para investigadores y científicos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">$99<span className="text-lg text-gray-400">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Todas las herramientas
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    10,000 requests/hour API
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Documentación completa
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Soporte prioritario
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Herramientas premium
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Comenzar Prueba
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Enterprise</CardTitle>
                <CardDescription className="text-gray-300">
                  Para organizaciones grandes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">$299<span className="text-lg text-gray-400">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Todo de Professional
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    API ilimitada
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Soporte 24/7
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    Herramientas personalizadas
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    SLA garantizado
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Contactar Ventas
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 