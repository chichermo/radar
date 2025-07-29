// NASA API Service
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

export interface NASAApod {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

export interface NASAAsteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
    };
  }>;
}

export interface NASAAsteroidResponse {
  element_count: number;
  near_earth_objects: Record<string, NASAAsteroid[]>;
}

export interface NASASpaceWeather {
  solar_wind_speed: number;
  solar_wind_density: number;
  kp_index: number;
  geomagnetic_storm: boolean;
  solar_flare_probability: number;
}

export class NASAAPIService {
  private static async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  static async getAPOD(date?: string): Promise<NASAApod> {
    try {
      const url = `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`NASA APOD API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching NASA APOD:', error);
      // Return fallback data
      return {
        date: new Date().toISOString().split('T')[0],
        explanation: 'Imagen del día de la NASA - Datos no disponibles en este momento.',
        media_type: 'image',
        service_version: 'v1',
        title: 'Astronomy Picture of the Day',
        url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop'
      };
    }
  }

  static async getAsteroids(startDate: string, endDate: string): Promise<NASAAsteroidResponse> {
    try {
      const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`NASA Asteroids API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching NASA Asteroids:', error);
      // Return fallback data
      return {
        element_count: 0,
        near_earth_objects: {}
      };
    }
  }

  static async getSpaceWeather(): Promise<NASASpaceWeather> {
    try {
      // Simulated space weather data since NASA doesn't have a public space weather API
      return {
        solar_wind_speed: Math.random() * 500 + 300,
        solar_wind_density: Math.random() * 10 + 5,
        kp_index: Math.floor(Math.random() * 9) + 1,
        geomagnetic_storm: Math.random() > 0.7,
        solar_flare_probability: Math.random() * 100
      };
    } catch (error) {
      console.error('Error fetching space weather:', error);
      return {
        solar_wind_speed: 400,
        solar_wind_density: 7,
        kp_index: 3,
        geomagnetic_storm: false,
        solar_flare_probability: 15
      };
    }
  }

  static async getMarsWeather(): Promise<any> {
    try {
      const url = `${BASE_URL}/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`NASA Mars Weather API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Mars weather:', error);
      return {
        sol_keys: [],
        validity_checks: {}
      };
    }
  }
} 