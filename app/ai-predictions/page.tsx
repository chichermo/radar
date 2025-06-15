'use client';

import { useState, useEffect } from 'react';
import { Brain, AlertTriangle, TrendingUp, Target, Zap, Shield, BarChart3, Lightbulb, Clock, Star } from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';

interface Prediction {
  id: string;
  type: 'collision' | 'anomaly' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  probability: number;
  timeframe: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  objects: string[];
  recommendations: string[];
  timestamp: Date;
  status: 'active' | 'resolved' | 'false_positive';
}

interface AnomalyPattern {
  id: string;
  pattern: string;
  frequency: number;
  significance: number;
  objects: number;
  firstDetected: Date;
  lastSeen: Date;
  category: 'orbital' | 'behavioral' | 'temporal' | 'spatial';
}

export default function AIPredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [anomalyPatterns, setAnomalyPatterns] = useState<AnomalyPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'collision' | 'anomaly' | 'pattern' | 'recommendation'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  // Datos simulados de predicciones de IA
  const mockPredictions: Prediction[] = [
    {
      id: '1',
      type: 'collision',
      title: 'Riesgo de Colisión Detectado',
      description: 'Posible colisión entre SL-8 R/B y COSMOS 2251 en los próximos 72 horas',
      confidence: 87.5,
      probability: 0.23,
      timeframe: '72 horas',
      severity: 'high',
      objects: ['SL-8 R/B', 'COSMOS 2251'],
      recommendations: [
        'Activar protocolo de evasión automática',
        'Notificar a agencias espaciales',
        'Monitorear trayectorias cada 6 horas'
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '2',
      type: 'anomaly',
      title: 'Patrón Anómalo en Órbita LEO',
      description: 'Detección de agrupación inusual de objetos en órbita baja',
      confidence: 92.3,
      probability: 0.67,
      timeframe: '24 horas',
      severity: 'medium',
      objects: ['Múltiples objetos LEO'],
      recommendations: [
        'Investigar origen de la agrupación',
        'Analizar patrones de lanzamiento recientes',
        'Evaluar riesgo de cascada de colisiones'
      ],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '3',
      type: 'pattern',
      title: 'Tendencia de Aumento en Actividad Solar',
      description: 'Análisis predice incremento en tormentas solares para las próximas 2 semanas',
      confidence: 78.9,
      probability: 0.45,
      timeframe: '14 días',
      severity: 'medium',
      objects: ['Actividad solar'],
      recommendations: [
        'Preparar satélites para posibles interrupciones',
        'Aumentar monitoreo de clima espacial',
        'Alertar a operadores de satélites'
      ],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Optimización de Órbita Sugerida',
      description: 'IA recomienda ajuste de órbita para ISS para evitar zona de alta densidad de desechos',
      confidence: 95.1,
      probability: 0.89,
      timeframe: '7 días',
      severity: 'low',
      objects: ['ISS'],
      recommendations: [
        'Planificar maniobra de evasión',
        'Coordinar con NASA y Roscosmos',
        'Minimizar impacto en experimentos científicos'
      ],
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '5',
      type: 'collision',
      title: 'Alerta Crítica: Satélite Comercial en Riesgo',
      description: 'Starlink-1234 en trayectoria de colisión con fragmento de cohete',
      confidence: 96.7,
      probability: 0.78,
      timeframe: '12 horas',
      severity: 'critical',
      objects: ['Starlink-1234', 'CZ-4B R/B Fragment'],
      recommendations: [
        'ACTIVAR PROTOCOLO DE EMERGENCIA',
        'Contactar inmediatamente a SpaceX',
        'Preparar maniobra de emergencia'
      ],
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'active'
    }
  ];

  // Datos simulados de patrones anómalos
  const mockAnomalyPatterns: AnomalyPattern[] = [
    {
      id: '1',
      pattern: 'Agrupación cíclica en órbita polar',
      frequency: 0.15,
      significance: 0.78,
      objects: 23,
      firstDetected: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'spatial'
    },
    {
      id: '2',
      pattern: 'Cambios de velocidad anómalos',
      frequency: 0.08,
      significance: 0.92,
      objects: 7,
      firstDetected: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: 'behavioral'
    },
    {
      id: '3',
      pattern: 'Concentración temporal en lanzamientos',
      frequency: 0.23,
      significance: 0.65,
      objects: 45,
      firstDetected: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastSeen: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: 'temporal'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPredictions(mockPredictions);
      setAnomalyPatterns(mockAnomalyPatterns);
      setLoading(false);
    }, 1500);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-500 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collision': return <Target className="w-5 h-5" />;
      case 'anomaly': return <AlertTriangle className="w-5 h-5" />;
      case 'pattern': return <TrendingUp className="w-5 h-5" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'collision': return 'text-red-400';
      case 'anomaly': return 'text-orange-400';
      case 'pattern': return 'text-blue-400';
      case 'recommendation': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const filteredPredictions = predictions.filter(pred => {
    const typeMatch = selectedFilter === 'all' || pred.type === selectedFilter;
    const severityMatch = selectedSeverity === 'all' || pred.severity === selectedSeverity;
    return typeMatch && severityMatch;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    if (confidence >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Inteligencia Artificial - Predicciones
        </h1>
        <p className="text-gray-300">
          Análisis predictivo avanzado usando machine learning para detectar riesgos, patrones anómalos y generar recomendaciones automáticas.
        </p>
      </header>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tipo de Predicción
              </label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="all">Todos los tipos</option>
                <option value="collision">Colisiones</option>
                <option value="anomaly">Anomalías</option>
                <option value="pattern">Patrones</option>
                <option value="recommendation">Recomendaciones</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Severidad
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="all">Todas las severidades</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Crítica</option>
              </select>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              Última actualización: {formatTimeOnly(new Date())}
            </p>
            <p className="text-xs text-gray-500">
              Modelo IA: CosmicEye-Predictor v2.1
            </p>
          </div>
        </div>
      </div>

      {/* Estadísticas de IA */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Predicciones Activas</p>
              <p className="text-2xl font-bold text-white">{predictions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-red-400" />
            <div>
              <p className="text-sm text-gray-400">Riesgos Críticos</p>
              <p className="text-2xl font-bold text-white">
                {predictions.filter(p => p.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Patrones Detectados</p>
              <p className="text-2xl font-bold text-white">{anomalyPatterns.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Precisión Modelo</p>
              <p className="text-2xl font-bold text-white">94.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Predicciones */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Predicciones de IA
        </h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-gray-400 mt-2">Analizando datos con IA...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPredictions.map((prediction) => (
              <div
                key={prediction.id}
                className={`bg-gray-700/50 rounded-lg p-4 border-l-4 ${
                  prediction.severity === 'critical' ? 'border-l-red-500' :
                  prediction.severity === 'high' ? 'border-l-orange-500' :
                  prediction.severity === 'medium' ? 'border-l-yellow-500' :
                  'border-l-green-500'
                } hover:bg-gray-700/70 transition-colors`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(prediction.type)}`}>
                      {getTypeIcon(prediction.type)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{prediction.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(prediction.severity)}`}>
                          {prediction.severity.toUpperCase()}
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{prediction.timeframe}</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${getConfidenceColor(prediction.confidence)}`}>
                          <Star className="w-4 h-4" />
                          <span>{prediction.confidence.toFixed(1)}% confianza</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {(prediction.probability * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Probabilidad</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-3">{prediction.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Objetos Involucrados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prediction.objects.map((obj, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-300">
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Recomendaciones:</h4>
                    <ul className="space-y-1">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="text-xs text-gray-300 flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-600 flex items-center justify-between text-xs text-gray-400">
                  <span>Detectado: {formatDate(prediction.timestamp)}</span>
                  <span className="capitalize">Estado: {prediction.status.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Patrones Anómalos */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Patrones Anómalos Detectados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {anomalyPatterns.map((pattern) => (
            <div key={pattern.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium text-sm">{pattern.pattern}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  pattern.category === 'spatial' ? 'bg-blue-500/20 text-blue-400' :
                  pattern.category === 'behavioral' ? 'bg-orange-500/20 text-orange-400' :
                  pattern.category === 'temporal' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {pattern.category}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Frecuencia:</span>
                  <span className="text-white">{(pattern.frequency * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Significancia:</span>
                  <span className="text-white">{(pattern.significance * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Objetos:</span>
                  <span className="text-white">{pattern.objects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Primera detección:</span>
                  <span className="text-white">{formatDate(pattern.firstDetected)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Última vista:</span>
                  <span className="text-white">{formatDate(pattern.lastSeen)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información del Sistema IA */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Información del Sistema de IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Capacidades del Modelo</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Predicción de colisiones con 94.2% de precisión</li>
              <li>• Detección de patrones anómalos en tiempo real</li>
              <li>• Análisis de comportamiento orbital</li>
              <li>• Generación automática de recomendaciones</li>
              <li>• Aprendizaje continuo con nuevos datos</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Métricas de Rendimiento</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Precisión:</span>
                <span className="text-green-400">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recall:</span>
                <span className="text-blue-400">91.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">F1-Score:</span>
                <span className="text-purple-400">93.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tiempo de respuesta:</span>
                <span className="text-yellow-400">2.3s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
