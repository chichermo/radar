import { useEffect, useRef } from 'react';

/* Agregar una interfaz para el tipo de señal (Signal) */
interface Signal {
  id: string;
  /* Agrega aquí los campos que se esperan de cada señal */
}

/* Actualizar la firma del hook para usar la interfaz Signal en lugar de any */
export default function useSignalAlerts(signals: Signal[]) {
  const previousCount = useRef(0);

  useEffect(() => {
    if (signals.length > previousCount.current) {
      const newSignals = signals.length - previousCount.current;
      console.log(`🔔 Se detectaron ${newSignals} señales nuevas`);

      if (Notification.permission === "granted") {
        new Notification("🚨 Nuevas señales detectadas", {
          body: `${newSignals} nuevas señales no identificadas.`,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("🚨 Nuevas señales detectadas", {
              body: `${newSignals} nuevas señales no identificadas.`,
            });
          }
        });
      }
    }

    previousCount.current = signals.length;
  }, [signals]);
}
