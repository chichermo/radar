import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const nasaApiKey = process.env.NASA_API_KEY || process.env.NEXT_PUBLIC_NASA_API_KEY;
    
    if (!nasaApiKey) {
      const simulatedObservations = [
        {
          target: "NGC 346",
          instrument: "WFC3",
          exposure: "1200s",
          progress: 75,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes",
          imageUrl: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
          date: "2024-03-15"
        }
      ];

      return NextResponse.json({
        success: true,
        data: simulatedObservations
      });
    }

    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&count=5&thumbs=true`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Hubble observations');
    }

    const data = await response.json();
    
    const hubbleObservations = data
      .filter((item: any) => item.title.toLowerCase().includes('hubble'))
      .map((item: any) => ({
        target: item.title,
        instrument: "WFC3",
        exposure: "1200s",
        progress: 100,
        coordinates: "N/A",
        description: item.explanation,
        imageUrl: item.url,
        date: item.date
      }));

    return NextResponse.json({
      success: true,
      data: hubbleObservations.length > 0 ? hubbleObservations : [
        {
          target: "NGC 346",
          instrument: "WFC3",
          exposure: "1200s",
          progress: 75,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes",
          imageUrl: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
          date: "2024-03-15"
        }
      ]
    });

  } catch (error) {
    console.error('Error fetching Hubble observations:', error);
    
    return NextResponse.json({
      success: true,
      data: [
        {
          target: "NGC 346",
          instrument: "WFC3",
          exposure: "1200s",
          progress: 75,
          coordinates: "RA: 00h 59m 05s, Dec: -72° 10' 28\"",
          description: "Cúmulo estelar en la Pequeña Nube de Magallanes",
          imageUrl: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg",
          date: "2024-03-15"
        }
      ]
    });
  }
} 