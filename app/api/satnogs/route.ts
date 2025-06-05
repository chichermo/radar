// app/api/satnogs/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Datos mock temporales mientras se resuelve el acceso a la API real
    const mockData = {
      signals: [
        {
          id: "1",
          frequency: 145.825,
          timestamp: new Date().toISOString(),
          description: "Señal de telemetría de la ISS"
        },
        {
          id: "2",
          frequency: 437.800,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
          description: "Señal de datos de satélite meteorológico"
        },
        {
          id: "3",
          frequency: 2400.000,
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
          description: "Señal de banda S de satélite de comunicaciones"
        }
      ]
    };

    return NextResponse.json({ data: mockData });
  } catch (error: unknown) {
    console.error("Error in /api/satnogs:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}