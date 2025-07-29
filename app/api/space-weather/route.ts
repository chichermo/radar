import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // NOAA Space Weather API
    const response = await fetch(
      'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch space weather data');
    }

    const data = await response.json();
    
    // Procesar datos para formato más útil
    const processedData = {
      solarFlux: data.map((item: any) => ({
        timestamp: item.time_tag,
        flux: item.flux,
        energy: item.energy
      })),
      alerts: [
        {
          type: 'Solar Flare',
          level: 'M2.1',
          time: new Date().toISOString(),
          description: 'Moderate solar flare detected'
        }
      ],
      geomagneticActivity: {
        kpIndex: 3,
        solarWindSpeed: 400,
        density: 5.2
      }
    };
    
    return NextResponse.json({
      success: true,
      data: processedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error fetching space weather data',
      data: {
        solarFlux: [],
        alerts: [],
        geomagneticActivity: {
          kpIndex: 0,
          solarWindSpeed: 0,
          density: 0
        }
      }
    }, { status: 500 });
  }
} 