import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY || '';
    // API DONKI: https://api.nasa.gov/DONKI/notifications
    const url = `https://api.nasa.gov/DONKI/notifications?type=all&api_key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'No se pudieron obtener datos de predicciones IA' }, { status: 500 });
    }
    const data = await res.json();
    // Puedes filtrar o transformar los datos aquí si lo deseas
    return NextResponse.json({ predictions: data });
  } catch (error) {
    return NextResponse.json({ error: 'No se pudieron obtener datos de predicciones IA' }, { status: 500 });
  }
} 