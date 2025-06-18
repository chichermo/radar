// components/Dashboard.tsx
'use client'

import { useEffect, useState } from 'react'
import CardComponents from './ui/card2'
import { ErrorAlert } from './ui/ErrorAlert'
import LoadingSpinner from './ui/LoadingSpinner'
import Globe from './Globe'
import SkyMap from './SkyMap'
import useSignalAlerts from '../hooks/useSignalAlerts'
import { formatDate } from '@/utils/formatters'
import { useMenuCategories } from '@/lib/menu-categories'
import type { MenuCategory } from '@/types/menu'
import Sidebar from './Sidebar'

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

// Mock data para el Globe (formato TLE)
const mockTLEObjects = [
  {
    TLE_LINE1: "1 25544U 98067A   20123.45678901  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "ISS (ZARYA)"
  }
];

// Mock data para SkyMap (formato SpaceObject)
const mockSpaceObjects = [
  {
    id: "25544",
    name: "ISS (ZARYA)",
    type: "satellite" as const,
    position: {
      x: 400000, // km desde el centro de la Tierra
      y: 200000,
      z: 100000
    },
    velocity: {
      x: 7.7, // km/s
      y: 0.0,
      z: 0.0
    },
    size: {
      min: 0.1,
      max: 0.1
    },
    isHazardous: false,
    orbit: {
      semiMajorAxis: 6778,
      eccentricity: 0.0001,
      inclination: 51.6
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "33591",
    name: "STARLINK-1234",
    type: "satellite" as const,
    position: {
      x: 350000,
      y: 250000,
      z: 150000
    },
    velocity: {
      x: 7.5,
      y: 0.2,
      z: 0.1
    },
    size: {
      min: 0.05,
      max: 0.05
    },
    isHazardous: false,
    orbit: {
      semiMajorAxis: 6928,
      eccentricity: 0.0002,
      inclination: 53.0
    },
    lastUpdated: new Date().toISOString()
  }
];

const { Card } = CardComponents;

export default function Dashboard() {
  const [heavensData, setHeavensData] = useState<HeavensData | null>(null);
  const [satnogsData, setSatnogsData] = useState<SatnogsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener las categorías del menú usando el hook correcto
  const menuCategories = useMenuCategories();

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
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error fetching data:', errorMessage);
        setError(`Error al cargar datos: ${errorMessage}`);
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

      {/* Renderizar todas las páginas del menú como tarjetas agrupadas por categoría */}
      <div className="space-y-10">
        {menuCategories.map((category: MenuCategory) => (
          <section key={category.title}>
            <h2 className="text-2xl font-semibold mb-4 text-primary-light">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <Card key={item.href} title={item.title}>
                  <p className="mb-2 text-gray-300 text-sm">{item.description}</p>
                  <a href={item.href} className="inline-block mt-2 px-4 py-2 bg-primary-light text-white rounded hover:scale-105 hover:bg-primary transition">Explorar</a>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}