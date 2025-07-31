import { NextResponse } from 'next/server';

// Cache simple en memoria para datos de terremotos
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function GET() {
  const cacheKey = 'earthquakes-data';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    // Obtener datos reales de terremotos del USGS
    const response = await fetch(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'SpaceAnomaliesDashboard/1.0'
        },
      }
    );

    if (!response.ok) {
      // Si falla, intentar con datos de la última semana
      const weeklyResponse = await fetch(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson',
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'SpaceAnomaliesDashboard/1.0'
          },
        }
      );

      if (!weeklyResponse.ok) {
        throw new Error(`HTTP error! status: ${weeklyResponse.status}`);
      }

      const weeklyData = await weeklyResponse.json();
      
      // Tomar solo los más recientes
      const recentFeatures = weeklyData.features?.slice(0, 10) || [];
      
      const result = {
        success: true,
        data: {
          type: "FeatureCollection",
          features: recentFeatures,
          metadata: {
            title: "Terremotos Significativos Recientes",
            count: recentFeatures.length,
            source: "USGS",
            generated: Date.now()
          }
        },
        timestamp: new Date().toISOString()
      };

      cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return NextResponse.json(result);
    }

    const data = await response.json();
    
    const result = {
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    };

    // Cache de datos reales
    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    
    // Datos de fallback simulados
    const fallbackData = {
      success: true,
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              mag: 6.2,
              place: "32 km SW of Chernabura Island, Alaska",
              time: Date.now() - 2 * 60 * 60 * 1000, // 2 horas atrás
              updated: Date.now(),
              tz: null,
              url: "https://earthquake.usgs.gov/earthquakes/eventpage/us7000example",
              detail: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000example.geojson",
              felt: 15,
              cdi: 3.4,
              mmi: 4.5,
              alert: "yellow",
              status: "reviewed",
              tsunami: 0,
              sig: 590,
              net: "us",
              code: "7000example",
              ids: ",us7000example,",
              sources: ",us,",
              types: ",cap,dyfi,general-text,geoserve,impact-text,losspager,moment-tensor,nearby-cities,origin,phase-data,shakemap,",
              nst: null,
              dmin: 0.508,
              rms: 0.89,
              gap: 85,
              magType: "mww",
              type: "earthquake",
              title: "M 6.2 - 32 km SW of Chernabura Island, Alaska"
            },
            geometry: {
              type: "Point",
              coordinates: [-159.5614, 54.6181, 10.0]
            },
            id: "us7000example"
          },
          {
            type: "Feature",
            properties: {
              mag: 5.8,
              place: "Pacific-Antarctic Ridge",
              time: Date.now() - 4 * 60 * 60 * 1000, // 4 horas atrás
              updated: Date.now(),
              tz: null,
              url: "https://earthquake.usgs.gov/earthquakes/eventpage/us7000example2",
              detail: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000example2.geojson",
              felt: 2,
              cdi: 2.1,
              mmi: null,
              alert: "green",
              status: "reviewed",
              tsunami: 0,
              sig: 490,
              net: "us",
              code: "7000example2",
              ids: ",us7000example2,",
              sources: ",us,",
              types: ",cap,general-text,geoserve,nearby-cities,origin,phase-data,",
              nst: null,
              dmin: 15.22,
              rms: 1.1,
              gap: 120,
              magType: "mww",
              type: "earthquake",
              title: "M 5.8 - Pacific-Antarctic Ridge"
            },
            geometry: {
              type: "Point",
              coordinates: [-125.4567, -56.7890, 10.0]
            },
            id: "us7000example2"
          }
        ],
        metadata: {
          title: "Terremotos Significativos (Datos de Fallback)",
          count: 2,
          source: "Simulado",
          generated: Date.now()
        }
      },
      timestamp: new Date().toISOString(),
      note: "Datos de fallback - API real no disponible"
    };

    return NextResponse.json(fallbackData);
  }
}