import { NextResponse } from 'next/server';

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

export async function GET() {
  try {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener datos de asteroides');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en NASA Asteroids API:', error);
    
    // Datos de respaldo
    const fallbackData = {
      element_count: 15,
      near_earth_objects: {
        [new Date().toISOString().split('T')[0]]: [
          {
            id: "2523653",
            name: "(2023 XA1)",
            nasa_jpl_url: "https://ssd-api.jpl.nasa.gov/sbdb.cgi?sstr=2523653",
            absolute_magnitude_h: 26.8,
            estimated_diameter: {
              kilometers: {
                estimated_diameter_min: 0.008,
                estimated_diameter_max: 0.018
              }
            },
            is_potentially_hazardous_asteroid: false,
            close_approach_data: [
              {
                close_approach_date: new Date().toISOString().split('T')[0],
                relative_velocity: {
                  kilometers_per_second: "5.2",
                  kilometers_per_hour: "18720"
                },
                miss_distance: {
                  astronomical: "0.0001",
                  lunar: "0.04",
                  kilometers: "14960"
                }
              }
            ]
          }
        ]
      }
    };
    
    return NextResponse.json({
      success: false,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      error: 'Usando datos de respaldo'
    });
  }
} 