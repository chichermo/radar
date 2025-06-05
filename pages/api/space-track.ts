import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = process.env.SPACETRACK_USERNAME;
  const password = process.env.SPACETRACK_PASSWORD;

  if (!username || !password) {
    console.error('Credenciales de Space-Track no configuradas:', { username, password });
    return res.status(500).json({ error: 'Credenciales de Space-Track no configuradas en el backend', username, password });
  }

  try {
    // Autenticación básica en la cabecera
    const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    const tleRes = await fetch('https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/NORAD_CAT_ID/25544/format/json', {
      headers: {
        'Authorization': auth
      }
    });

    if (!tleRes.ok) {
      const text = await tleRes.text();
      console.error('Error al obtener TLE:', text);
      return res.status(500).json({ error: 'No se pudo obtener TLE de Space-Track', details: text });
    }

    const tleData = await tleRes.json();
    return res.status(200).json(tleData);
  } catch (error: any) {
    console.error('Error general en el endpoint Space-Track:', error);
    return res.status(500).json({ error: 'Error general en el endpoint Space-Track', details: error.message });
  }
} 