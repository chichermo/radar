import { NextRequest, NextResponse } from 'next/server';

// Cache simple en memoria
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Datos simulados de personas en el espacio
const mockPeopleInSpace = [
  {
    name: "Jasmin Moghbeli",
    craft: "ISS",
    nationality: "Estados Unidos",
    mission: "Expedición 70",
    launch_date: "2023-08-26",
    days_in_space: 150,
    role: "Comandante"
  },
  {
    name: "Andreas Mogensen",
    craft: "ISS",
    nationality: "Dinamarca",
    mission: "Expedición 70",
    launch_date: "2023-08-26",
    days_in_space: 150,
    role: "Ingeniero de Vuelo"
  },
  {
    name: "Satoshi Furukawa",
    craft: "ISS",
    nationality: "Japón",
    mission: "Expedición 70",
    launch_date: "2023-08-26",
    days_in_space: 150,
    role: "Ingeniero de Vuelo"
  },
  {
    name: "Konstantin Borisov",
    craft: "ISS",
    nationality: "Rusia",
    mission: "Expedición 70",
    launch_date: "2023-08-26",
    days_in_space: 150,
    role: "Ingeniero de Vuelo"
  },
  {
    name: "Oleg Kononenko",
    craft: "ISS",
    nationality: "Rusia",
    mission: "Expedición 70",
    launch_date: "2023-09-15",
    days_in_space: 120,
    role: "Ingeniero de Vuelo"
  },
  {
    name: "Nikolai Chub",
    craft: "ISS",
    nationality: "Rusia",
    mission: "Expedición 70",
    launch_date: "2023-09-15",
    days_in_space: 120,
    role: "Ingeniero de Vuelo"
  },
  {
    name: "Loral O'Hara",
    craft: "ISS",
    nationality: "Estados Unidos",
    mission: "Expedición 70",
    launch_date: "2023-09-15",
    days_in_space: 120,
    role: "Ingeniero de Vuelo"
  }
];

export async function GET(request: NextRequest) {
  try {
    // Verificar cache
    const cacheKey = 'people_in_space';
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data);
    }

    // Intentar obtener datos reales de la API de Open Notify
    try {
      const response = await fetch('http://api.open-notify.org/astros.json');
      
      if (response.ok) {
        const data = await response.json();
        
        // Enriquecer los datos con información adicional
        const enrichedData = {
          ...data,
          people: data.people.map((person: any) => ({
            ...person,
            nationality: getNationality(person.name),
            mission: getCurrentMission(person.craft),
            launch_date: getLaunchDate(person.name),
            days_in_space: calculateDaysInSpace(person.name),
            role: getRole(person.name)
          })),
          statistics: {
            total_people: data.number,
            by_craft: groupByCraft(data.people),
            by_nationality: groupByNationality(data.people),
            longest_stay: getLongestStay(data.people)
          }
        };

        // Cache de la respuesta exitosa
        cache.set(cacheKey, { data: enrichedData, timestamp: Date.now() });
        return NextResponse.json(enrichedData);
      }
    } catch (error) {
      console.warn('Error obteniendo datos reales de Open Notify, usando datos simulados:', error);
    }

    // Usar datos simulados si la API real falla
    const simulatedData = {
      message: "success",
      number: mockPeopleInSpace.length,
      people: mockPeopleInSpace,
      statistics: {
        total_people: mockPeopleInSpace.length,
        by_craft: groupByCraft(mockPeopleInSpace),
        by_nationality: groupByNationality(mockPeopleInSpace),
        longest_stay: getLongestStay(mockPeopleInSpace)
      },
      note: "Usando datos simulados - la API real no está disponible"
    };

    // Cache de datos simulados
    cache.set(cacheKey, { data: simulatedData, timestamp: Date.now() });
    return NextResponse.json(simulatedData);

  } catch (error) {
    console.error('Error en People in Space API:', error);
    return NextResponse.json({ 
      error: 'Error obteniendo datos de personas en el espacio',
      details: error 
    }, { status: 500 });
  }
}

// Funciones auxiliares para enriquecer datos
function getNationality(name: string): string {
  const nationalities: { [key: string]: string } = {
    'Jasmin': 'Estados Unidos',
    'Andreas': 'Dinamarca',
    'Satoshi': 'Japón',
    'Konstantin': 'Rusia',
    'Oleg': 'Rusia',
    'Nikolai': 'Rusia',
    'Loral': 'Estados Unidos'
  };
  
  for (const [key, nationality] of Object.entries(nationalities)) {
    if (name.includes(key)) return nationality;
  }
  return 'Desconocida';
}

function getCurrentMission(craft: string): string {
  if (craft === 'ISS') return 'Expedición 70';
  return 'Misión desconocida';
}

function getLaunchDate(name: string): string {
  const launchDates: { [key: string]: string } = {
    'Jasmin': '2023-08-26',
    'Andreas': '2023-08-26',
    'Satoshi': '2023-08-26',
    'Konstantin': '2023-08-26',
    'Oleg': '2023-09-15',
    'Nikolai': '2023-09-15',
    'Loral': '2023-09-15'
  };
  
  for (const [key, date] of Object.entries(launchDates)) {
    if (name.includes(key)) return date;
  }
  return '2023-08-26';
}

function calculateDaysInSpace(name: string): number {
  const launchDates: { [key: string]: string } = {
    'Jasmin': '2023-08-26',
    'Andreas': '2023-08-26',
    'Satoshi': '2023-08-26',
    'Konstantin': '2023-08-26',
    'Oleg': '2023-09-15',
    'Nikolai': '2023-09-15',
    'Loral': '2023-09-15'
  };
  
  for (const [key, date] of Object.entries(launchDates)) {
    if (name.includes(key)) {
      const launchDate = new Date(date);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - launchDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }
  return 150;
}

function getRole(name: string): string {
  const roles: { [key: string]: string } = {
    'Jasmin': 'Comandante',
    'Andreas': 'Ingeniero de Vuelo',
    'Satoshi': 'Ingeniero de Vuelo',
    'Konstantin': 'Ingeniero de Vuelo',
    'Oleg': 'Ingeniero de Vuelo',
    'Nikolai': 'Ingeniero de Vuelo',
    'Loral': 'Ingeniero de Vuelo'
  };
  
  for (const [key, role] of Object.entries(roles)) {
    if (name.includes(key)) return role;
  }
  return 'Astronauta';
}

function groupByCraft(people: any[]): { [key: string]: number } {
  return people.reduce((acc, person) => {
    acc[person.craft] = (acc[person.craft] || 0) + 1;
    return acc;
  }, {});
}

function groupByNationality(people: any[]): { [key: string]: number } {
  return people.reduce((acc, person) => {
    const nationality = person.nationality || 'Desconocida';
    acc[nationality] = (acc[nationality] || 0) + 1;
    return acc;
  }, {});
}

function getLongestStay(people: any[]): any {
  return people.reduce((longest, person) => {
    return person.days_in_space > longest.days_in_space ? person : longest;
  }, people[0] || {});
} 