// app/api/heavens/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulación de datos de Heavens Above
    const mockData = {
      visible_satellites: [
        {
          name: "ISS",
          magnitude: -1.2,
          elevation: 45,
          azimuth: 180,
          next_pass: new Date(Date.now() + 1800000).toISOString(),
          duration: 420
        },
        {
          name: "Hubble Space Telescope",
          magnitude: 2.1,
          elevation: 30,
          azimuth: 270,
          next_pass: new Date(Date.now() + 3600000).toISOString(),
          duration: 300
        },
        {
          name: "Tiangong Space Station",
          magnitude: 0.8,
          elevation: 60,
          azimuth: 90,
          next_pass: new Date(Date.now() + 5400000).toISOString(),
          duration: 480
        }
      ],
      iridium_flares: [
        {
          satellite: "Iridium 91",
          magnitude: -8.2,
          time: new Date(Date.now() + 7200000).toISOString(),
          elevation: 35,
          azimuth: 220
        }
      ],
      meteor_showers: [
        {
          name: "Perseidas",
          peak_date: "2024-08-12",
          hourly_rate: 100,
          radiant: "Perseus",
          active: true
        },
        {
          name: "Gemínidas",
          peak_date: "2024-12-14",
          hourly_rate: 120,
          radiant: "Gemini",
          active: false
        }
      ],
      planets: [
        {
          name: "Venus",
          magnitude: -4.2,
          elevation: 25,
          azimuth: 280,
          phase: 0.8
        },
        {
          name: "Jupiter",
          magnitude: -2.1,
          elevation: 45,
          azimuth: 180,
          phase: 1.0
        },
        {
          name: "Saturn",
          magnitude: 0.5,
          elevation: 30,
          azimuth: 200,
          phase: 1.0
        }
      ]
    };
    
    return NextResponse.json({
      success: true,
      data: mockData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en Heavens Above API:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      timestamp: new Date().toISOString(),
      error: 'Error al obtener datos astronómicos'
    });
  }
}