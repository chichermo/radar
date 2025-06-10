import { NextResponse } from 'next/server';

// Cache simple en memoria (en producción usar Redis o similar)
const cache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 5; // Máximo 5 requests por minuto (más restrictivo para asteroides)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export async function GET(request: Request) {
  const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  
  // Rate limiting
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const clientData = requestCounts.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else if (clientData.count >= MAX_REQUESTS) {
    return NextResponse.json({ 
      error: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    }, { status: 429 });
  } else {
    clientData.count++;
  }
  
  // Validar fechas
  const today = new Date();
  const defaultStartDate = today.toISOString().split('T')[0];
  const defaultEndDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];
  
  const finalStartDate = startDate || defaultStartDate;
  const finalEndDate = endDate || defaultEndDate;
  
  // Verificar cache
  const cacheKey = `asteroids_${finalStartDate}_${finalEndDate}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < 10 * 60 * 1000) { // 10 minutos
    return NextResponse.json(cachedData.data);
  }
  
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${finalStartDate}&end_date=${finalEndDate}&api_key=${NASA_API_KEY}`;
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 429) {
        // Si la NASA nos da rate limit, usar datos de cache o fallback
        const fallbackData = {
          near_earth_objects: {
            [finalStartDate]: [
              {
                id: "fallback_1",
                name: "(2024 Example)",
                estimated_diameter: {
                  meters: {
                    estimated_diameter_min: 10,
                    estimated_diameter_max: 50
                  }
                },
                is_potentially_hazardous_asteroid: false,
                close_approach_data: [
                  {
                    miss_distance: {
                      kilometers: "1000000"
                    },
                    relative_velocity: {
                      kilometers_per_hour: "25000"
                    }
                  }
                ],
                orbital_data: {
                  semi_major_axis: "1.5",
                  eccentricity: "0.1",
                  inclination: "5.0"
                }
              }
            ]
          },
          element_count: 1,
          links: {
            self: url
          }
        };
        
        // Cache del fallback
        cache.set(cacheKey, { data: fallbackData, timestamp: Date.now() });
        return NextResponse.json(fallbackData);
      }
      
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
      console.error('NASA Asteroids API error:', res.status, errorData);
      return NextResponse.json({ 
        error: 'Error al obtener datos de asteroides de la NASA',
        details: errorData 
      }, { status: res.status });
    }
    
    const data = await res.json();
    
    // Cache de la respuesta exitosa
    cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NASA Asteroids:', error);
    
    // En caso de error, devolver datos de fallback
    const fallbackData = {
      near_earth_objects: {
        [finalStartDate]: [
          {
            id: "fallback_1",
            name: "(2024 Example)",
            estimated_diameter: {
              meters: {
                estimated_diameter_min: 10,
                estimated_diameter_max: 50
              }
            },
            is_potentially_hazardous_asteroid: false,
            close_approach_data: [
              {
                miss_distance: {
                  kilometers: "1000000"
                },
                relative_velocity: {
                  kilometers_per_hour: "25000"
                }
              }
            ],
            orbital_data: {
              semi_major_axis: "1.5",
              eccentricity: "0.1",
              inclination: "5.0"
            }
          }
        ]
      },
      element_count: 1,
      links: {
        self: url
      }
    };
    
    return NextResponse.json(fallbackData);
  }
} 