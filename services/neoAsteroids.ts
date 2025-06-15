import axios from 'axios';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';

export async function getNeoAsteroids() {
  try {
    // Verificar si tenemos una API key válida
    if (!NASA_API_KEY || NASA_API_KEY === 'DEMO_KEY') {
      console.warn('API key de NASA no configurada, usando datos simulados');
      return getMockAsteroidData();
    }

    const res = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return res.data;
  } catch (error) {
    console.warn('Error obteniendo datos de asteroides NEO, usando datos simulados:', error);
    return getMockAsteroidData();
  }
}

function getMockAsteroidData() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return {
    links: {
      self: "https://api.nasa.gov/neo/rest/v1/feed"
    },
    element_count: 3,
    near_earth_objects: {
      [today.toISOString().split('T')[0]]: [
        {
          id: "2523653",
          neo_reference_id: "2523653",
          name: "(2024 DW)",
          nasa_jpl_url: "http://ssd-api.jpl.nasa.gov/sbdb.cgi?sstr=2523653",
          absolute_magnitude_h: 26.7,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 0.008,
              estimated_diameter_max: 0.018
            }
          },
          is_potentially_hazardous_asteroid: false,
          close_approach_data: [
            {
              close_approach_date: today.toISOString().split('T')[0],
              close_approach_date_full: today.toISOString(),
              epoch_date_close_approach: today.getTime(),
              relative_velocity: {
                kilometers_per_second: "5.2",
                kilometers_per_hour: "18720"
              },
              miss_distance: {
                astronomical: "0.0001",
                lunar: "0.04",
                kilometers: "15000"
              },
              orbiting_body: "Earth"
            }
          ]
        },
        {
          id: "2523654",
          neo_reference_id: "2523654",
          name: "(2024 DX)",
          nasa_jpl_url: "http://ssd-api.jpl.nasa.gov/sbdb.cgi?sstr=2523654",
          absolute_magnitude_h: 25.2,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 0.012,
              estimated_diameter_max: 0.027
            }
          },
          is_potentially_hazardous_asteroid: true,
          close_approach_data: [
            {
              close_approach_date: today.toISOString().split('T')[0],
              close_approach_date_full: today.toISOString(),
              epoch_date_close_approach: today.getTime(),
              relative_velocity: {
                kilometers_per_second: "8.1",
                kilometers_per_hour: "29160"
              },
              miss_distance: {
                astronomical: "0.0002",
                lunar: "0.08",
                kilometers: "30000"
              },
              orbiting_body: "Earth"
            }
          ]
        }
      ],
      [tomorrow.toISOString().split('T')[0]]: [
        {
          id: "2523655",
          neo_reference_id: "2523655",
          name: "(2024 DY)",
          nasa_jpl_url: "http://ssd-api.jpl.nasa.gov/sbdb.cgi?sstr=2523655",
          absolute_magnitude_h: 24.8,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 0.015,
              estimated_diameter_max: 0.033
            }
          },
          is_potentially_hazardous_asteroid: false,
          close_approach_data: [
            {
              close_approach_date: tomorrow.toISOString().split('T')[0],
              close_approach_date_full: tomorrow.toISOString(),
              epoch_date_close_approach: tomorrow.getTime(),
              relative_velocity: {
                kilometers_per_second: "6.7",
                kilometers_per_hour: "24120"
              },
              miss_distance: {
                astronomical: "0.0003",
                lunar: "0.12",
                kilometers: "45000"
              },
              orbiting_body: "Earth"
            }
          ]
        }
      ]
    }
  };
} 