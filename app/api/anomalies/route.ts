import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY || '';
    const url = `https://api.nasa.gov/DONKI/notifications?type=all&api_key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'No se pudieron obtener anomalías' }, { status: 500 });
    }
    const data = await res.json();
    // Tomar los primeros 10 eventos como anomalías
    const anomalies = (data || []).slice(0, 10).map((item: any, idx: number) => ({
      id: item.messageID || idx + 1,
      type: item.messageType,
      summary: item.messageBody?.slice(0, 120) || '',
      date: item.messageIssueTime,
      status: 'Detectada',
      source: 'NASA DONKI'
    }));
    return NextResponse.json({ success: true, data: anomalies });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'No se pudieron obtener anomalías' }, { status: 500 });
  }
} 