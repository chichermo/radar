'use client'

import React, { useState, useEffect } from 'react'
import { AlertTriangle, Bell, Clock, Zap, Globe, Satellite, Star, X } from 'lucide-react'

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success' | 'error';
  title: string;
  description: string;
  category: 'space-weather' | 'asteroid' | 'satellite' | 'exoplanet' | 'general' | 'earthquake';
  severity: number;
  timestamp: Date;
  acknowledged: boolean;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const RealTimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [autoAcknowledge, setAutoAcknowledge] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRealAlerts = async () => {
      try {
        setIsLoading(true);
        
        // Obtener alertas reales de múltiples fuentes
        const [earthquakeResponse, asteroidResponse, spaceWeatherResponse] = await Promise.allSettled([
          fetch('/api/earthquakes'),
          fetch('/api/nasa-asteroids'),
          fetch('/api/space-weather')
        ]);

        const realAlerts: Alert[] = [];

        // Procesar alertas de terremotos
        if (earthquakeResponse.status === 'fulfilled') {
          const earthquakeData = await earthquakeResponse.value.json();
          if (earthquakeData.success && earthquakeData.data) {
            earthquakeData.data.features?.slice(0, 3).forEach((quake: any) => {
              realAlerts.push({
                id: quake.id,
                type: 'warning',
                title: 'Terremoto Detectado',
                description: `Magnitud ${quake.properties.mag} en ${quake.properties.place}`,
                category: 'earthquake' as any,
                severity: quake.properties.mag >= 6 ? 8 : quake.properties.mag >= 5 ? 6 : 4,
                timestamp: new Date(quake.properties.time),
                acknowledged: false,
                location: quake.properties.place,
                coordinates: {
                  lat: quake.geometry.coordinates[1],
                  lng: quake.geometry.coordinates[0]
                }
              });
            });
          }
        }

        // Procesar alertas de asteroides
        if (asteroidResponse.status === 'fulfilled') {
          const asteroidData = await asteroidResponse.value.json();
          if (asteroidData.success && asteroidData.data) {
            const hazardousAsteroids = Object.values(asteroidData.data.near_earth_objects || {})
              .flat()
              .filter((asteroid: any) => asteroid.is_potentially_hazardous_asteroid)
              .slice(0, 2);
            
            hazardousAsteroids.forEach((asteroid: any) => {
              realAlerts.push({
                id: `asteroid-${asteroid.id}`,
                type: 'critical',
                title: 'Asteroide Potencialmente Peligroso',
                description: `${asteroid.name} - Distancia: ${asteroid.close_approach_data[0]?.miss_distance?.kilometers} km`,
                category: 'asteroid',
                severity: 7,
                timestamp: new Date(),
                acknowledged: false,
                location: 'Cercano a la Tierra',
                coordinates: {
                  lat: parseFloat(asteroid.close_approach_data[0]?.relative_velocity?.kilometers_per_hour) || 0,
                  lng: parseFloat(asteroid.close_approach_data[0]?.miss_distance?.kilometers) || 0
                }
              });
            });
          }
        }

        // Procesar alertas de clima espacial
        if (spaceWeatherResponse.status === 'fulfilled') {
          const weatherData = await spaceWeatherResponse.value.json();
          if (weatherData.success && weatherData.data) {
            if (weatherData.data.kp && weatherData.data.kp.length > 0) {
              const latestKp = weatherData.data.kp[0];
              if (latestKp.kp_index >= 5) {
                realAlerts.push({
                  id: `weather-${Date.now()}`,
                  type: 'warning',
                  title: 'Tormenta Geomagnética',
                  description: `Índice Kp: ${latestKp.kp_index} - Posibles auroras boreales`,
                  category: 'space-weather',
                  severity: 6,
                  timestamp: new Date(),
                  acknowledged: false,
                  location: 'Atmósfera Terrestre',
                  coordinates: { lat: 0, lng: 0 }
                });
              }
            }
          }
        }

        setAlerts(realAlerts);
      } catch (error) {
        console.error('Error fetching real alerts:', error);
        setAlerts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealAlerts();
    
    // Actualizar alertas cada 5 minutos
    const interval = setInterval(fetchRealAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const generateRandomAlert = (): Alert | null => {
    const alertTypes = [
      {
        type: 'warning' as const,
        title: 'Tormenta Solar Detectada',
        description: 'Actividad solar aumentada detectada. Posibles interrupciones en comunicaciones.',
        category: 'space-weather' as const,
        severity: 7
      },
      {
        type: 'critical' as const,
        title: 'Asteroides Cercanos',
        description: '3 asteroides detectados en trayectoria cercana a la Tierra.',
        category: 'asteroid' as const,
        severity: 8
      },
      {
        type: 'info' as const,
        title: 'Nuevo Exoplaneta',
        description: 'Descubrimiento confirmado de exoplaneta en zona habitable.',
        category: 'exoplanet' as const,
        severity: 5
      },
      {
        type: 'warning' as const,
        title: 'Satélite en Peligro',
        description: 'Satélite Starlink-245 experimentando anomalías orbitales.',
        category: 'satellite' as const,
        severity: 6
      },
      {
        type: 'success' as const,
        title: 'Misión Exitosa',
        description: 'Sonda espacial completó maniobra de corrección orbital.',
        category: 'general' as const,
        severity: 4
      }
    ]

    const random = Math.random()
    if (random < 0.4) { // 40% de probabilidad
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
      return {
        id: Date.now().toString(),
        ...alertType,
        timestamp: new Date(),
        acknowledged: false,
        location: generateRandomLocation(),
        coordinates: generateRandomCoordinates()
      }
    }
    return null
  }

  const generateRandomLocation = (): string => {
    const locations = [
      'Órbita Terrestre Baja',
      'Cinturón de Asteroides',
      'Sistema Solar Exterior',
      'Nube de Oort',
      'Centro Galáctico'
    ]
    return locations[Math.floor(Math.random() * locations.length)]
  }

  const generateRandomCoordinates = () => {
    return {
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360
    }
  }

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev.slice(0, 19)]) // Máximo 20 alertas
    
    // Auto-acknowledge si está habilitado
    if (autoAcknowledge && alert.severity < 7) {
      setTimeout(() => {
        acknowledgeAlert(alert.id)
      }, 5000)
    }
  }

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    )
  }

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const clearAllAlerts = () => {
    setAlerts([])
  }

  const playAlertSound = (type: Alert['type']) => {
    // Simular diferentes sonidos según el tipo de alerta
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    let frequency = 440
    let duration = 0.5

    switch (type) {
      case 'critical':
        frequency = 800
        duration = 1
        break
      case 'warning':
        frequency = 600
        duration = 0.7
        break
      case 'info':
        frequency = 440
        duration = 0.5
        break
      case 'success':
        frequency = 523
        duration = 0.3
        break
    }

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'bg-red-500'
    if (severity >= 6) return 'bg-orange-500'
    if (severity >= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'info': return <Globe className="w-5 h-5 text-blue-600" />
      case 'success': return <Star className="w-5 h-5 text-green-600" />
    }
  }

  const getCategoryIcon = (category: Alert['category']) => {
    switch (category) {
      case 'space-weather': return <Zap className="w-4 h-4" />
      case 'asteroid': return <Globe className="w-4 h-4" />
      case 'satellite': return <Satellite className="w-4 h-4" />
      case 'exoplanet': return <Star className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (seconds < 60) return `${seconds}s`
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return date.toLocaleDateString()
  }

  const filteredAlerts = alerts;

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length
  const criticalCount = alerts.filter(alert => alert.severity >= 8).length

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alertas en Tiempo Real</h1>
          <p className="text-gray-600">Monitoreo continuo de eventos espaciales importantes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de control */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Control de Alertas</h2>
              
              {/* Estadísticas */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">Críticas</span>
                  <span className="text-lg font-bold text-red-700">{criticalCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium text-yellow-700">Sin Acknowledgment</span>
                  <span className="text-lg font-bold text-yellow-700">{unacknowledgedCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">Total</span>
                  <span className="text-lg font-bold text-blue-700">{alerts.length}</span>
                </div>
              </div>

              {/* Configuración */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Configuración</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={autoAcknowledge}
                      onChange={(e) => setAutoAcknowledge(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Auto-acknowledge (baja severidad)</span>
                  </label>
                </div>
              </div>

              {/* Filtros */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Filtrar por Categoría</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', name: 'Todas', icon: Bell },
                    { id: 'space-weather', name: 'Clima Espacial', icon: Zap },
                    { id: 'asteroid', name: 'Asteroides', icon: Globe },
                    { id: 'satellite', name: 'Satélites', icon: Satellite },
                    { id: 'exoplanet', name: 'Exoplanetas', icon: Star }
                  ].map((category) => (
                    <button
                      key={category.id}
                      className="w-full flex items-center gap-3 p-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
                    >
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="space-y-2">
                <button
                  onClick={clearAllAlerts}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Limpiar Todas
                </button>
              </div>
            </div>
          </div>

          {/* Lista de alertas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Alertas Activas</h2>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Cargando alertas...</p>
                  </div>
                ) : alerts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hay alertas activas</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-lg border-l-4 transition-all ${
                          alert.acknowledged
                            ? 'bg-gray-50 border-gray-300 opacity-75'
                            : 'bg-white border-red-500 shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {getTypeIcon(alert.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">
                                  {alert.title}
                                </h3>
                                <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                                {!alert.acknowledged && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                    Nueva
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 mb-2">{alert.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {formatTime(alert.timestamp)}
                                </div>
                                <div className="flex items-center gap-1">
                                  {getCategoryIcon(alert.category)}
                                  <span className="capitalize">{alert.category.replace('-', ' ')}</span>
                                </div>
                                {alert.location && (
                                  <div className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    {alert.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!alert.acknowledged && (
                              <button
                                onClick={() => acknowledgeAlert(alert.id)}
                                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                              >
                                Acknowledgment
                              </button>
                            )}
                            <button
                              onClick={() => deleteAlert(alert.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealTimeAlerts 