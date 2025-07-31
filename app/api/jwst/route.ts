import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Datos simulados del estado del JWST basados en información real
    const jwstStatus = {
      status: {
        telescope: "Operativo",
        temperature: "-233°C",
        power: "98%",
        fuel: "Adecuado para 20+ años",
        orbit: "L2 - 1.5 millones km",
        distance: "1.5 millones km de la Tierra"
      },
      currentObservation: {
        target: "NGC 346",
        instrument: "NIRCam",
        exposure: "2400s",
        progress: 65,
        coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
        description: "Cúmulo estelar en la Pequeña Nube de Magallanes",
        imageUrl: "https://cdn.pixabay.com/photo/2016/10/20/18/35/galaxy-1756274_960_720.jpg"
      }
    };

    return NextResponse.json({
      success: true,
      data: jwstStatus
    });

  } catch (error) {
    console.error('Error fetching JWST status:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch JWST status'
    });
  }
} 