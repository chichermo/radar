import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const NASA_API_KEY = 'DEMO_KEY';
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&thumbs=true`;
  if (date) {
    url += `&date=${date}`;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'No se pudo obtener la imagen de la NASA' }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error al conectar con la NASA' }, { status: 500 });
  }
} 