"use client";

import type { SpaceObject } from '@/types/space';
import * as satellite from 'satellite.js';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const SPACE_TRACK_USERNAME = process.env.NEXT_PUBLIC_SPACE_TRACK_USERNAME;
const SPACE_TRACK_PASSWORD = process.env.NEXT_PUBLIC_SPACE_TRACK_PASSWORD;

interface JWSTImage {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  type: 'science' | 'engineering' | 'test';
}

interface JWSTStatus {
  temperature: {
    primary: number;
    secondary: number;
    instruments: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  fuel: number;
  status: 'operational' | 'maintenance' | 'calibration';
  lastUpdate: string;
}

async function fetchNearEarthAsteroids(): Promise<SpaceObject[]> {
  if (!NASA_API_KEY) {
    throw new Error('NASA API key no configurada');
  }

  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  const endDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];

  try {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener datos de asteroides: ${response.statusText}`);
    }

    const data = await response.json();
    const asteroids: SpaceObject[] = [];

    Object.values(data.near_earth_objects).forEach((dayAsteroids: unknown) => {
      if (Array.isArray(dayAsteroids)) {
        dayAsteroids.forEach((asteroid: any) => {
          try {
            const closeApproach = asteroid.close_approach_data?.[0];
            if (!closeApproach) {
              console.warn(`Asteroid ${asteroid.id} no tiene datos de acercamiento`);
              return;
            }

            const orbitalData = asteroid.orbital_data || {};
            const semiMajorAxis = parseFloat(orbitalData.semi_major_axis || '0');
            const eccentricity = parseFloat(orbitalData.eccentricity || '0');
            const inclination = parseFloat(orbitalData.inclination || '0');

            asteroids.push({
              id: asteroid.id,
              name: asteroid.name,
              type: 'asteroid',
              position: {
                x: parseFloat(closeApproach.miss_distance?.kilometers || '0'),
                y: 0,
                z: 0
              },
              velocity: {
                x: parseFloat(closeApproach.relative_velocity?.kilometers_per_hour || '0'),
                y: 0,
                z: 0
              },
              size: {
                min: asteroid.estimated_diameter?.meters?.estimated_diameter_min || 0,
                max: asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0
              },
              isHazardous: asteroid.is_potentially_hazardous_asteroid || false,
              orbit: {
                semiMajorAxis,
                eccentricity,
                inclination
              },
              lastUpdated: new Date().toISOString()
            });
          } catch (error) {
            console.warn(`Error al procesar asteroide ${asteroid.id}:`, error);
          }
        });
      }
    });

    return asteroids;
  } catch (error) {
    console.error('Error al obtener datos de asteroides:', error);
    throw error;
  }
}

export async function fetchSpaceTrackObjects(): Promise<SpaceObject[]> {
  try {
    const res = await fetch('/api/space-track');
    if (!res.ok) {
      throw new Error('No se pudo obtener datos de Space-Track');
    }
    const data = await res.json();
    // Procesar los datos TLE como antes
    const satellites: SpaceObject[] = [];
    const now = new Date();
    data.forEach((item: any) => {
      try {
        const satrec = satellite.twoline2satrec(item.TLE_LINE1, item.TLE_LINE2);
        const positionAndVelocity = satellite.propagate(satrec, now);
        if (!positionAndVelocity || !positionAndVelocity.position || !positionAndVelocity.velocity) {
          console.warn(`No se pudo calcular la posición para ${item.NORAD_CAT_ID}`);
          return;
        }
        const position = {
          x: positionAndVelocity.position.x * 1000,
          y: positionAndVelocity.position.y * 1000,
          z: positionAndVelocity.position.z * 1000
        };
        const velocity = {
          x: positionAndVelocity.velocity.x * 1000,
          y: positionAndVelocity.velocity.y * 1000,
          z: positionAndVelocity.velocity.z * 1000
        };
        satellites.push({
          id: item.NORAD_CAT_ID.toString(),
          name: item.OBJECT_NAME || `Satélite ${item.NORAD_CAT_ID}`,
          type: 'satellite',
          position,
          velocity,
          size: {
            min: 1,
            max: 10
          },
          isHazardous: false,
          orbit: {
            semiMajorAxis: satrec.a * 1000,
            eccentricity: satrec.ecco,
            inclination: satrec.inclo * (180 / Math.PI)
          },
          lastUpdated: now.toISOString()
        });
      } catch (error) {
        console.warn(`Error al procesar TLE para ${item.NORAD_CAT_ID}:`, error);
      }
    });
    return satellites;
  } catch (error) {
    console.error('Error al obtener datos espaciales:', error);
    throw error;
  }
}

export async function fetchAllSpaceObjects(): Promise<SpaceObject[]> {
  try {
    const [asteroids, satellites] = await Promise.all([
      fetchNearEarthAsteroids(),
      fetchSpaceTrackObjects()
    ]);

    return [...asteroids, ...satellites];
  } catch (error) {
    console.error('Error al obtener datos espaciales:', error);
    throw error;
  }
}

export async function fetchJWSTImages(): Promise<JWSTImage[]> {
  if (!NASA_API_KEY) {
    throw new Error('NASA API key no configurada');
  }

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`
  );

  if (!response.ok) {
    throw new Error('Error al obtener imágenes del JWST');
  }

  const data = await response.json();
  return data
    .filter((item: any) => item.copyright?.includes('JWST'))
    .map((item: any) => ({
      id: item.date,
      title: item.title,
      description: item.explanation,
      url: item.url,
      date: item.date,
      type: 'science'
    }));
}

export async function fetchJWSTStatus(): Promise<JWSTStatus> {
  // Por ahora retornamos datos de ejemplo
  // En el futuro, esto podría integrarse con la API de NASA para datos en tiempo real
  return {
    temperature: {
      primary: -233,
      secondary: -223,
      instruments: -233
    },
    position: {
      x: 1.5e6,
      y: 0,
      z: 1.5e6
    },
    fuel: 95,
    status: 'operational',
    lastUpdate: new Date().toISOString()
  };
} 