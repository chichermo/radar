// ESA API Service
const ESA_BASE_URL = 'https://www.esa.int';

export interface ESAMission {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'planned';
  launch_date: string;
  description: string;
  image_url: string;
}

export interface ESASpacecraft {
  id: string;
  name: string;
  mission: string;
  status: 'operational' | 'decommissioned' | 'planned';
  position: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
}

export class ESAAPIService {
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

  static async getMissions(): Promise<ESAMission[]> {
    try {
      // Simulated ESA missions data since ESA doesn't have a public API
      return [
        {
          id: '1',
          name: 'Gaia',
          status: 'active',
          launch_date: '2013-12-19',
          description: 'Mission to create the most accurate 3D map of our Galaxy',
          image_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop'
        },
        {
          id: '2',
          name: 'Rosetta',
          status: 'completed',
          launch_date: '2004-03-02',
          description: 'First mission to orbit and land on a comet',
          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
        },
        {
          id: '3',
          name: 'BepiColombo',
          status: 'active',
          launch_date: '2018-10-20',
          description: 'Mission to study Mercury',
          image_url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop'
        },
        {
          id: '4',
          name: 'JUICE',
          status: 'planned',
          launch_date: '2023-04-14',
          description: 'Jupiter Icy Moons Explorer',
          image_url: 'https://images.unsplash.com/photo-1614314107768-6018060b388b?w=400&h=300&fit=crop'
        }
      ];
    } catch (error) {
      console.error('Error fetching ESA missions:', error);
      return [];
    }
  }

  static async getSpacecraft(): Promise<ESASpacecraft[]> {
    try {
      // Simulated spacecraft data
      return [
        {
          id: '1',
          name: 'Gaia',
          mission: 'Gaia',
          status: 'operational',
          position: {
            latitude: 0,
            longitude: 0,
            altitude: 1500000
          }
        },
        {
          id: '2',
          name: 'BepiColombo',
          mission: 'BepiColombo',
          status: 'operational',
          position: {
            latitude: 0,
            longitude: 0,
            altitude: 50000000
          }
        }
      ];
    } catch (error) {
      console.error('Error fetching ESA spacecraft:', error);
      return [];
    }
  }
} 