'use client'

import React, { useState, useEffect } from 'react'
import { Bell, X, Settings, Zap, AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: Date
  read: boolean
  category: 'space-weather' | 'asteroid' | 'satellite' | 'exoplanet' | 'general'
}

const AdvancedNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [settings, setSettings] = useState({
    pushEnabled: false,
    soundEnabled: true,
    categories: {
      'space-weather': true,
      'asteroid': true,
      'satellite': true,
      'exoplanet': true,
      'general': true
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission()
    }

    const fetchRealNotifications = async () => {
      try {
        // Obtener notificaciones reales de múltiples fuentes
        const [asteroidResponse, spaceWeatherResponse, exoplanetResponse] = await Promise.allSettled([
          fetch('/api/nasa-asteroids'),
          fetch('/api/space-weather'),
          fetch('/api/exoplanets')
        ]);

        const realNotifications: Notification[] = [];

        // Procesar notificaciones de asteroides peligrosos
        if (asteroidResponse.status === 'fulfilled') {
          const asteroidData = await asteroidResponse.value.json();
          if (asteroidData.success && asteroidData.data) {
            const hazardousAsteroids = Object.values(asteroidData.data.near_earth_objects || {})
              .flat()
              .filter((asteroid: any) => asteroid.is_potentially_hazardous_asteroid)
              .slice(0, 1);
            
            hazardousAsteroids.forEach((asteroid: any) => {
              realNotifications.push({
                id: `asteroid-${asteroid.id}`,
                type: 'error',
                title: 'Asteroide Potencialmente Peligroso',
                message: `${asteroid.name} detectado cerca de la Tierra`,
                category: 'asteroid',
                timestamp: new Date(),
                read: false
              });
            });
          }
        }

        // Procesar notificaciones de clima espacial
        if (spaceWeatherResponse.status === 'fulfilled') {
          const weatherData = await spaceWeatherResponse.value.json();
          if (weatherData.success && weatherData.data) {
            if (weatherData.data.kp && weatherData.data.kp.length > 0) {
              const latestKp = weatherData.data.kp[0];
              if (latestKp.kp_index >= 5) {
                realNotifications.push({
                  id: `weather-${Date.now()}`,
                  type: 'warning',
                  title: 'Alerta de Clima Espacial',
                  message: `Tormenta geomagnética detectada - Índice Kp: ${latestKp.kp_index}`,
                  category: 'space-weather',
                  timestamp: new Date(),
                  read: false
                });
              }
            }
          }
        }

        // Procesar notificaciones de exoplanetas
        if (exoplanetResponse.status === 'fulfilled') {
          const exoplanetData = await exoplanetResponse.value.json();
          if (exoplanetData.success && exoplanetData.data) {
            const recentExoplanets = exoplanetData.data.slice(0, 1);
            recentExoplanets.forEach((exoplanet: any) => {
              realNotifications.push({
                id: `exoplanet-${exoplanet.pl_name}`,
                type: 'info',
                title: 'Nuevo Exoplaneta Descubierto',
                message: `${exoplanet.pl_name} - ${exoplanet.pl_rade} radios terrestres`,
                category: 'exoplanet',
                timestamp: new Date(),
                read: false
              });
            });
          }
        }

        setNotifications(realNotifications);
      } catch (error) {
        console.error('Error fetching real notifications:', error);
        setNotifications([]);
      }
    };

    fetchRealNotifications();
    
    // Actualizar notificaciones cada 10 minutos
    const interval = setInterval(fetchRealNotifications, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [settings.pushEnabled])

  const generateRandomNotification = (): Notification | null => {
    const notifications = [
      {
        type: 'warning' as const,
        title: 'Alerta de Clima Espacial',
        message: 'Tormenta solar detectada - posibles interrupciones en comunicaciones',
        category: 'space-weather' as const
      },
      {
        type: 'info' as const,
        title: 'Nuevo Exoplaneta Descubierto',
        message: 'K2-18b muestra signos prometedores de habitabilidad',
        category: 'exoplanet' as const
      },
      {
        type: 'error' as const,
        title: 'Asteroides Cercanos',
        message: '3 asteroides detectados en trayectoria cercana a la Tierra',
        category: 'asteroid' as const
      },
      {
        type: 'success' as const,
        title: 'Satelite en Orbita',
        message: 'Nuevo satelite Starlink desplegado exitosamente',
        category: 'satellite' as const
      }
    ]

    const random = Math.random()
    if (random < 0.3) {
      const notification = notifications[Math.floor(Math.random() * notifications.length)]
      return {
        id: Date.now().toString(),
        ...notification,
        timestamp: new Date(),
        read: false
      }
    }
    return null
  }

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getUnreadCount = () => notifications.filter(n => !n.read).length

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'error': return <X className="w-4 h-4 text-red-500" />
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Ahora'
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    return date.toLocaleDateString()
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notificaciones Avanzadas</h1>
          <p className="text-gray-600">Sistema de alertas en tiempo real</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Panel de Notificaciones</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSettings(prev => ({ ...prev, pushEnabled: !prev.pushEnabled }))}
                className={`p-2 rounded ${settings.pushEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                title={settings.pushEnabled ? 'Push habilitado' : 'Push deshabilitado'}
              >
                <Zap className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Configuración */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Configuración</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(settings.categories).map(([category, enabled]) => (
                <label key={category} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      categories: {
                        ...prev.categories,
                        [category]: e.target.checked
                      }
                    }))}
                    className="rounded"
                  />
                  <span className="capitalize">{category.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lista de notificaciones */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No hay notificaciones activas</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatTime(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Marcar como leída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedNotifications 