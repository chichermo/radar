import { NextResponse } from 'next/server';

const NASA_API_KEY = process.env.NASA_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/latest?api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch EPIC data');
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data.slice(0, 10), // Limit to 10 most recent images
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error fetching EPIC data',
      data: []
    }, { status: 500 });
  }
} 