import { NextResponse } from 'next/server';

const NASA_API_KEY = process.env.NASA_API_KEY;

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch asteroid data');
    }

    const data = await response.json();
    
    // Procesar datos de asteroides
    const asteroids = Object.values(data.near_earth_objects).flat().map((asteroid: any) => ({
      id: asteroid.id,
      name: asteroid.name,
      diameter: {
        min: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
        max: asteroid.estimated_diameter.kilometers.estimated_diameter_max
      },
      distance: {
        lunar: asteroid.close_approach_data[0]?.miss_distance?.lunar,
        kilometers: asteroid.close_approach_data[0]?.miss_distance?.kilometers
      },
      velocity: asteroid.close_approach_data[0]?.relative_velocity?.kilometers_per_hour,
      hazardous: asteroid.is_potentially_hazardous_asteroid,
      approachDate: asteroid.close_approach_data[0]?.close_approach_date
    }));
    
    return NextResponse.json({
      success: true,
      data: {
        asteroids: asteroids.slice(0, 20), // Top 20 más cercanos
        totalCount: asteroids.length,
        hazardousCount: asteroids.filter((a: any) => a.hazardous).length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error fetching asteroid data',
      data: {
        asteroids: [],
        totalCount: 0,
        hazardousCount: 0
      }
    }, { status: 500 });
  }
} 