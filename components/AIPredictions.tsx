"use client";

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap, Target } from 'lucide-react';

interface Prediction {
  id: string;
  type: 'collision' | 'discovery' | 'weather' | 'anomaly';
  title: string;
  description: string;
  probability: number;
  confidence: number;
  predictedDate: Date;
  impact: 'low' | 'medium' | 'high' | 'critical';
  data: any;
}

interface MLModel {
  name: string;
  accuracy: number;
  lastUpdated: Date;
  predictions: number;
}

export function AIPredictionsPanel() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [models, setModels] = useState<MLModel[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Modelos de IA simulados
  const mlModels: MLModel[] = [
    {
      name: "CollisionPredictor v2.1",
      accuracy: 94.2,
      lastUpdated: new Date(),
      predictions: 1247
    },
    {
      name: "ExoplanetFinder v1.8",
      accuracy: 87.5,
      lastUpdated: new Date(),
      predictions: 892
    },
    {
      name: "SpaceWeatherForecaster v3.0",
      accuracy: 91.8,
      lastUpdated: new Date(),
      predictions: 2156
    },
    {
      name: "AnomalyDetector v2.5",
      accuracy: 89.3,
      lastUpdated: new Date(),
      predictions: 567
    }
  ];

  // Algoritmo simple de predicción de colisiones
  const predictCollisions = (satellites: any[]): Prediction[] => {
    const predictions: Prediction[] = [];
    
    // Simular análisis de trayectorias
    for (let i = 0; i < satellites.length; i++) {
      for (let j = i + 1; j < satellites.length; j++) {
        const distance = Math.random() * 1000; // km
        const probability = Math.max(0, (1000 - distance) / 1000);
        
        if (probability > 0.1) { // Solo predicciones con >10% probabilidad
          predictions.push({
            id: `collision-${i}-${j}`,
            type: 'collision',
            title: `Posible colisión entre ${satellites[i]?.name || 'Satélite A'} y ${satellites[j]?.name || 'Satélite B'}`,
            description: `Análisis de trayectorias indica una aproximación crítica en ${Math.floor(Math.random() * 72)} horas`,
            probability: probability * 100,
            confidence: 85 + Math.random() * 15,
            predictedDate: new Date(Date.now() + Math.random() * 72 * 60 * 60 * 1000),
            impact: probability > 0.7 ? 'critical' : probability > 0.4 ? 'high' : 'medium',
            data: {
              object1: satellites[i]?.name || 'Satélite A',
              object2: satellites[j]?.name || 'Satélite B',
              distance: distance.toFixed(2),
              relativeVelocity: (Math.random() * 5 + 1).toFixed(2)
            }
          });
        }
      }
    }
    
    return predictions.slice(0, 5); // Máximo 5 predicciones
  };

  // Algoritmo de detección de anomalías
  const detectAnomalies = (data: any[]): Prediction[] => {
    const anomalies: Prediction[] = [];
    
    // Simular detección de señales inusuales
    const anomalyTypes = [
      'Señal de radio inusual',
      'Variación en brillo estelar',
      'Patrón orbital anómalo',
      'Emisión de energía inesperada'
    ];
    
    for (let i = 0; i < 3; i++) {
      const anomalyType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      const probability = 60 + Math.random() * 35;
      
      anomalies.push({
        id: `anomaly-${i}`,
        type: 'anomaly',
        title: `Detección: ${anomalyType}`,
        description: `Sistema de IA detectó un patrón inusual en los datos de monitoreo`,
        probability: probability,
        confidence: 75 + Math.random() * 20,
        predictedDate: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000),
        impact: probability > 80 ? 'high' : 'medium',
        data: {
          type: anomalyType,
          location: `RA: ${(Math.random() * 360).toFixed(2)}°, Dec: ${(Math.random() * 180 - 90).toFixed(2)}°`,
          intensity: (Math.random() * 100).toFixed(1),
          duration: Math.floor(Math.random() * 60) + 1
        }
      });
    }
    
    return anomalies;
  };

  // Algoritmo de predicción de clima espacial
  const predictSpaceWeather = (): Prediction[] => {
    const weatherEvents: Prediction[] = [];
    
    const eventTypes = [
      'Tormenta solar',
      'Eyección de masa coronal',
      'Flares solares',
      'Tormenta geomagnética'
    ];
    
    for (let i = 0; i < 2; i++) {
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const probability = 70 + Math.random() * 25;
      
      weatherEvents.push({
        id: `weather-${i}`,
        type: 'weather',
        title: `Predicción: ${eventType}`,
        description: `Modelo de IA predice actividad solar aumentada en las próximas 48 horas`,
        probability: probability,
        confidence: 80 + Math.random() * 15,
        predictedDate: new Date(Date.now() + Math.random() * 48 * 60 * 60 * 1000),
        impact: probability > 85 ? 'high' : 'medium',
        data: {
          event: eventType,
          solarActivity: (Math.random() * 100).toFixed(1),
          geomagneticIndex: Math.floor(Math.random() * 9) + 1,
          affectedSatellites: Math.floor(Math.random() * 50) + 10
        }
      });
    }
    
    return weatherEvents;
  };

  // Ejecutar análisis de IA
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generar predicciones
    const mockSatellites = [
      { name: 'Starlink-1234' },
      { name: 'GPS-IIF-12' },
      { name: 'ISS' },
      { name: 'Hubble' },
      { name: 'Tiangong' }
    ];
    
    const collisionPredictions = predictCollisions(mockSatellites);
    const anomalyPredictions = detectAnomalies([]);
    const weatherPredictions = predictSpaceWeather();
    
    const allPredictions = [
      ...collisionPredictions,
      ...anomalyPredictions,
      ...weatherPredictions
    ].sort((a, b) => b.probability - a.probability);
    
    setPredictions(allPredictions);
    setModels(mlModels);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400 border-red-500';
      case 'high': return 'text-orange-400 border-orange-500';
      case 'medium': return 'text-yellow-400 border-yellow-500';
      case 'low': return 'text-green-400 border-green-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collision': return '🚨';
      case 'discovery': return '🔍';
      case 'weather': return '🌞';
      case 'anomaly': return '⚠️';
      default: return '🤖';
    }
  };

  const filteredPredictions = selectedType === 'all' 
    ? predictions 
    : predictions.filter(p => p.type === selectedType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-white">Predicciones de IA</h2>
            <p className="text-gray-400">Análisis inteligente de datos espaciales</p>
          </div>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center transition-colors"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Analizando...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Ejecutar Análisis
            </>
          )}
        </button>
      </div>

      {/* Modelos de IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white text-sm">{model.name}</h3>
              <div className="text-xs text-green-400">{model.accuracy}%</div>
            </div>
            <div className="text-xs text-gray-400">
              Predicciones: {model.predictions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              Actualizado: {model.lastUpdated.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {['all', 'collision', 'anomaly', 'weather', 'discovery'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              selectedType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {type === 'all' ? 'Todas' : 
             type === 'collision' ? 'Colisiones' :
             type === 'anomaly' ? 'Anomalías' :
             type === 'weather' ? 'Clima' : 'Descubrimientos'}
          </button>
        ))}
      </div>

      {/* Predicciones */}
      <div className="space-y-4">
        {filteredPredictions.map((prediction) => (
          <div
            key={prediction.id}
            className={`bg-gray-800/50 border rounded-lg p-4 ${getImpactColor(prediction.impact)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <span className="text-2xl mr-3">{getTypeIcon(prediction.type)}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{prediction.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{prediction.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Probabilidad: {prediction.probability.toFixed(1)}%</span>
                    <span>Confianza: {prediction.confidence.toFixed(1)}%</span>
                    <span>Fecha: {prediction.predictedDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{prediction.probability.toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Probabilidad</div>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Confianza del modelo</span>
                <span>{prediction.confidence.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPredictions.length === 0 && !isAnalyzing && (
        <div className="text-center py-8">
          <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-400 mb-2">No hay predicciones</h3>
          <p className="text-gray-500">Ejecuta un análisis para generar predicciones</p>
        </div>
      )}
    </div>
  );
}
