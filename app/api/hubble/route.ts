import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Datos simulados del estado del Hubble basados en información real
    const hubbleStatus = {
      status: {
        telescope: "Operativo",
        temperature: "-90°C",
        power: "95%",
        uptime: "34+ años",
        orbit: "LEO - 547 km"
      },
      currentObservation: {
        target: "NGC 346",
        instrument: "WFC3",
        exposure: "1200s",
        progress: 75,
        coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
        description: "Cúmulo estelar en la Pequeña Nube de Magallanes",
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2024/03/hubble-ngc346.jpg"
      }
    };

    return NextResponse.json({
      success: true,
      data: hubbleStatus
    });

  } catch (error) {
    console.error('Error fetching Hubble status:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch Hubble status'
    });
  }
} 