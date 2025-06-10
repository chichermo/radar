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
  AlertTriangle
} from 'lucide-react';

// Mock data mejorado - esto será reemplazado por datos reales de la API
const mockTLEObjects = [
  {
    TLE_LINE1: "1 25544U 98067A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 25544  51.6423 290.9073 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "ISS (ZARYA)",
    OBJECT_TYPE: "ISS",
    LAUNCH_DATE: "1998-11-20",
    STATUS: "active"
  },
  {
    TLE_LINE1: "1 37849U 11059A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 37849  55.0000 280.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "GPS IIR-20 (M) (PRN 25)",
    OBJECT_TYPE: "GPS",
    LAUNCH_DATE: "2011-07-16",
    STATUS: "active"
  },
  {
    TLE_LINE1: "1 44713U 19074A   24001.50000000  .00000000  00000-0  00000-0 0  9999",
    TLE_LINE2: "2 44713  52.9979 290.0000 0006703 126.2523 325.9358 15.49525375234567",
    OBJECT_NAME: "STARLINK-60",
    OBJECT_TYPE: "STARLINK",
    LAUNCH_DATE: "2019-11-11",
    STATUS: "active"
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
  
  const globeRef = useRef<any>(null);

  // Filtros de satélites
  const satelliteTypes = ['all', 'ISS', 'GPS', 'STARLINK', 'COMMUNICATION', 'WEATHER', 'MILITARY', 'RESEARCH'];

  useEffect(() => {
    let filtered = mockTLEObjects;
    
    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(obj => 
        obj.OBJECT_NAME.toLowerCase().includes(searchTerm.toLowerCase())
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
          const speeds = [0.1, 0.5, 1, 2, 5, 10];
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
      'unknown': 'text-blue-400'
    };
    return colors[type.toUpperCase()] || colors['unknown'];
  };

  return (
    <div className="space-y-6 ml-64">
      {/* Header mejorado */}
      <header className="mb-8">
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

      {/* Panel de control principal */}
      {showControls && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Controles de Visualización</h2>
            <div className="flex items-center space-x-2">
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
            </div>
          </div>

          {/* Controles de tiempo */}
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
            </div>

            {/* Filtros */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar satélite..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
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

      {/* Visualización principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Globe principal */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
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

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Lista de satélites */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Satélites Activos</h3>
              <button
                onClick={() => setShowSatelliteList(!showSatelliteList)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showSatelliteList ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            
            {showSatelliteList && (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredObjects.map((obj) => (
                  <div
                    key={obj.OBJECT_NAME}
                    onClick={() => {
                      // Simular selección de satélite
                      const mockSatellite: SatelliteData = {
                        lat: 0,
                        lng: 0,
                        size: 0.5,
                        color: '#ff6b6b',
                        name: obj.OBJECT_NAME,
                        altitude: 400,
                        velocity: 7.8,
                        inclination: 51.6,
                        period: 92,
                        type: obj.OBJECT_TYPE || 'unknown',
                        status: obj.STATUS || 'active'
                      };
                      handleSatelliteSelect(mockSatellite);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                      selectedSatellite?.name === obj.OBJECT_NAME
                        ? 'bg-blue-600/20 border-blue-500/50'
                        : 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm truncate">
                          {obj.OBJECT_NAME}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${getTypeColor(obj.OBJECT_TYPE || 'unknown')}`}>
                            {obj.OBJECT_TYPE || 'Unknown'}
                          </span>
                          <span className={`text-xs ${getStatusColor(obj.STATUS || 'active')}`}>
                            {obj.STATUS || 'Active'}
                          </span>
                        </div>
                      </div>
                      <Satellite size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detalles del satélite seleccionado */}
          {selectedSatellite && showDetails && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Detalles del Satélite</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ChevronUp size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">{selectedSatellite.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Tipo:</span>
                      <span className={`text-sm ${getTypeColor(selectedSatellite.type)}`}>
                        {selectedSatellite.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Estado:</span>
                      <span className={`text-sm ${getStatusColor(selectedSatellite.status)}`}>
                        {selectedSatellite.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Altitud:</span>
                      <span className="text-white text-sm">{selectedSatellite.altitude.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Velocidad:</span>
                      <span className="text-white text-sm">{selectedSatellite.velocity.toFixed(2)} km/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Inclinación:</span>
                      <span className="text-white text-sm">{selectedSatellite.inclination.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Período:</span>
                      <span className="text-white text-sm">{selectedSatellite.period.toFixed(0)} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-600/30">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Activity size={16} />
                    <span>Última actualización: hace 5 min</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estadísticas generales */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Satélites activos</span>
                <span className="text-white font-medium">{filteredObjects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Trayectorias visibles</span>
                <span className="text-white font-medium">{showOrbitalPaths ? filteredObjects.length : 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Velocidad de tiempo</span>
                <span className="text-white font-medium">{timeSpeed}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Estado</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información técnica */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Información Técnica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
              <h3 className="font-medium text-white mb-2">Datos TLE</h3>
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
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
              <h3 className="font-medium text-white mb-2">Leyenda de Colores</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">GPS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Comunicaciones</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Clima</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Investigación</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">ISS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente de alertas de colisión */}
      <CollisionAlert 
        isVisible={showCollisionAlert} 
        onClose={() => setShowCollisionAlert(false)} 
      />
    </div>
  );
} 