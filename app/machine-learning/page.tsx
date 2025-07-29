"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Clock, 
  Target, 
  Zap, 
  Eye, 
  Star, 
  Crown, 
  Award, 
  Shield, 
  Database, 
  Globe, 
  Search, 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  Satellite, 
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
  Rocket, 
  Info, 
  ChevronRight, 
  Timer, 
  Gauge, 
  Thermometer, 
  Users, 
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
  ExternalLink, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Filter,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Calendar,
  TrendingDown,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Info as InfoIcon
} from 'lucide-react';

interface Prediction {
  id: string;
  type: 'solar_flare' | 'asteroid_impact' | 'space_weather' | 'satellite_collision';
  probability: number;
  confidence: number;
  predictedDate: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedSystems: string[];
  mitigationSteps: string[];
}

interface MLModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  lastUpdated: string;
  status: 'active' | 'training' | 'inactive';
  predictions: number;
}

const mlModels: MLModel[] = [
  {
    id: 'solar-flare-predictor',
    name: 'Predictor de Tormentas Solares',
    description: 'Modelo de ML para predecir tormentas solares y CMEs',
    accuracy: 87.3,
    lastUpdated: '2024-01-15',
    status: 'active',
    predictions: 1247
  },
  {
    id: 'asteroid-collision-predictor',
    name: 'Predictor de Colisiones de Asteroides',
    description: 'Modelo para predecir trayectorias de asteroides cercanos',
    accuracy: 94.1,
    lastUpdated: '2024-01-14',
    status: 'active',
    predictions: 892
  },
  {
    id: 'space-debris-tracker',
    name: 'Rastreador de Basura Espacial',
    description: 'IA para predecir colisiones de basura espacial',
    accuracy: 91.7,
    lastUpdated: '2024-01-13',
    status: 'active',
    predictions: 2156
  },
  {
    id: 'exoplanet-classifier',
    name: 'Clasificador de Exoplanetas',
    description: 'Clasificación automática de exoplanetas por habitabilidad',
    accuracy: 89.5,
    lastUpdated: '2024-01-12',
    status: 'active',
    predictions: 3421
  },
  {
    id: 'cosmic-ray-predictor',
    name: 'Predictor de Rayos Cósmicos',
    description: 'Predicción de eventos de rayos cósmicos',
    accuracy: 82.4,
    lastUpdated: '2024-01-11',
    status: 'training',
    predictions: 567
  }
];

const predictions: Prediction[] = [
  {
    id: 'pred-001',
    type: 'solar_flare',
    probability: 0.87,
    confidence: 0.91,
    predictedDate: '2024-01-20T14:30:00Z',
    severity: 'high',
    description: 'Tormenta solar de clase M2.1 predicha para el 20 de enero',
    affectedSystems: ['Satélites GPS', 'Comunicaciones', 'Redes eléctricas'],
    mitigationSteps: ['Activar modo seguro en satélites', 'Preparar sistemas de respaldo']
  },
  {
    id: 'pred-002',
    type: 'asteroid_impact',
    probability: 0.23,
    confidence: 0.78,
    predictedDate: '2024-02-15T08:45:00Z',
    severity: 'medium',
    description: 'Asteroides cercanos detectados, monitoreo continuo requerido',
    affectedSystems: ['Sistemas de alerta', 'Observatorios'],
    mitigationSteps: ['Refinamiento de trayectoria', 'Análisis de riesgo']
  },
  {
    id: 'pred-003',
    type: 'space_weather',
    probability: 0.65,
    confidence: 0.84,
    predictedDate: '2024-01-18T22:15:00Z',
    severity: 'medium',
    description: 'Evento de clima espacial moderado esperado',
    affectedSystems: ['Auroras boreales', 'Comunicaciones de alta frecuencia'],
    mitigationSteps: ['Alertas a operadores de satélites', 'Monitoreo de auroras']
  }
];

export default function MachineLearningPage() {
  const [activeTab, setActiveTab] = useState('models');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-600/20 text-green-400';
      case 'medium': return 'bg-yellow-600/20 text-yellow-400';
      case 'high': return 'bg-orange-600/20 text-orange-400';
      case 'critical': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-400';
      case 'training': return 'bg-blue-600/20 text-blue-400';
      case 'inactive': return 'bg-gray-600/20 text-gray-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const startTraining = (modelId: string) => {
    setIsTraining(true);
    setSelectedModel(modelId);
    // Simular entrenamiento
    setTimeout(() => {
      setIsTraining(false);
    }, 5000);
  };

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Machine Learning Espacial</h1>
        <p className="subtitle max-w-2xl mx-auto">Descubre cómo la inteligencia artificial y el aprendizaje automático están revolucionando la exploración y el análisis del cosmos.</p>
      </div>
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Machine Learning Espacial</h1>
            <p className="text-gray-300 max-w-xl">
              Inteligencia artificial avanzada para predicciones y análisis espacial
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
              <Brain className="h-4 w-4 mr-1" />
              IA Activa
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-400">
              {mlModels.filter(m => m.status === 'active').length} Modelos
            </Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card">
          <TabsTrigger value="models">Modelos IA</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="training">Entrenamiento</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mlModels.map((model) => (
              <Card key={model.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{model.name}</CardTitle>
                    <Badge className={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Precisión</div>
                      <div className="text-white font-semibold">{model.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Predicciones</div>
                      <div className="text-white font-semibold">{model.predictions}</div>
                    </div>
                  </div>
                  
                  <div className="text-gray-400 text-xs">
                    Última actualización: {new Date(model.lastUpdated).toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setSelectedModel(model.id)}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Detalles
                    </Button>
                    {model.status === 'inactive' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => startTraining(model.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Activar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-600/20 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          Predicción #{prediction.id}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {prediction.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(prediction.severity)}>
                        {prediction.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                        {(prediction.probability * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Probabilidad</div>
                      <div className="text-white font-semibold">
                        {(prediction.probability * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Confianza</div>
                      <div className="text-white font-semibold">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Fecha Predicha</div>
                      <div className="text-white font-semibold">
                        {new Date(prediction.predictedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Sistemas Afectados</div>
                    <div className="flex flex-wrap gap-2">
                      {prediction.affectedSystems.map((system, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Pasos de Mitigación</div>
                    <ul className="space-y-1">
                      {prediction.mitigationSteps.map((step, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-600/20 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Precisión Total</div>
                    <div className="text-white text-2xl font-bold">
                      {mlModels.reduce((acc, m) => acc + m.accuracy, 0) / mlModels.length}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Predicciones Totales</div>
                    <div className="text-white text-2xl font-bold">
                      {mlModels.reduce((acc, m) => acc + m.predictions, 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-600/20 rounded-lg">
                    <Activity className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Modelos Activos</div>
                    <div className="text-white text-2xl font-bold">
                      {mlModels.filter(m => m.status === 'active').length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">IA Score</div>
                    <div className="text-white text-2xl font-bold">94.2</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Rendimiento de Modelos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mlModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <Brain className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{model.name}</div>
                        <div className="text-gray-400 text-sm">{model.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-white font-semibold">{model.accuracy}%</div>
                        <div className="text-gray-400 text-sm">Precisión</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{model.predictions}</div>
                        <div className="text-gray-400 text-sm">Predicciones</div>
                      </div>
                      <Badge className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Entrenamiento de Modelos</CardTitle>
              <CardDescription className="text-gray-300">
                Monitorea y gestiona el entrenamiento de modelos de IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isTraining && selectedModel && (
                <div className="p-6 bg-blue-600/20 rounded-lg border border-blue-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                    <div className="text-white font-semibold">Entrenando Modelo</div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    Modelo: {mlModels.find(m => m.id === selectedModel)?.name}
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Modelos Disponibles</h3>
                  <div className="space-y-3">
                    {mlModels.map((model) => (
                      <div key={model.id} className="p-4 bg-black/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold">{model.name}</div>
                            <div className="text-gray-400 text-sm">{model.description}</div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => startTraining(model.id)}
                            disabled={isTraining}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Entrenar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-4">Configuración de Entrenamiento</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm">Épocas</label>
                      <input type="number" defaultValue={100} className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white" />
                    </div>
                    <div>
                      <label className="text-white text-sm">Tasa de Aprendizaje</label>
                      <input type="number" step="0.001" defaultValue={0.001} className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white" />
                    </div>
                    <div>
                      <label className="text-white text-sm">Batch Size</label>
                      <input type="number" defaultValue={32} className="w-full mt-1 p-2 bg-black/20 border border-gray-600 rounded text-white" />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar Entrenamiento
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 