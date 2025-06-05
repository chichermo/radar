// components/Dashboard.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card } from './ui/Card'
import { ErrorAlert } from './ui/ErrorAlert'
import { LoadingSpinner } from './ui/LoadingSpinner'
import Globe from './Globe'
import SkyMap from './SkyMap'
import useSignalAlerts from '../hooks/useSignalAlerts'

interface HeavensData {
  data?: {
    passes?: Array<{
      satName: string;
      startTime: string;
      endTime: string;
      maxElevation: number;
    }>;
  };
  error?: string;
}

interface SatnogsData {
  data?: {
    signals?: Array<{
      id: string;
      frequency: number;
      timestamp: string;
      description: string;
    }>;
  };
  error?: string;
}

// Mock data para el Globe
const mockTLEObjects = [
  {
    TLE_LINE1: "1 25544U 98067A   20123.45678901  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "ISS (ZARYA)"
  }
];

export default function Dashboard() {
  const [heavensData, setHeavensData] = useState<HeavensData | null>(null);
  const [satnogsData, setSatnogsData] = useState<SatnogsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [heavensRes, satnogsRes] = await Promise.all([
          fetch('/api/heavens'),
          fetch('/api/satnogs')
        ]);

        if (!heavensRes.ok) throw new Error('Error al obtener datos de Heavens-Above');
        if (!satnogsRes.ok) throw new Error('Error al obtener datos de SatNOGS');

        const [heavens, satnogs] = await Promise.all([
          heavensRes.json(),
          satnogsRes.json()
        ]);

        setHeavensData(heavens);
        setSatnogsData(satnogs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHeavensData({ error: (error as Error).message });
        setSatnogsData({ error: (error as Error).message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useSignalAlerts(satnogsData?.data?.signals || []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary-light">Radar de Anomalías Espaciales</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Plataforma de monitoreo en tiempo real de objetos espaciales y señales anómalas. Visualiza la posición de satélites, observa el cielo, consulta próximos eventos y recibe alertas automáticas de nuevas señales detectadas.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Visualización Orbital">
          <p className="mb-2 text-gray-300 text-sm">
            Muestra la posición actual de satélites en órbita terrestre usando datos TLE (Two-Line Element). Ideal para monitoreo profesional y educativo.
          </p>
          <Globe objects={mockTLEObjects} />
        </Card>
        <Card title="Mapa del Cielo (SkyMap)">
          <p className="mb-2 text-gray-300 text-sm">
            Visualiza los objetos espaciales como puntos en el cielo. Útil para aficionados a la astronomía y para el monitoreo visual de eventos espaciales. El mapa es generado en tiempo real y se adapta al tamaño de la ventana.
          </p>
          <SkyMap objects={mockTLEObjects} />
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Próximos Pasos Satelitales">
          <p className="mb-2 text-gray-300 text-sm">
            Lista los próximos eventos de paso de satélites visibles desde la ubicación seleccionada. Permite planificar observaciones y experimentos.
          </p>
          {heavensData?.error ? (
            <ErrorAlert message={heavensData.error} />
          ) : (
            <div className="space-y-2">
              {heavensData?.data?.passes?.map((pass, index) => (
                <div key={index} className="p-2 bg-white/5 rounded">
                  <p className="font-medium">{pass.satName}</p>
                  <p className="text-sm text-gray-400">
                    Inicio: {new Date(pass.startTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Máxima elevación: {pass.maxElevation}°
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card title="Señales Detectadas">
          <p className="mb-2 text-gray-300 text-sm">
            Monitorea señales de radiofrecuencia captadas por estaciones terrestres. Muestra frecuencia, hora y descripción de cada señal. El sistema te alertará automáticamente cuando se detecten nuevas señales.
          </p>
          {satnogsData?.error ? (
            <ErrorAlert message={satnogsData.error} />
          ) : (
            <div className="space-y-2">
              {satnogsData?.data?.signals?.map((signal) => (
                <div key={signal.id} className="p-2 bg-white/5 rounded">
                  <p className="font-medium">Frecuencia: {signal.frequency} MHz</p>
                  <p className="text-sm text-gray-400">
                    Detectado: {new Date(signal.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">{signal.description}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="mt-10">
        <Card title="¿Qué más puedes agregar?">
          <ul className="list-disc pl-6 text-gray-300 text-sm space-y-1">
            <li><b>Mapa de calor de actividad de señales:</b> Visualiza en un mapa la intensidad/frecuencia de señales detectadas por región.</li>
            <li><b>Historial de anomalías:</b> Un timeline o tabla con eventos históricos detectados.</li>
            <li><b>Alertas configurables:</b> Permite definir umbrales para recibir notificaciones personalizadas.</li>
            <li><b>Panel de configuración:</b> Cambia parámetros como ubicación, tipo de satélites, bandas de frecuencia, etc.</li>
            <li><b>Integración con APIs de clima espacial:</b> Muestra alertas de tormentas solares o actividad geomagnética.</li>
          </ul>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <Card title="Imagen del Día (NASA APOD)">
          <p className="mb-2 text-gray-300 text-sm">
            Descubre la imagen astronómica del día seleccionada por la NASA. Inspiración diaria para astrónomos y entusiastas del espacio.
          </p>
          <a href="/nasa-apod" className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Ver Imagen</a>
        </Card>
        <Card title="Asteroides Cercanos (NEO)">
          <p className="mb-2 text-gray-300 text-sm">
            Consulta información sobre asteroides cercanos a la Tierra, trayectorias y riesgos potenciales. Datos en tiempo real de la NASA.
          </p>
          <a href="/asteroids" className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Ver Asteroides</a>
        </Card>
        <Card title="Clima Espacial">
          <p className="mb-2 text-gray-300 text-sm">
            Monitorea la actividad solar, tormentas geomagnéticas y alertas de clima espacial que pueden afectar satélites y comunicaciones.
          </p>
          <a href="/space-weather" className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Ver Clima Espacial</a>
        </Card>
        <Card title="Basura Espacial">
          <p className="mb-2 text-gray-300 text-sm">
            Visualiza y estudia la distribución de basura espacial en órbita. Información clave para la seguridad espacial y la investigación.
          </p>
          <a href="/space-debris" className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Ver Basura Espacial</a>
        </Card>
        <Card title="SETI: Inteligencia Extraterrestre">
          <p className="mb-2 text-gray-300 text-sm">
            Explora señales y hallazgos del proyecto SETI. Accede a datos de radio y anomalías en la búsqueda de vida inteligente.
          </p>
          <a href="/seti" className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Ver SETI</a>
        </Card>
        <Card title="Hallazgos Arqueológicos">
          <p className="mb-2 text-gray-300 text-sm">
            Descubre artefactos y noticias arqueológicas relevantes para la ciencia espacial y la historia humana.
          </p>
          <a href="/archaeology" className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Ver Hallazgos</a>
        </Card>
      </section>
    </div>
  );
}