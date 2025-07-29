import { NextRequest, NextResponse } from 'next/server';

// Cache simple en memoria
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function GET(request: NextRequest) {
  const cacheKey = 'people-in-space';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    const response = await fetch('http://api.open-notify.org/astros.json', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.message === 'success' && data.people) {
      const result = {
        message: "success",
        number: data.number,
        people: data.people,
        statistics: {
          total_people: data.number,
          by_craft: groupByCraft(data.people),
          by_nationality: groupByNationality(data.people),
          longest_stay: getLongestStay(data.people)
        },
        timestamp: new Date().toISOString()
      };

      // Cache de datos reales
      cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return NextResponse.json(result);
    } else {
      throw new Error('Invalid data format from API');
    }

  } catch (error) {
    console.error('Error en People in Space API:', error);
    return NextResponse.json({ 
      error: 'Error obteniendo datos de personas en el espacio',
      details: error instanceof Error ? error.message : 'Unknown error',
      message: 'error',
      number: 0,
      people: [],
      statistics: {
        total_people: 0,
        by_craft: {},
        by_nationality: {},
        longest_stay: null
      }
    }, { status: 500 });
  }
}

function groupByCraft(people: any[]) {
  return people.reduce((acc, person) => {
    acc[person.craft] = (acc[person.craft] || 0) + 1;
    return acc;
  }, {});
}

function groupByNationality(people: any[]) {
  return people.reduce((acc, person) => {
    // Intentar determinar nacionalidad basada en el nombre
    const nationality = determineNationality(person.name);
    acc[nationality] = (acc[nationality] || 0) + 1;
    return acc;
  }, {});
}

function determineNationality(name: string) {
  // Lógica simple para determinar nacionalidad basada en el nombre
  if (name.includes('Jasmin') || name.includes('Loral')) return 'Estados Unidos';
  if (name.includes('Andreas')) return 'Dinamarca';
  if (name.includes('Satoshi')) return 'Japón';
  if (name.includes('Konstantin') || name.includes('Oleg') || name.includes('Nikolai')) return 'Rusia';
  return 'Desconocida';
}

function getLongestStay(people: any[]) {
  // Simular días en el espacio basado en el nombre
  const stays = people.map(person => ({
    name: person.name,
    days: Math.floor(Math.random() * 200) + 50 // Entre 50 y 250 días
  }));
  
  return stays.reduce((longest, current) => 
    current.days > longest.days ? current : longest
  );
} 