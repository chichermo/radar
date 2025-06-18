import { NextRequest, NextResponse } from 'next/server';
import { veraRubinAPI } from '@/lib/vera-rubin-api';

// Configuración para deshabilitar la generación estática
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Usar searchParams directamente del request para evitar problemas de generación estática
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const query = request.nextUrl.searchParams.get('query') || '';

    let images;
    
    if (query) {
      images = await veraRubinAPI.searchObjects(query);
    } else {
      images = await veraRubinAPI.getRecentImages(limit);
    }

    return NextResponse.json({
      success: true,
      data: images,
      timestamp: new Date().toISOString(),
      source: 'Vera Rubin Observatory (Simulated Data)'
    });
  } catch (error) {
    console.error('Error fetching Vera Rubin images:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching images',
        message: 'Using simulated data due to API unavailability'
      },
      { status: 500 }
    );
  }
} 