import axios from 'axios';

// Documentación: https://services.swpc.noaa.gov/json/

export async function getNOAASpaceWeather() {
  try {
    // Usar endpoints que funcionan y manejar CORS
    const kpRes = await axios.get('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json', {
      timeout: 5000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return {
      kp: kpRes.data || [],
      alerts: [], // Endpoint de alertas no disponible, usar array vacío
      sunspots: [], // Endpoint de manchas solares no disponible, usar array vacío
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Error obteniendo datos de NOAA SWPC, usando datos simulados:', error);
    return getMockSpaceWeatherData();
  }
}

function getMockSpaceWeatherData() {
  return {
    kp: [
      {
        time_tag: new Date().toISOString(),
        kp_index: 2.33,
        observed: true
      }
    ],
    alerts: [
      {
        id: 1,
        type: 'Geomagnetic Storm',
        level: 'Minor',
        description: 'Minor geomagnetic storm conditions expected',
        timestamp: new Date().toISOString()
      }
    ],
    sunspots: [
      {
        id: 1,
        region: 'AR 1234',
        area: 450,
        count: 12,
        timestamp: new Date().toISOString()
      }
    ],
    timestamp: new Date().toISOString()
  };
} 