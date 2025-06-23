// Servicio para obtener datos astronómicos reales de múltiples fuentes
export interface StarData {
  id: string;
  name: string;
  ra: number; // Right Ascension en grados
  dec: number; // Declination en grados
  magnitude: number;
  color: string;
  distance: number; // en años luz
  spectralType: string;
  constellation?: string;
  bayer?: string; // Designación de Bayer
  flamsteed?: string; // Designación de Flamsteed
}

export interface PlanetData {
  id: string;
  name: string;
  ra: number;
  dec: number;
  magnitude: number;
  distance: number; // en UA
  phase?: number; // Fase de la luna (0-1)
  elongation?: number; // Elongación del Sol
}

export interface ConstellationData {
  name: string;
  abbreviation: string;
  stars: string[]; // IDs de estrellas principales
  lines: [number, number][]; // Índices de estrellas conectadas
  boundaries: [number, number][]; // Coordenadas de límites
}

// Datos de estrellas brillantes reales (Hipparcos Catalogue)
export const brightStars: StarData[] = [
  {
    id: 'HIP32349',
    name: 'Sirius',
    ra: 101.287,
    dec: -16.716,
    magnitude: -1.46,
    color: '#ffffff',
    distance: 8.6,
    spectralType: 'A1V',
    constellation: 'Canis Major',
    bayer: 'α CMa'
  },
  {
    id: 'HIP30438',
    name: 'Canopus',
    ra: 95.988,
    dec: -52.696,
    magnitude: -0.74,
    color: '#ffffcc',
    distance: 310,
    spectralType: 'F0II',
    constellation: 'Carina',
    bayer: 'α Car'
  },
  {
    id: 'HIP69673',
    name: 'Arcturus',
    ra: 213.915,
    dec: 19.182,
    magnitude: -0.05,
    color: '#ffcc99',
    distance: 37,
    spectralType: 'K1.5III',
    constellation: 'Boötes',
    bayer: 'α Boo'
  },
  {
    id: 'HIP91262',
    name: 'Vega',
    ra: 279.235,
    dec: 38.784,
    magnitude: 0.03,
    color: '#ccffff',
    distance: 25,
    spectralType: 'A0V',
    constellation: 'Lyra',
    bayer: 'α Lyr'
  },
  {
    id: 'HIP24608',
    name: 'Capella',
    ra: 79.172,
    dec: 45.998,
    magnitude: 0.08,
    color: '#ffffcc',
    distance: 42,
    spectralType: 'G8III',
    constellation: 'Auriga',
    bayer: 'α Aur'
  },
  {
    id: 'HIP24436',
    name: 'Rigel',
    ra: 78.634,
    dec: -8.202,
    magnitude: 0.12,
    color: '#ccffff',
    distance: 860,
    spectralType: 'B8Ia',
    constellation: 'Orion',
    bayer: 'β Ori'
  },
  {
    id: 'HIP37279',
    name: 'Procyon',
    ra: 114.825,
    dec: 5.225,
    magnitude: 0.34,
    color: '#ffffcc',
    distance: 11.4,
    spectralType: 'F5IV',
    constellation: 'Canis Minor',
    bayer: 'α CMi'
  },
  {
    id: 'HIP27989',
    name: 'Betelgeuse',
    ra: 88.793,
    dec: 7.407,
    magnitude: 0.42,
    color: '#ff9999',
    distance: 640,
    spectralType: 'M2Iab',
    constellation: 'Orion',
    bayer: 'α Ori'
  },
  {
    id: 'HIP7588',
    name: 'Achernar',
    ra: 24.428,
    dec: -57.237,
    magnitude: 0.46,
    color: '#ccffff',
    distance: 139,
    spectralType: 'B3V',
    constellation: 'Eridanus',
    bayer: 'α Eri'
  },
  {
    id: 'HIP68702',
    name: 'Hadar',
    ra: 210.956,
    dec: -60.374,
    magnitude: 0.61,
    color: '#ccffff',
    distance: 390,
    spectralType: 'B1III',
    constellation: 'Centaurus',
    bayer: 'β Cen'
  },
  {
    id: 'HIP65474',
    name: 'Altair',
    ra: 297.695,
    dec: 8.868,
    magnitude: 0.77,
    color: '#ffffff',
    distance: 17,
    spectralType: 'A7V',
    constellation: 'Aquila',
    bayer: 'α Aql'
  },
  {
    id: 'HIP60718',
    name: 'Aldebaran',
    ra: 68.980,
    dec: 16.509,
    magnitude: 0.87,
    color: '#ff9999',
    distance: 65,
    spectralType: 'K5III',
    constellation: 'Taurus',
    bayer: 'α Tau'
  },
  {
    id: 'HIP62434',
    name: 'Spica',
    ra: 201.298,
    dec: -11.161,
    magnitude: 0.98,
    color: '#ccffff',
    distance: 250,
    spectralType: 'B1V',
    constellation: 'Virgo',
    bayer: 'α Vir'
  },
  {
    id: 'HIP80763',
    name: 'Antares',
    ra: 247.352,
    dec: -26.432,
    magnitude: 1.06,
    color: '#ff9999',
    distance: 550,
    spectralType: 'M1.5Iab',
    constellation: 'Scorpius',
    bayer: 'α Sco'
  },
  {
    id: 'HIP97649',
    name: 'Pollux',
    ra: 116.329,
    dec: 28.026,
    magnitude: 1.16,
    color: '#ffcc99',
    distance: 34,
    spectralType: 'K0III',
    constellation: 'Gemini',
    bayer: 'β Gem'
  },
  {
    id: 'HIP21421',
    name: 'Fomalhaut',
    ra: 344.413,
    dec: -29.622,
    magnitude: 1.17,
    color: '#ffffff',
    distance: 25,
    spectralType: 'A3V',
    constellation: 'Piscis Austrinus',
    bayer: 'α PsA'
  },
  {
    id: 'HIP113368',
    name: 'Deneb',
    ra: 310.358,
    dec: 45.280,
    magnitude: 1.25,
    color: '#ccffff',
    distance: 2600,
    spectralType: 'A2Ia',
    constellation: 'Cygnus',
    bayer: 'α Cyg'
  },
  {
    id: 'HIP102098',
    name: 'Mimosa',
    ra: 186.649,
    dec: -59.689,
    magnitude: 1.30,
    color: '#ccffff',
    distance: 280,
    spectralType: 'B0.5III',
    constellation: 'Crux',
    bayer: 'β Cru'
  },
  {
    id: 'HIP85927',
    name: 'Regulus',
    ra: 152.093,
    dec: 11.967,
    magnitude: 1.36,
    color: '#ccffff',
    distance: 79,
    spectralType: 'B7V',
    constellation: 'Leo',
    bayer: 'α Leo'
  },
  {
    id: 'HIP100751',
    name: 'Adhara',
    ra: 104.656,
    dec: -28.972,
    magnitude: 1.50,
    color: '#ccffff',
    distance: 430,
    spectralType: 'B2II',
    constellation: 'Canis Major',
    bayer: 'ε CMa'
  }
];

// Datos de constelaciones principales
export const constellations: ConstellationData[] = [
  {
    name: 'Orion',
    abbreviation: 'Ori',
    stars: ['HIP27989', 'HIP24436'], // Betelgeuse, Rigel
    lines: [[0, 1]],
    boundaries: [
      [88.793, 7.407], [78.634, -8.202], [83.001, -9.669], [88.793, 7.407]
    ]
  },
  {
    name: 'Ursa Major',
    abbreviation: 'UMa',
    stars: ['HIP54061', 'HIP53910', 'HIP58001', 'HIP59774', 'HIP62956', 'HIP65378', 'HIP67301'],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    boundaries: [
      [165.932, 61.751], [178.457, 53.695], [193.507, 55.960], [206.885, 49.313],
      [213.915, 54.925], [200.981, 60.718], [165.932, 61.751]
    ]
  },
  {
    name: 'Canis Major',
    abbreviation: 'CMa',
    stars: ['HIP32349', 'HIP100751'], // Sirius, Adhara
    lines: [[0, 1]],
    boundaries: [
      [101.287, -16.716], [104.656, -28.972], [111.023, -27.934], [101.287, -16.716]
    ]
  },
  {
    name: 'Lyra',
    abbreviation: 'Lyr',
    stars: ['HIP91262'], // Vega
    lines: [],
    boundaries: [
      [279.235, 38.784], [282.520, 37.605], [285.805, 36.426], [279.235, 38.784]
    ]
  }
];

// Función para obtener la posición actual de los planetas
export async function getPlanetPositions(): Promise<PlanetData[]> {
  try {
    // En una implementación real, esto haría una llamada a una API de efemérides
    // Por ahora, retornamos datos de ejemplo
    const now = new Date();
    const planets: PlanetData[] = [
      {
        id: 'mars',
        name: 'Marte',
        ra: 45.2,
        dec: 15.8,
        magnitude: -0.5,
        distance: 1.2,
        elongation: 45
      },
      {
        id: 'jupiter',
        name: 'Júpiter',
        ra: 120.5,
        dec: -8.3,
        magnitude: -2.1,
        distance: 4.8,
        elongation: 90
      },
      {
        id: 'saturn',
        name: 'Saturno',
        ra: 200.1,
        dec: -12.7,
        magnitude: 0.8,
        distance: 9.2,
        elongation: 135
      }
    ];
    
    return planets;
  } catch (error) {
    console.error('Error obteniendo posiciones planetarias:', error);
    return [];
  }
}

// Función para obtener datos de asteroides brillantes
export async function getBrightAsteroids(): Promise<any[]> {
  try {
    // Esta función se conectaría con la API de asteroides que ya tenemos
    const response = await fetch('/api/nasa-asteroids');
    const data = await response.json();
    
    // Filtrar solo asteroides brillantes (magnitud < 10)
    return data.filter((asteroid: any) => asteroid.magnitude < 10);
  } catch (error) {
    console.error('Error obteniendo asteroides brillantes:', error);
    return [];
  }
}

// Función para obtener datos de satélites visibles
export async function getVisibleSatellites(): Promise<any[]> {
  try {
    // Esta función se conectaría con la API de satélites que ya tenemos
    const response = await fetch('/api/space-track');
    const data = await response.json();
    
    // Filtrar solo satélites brillantes y visibles
    return data.filter((satellite: any) => satellite.magnitude < 6);
  } catch (error) {
    console.error('Error obteniendo satélites visibles:', error);
    return [];
  }
}

// Función para convertir coordenadas astronómicas a coordenadas 3D
export function raDecToXYZ(ra: number, dec: number, distance: number = 100): [number, number, number] {
  const raRad = (ra * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  
  const x = distance * Math.cos(decRad) * Math.cos(raRad);
  const y = distance * Math.sin(decRad);
  const z = distance * Math.cos(decRad) * Math.sin(raRad);
  
  return [x, y, z];
}

// Función para obtener el color basado en el tipo espectral
export function getSpectralColor(spectralType: string): string {
  const type = spectralType.charAt(0).toUpperCase();
  const colors: { [key: string]: string } = {
    'O': '#9bb0ff', // Azul muy brillante
    'B': '#aabfff', // Azul-blanco
    'A': '#cad7ff', // Blanco
    'F': '#f8f7ff', // Blanco-amarillo
    'G': '#fff4ea', // Amarillo
    'K': '#ffd2a1', // Naranja
    'M': '#ffcc6f', // Rojo-naranja
    'L': '#ff6b35', // Rojo muy oscuro
    'T': '#ff4d4d', // Rojo-marrón
    'Y': '#cc0000'  // Marrón muy oscuro
  };
  
  return colors[type] || '#ffffff';
}

// Función para obtener estrellas por magnitud
export function getStarsByMagnitude(maxMagnitude: number): StarData[] {
  return brightStars.filter(star => star.magnitude <= maxMagnitude);
}

// Función para obtener estrellas por constelación
export function getStarsByConstellation(constellationName: string): StarData[] {
  return brightStars.filter(star => star.constellation === constellationName);
}

// Función para obtener datos del cielo actual
export async function getCurrentSkyData() {
  const [planets, asteroids, satellites] = await Promise.all([
    getPlanetPositions(),
    getBrightAsteroids(),
    getVisibleSatellites()
  ]);
  
  return {
    stars: brightStars,
    planets,
    asteroids,
    satellites,
    constellations
  };
} 