"use client";

import { JWSTImage, JWSTStatus } from '@/types/space';

// Función para obtener las últimas imágenes del JWST
export async function fetchJWSTImages(): Promise<JWSTImage[]> {
  try {
    // TODO: Implementar la integración real con la API del JWST cuando esté disponible
    // Por ahora, usamos datos de ejemplo
    return [
      {
        id: '1',
        title: 'Nebulosa del Anillo Sur',
        description: 'Una vista detallada de la Nebulosa del Anillo Sur, capturada por el JWST en el infrarrojo cercano.',
        url: 'https://stsci-opo.org/STScI-01G8JJANBDS25QK2YJAHBPST1F.png',
        date: new Date('2024-02-20'),
        type: 'nebulosa'
      },
      {
        id: '2',
        title: 'Quinteto de Stephan',
        description: 'Una vista sin precedentes del Quinteto de Stephan, mostrando interacciones galácticas en detalle.',
        url: 'https://stsci-opo.org/STScI-01G8JJANBDS25QK2YJAHBPST1F.png',
        date: new Date('2024-02-19'),
        type: 'galaxia'
      }
    ];
  } catch (error) {
    console.error('Error al obtener imágenes del JWST:', error);
    throw new Error('No se pudieron obtener las imágenes del JWST');
  }
}

// Función para obtener el estado actual del JWST
export async function fetchJWSTStatus(): Promise<JWSTStatus> {
  try {
    // TODO: Implementar la integración real con la API del JWST cuando esté disponible
    // Por ahora, usamos datos de ejemplo
    return {
      temperature: {
        primary: -233, // Celsius
        secondary: -233,
        instruments: -233
      },
      position: {
        x: 1.5e6, // km desde la Tierra
        y: 1.5e6,
        z: 1.5e6
      },
      fuel: 95, // porcentaje
      status: 'operativo',
      lastUpdate: new Date()
    };
  } catch (error) {
    console.error('Error al obtener el estado del JWST:', error);
    throw new Error('No se pudo obtener el estado del JWST');
  }
}

// Función para obtener los últimos descubrimientos
export async function fetchJWSTDiscoveries(): Promise<Array<{
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
}>> {
  try {
    // TODO: Implementar la integración real con la API del JWST cuando esté disponible
    // Por ahora, usamos datos de ejemplo
    return [
      {
        id: '1',
        title: 'Nuevas galaxias tempranas',
        description: 'El JWST ha descubierto galaxias que existieron solo 300 millones de años después del Big Bang.',
        date: new Date('2024-02-20'),
        category: 'cosmología'
      },
      {
        id: '2',
        title: 'Composición atmosférica de exoplanetas',
        description: 'Análisis detallado de la atmósfera de varios exoplanetas revela posibles indicadores de habitabilidad.',
        date: new Date('2024-02-19'),
        category: 'exoplanetas'
      }
    ];
  } catch (error) {
    console.error('Error al obtener descubrimientos del JWST:', error);
    throw new Error('No se pudieron obtener los descubrimientos del JWST');
  }
} 