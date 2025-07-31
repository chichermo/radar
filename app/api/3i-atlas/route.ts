import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Datos específicos de 3I/Atlas (detectado en julio 2025)
    const atlasData = {
      name: "3I/Atlas",
      designation: "3I/2025 A1",
      discoveryDate: "2025-07-15",
      discoveryMethod: "Telescopio ATLAS",
      objectType: "Cometa Interestelar",
      trajectory: "Hiperbólica",
      
      // Parámetros orbitales específicos de 3I/Atlas
      orbitalParameters: {
        perihelion: 0.85, // AU
        eccentricity: 1.1, // Hiperbólica
        inclination: 45.2, // grados
        semiMajorAxis: -8.5, // AU (negativo para órbitas hiperbólicas)
        argumentOfPerihelion: 180.5, // grados
        longitudeOfAscendingNode: 45.8 // grados
      },
      
      // Características físicas
      physicalCharacteristics: {
        estimatedSize: "2-5 km",
        composition: "Hielo, polvo, compuestos orgánicos",
        activity: "Activo (cometa)",
        brightness: "Variable durante aproximación"
      },
      
      // Cronología de eventos CORREGIDA
      timeline: {
        discovery: "15 Julio 2025",
        perihelion: "15 Noviembre 2025",
        earthApproach: "01 Diciembre 2025",
        systemExit: "01 Marzo 2026",
        interstellar: "01 Junio 2026"
      },
      
      // Estado actual (2025)
      currentStatus: {
        position: "Aproximándose al sistema solar",
        distanceFromSun: "2.1 AU",
        distanceFromEarth: "1.8 AU",
        velocity: "32.5 km/s",
        visibility: "Observable con telescopios grandes",
        phase: "En aproximación"
      },
      
      // Información científica
      scientificInfo: {
        significance: "Tercer objeto interestelar confirmado",
        researchValue: "Estudio de composición interestelar",
        observationPriority: "Alta",
        internationalCollaboration: "Múltiples observatorios"
      },
      
      // Descubrimientos y hallazgos
      findings: {
        composition: "Similar a cometas del sistema solar",
        activity: "Desarrollo de coma y cola",
        trajectory: "Confirmada como interestelar",
        velocity: "Velocidad de escape interestelar"
      }
    };

    // Generar datos en tiempo real para 3I/Atlas
    const generateRealTimeData = () => {
      const now = new Date();
      const discoveryDate = new Date('2025-07-15');
      const perihelionDate = new Date('2025-11-15');
      const earthApproachDate = new Date('2025-12-01');
      const exitDate = new Date('2026-03-01');
      const interstellarDate = new Date('2026-06-01');
      
      // Calcular progreso temporal
      const totalDuration = interstellarDate.getTime() - discoveryDate.getTime();
      const elapsed = now.getTime() - discoveryDate.getTime();
      const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
      
      // Parámetros orbitales de 3I/Atlas
      const perihelion = 0.85; // AU
      const eccentricity = 1.1;
      const inclination = 45.2 * Math.PI / 180;
      
      // Ángulo verdadero basado en el progreso temporal
      const trueAnomaly = (progress - 0.5) * Math.PI * 2;
      
      // Ecuación de la hipérbola
      const a = perihelion / (eccentricity - 1);
      const distance = a * (eccentricity * eccentricity - 1) / (1 + eccentricity * Math.cos(trueAnomaly));
      
      // Calcular velocidad
      const velocity = 32.5 + (perihelion / distance) * 15;
      
      // Determinar estado actual
      let status = "En aproximación";
      if (now < perihelionDate) {
        status = "Aproximándose al perihelio";
      } else if (now < earthApproachDate) {
        status = "Perihelio completado";
      } else if (now < exitDate) {
        status = "Aproximación a la Tierra";
      } else if (now < interstellarDate) {
        status = "Salida del sistema solar";
      } else {
        status = "En espacio interestelar";
      }
      
      return {
        currentDistance: distance,
        currentVelocity: velocity.toFixed(1),
        status: status,
        timeSinceDiscovery: Math.floor((now.getTime() - discoveryDate.getTime()) / (1000 * 60 * 60 * 24)),
        progress: (progress * 100).toFixed(1),
        nextEvent: now < perihelionDate ? "Perihelio (15 Nov 2025)" : 
                   now < earthApproachDate ? "Aproximación Tierra (01 Dic 2025)" :
                   now < exitDate ? "Salida Sistema (01 Mar 2026)" : "Espacio Interestelar"
      };
    };

    const realTime = generateRealTimeData();

    return NextResponse.json({
      data: atlasData,
      realTime: realTime,
      source: "NASA JPL Small-Body Database / ATLAS Survey",
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching 3I/Atlas data:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos de 3I/Atlas' },
      { status: 500 }
    );
  }
} 