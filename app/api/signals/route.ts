import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+5+pl_name,hostname,disc_year,pl_orbper,pl_rade,pl_bmasse,pl_eqt,st_teff,st_rad,st_mass,ra,dec+from+ps&format=json';
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'No se pudieron obtener señales' }, { status: 500 });
    }
    const data = await res.json();
    // Transformar exoplanetas en "señales"
    const signals = data.map((planet: any, idx: number) => ({
      id: idx + 1,
      name: planet.pl_name,
      source: planet.hostname,
      year: planet.disc_year,
      period: planet.pl_orbper,
      radius: planet.pl_rade,
      mass: planet.pl_bmasse,
      temperature: planet.pl_eqt,
      star_temp: planet.st_teff,
      star_radius: planet.st_rad,
      star_mass: planet.st_mass,
      ra: planet.ra,
      dec: planet.dec,
      status: 'Detectada',
      confidence: 90 + Math.random() * 10
    }));
    return NextResponse.json({ success: true, data: signals });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'No se pudieron obtener señales' }, { status: 500 });
  }
} 