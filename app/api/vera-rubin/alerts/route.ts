import { NextRequest, NextResponse } from 'next/server';
import { veraRubinAPI } from '@/lib/vera-rubin-api';

// Configuración para deshabilitar la generación estática
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Usar searchParams directamente del request para evitar problemas de generación estática
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');
    const type = request.nextUrl.searchParams.get('type') || '';

    let alerts = await veraRubinAPI.getAlerts(limit);
    
    if (type) {
      alerts = alerts.filter(alert => alert.type === type);
    }

    return NextResponse.json({
      success: true,
      data: alerts,
      timestamp: new Date().toISOString(),
      source: 'Vera Rubin Observatory (Simulated Data)'
    });
  } catch (error) {
    console.error('Error fetching Vera Rubin alerts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching alerts',
        message: 'Using simulated data due to API unavailability'
      },
      { status: 500 }
    );
  }
} 