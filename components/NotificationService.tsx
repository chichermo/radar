"use client";

import { useEffect, useState } from 'react';

interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
}

export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    if (this.permission === 'denied') {
      console.warn('Permisos de notificación denegados');
      return false;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  async sendNotification(data: NotificationData): Promise<void> {
    if (!await this.requestPermission()) {
      return;
    }

    const notification = new Notification(data.title, {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: data.badge || '/icon-192x192.png',
      tag: data.tag,
      data: data.data,
      requireInteraction: false,
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      notification.close();
    }, 5000);
  }

  async sendSpaceAlert(type: 'collision' | 'new_object' | 'anomaly' | 'weather', data: any): Promise<void> {
    const alerts = {
      collision: {
        title: '🚨 Alerta de Colisión Espacial',
        body: `Posible colisión detectada entre ${data.object1} y ${data.object2}`,
        tag: 'collision-alert'
      },
      new_object: {
        title: '🛰️ Nuevo Objeto Espacial',
        body: `Se ha detectado un nuevo ${data.type}: ${data.name}`,
        tag: 'new-object'
      },
      anomaly: {
        title: '⚠️ Señal Anómala',
        body: `Señal inusual detectada en ${data.location}`,
        tag: 'anomaly'
      },
      weather: {
        title: '🌞 Alerta del Clima Espacial',
        body: `${data.event} detectado - ${data.description}`,
        tag: 'space-weather'
      }
    };

    const alert = alerts[type];
    await this.sendNotification({
      ...alert,
      data
    });
  }
}

// Hook para usar notificaciones
export function useNotifications() {
  const [service] = useState(() => NotificationService.getInstance());
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    const granted = await service.requestPermission();
    setPermission(Notification.permission);
    return granted;
  };

  const sendNotification = (data: NotificationData) => {
    return service.sendNotification(data);
  };

  const sendSpaceAlert = (type: 'collision' | 'new_object' | 'anomaly' | 'weather', data: any) => {
    return service.sendSpaceAlert(type, data);
  };

  return {
    permission,
    requestPermission,
    sendNotification,
    sendSpaceAlert
  };
} 