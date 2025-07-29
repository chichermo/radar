// SpaceX API Service
const SPACEX_BASE_URL = 'https://api.spacexdata.com/v4';

export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  flight_number: number;
  success: boolean;
  details: string;
  rocket: string;
  launchpad: string;
  links: {
    patch: {
      small: string;
      large: string;
    };
    webcast: string;
    article: string;
    wikipedia: string;
  };
}

export interface SpaceXRocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  description: string;
  flickr_images: string[];
}

export interface SpaceXPayload {
  id: string;
  name: string;
  type: string;
  mass_kg: number;
  orbit: string;
  customers: string[];
  nationalities: string[];
  manufacturers: string[];
}

export class SpaceXAPIService {
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

  static async getLaunches(limit = 10): Promise<SpaceXLaunch[]> {
    try {
      const url = `${SPACEX_BASE_URL}/launches?limit=${limit}&order=desc`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`SpaceX Launches API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching SpaceX launches:', error);
      // Return fallback data
      return [
        {
          id: '1',
          name: 'Starlink 4-1',
          date_utc: new Date().toISOString(),
          date_unix: Math.floor(Date.now() / 1000),
          date_local: new Date().toLocaleDateString(),
          flight_number: 1,
          success: true,
          details: 'Starlink mission',
          rocket: '5e9d0d95eda69973a809d1ec',
          launchpad: '5e9e4502f509094188566f88',
          links: {
            patch: {
              small: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200&h=200&fit=crop',
              large: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop'
            },
            webcast: '',
            article: '',
            wikipedia: ''
          }
        }
      ];
    }
  }

  static async getRockets(): Promise<SpaceXRocket[]> {
    try {
      const url = `${SPACEX_BASE_URL}/rockets`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`SpaceX Rockets API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching SpaceX rockets:', error);
      return [
        {
          id: '1',
          name: 'Falcon 9',
          type: 'rocket',
          active: true,
          stages: 2,
          boosters: 0,
          cost_per_launch: 50000000,
          success_rate_pct: 98,
          first_flight: '2010-06-04',
          country: 'United States',
          company: 'SpaceX',
          description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX.',
          flickr_images: ['https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop']
        }
      ];
    }
  }

  static async getNextLaunch(): Promise<SpaceXLaunch | null> {
    try {
      const url = `${SPACEX_BASE_URL}/launches/next`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`SpaceX Next Launch API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching next SpaceX launch:', error);
      return null;
    }
  }

  static async getStarlinkSatellites(): Promise<any[]> {
    try {
      const url = `${SPACEX_BASE_URL}/starlink`;
      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`SpaceX Starlink API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Starlink satellites:', error);
      return [];
    }
  }
} 