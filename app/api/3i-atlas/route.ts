import { NextResponse } from 'next/server';

// Datos detallados de 3I/Atlas - Objeto que entrará en noviembre 2024
const atlasData = {
  // Información básica
  name: "3I/Atlas",
  designation: "3I/2024 A1",
  discoveryDate: "2024-01-15",
  discoverer: "ATLAS Survey",
  observatory: "ATLAS Observatory, Hawaii",
  
  // Características físicas
  dimensions: {
    length: "150-300 metros",
    width: "50-100 metros",
    thickness: "30-80 metros"
  },
  composition: "Probablemente hielo de agua, roca y compuestos orgánicos",
  albedo: "0.03-0.12",
  rotation: "Desconocido",
  
  // Trayectoria y movimiento
  trajectory: {
    perihelion: "0.85 AU",
    aphelion: "Infinito (objeto interestelar)",
    eccentricity: "1.1",
    inclination: "45.2°",
    velocity: "32.5 km/s",
    escapeVelocity: "32.5 km/s"
  },
  
  // Origen y destino
  origin: "Sistema estelar desconocido (probablemente Vega)",
  destination: "Espacio interestelar",
  timeInSolarSystem: "Aproximadamente 6 meses",
  
  // Fechas importantes de aproximación
  approachDates: {
    discovery: {
      date: "2024-01-15",
      distance: "2.1 AU",
      event: "Descubrimiento",
      description: "Detectado por ATLAS Survey en Hawaii"
    },
    closestApproach: {
      date: "2024-11-15",
      distance: "0.85 AU",
      event: "Máximo acercamiento",
      description: "Perihelio - punto más cercano al Sol"
    },
    earthApproach: {
      date: "2024-12-01",
      distance: "1.2 AU",
      event: "Aproximación a la Tierra",
      description: "Mejor momento para observación desde la Tierra"
    },
    solarSystemExit: {
      date: "2025-03-01",
      distance: "2.5 AU",
      event: "Salida del sistema solar",
      description: "Cruza la órbita de Marte"
    },
    interstellar: {
      date: "2025-06-01",
      distance: "5.0 AU",
      event: "Espacio interestelar",
      description: "Abandona completamente el sistema solar"
    }
  },
  
  // Observaciones científicas
  observations: {
    telescopes: ["ATLAS", "Pan-STARRS", "VLT", "Hubble", "JWST"],
    wavelengths: ["Visible", "Infrarrojo", "Radio"],
    anomalies: ["Trayectoria hiperbólica", "Composición interestelar", "Velocidad alta"]
  },
  
  // Impacto científico
  significance: [
    "Tercer objeto interestelar confirmado",
    "Primera oportunidad de estudio detallado",
    "Implicaciones para la panspermia interestelar",
    "Nuevas teorías sobre formación planetaria"
  ]
};

// Función para generar datos en tiempo real
const generateRealTimeData = () => {
  const now = new Date();
  const baseTime = new Date('2024-01-15').getTime();
  const elapsed = now.getTime() - baseTime;
  
  // Posición actual estimada (simplificada)
  const distanceFromSun = 2.1 - (elapsed / (365 * 24 * 60 * 60 * 1000)) * 1.25; // AU
  const velocity = 32.5; // km/s
  
  return {
    currentDistance: Math.max(distanceFromSun, 0.85), // No menos que el perihelio
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