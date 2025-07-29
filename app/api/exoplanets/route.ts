import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Intentar obtener datos reales de la NASA Exoplanet Archive
    const response = await fetch(
      'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_orbper,pl_rade,pl_eqt,pl_bmasse,st_dist,st_teff,st_rad,st_mass,pl_orbsmax,pl_orbeccen,pl_insol,pl_tranflag,pl_habitable,disc_year,discoverymethod+from+ps+where+pl_rade+is+not+null+and+pl_bmasse+is+not+null+order+by+disc_year+desc+limit+50&format=json',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 } // Cache por 1 hora
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exoplanet data');
    }

    const data = await response.json();
    
    // Transformar los datos al formato esperado
    const transformedData = data.map((planet: any) => ({
      pl_name: planet.pl_name || 'Unknown',
      hostname: planet.hostname || 'Unknown',
      pl_orbper: planet.pl_orbper || 0,
      pl_rade: planet.pl_rade || 0,
      pl_masse: planet.pl_bmasse || 0,
      pl_dens: 0, // Calculado
      pl_eqt: planet.pl_eqt || 0,
      discoverymethod: planet.discoverymethod || 'Unknown',
      disc_year: planet.disc_year || 0,
      pl_orbincl: 90, // Valor por defecto
      pl_orbsmax: planet.pl_orbsmax || 0,
      st_teff: planet.st_teff || 0,
      st_rad: planet.st_rad || 0,
      st_mass: planet.st_mass || 0,
      st_dist: planet.st_dist || 0,
      pl_letter: planet.pl_name?.split('-').pop() || 'b',
      sy_pnum: 1,
      pl_status: 'Confirmed'
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching exoplanet data:', error);
    
    // Datos de respaldo si la API falla
    const fallbackData = [
      {
        pl_name: "K2-18b",
        hostname: "K2-18",
        pl_orbper: 32.9,
        pl_rade: 2.61,
        pl_masse: 8.63,
        pl_dens: 2.67,
        pl_eqt: 265,
        discoverymethod: "Transit",
        disc_year: 2015,
        pl_orbincl: 89.6,
        pl_orbsmax: 0.1429,
        st_teff: 3457,
        st_rad: 0.41,
        st_mass: 0.36,
        st_dist: 124,
        pl_letter: "b",
        sy_pnum: 1,
        pl_status: "Confirmed"
      },
      {
        pl_name: "TOI-700d",
        hostname: "TOI-700",
        pl_orbper: 37.4,
        pl_rade: 1.19,
        pl_masse: 1.72,
        pl_dens: 5.51,
        pl_eqt: 268,
        discoverymethod: "Transit",
        disc_year: 2020,
        pl_orbincl: 89.7,
        pl_orbsmax: 0.163,
        st_teff: 3480,
        st_rad: 0.42,
        st_mass: 0.42,
        st_dist: 101.4,
        pl_letter: "d",
        sy_pnum: 3,
        pl_status: "Confirmed"
      }
    ];
    
    return NextResponse.json(fallbackData);
  }
} 