"use client";

import React, { useState } from 'react';
import { Bell, Settings, Filter, Trash2, CheckCircle, AlertTriangle, Info, Star, Zap, Eye, Camera, Satellite } from 'lucide-react';
import { NotificationBell, useNotifications } from '@/components/NotificationService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll, unreadCount } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      case 'discovery':
        return <Star className="h-5 w-5 text-gold-400" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10';
      case 'error':
        return 'border-red-500/20 bg-red-500/10';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10';
      case 'discovery':
        return 'border-gold-500/20 bg-gold-500/10';
      default:
        return 'border-gray-500/20 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
                <Bell className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Notificaciones</h1>
                <p className="text-gray-400">Gestiona tus alertas y notificaciones del sistema</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{notifications.length}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
                <Bell className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{unreadCount}</div>
                  <div className="text-sm text-gray-400">No leídas</div>
                </div>
                <Eye className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {notifications.filter(n => n.type === 'discovery').length}
                  </div>
                  <div className="text-sm text-gray-400">Descubrimientos</div>
                </div>
                <Star className="h-6 w-6 text-gold-400" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {notifications.filter(n => n.type === 'error').length}
                  </div>
                  <div className="text-sm text-gray-400">Errores</div>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Configuración */}
        {showSettings && (
          <Card className="bg-gray-800/50 border-gray-700/50 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Configuración de Notificaciones</CardTitle>
              <CardDescription className="text-gray-400">
                Personaliza cómo recibes las notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Tipos de notificaciones</h4>
                  <div className="space-y-3">
                    {['success', 'warning', 'error', 'info', 'discovery'].map(type => (
                      <label key={type} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Configuración de alertas</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">Notificaciones push</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">Sonidos de alerta</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">Vibración en móvil</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtros y acciones */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="all">Todas las notificaciones</option>
              <option value="unread">No leídas</option>
              <option value="success">Éxito</option>
              <option value="warning">Advertencias</option>
              <option value="error">Errores</option>
              <option value="info">Información</option>
              <option value="discovery">Descubrimientos</option>
            </select>
            
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
            >
              Marcar todas como leídas
            </button>
          </div>
          
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
          >
            Limpiar todas
          </button>
        </div>

        {/* Lista de notificaciones */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No hay notificaciones</h3>
              <p className="text-gray-400">No tienes notificaciones que coincidan con los filtros seleccionados.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all ${
                  !notification.read ? 'bg-white/10' : 'bg-white/5'
                } ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    
                    {notification.action && (
                      <button
                        onClick={notification.action.onClick}
                        className="text-xs text-blue-400 hover:text-blue-300 mt-2"
                      >
                        {notification.action.label}
                      </button>
                    )}
                  </div>
                  
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Marcar como leída
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 