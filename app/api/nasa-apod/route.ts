import { NextResponse } from 'next/server';

const NASA_API_KEY = process.env.NASA_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=5`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener datos de NASA APOD');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en NASA APOD API:', error);
    
    // Datos de respaldo si la API falla
    const fallbackData = [
      {
        date: new Date().toISOString().split('T')[0],
        title: "Pilares de la Creación",
        explanation: "Una de las imágenes más icónicas del Hubble, mostrando la formación estelar en la Nebulosa del Águila.",
        url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_Creation.jpg",
        media_type: "image",
        copyright: "NASA/ESA/Hubble"
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        title: "Galaxia Cartwheel",
        explanation: "Imagen de la galaxia Cartwheel capturada por el James Webb.",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Cartwheel_Galaxy.jpg/1200px-Cartwheel_Galaxy.jpg",
        media_type: "image",
        copyright: "NASA/ESA/CSA/Webb"
      }
    ];
    
    return NextResponse.json({
      success: false,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      error: 'Usando datos de respaldo'
    });
  }
} 