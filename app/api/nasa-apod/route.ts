import { NextResponse } from 'next/server';

// Cache simple en memoria (en producción usar Redis o similar)
const cache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 10; // Máximo 10 requests por minuto
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
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
  
  // Validar que la fecha no sea futura
  if (date) {
    const requestedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Fin del día actual
    
    if (requestedDate > today) {
      return NextResponse.json({ 
        error: 'No se pueden solicitar imágenes para fechas futuras',
        date: date 
      }, { status: 400 });
    }
  }
  
  // Verificar cache
  const cacheKey = date || 'today';
  const cachedData = cache.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) { // 5 minutos
    return NextResponse.json(cachedData.data);
  }
  
  let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&thumbs=true`;
  if (date) {
    url += `&date=${date}`;
  }
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 429) {
        // Si la NASA nos da rate limit, usar datos de cache o fallback
        const fallbackData = {
          title: "Imagen del día de la NASA",
          explanation: "Debido a limitaciones de la API, mostrando imagen de ejemplo.",
          url: "https://apod.nasa.gov/apod/image/2401/ngc1566_hst_960.jpg",
          media_type: "image",
          date: date || new Date().toISOString().slice(0, 10)
        };
        
        // Cache del fallback
        cache.set(cacheKey, { data: fallbackData, timestamp: Date.now() });
        return NextResponse.json(fallbackData);
      }
      
      const errorData = await res.json();
      console.error('NASA API error:', res.status, errorData);
      return NextResponse.json({ 
        error: 'Error al obtener datos de la NASA',
        details: errorData 
      }, { status: res.status });
    }
    
    const data = await res.json();
    
    // Cache de la respuesta exitosa
    cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NASA APOD:', error);
    
    // En caso de error, devolver datos de fallback
    const fallbackData = {
      title: "Imagen del día de la NASA",
      explanation: "Error al cargar la imagen. Por favor, intenta más tarde.",
      url: "https://apod.nasa.gov/apod/image/2401/ngc1566_hst_960.jpg",
      media_type: "image",
      date: date || new Date().toISOString().slice(0, 10)
    };
    
    return NextResponse.json(fallbackData);
  }
}

export async function GET_MULTIPLE() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=5`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener datos de NASA APOD');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en NASA APOD API:', error);
    
    // Datos de respaldo si la API falla
    const fallbackData = [
      {
        date: new Date().toISOString().split('T')[0],
        title: "Pilares de la Creación",
        explanation: "Una de las imágenes más icónicas del Hubble, mostrando la formación estelar en la Nebulosa del Águila.",
        url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_Creation.jpg",
        media_type: "image",
        copyright: "NASA/ESA/Hubble"
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        title: "Galaxia Cartwheel",
        explanation: "Imagen de la galaxia Cartwheel capturada por el James Webb.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Cartwheel_Galaxy.jpg/1200px-Cartwheel_Galaxy.jpg",
        media_type: "image",
        copyright: "NASA/ESA/CSA/Webb"
      }
    ];
    
    return NextResponse.json({
      success: false,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      error: 'Usando datos de respaldo'
    });
  }
} 