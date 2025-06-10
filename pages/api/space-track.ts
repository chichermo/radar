import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = process.env.SPACETRACK_USERNAME;
  const password = process.env.SPACETRACK_PASSWORD;

  if (!username || !password) {
    console.error('Credenciales de Space-Track no configuradas');
    return res.status(500).json({ 
      error: 'Credenciales de Space-Track no configuradas',
      details: 'Verifica que SPACETRACK_USERNAME y SPACETRACK_PASSWORD estén definidos en .env.local'
    });
  }

  try {
    // Autenticación básica en la cabecera
    const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    
    // Primero intentamos obtener el token de autenticación
    const loginRes = await fetch('https://www.space-track.org/ajaxauth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `identity=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    if (!loginRes.ok) {
      const text = await loginRes.text();
      console.error('Error de autenticación en Space-Track:', text);
      return res.status(401).json({ 
        error: 'Error de autenticación en Space-Track',
        details: text
      });
    }

    // Ahora hacemos la consulta de TLE
    const tleRes = await fetch('https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/NORAD_CAT_ID/25544/format/json', {
      headers: {
        'Cookie': loginRes.headers.get('set-cookie') || '',
        'Accept': 'application/json'
      }
    });

    if (!tleRes.ok) {
      const text = await tleRes.text();
      console.error('Error al obtener TLE:', text);
      return res.status(tleRes.status).json({ 
        error: 'Error al obtener datos de Space-Track',
        details: text
      });
    }

    const tleData = await tleRes.json();
    
    // Verificamos que los datos sean válidos
    if (!Array.isArray(tleData) || tleData.length === 0) {
      console.warn('Space-Track devolvió un array vacío o datos inválidos');
      return res.status(200).json([]);
    }

    return res.status(200).json(tleData);
  } catch (error: any) {
    console.error('Error general en el endpoint Space-Track:', error);
    return res.status(500).json({ 
      error: 'Error general en el endpoint Space-Track',
      details: error.message || 'Error desconocido'
    });
  }
} 