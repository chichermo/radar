'use client';

import { useState, useEffect } from 'react';
import { Globe, Satellite, Database, Wifi, AlertCircle, CheckCircle, Clock, RefreshCw, Activity, BarChart3 } from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';
import { useI18n } from '@/lib/i18n';

interface AgencyData {
  id: string;
  name: string;
  country: string;
  logo: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: Date;
  satellites: number;
  missions: number;
  dataPoints: number;
  apiEndpoint: string;
  responseTime: number;
  uptime: number;
}

interface GlobalMission {
  id: string;
  name: string;
  agency: string;
  type: 'satellite' | 'rover' | 'probe' | 'station';
  status: 'active' | 'inactive' | 'launching' | 'returning';
  launchDate: Date;
  location: string;
  description: string;
  dataRate: number;
}

export default function GlobalIntegrationPage() {
  const { t } = useI18n();
  const [agencies, setAgencies] = useState<AgencyData[]>([]);
  const [missions, setMissions] = useState<GlobalMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [refreshInterval, setRefreshInterval] = useState<number>(30);

  // Datos simulados de agencias espaciales
  const mockAgencies: AgencyData[] = [
    {
      id: 'nasa',
      name: 'NASA',
      country: 'Estados Unidos',
      logo: '/api/placeholder/40/40',
      status: 'online',
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      satellites: 23,
      missions: 15,
      dataPoints: 15420,
      apiEndpoint: 'https://api.nasa.gov',
      responseTime: 245,
      uptime: 99.8
    },
    {
      id: 'esa',
      name: 'ESA',
      country: 'Europa',
      logo: '/api/placeholder/40/40',
      status: 'online',
      lastUpdate: new Date(Date.now() - 3 * 60 * 1000),
      satellites: 18,
      missions: 12,
      dataPoints: 12850,
      apiEndpoint: 'https://api.esa.int',
      responseTime: 189,
      uptime: 99.5
    },
    {
      id: 'jaxa',
      name: 'JAXA',
      country: 'Japón',
      logo: '/api/placeholder/40/40',
      status: 'online',
      lastUpdate: new Date(Date.now() - 7 * 60 * 1000),
      satellites: 12,
      missions: 8,
      dataPoints: 9870,
      apiEndpoint: 'https://api.jaxa.jp',
      responseTime: 312,
      uptime: 98.9
    },
    {
      id: 'roscosmos',
      name: 'Roscosmos',
      country: 'Rusia',
      logo: '/api/placeholder/40/40',
      status: 'maintenance',
      lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
      satellites: 16,
      missions: 10,
      dataPoints: 11230,
      apiEndpoint: 'https://api.roscosmos.ru',
      responseTime: 567,
      uptime: 95.2
    },
    {
      id: 'cnsa',
      name: 'CNSA',
      country: 'China',
      logo: '/api/placeholder/40/40',
      status: 'online',
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
      satellites: 14,
      missions: 9,
      dataPoints: 8760,
      apiEndpoint: 'https://api.cnsa.gov.cn',
      responseTime: 298,
      uptime: 99.1
    },
    {
      id: 'isro',
      name: 'ISRO',
      country: 'India',
      logo: '/api/placeholder/40/40',
      status: 'online',
      lastUpdate: new Date(Date.now() - 4 * 60 * 1000),
      satellites: 8,
      missions: 6,
      dataPoints: 6540,
      apiEndpoint: 'https://api.isro.gov.in',
      responseTime: 234,
      uptime: 98.7
    }
  ];

  // Datos simulados de misiones globales
  const mockMissions: GlobalMission[] = [
    {
      id: '1',
      name: 'ISS',
      agency: 'NASA',
      type: 'station',
      status: 'active',
      launchDate: new Date('1998-11-20'),
      location: 'LEO - 408 km',
      description: 'Estación Espacial Internacional - Laboratorio orbital',
      dataRate: 150
    },
    {
      id: '2',
      name: 'Mars Perseverance',
      agency: 'NASA',
      type: 'rover',
      status: 'active',
      launchDate: new Date('2020-07-30'),
      location: 'Marte - Cráter Jezero',
      description: 'Rover explorando la superficie marciana',
      dataRate: 2.5
    },
    {
      id: '3',
      name: 'BepiColombo',
      agency: 'ESA',
      type: 'probe',
      status: 'active',
      launchDate: new Date('2018-10-20'),
      location: 'En ruta a Mercurio',
      description: 'Misión conjunta ESA-JAXA a Mercurio',
      dataRate: 0.8
    },
    {
      id: '4',
      name: 'Hayabusa2',
      agency: 'JAXA',
      type: 'probe',
      status: 'returning',
      launchDate: new Date('2014-12-03'),
      location: 'Retorno a Tierra',
      description: 'Misión de retorno de muestras de asteroide',
      dataRate: 0.1
    },
    {
      id: '5',
      name: 'Tiangong',
      agency: 'CNSA',
      type: 'station',
      status: 'active',
      launchDate: new Date('2021-04-29'),
      location: 'LEO - 400 km',
      description: 'Estación espacial china',
      dataRate: 120
    },
    {
      id: '6',
      name: 'Chandrayaan-3',
      agency: 'ISRO',
      type: 'probe',
      status: 'active',
      launchDate: new Date('2023-07-14'),
      location: 'Luna - Polo Sur',
      description: 'Misión lunar india',
      dataRate: 1.2
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAgencies(mockAgencies);
      setMissions(mockMissions);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'offline': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'maintenance': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'offline': return <AlertCircle className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-red-400';
      case 'launching': return 'text-blue-400';
      case 'returning': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 200) return 'text-green-400';
    if (time < 400) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredMissions = selectedAgency === 'all' 
    ? missions 
    : missions.filter(mission => mission.agency === selectedAgency);

  const totalDataPoints = agencies.reduce((sum, agency) => sum + agency.dataPoints, 0);
  const totalSatellites = agencies.reduce((sum, agency) => sum + agency.satellites, 0);
  const totalMissions = agencies.reduce((sum, agency) => sum + agency.missions, 0);
  const averageUptime = agencies.reduce((sum, agency) => sum + agency.uptime, 0) / agencies.length;

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('global.title')}
        </h1>
        <p className="text-gray-300">
          {t('global.subtitle')}
        </p>
      </header>

      {/* Estadísticas Globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Database className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t('global.total_data')}</p>
              <p className="text-2xl font-bold text-white">{totalDataPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Satellite className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">{t('global.satellites')}</p>
              <p className="text-2xl font-bold text-white">{totalSatellites}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">{t('global.active_missions')}</p>
              <p className="text-2xl font-bold text-white">{totalMissions}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">{t('global.average_uptime')}</p>
              <p className="text-2xl font-bold text-white">{averageUptime.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de APIs */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {t('global.api_status_title')}
          </h2>
          <div className="flex items-center space-x-3">
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>1m</option>
              <option value={300}>5m</option>
            </select>
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-2">{t('global.connecting_agencies')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agencies.map((agency) => (
              <div key={agency.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{agency.name}</h3>
                      <p className="text-sm text-gray-400">{agency.country}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(agency.status)}`}>
                    {getStatusIcon(agency.status)}
                    <span className="capitalize">{agency.status}</span>
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('global.satellites')}:</span>
                    <span className="text-white">{agency.satellites}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('global.missions')}:</span>
                    <span className="text-white">{agency.missions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('global.data')}:</span>
                    <span className="text-white">{agency.dataPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('global.response')}:</span>
                    <span className={`${getResponseTimeColor(agency.responseTime)}`}>
                      {agency.responseTime}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('global.uptime')}:</span>
                    <span className="text-white">{agency.uptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('global.last_update')}:</span>
                    <span className="text-white">{formatTimeOnly(agency.lastUpdate)}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-600">
                  <p className="text-xs text-gray-400 truncate" title={agency.apiEndpoint}>
                    {agency.apiEndpoint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Misiones Globales */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {t('global.active_global_missions')}
          </h2>
          <select
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">{t('global.all_agencies')}</option>
            {agencies.map(agency => (
              <option key={agency.id} value={agency.name}>{agency.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredMissions.map((mission) => (
            <div key={mission.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700/70 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-medium">{mission.name}</h3>
                    <span className="text-sm text-gray-400">({mission.agency})</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMissionStatusColor(mission.status)}`}>
                      {mission.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{mission.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{t('global.launch')}: {formatDate(mission.launchDate)}</span>
                    <span>{t('global.location')}: {mission.location}</span>
                    <span>{t('global.data')}: {mission.dataRate} Mbps</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {mission.dataRate}
                  </div>
                  <div className="text-xs text-gray-400">Mbps</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red de Sensores */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('global.distributed_sensor_network')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">{t('global.ground_stations')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.total')}:</span>
                <span className="text-white">47 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.active')}:</span>
                <span className="text-green-400">42 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.maintenance')}:</span>
                <span className="text-yellow-400">3 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.offline')}:</span>
                <span className="text-red-400">2 {t('global.stations')}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">{t('global.space_sensors')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.radar')}:</span>
                <span className="text-white">23 {t('global.systems')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.optical')}:</span>
                <span className="text-white">18 {t('global.telescopes')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.laser')}:</span>
                <span className="text-white">12 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.radio')}:</span>
                <span className="text-white">8 {t('global.antennas')}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">{t('global.global_coverage')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.america')}:</span>
                <span className="text-white">15 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.europe')}:</span>
                <span className="text-white">12 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.asia')}:</span>
                <span className="text-white">10 {t('global.stations')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('global.others')}:</span>
                <span className="text-white">10 {t('global.stations')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Integración */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('global.integration_information')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('global.supported_protocols')}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• REST API (JSON/XML)</li>
              <li>• GraphQL</li>
              <li>• WebSocket ({t('global.real_time')})</li>
              <li>• FTP/SFTP</li>
              <li>• {t('global.proprietary_protocols')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('global.data_standards')}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• CCSDS ({t('global.consultative_committee')})</li>
              <li>• ISO 19115 ({t('global.geographic_metadata')})</li>
              <li>• SPASE ({t('global.space_physics_archive')})</li>
              <li>• OGC ({t('global.open_geospatial_consortium')})</li>
              <li>• {t('global.agency_specific_standards')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
