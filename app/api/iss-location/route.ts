import { NextRequest, NextResponse } from 'next/server';

// Cache simple en memoria
const cache = new Map();
const CACHE_DURATION = 30 * 1000; // 30 segundos

// Datos simulados de la ISS
const mockISSLocation = {
  message: "success",
  timestamp: Math.floor(Date.now() / 1000),
  iss_position: {
    latitude: "40.7128",
    longitude: "-74.0060"
  },
  velocity: "27600",
  altitude: "408",
  visibility: "day",
  footprint: "4000",
  daynum: 2460000,
  solar_lat: "0.0",
  solar_lon: "0.0",
  units: "kilometers"
};

export async function GET(request: NextRequest) {
  try {
    // Verificar cache
    const cacheKey = 'iss_location';
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data);
    }

    // Intentar obtener datos reales de la API de Open Notify
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      
      if (response.ok) {
        const data = await response.json();
        
        // Enriquecer los datos con información adicional
        const enrichedData = {
          ...data,
          velocity: "27600", // km/h aproximado
          altitude: "408", // km aproximado
          visibility: getVisibility(data.iss_position.latitude),
          footprint: "4000", // km aproximado
          daynum: Math.floor(Date.now() / 1000 / 86400) + 2440587.5,
          solar_lat: "0.0",
          solar_lon: "0.0",
          units: "kilometers",
          next_pass: calculateNextPass(data.iss_position.latitude, data.iss_position.longitude),
          statistics: {
            orbital_period: "92.68 minutos",
            inclination: "51.64°",
            apogee: "408 km",
            perigee: "400 km"
          }
        };

        // Cache de la respuesta exitosa
        cache.set(cacheKey, { data: enrichedData, timestamp: Date.now() });
        return NextResponse.json(enrichedData);
      }
    } catch (error) {
      console.warn('Error obteniendo datos reales de Open Notify, usando datos simulados:', error);
    }

    // Usar datos simulados si la API real falla
    const simulatedData = {
      ...mockISSLocation,
      timestamp: Math.floor(Date.now() / 1000),
      next_pass: calculateNextPass(mockISSLocation.iss_position.latitude, mockISSLocation.iss_position.longitude),
      statistics: {
        orbital_period: "92.68 minutos",
        inclination: "51.64°",
        apogee: "408 km",
        perigee: "400 km"
      },
      note: "Usando datos simulados - la API real no está disponible"
    };

    // Cache de datos simulados
    cache.set(cacheKey, { data: simulatedData, timestamp: Date.now() });
    return NextResponse.json(simulatedData);

  } catch (error) {
    console.error('Error en ISS Location API:', error);
    return NextResponse.json({ 
      error: 'Error obteniendo ubicación de la ISS',
      details: error 
    }, { status: 500 });
  }
}

// Funciones auxiliares
function getVisibility(latitude: string): string {
  const lat = parseFloat(latitude);
  const now = new Date();
  const hour = now.getHours();
  
  // Simulación simple de visibilidad
  if (hour >= 6 && hour <= 18) {
    return "day";
  } else {
    return "night";
  }
}

function calculateNextPass(latitude: string, longitude: string): any {
  const now = new Date();
  const nextPass = new Date(now.getTime() + 90 * 60 * 1000); // 90 minutos después
  
  return {
    risetime: Math.floor(nextPass.getTime() / 1000),
    duration: 600, // 10 minutos
    location: {
      latitude: parseFloat(latitude) + (Math.random() - 0.5) * 10,
      longitude: parseFloat(longitude) + (Math.random() - 0.5) * 10
    }
  };
} 