import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Intentar obtener datos reales del JWST desde NASA
    const nasaApiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY;
    
    if (!nasaApiKey) {
      // Si no hay API key, devolver datos simulados basados en observaciones reales del JWST
      const simulatedObservations = [
        {
          target: "NGC 346",
          instrument: "NIRCam",
          exposure: "2400s",
          progress: 85,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes - Observación en infrarrojo cercano",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/01/webb_first_images_deep_field_smalls.jpg",
          scienceTheme: "Star Lifecycle",
          date: "2024-03-15"
        },
        {
          target: "NGC 3132",
          instrument: "NIRCam",
          exposure: "1800s",
          progress: 100,
          coordinates: "RA: 10h 07m 01s, Dec: -40° 26' 11\"",
          description: "Nebulosa planetaria del Anillo del Sur - Estructuras detalladas en infrarrojo",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2022/07/webb_ngc3132.jpg",
          scienceTheme: "Star Lifecycle",
          date: "2024-02-28"
        },
        {
          target: "Stephan's Quintet",
          instrument: "NIRCam + MIRI",
          exposure: "3600s",
          progress: 100,
          coordinates: "RA: 22h 35m 57s, Dec: +33° 57' 36\"",
          description: "Grupo compacto de galaxias - Interacciones galácticas en detalle",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2022/07/webb_stephan_quintet.jpg",
          scienceTheme: "Galaxies Over Time",
          date: "2024-01-20"
        },
        {
          target: "WASP-39b",
          instrument: "NIRSpec",
          exposure: "1200s",
          progress: 100,
          coordinates: "RA: 14h 29m 18s, Dec: -03° 26' 40\"",
          description: "Exoplaneta gigante gaseoso - Análisis atmosférico detallado",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2022/07/webb_wasp39b.jpg",
          scienceTheme: "Other Worlds",
          date: "2024-01-10"
        },
        {
          target: "Carina Nebula",
          instrument: "NIRCam",
          exposure: "3000s",
          progress: 100,
          coordinates: "RA: 10h 45m 08s, Dec: -59° 52' 04\"",
          description: "Región de formación estelar masiva - Pilares de gas y polvo",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2022/07/webb_carina.jpg",
          scienceTheme: "Star Lifecycle",
          date: "2024-01-05"
        }
      ];

      return NextResponse.json({
        success: true,
        data: simulatedObservations
      });
    }

    // Si hay API key, intentar obtener datos reales
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&count=5&thumbs=true`,
      { next: { revalidate: 3600 } } // Cache por 1 hora
    );

    if (!response.ok) {
      throw new Error('Failed to fetch JWST observations');
    }

    const data = await response.json();
    
    // Transformar datos de APOD a formato de observaciones JWST
    const jwstObservations = data
      .filter((item: any) => item.title.toLowerCase().includes('webb') || item.title.toLowerCase().includes('jwst'))
      .map((item: any) => ({
        target: item.title,
        instrument: "NIRCam", // Por defecto
        exposure: "2400s",
        progress: 100,
        coordinates: "N/A",
        description: item.explanation,
        imageUrl: item.url,
        scienceTheme: "Star Lifecycle",
        date: item.date
      }));

    return NextResponse.json({
      success: true,
      data: jwstObservations.length > 0 ? jwstObservations : [
        {
          target: "NGC 346",
          instrument: "NIRCam",
          exposure: "2400s",
          progress: 85,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes - Observación en infrarrojo cercano",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/01/webb_first_images_deep_field_smalls.jpg",
          scienceTheme: "Star Lifecycle",
          date: "2024-03-15"
        }
      ]
    });

  } catch (error) {
    console.error('Error fetching JWST observations:', error);
    
    // Fallback con datos simulados
    return NextResponse.json({
      success: true,
      data: [
        {
          target: "NGC 346",
          instrument: "NIRCam",
          exposure: "2400s",
          progress: 85,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes - Observación en infrarrojo cercano",
          imageUrl: "https://www.nasa.gov/wp-content/uploads/2023/01/webb_first_images_deep_field_smalls.jpg",
          scienceTheme: "Star Lifecycle",
          date: "2024-03-15"
        }
      ]
    });
  }
} 