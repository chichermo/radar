import { NextResponse } from 'next/server';

// Datos detallados de 3I/Atlas (Oumuamua)
const atlasData = {
  // Información básica
  name: "3I/Atlas (Oumuamua)",
  designation: "1I/2017 U1",
  discoveryDate: "2017-10-19",
  discoverer: "Pan-STARRS 1",
  observatory: "Haleakalā Observatory, Hawaii",
  
  // Características físicas
  dimensions: {
    length: "400-800 metros",
    width: "35-167 metros",
    thickness: "35-167 metros"
  },
  composition: "Hielo de agua con recubrimiento orgánico",
  albedo: "0.1-0.2",
  rotation: "7.3 horas",
  
  // Trayectoria y movimiento
  trajectory: {
    perihelion: "0.255 AU",
    aphelion: "Infinito (objeto interestelar)",
    eccentricity: "1.2",
    inclination: "122.7°",
    velocity: "26.33 km/s",
    escapeVelocity: "26.33 km/s"
  },
  
  // Origen y destino
  origin: "Sistema estelar desconocido",
  destination: "Espacio interestelar",
  timeInSolarSystem: "Aproximadamente 1 año",
  
  // Fechas importantes de aproximación
  approachDates: {
    discovery: {
      date: "2017-10-19",
      distance: "0.25 AU",
      event: "Descubrimiento",
      description: "Primera detección por Pan-STARRS 1"
    },
    closestApproach: {
      date: "2017-11-01",
      distance: "0.3 AU",
      event: "Máximo acercamiento",
      description: "Perihelio alcanzado"
    },
    earthApproach: {
      date: "2017-12-01",
      distance: "0.5 AU",
      event: "Aproximación a la Tierra",
      description: "Última observación cercana"
    },
    solarSystemExit: {
      date: "2018-01-01",
      distance: "1.0 AU",
      event: "Salida del sistema solar",
      description: "Cruza la órbita de Júpiter"
    },
    interstellar: {
      date: "2020-01-01",
      distance: "5.0 AU",
      event: "Espacio interestelar",
      description: "Abandona completamente el sistema solar"
    }
  },
  
  // Observaciones científicas
  observations: {
    telescopes: ["Pan-STARRS", "VLT", "Hubble", "Spitzer", "ALMA"],
    wavelengths: ["Visible", "Infrarrojo", "Radio"],
    anomalies: ["Aceleración no gravitacional", "Forma elongada", "Rotación compleja"]
  },
  
  // Impacto científico
  significance: [
    "Primer objeto interestelar confirmado",
    "Evidencia de objetos interestelares en el sistema solar",
    "Implicaciones para la panspermia",
    "Nuevas teorías sobre formación planetaria"
  ]
};

// Función para generar datos en tiempo real
const generateRealTimeData = () => {
  const now = new Date();
  const baseTime = new Date('2017-10-19').getTime();
  const elapsed = now.getTime() - baseTime;
  
  // Posición actual estimada (simplificada)
  const distanceFromSun = 20 + (elapsed / (365 * 24 * 60 * 60 * 1000)) * 5; // AU
  const velocity = 26.33; // km/s
  
  return {
    currentDistance: distanceFromSun,
    currentVelocity: velocity,
    timeSinceDiscovery: elapsed / (24 * 60 * 60 * 1000), // días
    estimatedPosition: {
      ra: 280 + (elapsed / (365 * 24 * 60 * 60 * 1000)) * 0.1,
      dec: -40 + (elapsed / (365 * 24 * 60 * 60 * 1000)) * 0.05
    },
    lastUpdated: now.toISOString()
  };
};

export async function GET() {
  try {
    const realTimeData = generateRealTimeData();
    
    return NextResponse.json({
      success: true,
      data: {
        ...atlasData,
        realTime: realTimeData
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'No se pudieron obtener datos de 3I/Atlas' 
      }, 
      { status: 500 }
    );
  }
} 