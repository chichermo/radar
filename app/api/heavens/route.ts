// app/api/heavens/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Datos mock temporales mientras se resuelve el acceso a la API real
    const mockData = {
      passes: [
        {
          satName: "ISS (ZARYA)",
          startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hora desde ahora
          endTime: new Date(Date.now() + 7200000).toISOString(),   // 2 horas desde ahora
          maxElevation: 45
        },
        {
          satName: "STARLINK-1234",
          startTime: new Date(Date.now() + 7200000).toISOString(), // 2 horas desde ahora
          endTime: new Date(Date.now() + 10800000).toISOString(),  // 3 horas desde ahora
          maxElevation: 60
        }
      ]
    };

    return NextResponse.json({ data: mockData });
  } catch (error) {
    console.error("Error in /api/heavens:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}