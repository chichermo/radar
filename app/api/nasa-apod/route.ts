import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const NASA_API_KEY = 'DEMO_KEY';
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
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
  
  let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&thumbs=true`;
  if (date) {
    url += `&date=${date}`;
  }
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      console.error('NASA API error:', res.status, errorText);
      return NextResponse.json({ 
        error: 'No se pudo obtener la imagen de la NASA',
        details: errorText,
        status: res.status
      }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('NASA API fetch error:', error);
    return NextResponse.json({ 
      error: 'Error al conectar con la NASA',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
} 