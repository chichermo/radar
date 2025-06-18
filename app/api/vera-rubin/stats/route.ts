import { NextRequest, NextResponse } from 'next/server';
import { veraRubinAPI } from '@/lib/vera-rubin-api';

export async function GET(request: NextRequest) {
  try {
    const stats = await veraRubinAPI.getStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
      source: 'Vera Rubin Observatory (Simulated Data)'
    });
  } catch (error) {
    console.error('Error fetching Vera Rubin stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching stats',
        message: 'Using simulated data due to API unavailability'
      },
      { status: 500 }
    );
  }
} 