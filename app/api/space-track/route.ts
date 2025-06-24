import { NextRequest, NextResponse } from 'next/server';

// Configuración de Space-Track.org
const SPACE_TRACK_BASE_URL = 'https://www.space-track.org';
const SPACE_TRACK_USERNAME = process.env.SPACE_TRACK_USERNAME;
const SPACE_TRACK_PASSWORD = process.env.SPACE_TRACK_PASSWORD;

// Cache para evitar múltiples requests
let authToken: string | null = null;
let tokenExpiry: number = 0;

// Datos simulados para cuando la autenticación falle
const mockSpaceData = [
  {
    NORAD_CAT_ID: "25544",
    OBJECT_NAME: "ISS (ZARYA)",
    OBJECT_TYPE: "PAYLOAD",
    COUNTRY: "US",
    LAUNCH_DATE: "1998-11-20",
    LAUNCH_SITE: "TTMTR",
    DECAY_DATE: null,
    PERIOD: 92.68,
    INCLINATION: 51.64,
    APOGEE: 408,
    PERIGEE: 400,
    RCS: "Large (> 10 m)",
    STATUS: "ACTIVE",
    tle: {
      TLE_LINE0: "0 ISS (ZARYA)",
      TLE_LINE1: "1 25544U 98067A   24001.50000000  .00000000  00000+0  00000+0 0    05",
      TLE_LINE2: "2 25544  51.6400   0.0000 0000001   0.0000   0.0000 15.50000000    01"
    }
  },
  {
    NORAD_CAT_ID: "37849",
    OBJECT_NAME: "STARLINK-1234",
    OBJECT_TYPE: "PAYLOAD",
    COUNTRY: "US",
    LAUNCH_DATE: "2023-01-15",
    LAUNCH_SITE: "KSC",
    DECAY_DATE: null,
    PERIOD: 95.0,
    INCLINATION: 53.0,
    APOGEE: 550,
    PERIGEE: 540,
    RCS: "Medium (1-10 m)",
    STATUS: "ACTIVE",
    tle: {
      TLE_LINE0: "0 STARLINK-1234",
      TLE_LINE1: "1 37849U 23001A   24001.50000000  .00000000  00000+0  00000+0 0    05",
      TLE_LINE2: "2 37849  53.0000   0.0000 0000001   0.0000   0.0000 15.00000000    01"
    }
  },
  {
    NORAD_CAT_ID: "45678",
    OBJECT_NAME: "HST",
    OBJECT_TYPE: "PAYLOAD",
    COUNTRY: "US",
    LAUNCH_DATE: "1990-04-24",
    LAUNCH_SITE: "KSC",
    DECAY_DATE: null,
    PERIOD: 96.0,
    INCLINATION: 28.5,
    APOGEE: 540,
    PERIGEE: 530,
    RCS: "Large (> 10 m)",
    STATUS: "ACTIVE",
    tle: {
      TLE_LINE0: "0 HST",
      TLE_LINE1: "1 20580U 90037B   24001.50000000  .00000000  00000+0  00000+0 0    05",
      TLE_LINE2: "2 20580  28.5000   0.0000 0000001   0.0000   0.0000 15.00000000    01"
    }
  }
];

async function authenticateSpaceTrack() {
  // Verificar si las credenciales están configuradas
  if (!SPACE_TRACK_USERNAME || !SPACE_TRACK_PASSWORD || 
      SPACE_TRACK_USERNAME === 'your_username_here' || 
      SPACE_TRACK_PASSWORD === 'your_password_here') {
    console.warn('Credenciales de Space-Track no configuradas');
    return null;
  }

  console.log('Intentando autenticar con Space-Track...');
  console.log('Username:', SPACE_TRACK_USERNAME);
  console.log('Password length:', SPACE_TRACK_PASSWORD?.length);

  if (authToken && Date.now() < tokenExpiry) {
    console.log('Usando token en caché');
    return authToken;
  }

  try {
    console.log('Haciendo petición de autenticación...');
    const response = await fetch(`${SPACE_TRACK_BASE_URL}/ajaxauth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `identity=${encodeURIComponent(SPACE_TRACK_USERNAME)}&password=${encodeURIComponent(SPACE_TRACK_PASSWORD)}`,
    });

    console.log('Respuesta de autenticación:', response.status, response.statusText);

    if (response.ok) {
      const cookies = response.headers.get('set-cookie');
      console.log('Cookies recibidas:', cookies ? 'Sí' : 'No');
      if (cookies) {
        authToken = cookies;
        tokenExpiry = Date.now() + 3600000; // 1 hora
        console.log('Autenticación exitosa');
        return authToken;
      } else {
        console.error('No se recibieron cookies en la respuesta');
      }
    } else {
      const errorText = await response.text();
      console.error('Error en autenticación:', response.status, errorText);
    }
  } catch (error) {
    console.error('Error autenticando con Space-Track:', error);
  }

  return null;
}

export async function GET() {
  try {
    // Simulación de datos de Space-Track.org (requiere autenticación)
    const mockData = {
      satellites: [
        {
          id: "25544",
          name: "ISS",
          type: "Space Station",
          country: "International",
          launch_date: "1998-11-20",
          orbit_type: "LEO",
          altitude: 408,
          inclination: 51.6,
          period: 92.9
        },
        {
          id: "37849",
          name: "HST",
          type: "Telescope",
          country: "USA",
          launch_date: "1990-04-24",
          orbit_type: "LEO",
          altitude: 547,
          inclination: 28.5,
          period: 95.4
        },
        {
          id: "43013",
          name: "JWST",
          type: "Telescope",
          country: "International",
          launch_date: "2021-12-25",
          orbit_type: "L2",
          altitude: 1500000,
          inclination: 0,
          period: 365.25
        },
        {
          id: "48274",
          name: "Tiangong",
          type: "Space Station",
          country: "China",
          launch_date: "2021-04-29",
          orbit_type: "LEO",
          altitude: 400,
          inclination: 41.5,
          period: 92.5
        }
      ],
      debris_count: 28000,
      active_satellites: 4500,
      total_objects: 32500
    };
    
    return NextResponse.json({
      success: true,
      data: mockData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en Space-Track API:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      timestamp: new Date().toISOString(),
      error: 'Error al obtener datos de satélites'
    });
  }
} 