import { NextRequest, NextResponse } from 'next/server';

// Configuración de Space-Track.org
const SPACE_TRACK_BASE_URL = 'https://www.space-track.org';
const SPACE_TRACK_USERNAME = process.env.SPACE_TRACK_USERNAME;
const SPACE_TRACK_PASSWORD = process.env.SPACE_TRACK_PASSWORD;

// Cache para evitar múltiples requests
let authToken: string | null = null;
let tokenExpiry: number = 0;

async function authenticateSpaceTrack() {
  if (!SPACE_TRACK_USERNAME || !SPACE_TRACK_PASSWORD) {
    throw new Error('Space-Track credentials not configured');
  }

  try {
    const response = await fetch(`${SPACE_TRACK_BASE_URL}/ajaxauth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `identity=${encodeURIComponent(SPACE_TRACK_USERNAME)}&password=${encodeURIComponent(SPACE_TRACK_PASSWORD)}`,
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const cookies = response.headers.get('set-cookie');
    if (cookies) {
      authToken = cookies.split(';')[0];
      tokenExpiry = Date.now() + 2 * 60 * 60 * 1000; // 2 horas
    }
  } catch (error) {
    console.error('Space-Track authentication error:', error);
    throw error;
  }
}

async function fetchSpaceTrackData() {
  if (!authToken || Date.now() > tokenExpiry) {
    await authenticateSpaceTrack();
  }

  try {
    const response = await fetch(`${SPACE_TRACK_BASE_URL}/basicspacedata/query/class/satcat/orderby/LAUNCH_DATE%20desc/limit/10`, {
      headers: {
        'Cookie': authToken || '',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Space-Track data fetch error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const spaceData = await fetchSpaceTrackData();
    
    const processedData = {
      satellites: spaceData.map((satellite: any) => ({
        id: satellite.NORAD_CAT_ID,
        name: satellite.OBJECT_NAME,
        type: satellite.OBJECT_TYPE,
        country: satellite.COUNTRY,
        launch_date: satellite.LAUNCH_DATE,
        orbit_type: satellite.ORBIT_TYPE || 'LEO',
        altitude: satellite.APOGEE || 0,
        inclination: satellite.INCLINATION || 0,
        period: satellite.PERIOD || 0
      })),
      debris_count: spaceData.filter((s: any) => s.OBJECT_TYPE === 'DEBRIS').length,
      active_satellites: spaceData.filter((s: any) => s.OBJECT_TYPE === 'PAYLOAD').length,
      total_objects: spaceData.length
    };
    
    return NextResponse.json({
      success: true,
      data: processedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en Space-Track API:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      timestamp: new Date().toISOString(),
      error: 'Error al obtener datos de satélites',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 