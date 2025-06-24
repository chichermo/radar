// app/api/satnogs/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulación de datos de SatNOGS (red de estaciones de radioaficionados)
    const mockData = {
      satellites: [
        {
          id: "43678",
          name: "ISS",
          status: "active",
          frequency: "145.800 MHz",
          mode: "FM",
          last_heard: new Date().toISOString(),
          passes_today: 15,
          next_pass: new Date(Date.now() + 3600000).toISOString()
        },
        {
          id: "42784",
          name: "AO-91",
          status: "active",
          frequency: "145.960 MHz",
          mode: "FM",
          last_heard: new Date(Date.now() - 7200000).toISOString(),
          passes_today: 8,
          next_pass: new Date(Date.now() + 5400000).toISOString()
        },
        {
          id: "43651",
          name: "SO-50",
          status: "active",
          frequency: "436.795 MHz",
          mode: "FM",
          last_heard: new Date(Date.now() - 3600000).toISOString(),
          passes_today: 12,
          next_pass: new Date(Date.now() + 1800000).toISOString()
        }
      ],
      stations: [
        {
          id: "1",
          name: "Madrid Ground Station",
          location: "Madrid, Spain",
          coordinates: "40.4168, -3.7038",
          status: "online"
        },
        {
          id: "2",
          name: "Barcelona Observatory",
          location: "Barcelona, Spain",
          coordinates: "41.3851, 2.1734",
          status: "online"
        }
      ],
      total_passes: 156,
      active_stations: 45
    };
    
    return NextResponse.json({
      success: true,
      data: mockData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en SatNOGS API:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      timestamp: new Date().toISOString(),
      error: 'Error al obtener datos de SatNOGS'
    });
  }
}