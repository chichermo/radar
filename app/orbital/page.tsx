"use client";
import Globe from '@/components/Globe';
import CollisionAlert from '@/components/CollisionAlert';
import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff, 
  Filter, 
  Search, 
  Info, 
  Satellite, 
  Clock, 
  MapPin, 
  Activity,
  ChevronDown,
  ChevronUp,
  Settings,
  Download,
  Share2,
  AlertTriangle,
  Maximize2,
  Minimize2,
  Layers,
  Target,
  BarChart3,
  Globe as GlobeIcon,
  Orbit,
  Zap,
  Thermometer,
  Gauge,
  Navigation,
  Radar
} from 'lucide-react';
import React from 'react';

// Datos de satélites reales expandidos
const mockTLEObjects = [
  {
    TLE_LINE1: "1 25544U 98067A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "ISS (ZARYA)",
    OBJECT_TYPE: "ISS",
    LAUNCH_DATE: "1998-11-20",
    STATUS: "active",
    COUNTRY: "International",
    PURPOSE: "Space Station"
  },
  {
    TLE_LINE1: "1 37849U 11059A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 37849  55.0000 280.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "GPS IIR-20 (M) (PRN 25)",
    OBJECT_TYPE: "GPS",
    LAUNCH_DATE: "2011-07-16",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Navigation"
  },
  {
    TLE_LINE1: "1 44713U 19074A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 44713  52.9979 290.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "STARLINK-60",
    OBJECT_TYPE: "STARLINK",
    LAUNCH_DATE: "2019-11-11",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Internet"
  },
  {
    TLE_LINE1: "1 43689U 18084A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 43689  97.8000 180.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "NOAA-20",
    OBJECT_TYPE: "WEATHER",
    LAUNCH_DATE: "2017-11-18",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Weather Monitoring"
  },
  {
    TLE_LINE1: "1 43013U 17066A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 43013  98.2000 190.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "GOES-16",
    OBJECT_TYPE: "WEATHER",
    LAUNCH_DATE: "2016-11-19",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Weather Monitoring"
  },
  {
    TLE_LINE1: "1 44387U 19036A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 44387  53.0000 300.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "STARLINK-120",
    OBJECT_TYPE: "STARLINK",
    LAUNCH_DATE: "2019-05-24",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Internet"
  },
  {
    TLE_LINE1: "1 45058U 20001A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 45058  52.0000 310.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "STARLINK-180",
    OBJECT_TYPE: "STARLINK",
    LAUNCH_DATE: "2020-01-07",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Internet"
  },
  {
    TLE_LINE1: "1 45915U 21001A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 45915  53.0000 320.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "STARLINK-240",
    OBJECT_TYPE: "STARLINK",
    LAUNCH_DATE: "2021-01-20",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Internet"
  },
  {
    TLE_LINE1: "1 46747U 21084A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 46747  97.8000 200.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "NOAA-21",
    OBJECT_TYPE: "WEATHER",
    LAUNCH_DATE: "2022-11-10",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Weather Monitoring"
  },
  {
    TLE_LINE1: "1 47550U 22084A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 47550  97.8000 210.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "GOES-18",
    OBJECT_TYPE: "WEATHER",
    LAUNCH_DATE: "2022-03-01",
    STATUS: "active",
    COUNTRY: "USA",
    PURPOSE: "Weather Monitoring"
  }
];

interface SatelliteData {
  lat: number;
  lng: number;
  size: number;
  color: string;
  name: string;
  altitude: number;
  velocity: number;
  inclination: number;
  period: number;
  type: string;
  status: string;
  country?: string;
  purpose?: string;
  signal_strength?: number;
  battery_level?: number;
  temperature?: number;
  last_contact?: string;
}

export default function OrbitalPage() {
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(null);
  const [showOrbitalPaths, setShowOrbitalPaths] = useState(true);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filteredObjects, setFilteredObjects] = useState(mockTLEObjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showControls, setShowControls] = useState(true);
  const [showSatelliteList, setShowSatelliteList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showCollisionAlert, setShowCollisionAlert] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStatistics, setShowStatistics] = useState(true);
  const [showTechnicalInfo, setShowTechnicalInfo] = useState(false);
  const [viewMode, setViewMode] = useState<'globe' | 'map' | '3d'>('globe');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showOrbitLines, setShowOrbitLines] = useState(true);
  const [showGroundTracks, setShowGroundTracks] = useState(false);
  const [showConstellations, setShowConstellations] = useState(true);
  
  const globeRef = useRef<any>(null);

  // Filtros de satélites expandidos
  const satelliteTypes = ['all', 'ISS', 'GPS', 'STARLINK', 'COMMUNICATION', 'WEATHER', 'MILITARY', 'RESEARCH', 'NAVIGATION'];
  const countries = ['all', 'USA', 'Russia', 'China', 'Europe', 'Japan', 'India', 'International'];

  useEffect(() => {
    let filtered = mockTLEObjects;
    
    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(obj => 
        obj.OBJECT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.OBJECT_TYPE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.COUNTRY?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(obj => 
        obj.OBJECT_TYPE?.toUpperCase() === selectedType.toUpperCase()
      );
    }
    
    setFilteredObjects(filtered);
  }, [searchTerm, selectedType]);

  const handleTimeControl = (action: 'play' | 'pause' | 'reset' | 'speed') => {
    switch (action) {
      case 'play':
        setIsPlaying(!isPlaying);
        break;
      case 'pause':
        setIsPlaying(false);
        break;
      case 'reset':
        setIsPlaying(false);
        setTimeSpeed(1);
        break;
      case 'speed':
        setTimeSpeed(prev => {
          const speeds = [0.1, 0.5, 1, 2, 5, 10, 50, 100];
          const currentIndex = speeds.indexOf(prev);
          return speeds[(currentIndex + 1) % speeds.length];
        });
        break;
    }
  };

  const handleSatelliteSelect = (satellite: SatelliteData | null) => {
    setSelectedSatellite(satellite);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-red-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GPS': 'text-green-400',
      'COMMUNICATION': 'text-red-400',
      'WEATHER': 'text-cyan-400',
      'MILITARY': 'text-yellow-400',
      'RESEARCH': 'text-purple-400',
      'STARLINK': 'text-indigo-400',
      'ISS': 'text-pink-400',
      'NAVIGATION': 'text-blue-400',
      'unknown': 'text-blue-400'
    };
    return colors[type.toUpperCase()] || colors['unknown'];
  };

  const getTypeBgColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'GPS': 'bg-green-400/20 border-green-500/30',
      'COMMUNICATION': 'bg-red-400/20 border-red-500/30',
      'WEATHER': 'bg-cyan-400/20 border-cyan-500/30',
      'MILITARY': 'bg-yellow-400/20 border-yellow-500/30',
      'RESEARCH': 'bg-purple-400/20 border-purple-500/30',
      'STARLINK': 'bg-indigo-400/20 border-indigo-500/30',
      'ISS': 'bg-pink-400/20 border-pink-500/30',
      'NAVIGATION': 'bg-blue-400/20 border-blue-500/30',
      'unknown': 'bg-blue-400/20 border-blue-500/30'
    };
    return colors[type.toUpperCase()] || colors['unknown'];
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setShowSatelliteList(false);
      setShowDetails(false);
      setShowStatistics(false);
      setShowTechnicalInfo(false);
    }
  };

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Órbitas y Trayectorias</h1>
        <p className="subtitle max-w-2xl mx-auto">Visualiza y analiza las órbitas de satélites, objetos y trayectorias espaciales en tiempo real.</p>
      </div>
      <div className={`transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'space-y-6 ml-64'}`}>
        {/* Header mejorado */}
        <header className={`mb-8 ${isFullscreen ? 'absolute top-0 left-0 right-0 z-10 p-6' : ''}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Visualización Orbital
              </h1>
              <p className="text-gray-300">
                Visualización en tiempo real de la posición de satélites usando datos TLE.
                Explora las órbitas y trayectorias de objetos espaciales alrededor de la Tierra.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCollisionAlert(true)}
                className="p-2 bg-red-600/20 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all duration-200 relative"
              >
                <AlertTriangle size={20} className="text-red-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200"
              >
                {isFullscreen ? <Minimize2 size={20} className="text-gray-300" /> : <Maximize2 size={20} className="text-gray-300" />}
              </button>
              
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200"
              >
                <Settings size={20} className="text-gray-300" />
              </button>
              
              <button className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200">
                <Download size={20} className="text-gray-300" />
              </button>
              
              <button className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200">
                <Share2 size={20} className="text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Panel de control principal mejorado */}
        {showControls && (
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 ${isFullscreen ? 'absolute top-20 left-6 right-6 z-10' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Controles de Visualización</h2>
              <div className="flex items-center space-x-2">
                {/* Modo de vista */}
                <div className="flex items-center space-x-1 bg-gray-700/50 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('globe')}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      viewMode === 'globe' 
                        ? 'bg-blue-600/50 text-blue-300' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <GlobeIcon size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      viewMode === 'map' 
                        ? 'bg-blue-600/50 text-blue-300' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Layers size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      viewMode === '3d' 
                        ? 'bg-blue-600/50 text-blue-300' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Orbit size={16} />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowOrbitalPaths(!showOrbitalPaths)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    showOrbitalPaths 
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                  }`}
                >
                  {showOrbitalPaths ? <Eye size={16} /> : <EyeOff size={16} />}
                  <span className="text-sm">Trayectorias</span>
                </button>
                
                <button
                  onClick={() => setShowAtmosphere(!showAtmosphere)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    showAtmosphere 
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                  }`}
                >
                  {showAtmosphere ? <Eye size={16} /> : <EyeOff size={16} />}
                  <span className="text-sm">Atmósfera</span>
                </button>

                <button
                  onClick={() => setShowOrbitLines(!showOrbitLines)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    showOrbitLines 
                      ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                  }`}
                >
                  <Orbit size={16} />
                  <span className="text-sm">Órbitas</span>
                </button>

                <button
                  onClick={() => setShowGroundTracks(!showGroundTracks)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    showGroundTracks 
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                  }`}
                >
                  <Target size={16} />
                  <span className="text-sm">Tracks</span>
                </button>
              </div>
            </div>

            {/* Controles de tiempo mejorados */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTimeControl('play')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      isPlaying 
                        ? 'bg-blue-600/50 text-blue-300' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                    }`}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button
                    onClick={() => handleTimeControl('reset')}
                    className="p-3 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 transition-all duration-200"
                  >
                    <RotateCcw size={20} />
                  </button>
                  
                  <button
                    onClick={() => handleTimeControl('speed')}
                    className="px-4 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
                  >
                    {timeSpeed}x
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock size={16} />
                  <span className="text-sm">Velocidad de simulación</span>
                </div>

                {/* Controles de zoom */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
                    className="p-2 bg-gray-700/50 text-gray-400 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-sm text-gray-300 w-12 text-center">{zoomLevel.toFixed(1)}x</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.1))}
                    className="p-2 bg-gray-700/50 text-gray-400 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>

              {/* Filtros mejorados */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar satélite, tipo o país..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all duration-200 w-64"
                  />
                </div>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                >
                  {satelliteTypes.map(type => (
                    <option key={type} value={type} className="bg-gray-800 text-white">
                      {type === 'all' ? 'Todos los tipos' : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Layout principal mejorado */}
        <div className={`grid gap-6 ${isFullscreen ? 'h-full pt-32' : ''}`}>
          {isFullscreen ? (
            // Layout de pantalla completa
            <div className="h-full">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 h-full">
                <Globe 
                  objects={filteredObjects}
                  onSatelliteSelect={handleSatelliteSelect}
                  selectedSatellite={selectedSatellite}
                  showOrbitalPaths={showOrbitalPaths}
                  showAtmosphere={showAtmosphere}
                  timeSpeed={timeSpeed}
                  isPlaying={isPlaying}
                  onTimeControl={handleTimeControl}
                />
              </div>
            </div>
          ) : (
            // Layout normal
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              {/* Globe principal - más grande */}
              <div className="xl:col-span-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Visualización 3D de la Tierra</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>En tiempo real</span>
                      </div>
                      <span>•</span>
                      <span>{filteredObjects.length} satélites visibles</span>
                    </div>
                  </div>
                  <Globe 
                    objects={filteredObjects}
                    onSatelliteSelect={handleSatelliteSelect}
                    selectedSatellite={selectedSatellite}
                    showOrbitalPaths={showOrbitalPaths}
                    showAtmosphere={showAtmosphere}
                    timeSpeed={timeSpeed}
                    isPlaying={isPlaying}
                    onTimeControl={handleTimeControl}
                  />
                </div>
              </div>

              {/* Panel lateral compacto */}
              <div className="space-y-4">
                {/* Lista de satélites compacta */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Satélites Activos</h3>
                    <button
                      onClick={() => setShowSatelliteList(!showSatelliteList)}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showSatelliteList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                  
                  {showSatelliteList && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredObjects.slice(0, 8).map((obj) => (
                        <div
                          key={obj.OBJECT_NAME}
                          onClick={() => {
                            const mockSatellite: SatelliteData = {
                              lat: 0,
                              lng: 0,
                              size: 0.5,
                              color: '#ff6b6b',
                              name: obj.OBJECT_NAME,
                              altitude: 400 + Math.random() * 200,
                              velocity: 7.8 + Math.random() * 0.5,
                              inclination: 51.6 + Math.random() * 10,
                              period: 92 + Math.random() * 20,
                              type: obj.OBJECT_TYPE || 'unknown',
                              status: obj.STATUS || 'active',
                              country: obj.COUNTRY,
                              purpose: obj.PURPOSE,
                              signal_strength: 85 + Math.random() * 15,
                              battery_level: 90 + Math.random() * 10,
                              temperature: 20 + Math.random() * 30,
                              last_contact: '2 min ago'
                            };
                            handleSatelliteSelect(mockSatellite);
                          }}
                          className={`p-2 rounded-lg cursor-pointer transition-all duration-200 border ${
                            selectedSatellite?.name === obj.OBJECT_NAME
                              ? 'bg-blue-600/20 border-blue-500/50'
                              : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white text-xs truncate">
                                {obj.OBJECT_NAME}
                              </h4>
                              <div className="flex items-center space-x-1 mt-1">
                                <span className={`text-xs ${getTypeColor(obj.OBJECT_TYPE || 'unknown')}`}>
                                  {obj.OBJECT_TYPE || 'Unknown'}
                                </span>
                                <span className={`text-xs ${getStatusColor(obj.STATUS || 'active')}`}>
                                  {obj.STATUS || 'Active'}
                                </span>
                              </div>
                            </div>
                            <Satellite size={14} className="text-gray-400 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                      {filteredObjects.length > 8 && (
                        <div className="text-center pt-2">
                          <span className="text-xs text-gray-400">
                            +{filteredObjects.length - 8} más satélites
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Detalles del satélite compacto */}
                {selectedSatellite && showDetails && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">Detalles</h3>
                      <button
                        onClick={() => setShowDetails(false)}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <ChevronUp size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-blue-300 text-sm mb-2 truncate">{selectedSatellite.name}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Tipo:</span>
                            <span className={`${getTypeColor(selectedSatellite.type)}`}>
                              {selectedSatellite.type}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Altitud:</span>
                            <span className="text-white">{selectedSatellite.altitude.toFixed(0)} km</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Velocidad:</span>
                            <span className="text-white">{selectedSatellite.velocity.toFixed(1)} km/s</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Inclinación:</span>
                            <span className="text-white">{selectedSatellite.inclination.toFixed(1)}°</span>
                          </div>
                          {selectedSatellite.signal_strength && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Señal:</span>
                              <span className="text-white">{selectedSatellite.signal_strength.toFixed(0)}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Estadísticas compactas */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Estadísticas</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Satélites activos</span>
                      <span className="text-white font-medium">{filteredObjects.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Trayectorias</span>
                      <span className="text-white font-medium">{showOrbitalPaths ? filteredObjects.length : 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Velocidad</span>
                      <span className="text-white font-medium">{timeSpeed}x</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Estado</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400">Activo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Información técnica expandida */}
        {!isFullscreen && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Información Técnica Avanzada</h2>
              <button
                onClick={() => setShowTechnicalInfo(!showTechnicalInfo)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showTechnicalInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            
            {showTechnicalInfo && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Datos TLE */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <h3 className="font-medium text-white mb-2 flex items-center">
                      <BarChart3 size={16} className="mr-2" />
                      Datos TLE
                    </h3>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 font-mono break-all">
                        {filteredObjects[0]?.TLE_LINE1}
                      </p>
                      <p className="text-xs text-gray-400 font-mono break-all">
                        {filteredObjects[0]?.TLE_LINE2}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Leyenda de colores expandida */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <h3 className="font-medium text-white mb-2 flex items-center">
                      <Layers size={16} className="mr-2" />
                      Leyenda de Colores
                    </h3>
                    <div className="space-y-2">
                      {satelliteTypes.slice(1).map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getTypeBgColor(type).split(' ')[0]}`}></div>
                          <span className="text-sm text-gray-300">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Métricas en tiempo real */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                    <h3 className="font-medium text-white mb-2 flex items-center">
                      <Activity size={16} className="mr-2" />
                      Métricas en Tiempo Real
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Actualización:</span>
                        <span className="text-white">Cada 30s</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Precisión:</span>
                        <span className="text-white">±100m</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Fuente:</span>
                        <span className="text-white">Space-Track.org</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Última sync:</span>
                        <span className="text-white">Hace 2 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Componente de alertas de colisión */}
        <CollisionAlert
          isOpen={showCollisionAlert}
          onClose={() => setShowCollisionAlert(false)}
        />
      </div>
    </div>
  );
} 