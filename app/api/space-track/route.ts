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

export async function GET(request: NextRequest) {
  try {
    console.log('=== Iniciando petición a Space-Track API ===');
    
    // Verificar si las credenciales están configuradas
    if (!SPACE_TRACK_USERNAME || !SPACE_TRACK_PASSWORD || 
        SPACE_TRACK_USERNAME === 'your_username_here' || 
        SPACE_TRACK_PASSWORD === 'your_password_here') {
      console.warn('Credenciales de Space-Track no configuradas, usando datos simulados');
      return NextResponse.json({
        success: true,
        data: mockSpaceData,
        timestamp: new Date().toISOString(),
        note: 'Usando datos simulados - configura credenciales de Space-Track para datos reales'
      });
    }

    // Autenticar con Space-Track
    const token = await authenticateSpaceTrack();
    if (!token) {
      console.warn('Falló la autenticación con Space-Track, usando datos simulados');
      return NextResponse.json({
        success: true,
        data: mockSpaceData,
        timestamp: new Date().toISOString(),
        note: 'Usando datos simulados - verifica tus credenciales de Space-Track'
      });
    }

    console.log('Autenticación exitosa, obteniendo datos...');

    // Obtener datos de satélites activos
    const satellitesResponse = await fetch(
      `${SPACE_TRACK_BASE_URL}/basicspacedata/query/class/satcat/orderby/LAUNCH_DATE%20desc/limit/100/format/json`,
      {
        headers: {
          Cookie: token,
        },
      }
    );

    console.log('Respuesta de satélites:', satellitesResponse.status, satellitesResponse.statusText);

    if (!satellitesResponse.ok) {
      const errorText = await satellitesResponse.text();
      console.error('Error obteniendo datos de satélites:', errorText);
      console.warn('Usando datos simulados debido al error');
      return NextResponse.json({
        success: true,
        data: mockSpaceData,
        timestamp: new Date().toISOString(),
        note: 'Usando datos simulados - error obteniendo datos reales'
      });
    }

    const satellites = await satellitesResponse.json();
    console.log('Satélites obtenidos:', satellites.length);

    // Obtener TLEs más recientes
    const tleResponse = await fetch(
      `${SPACE_TRACK_BASE_URL}/basicspacedata/query/class/tle_latest/orderby/EPOCH%20desc/limit/100/format/json`,
      {
        headers: {
          Cookie: token,
        },
      }
    );

    console.log('Respuesta de TLEs:', tleResponse.status, tleResponse.statusText);

    if (!tleResponse.ok) {
      const errorText = await tleResponse.text();
      console.error('Error obteniendo TLEs:', errorText);
      console.warn('Usando datos simulados debido al error');
      return NextResponse.json({
        success: true,
        data: mockSpaceData,
        timestamp: new Date().toISOString(),
        note: 'Usando datos simulados - error obteniendo TLEs'
      });
    }

    const tles = await tleResponse.json();
    console.log('TLEs obtenidos:', tles.length);

    // Combinar datos de satélites con TLEs
    const combinedData = satellites.map((satellite: any) => {
      const tle = tles.find((t: any) => t.NORAD_CAT_ID === satellite.NORAD_CAT_ID);
      return {
        ...satellite,
        tle: tle || null,
      };
    });

    console.log('Datos combinados:', combinedData.length);
    console.log('=== Petición completada exitosamente ===');

    return NextResponse.json({
      success: true,
      data: combinedData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error en Space-Track API:', error);
    console.warn('Usando datos simulados debido al error');
    return NextResponse.json({
      success: true,
      data: mockSpaceData,
      timestamp: new Date().toISOString(),
      note: 'Usando datos simulados - error interno del servidor'
    });
  }
} 