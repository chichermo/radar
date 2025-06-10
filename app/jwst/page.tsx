"use client";

import { useEffect, useState } from 'react';
import { Camera, Star, Info, Calendar, MapPin, Thermometer, Activity, Zap, Eye } from 'lucide-react';

interface JWSTImage {
  id: string;
  title: string;
  description: string;
  url: string;
  date: Date;
  type: string;
  target: string;
  instrument: string;
  wavelength: string;
  distance: string;
}

interface JWSTStatus {
  temperature: { primary: number; secondary: number };
  position: { x: number; y: number; z: number };
  fuel: number;
  status: string;
  missionTime: string;
}

// Datos simulados más realistas
const mockImages: JWSTImage[] = [
  {
    id: "1",
    title: "Pilares de la Creación - Nebulosa del Águila",
    description: "Los icónicos pilares de gas y polvo donde nacen nuevas estrellas. Esta imagen revela detalles nunca antes vistos de las regiones de formación estelar.",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop",
    date: new Date("2024-02-25"),
    type: "Nebulosa",
    target: "M16 - Nebulosa del Águila",
    instrument: "NIRCam",
    wavelength: "Infrarrojo cercano",
    distance: "6,500 años luz"
  },
  {
    id: "2",
    title: "Galaxia Rueda de Carro",
    description: "Una galaxia en forma de rueda que muestra los efectos dramáticos de una colisión galáctica. Los anillos revelan ondas de choque que comprimen gas y polvo.",
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop",
    date: new Date("2024-02-20"),
    type: "Galaxia",
    target: "ESO 350-40",
    instrument: "NIRCam + MIRI",
    wavelength: "Infrarrojo cercano y medio",
    distance: "500 millones de años luz"
  },
  {
    id: "3",
    title: "Exoplaneta WASP-39b",
    description: "El primer espectro completo de un exoplaneta que revela la presencia de agua, dióxido de carbono y otros elementos en su atmósfera.",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    date: new Date("2024-02-15"),
    type: "Exoplaneta",
    target: "WASP-39b",
    instrument: "NIRSpec",
    wavelength: "Espectroscopía",
    distance: "700 años luz"
  },
  {
    id: "4",
    title: "Cúmulo de Galaxias SMACS 0723",
    description: "El primer campo profundo del JWST, mostrando miles de galaxias distantes y revelando la estructura del universo temprano.",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
    date: new Date("2024-02-10"),
    type: "Cúmulo Galáctico",
    target: "SMACS 0723",
    instrument: "NIRCam",
    wavelength: "Infrarrojo cercano",
    distance: "4,600 millones de años luz"
  }
];

const mockStatus: JWSTStatus = {
  temperature: { primary: -233, secondary: -266 },
  position: { x: 1500000, y: 0, z: 0 },
  fuel: 78,
  status: "Operativo",
  missionTime: "2 años, 3 meses"
};

const discoveries = [
  {
    id: "1",
    title: "Primera detección de CO2 en exoplaneta",
    date: "2024-02-25",
    category: "Exoplanetas",
    description: "JWST detectó dióxido de carbono en la atmósfera de WASP-39b, marcando la primera vez que se encuentra este compuesto en un planeta fuera del sistema solar.",
    significance: "Revoluciona nuestra comprensión de las atmósferas exoplanetarias"
  },
  {
    id: "2",
    title: "Galaxias más antiguas que las esperadas",
    date: "2024-02-20",
    category: "Cosmología",
    description: "El telescopio descubrió galaxias que existieron solo 300 millones de años después del Big Bang, desafiando los modelos actuales de formación galáctica.",
    significance: "Cuestiona nuestra comprensión del universo temprano"
  },
  {
    id: "3",
    title: "Agua en cometa del cinturón principal",
    date: "2024-02-15",
    category: "Sistema Solar",
    description: "Detectó vapor de agua en el cometa 238P/Read, confirmando que el agua puede existir en objetos del cinturón de asteroides.",
    significance: "Ayuda a entender el origen del agua en la Tierra"
  }
];

export default function JWSTPage() {
  const [images] = useState<JWSTImage[]>(mockImages);
  const [status] = useState<JWSTStatus>(mockStatus);
  const [selectedImage, setSelectedImage] = useState<JWSTImage | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Telescopio Espacial James Webb
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          El telescopio más poderoso jamás construido. Con sus ojos infrarrojos, el JWST nos permite 
          ver a través del polvo cósmico, observar las primeras galaxias del universo y estudiar 
          exoplanetas como nunca antes. Cada imagen es una ventana a los secretos más profundos del cosmos.
        </p>
      </header>

      {/* Panel de estado del telescopio */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-blue-400" />
            <span className="text-blue-200 font-semibold">Temperatura</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{status.temperature.primary}°C</p>
          <p className="text-blue-300 text-sm">Espejo principal</p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-400" />
            <span className="text-green-200 font-semibold">Posición</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">1.5M km</p>
          <p className="text-green-300 text-sm">Desde la Tierra</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-200 font-semibold">Combustible</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{status.fuel}%</p>
          <p className="text-yellow-300 text-sm">Restante</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-400" />
            <span className="text-purple-200 font-semibold">Estado</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{status.status}</p>
          <p className="text-purple-300 text-sm">Misión activa</p>
        </div>
      </div>

      {/* Explicación educativa */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">¿Por qué el JWST es revolucionario?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-2">Capacidades únicas</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• <strong>Visión infrarroja:</strong> Ve a través del polvo cósmico</li>
              <li>• <strong>Espejo gigante:</strong> 6.5 metros de diámetro (vs 2.4m del Hubble)</li>
              <li>• <strong>Posición privilegiada:</strong> En el punto L2, lejos de la Tierra</li>
              <li>• <strong>Instrumentos avanzados:</strong> 4 instrumentos científicos especializados</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-400 mb-2">¿Qué puede descubrir?</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• <strong>Primeras galaxias</strong> del universo temprano</li>
              <li>• <strong>Atmósferas de exoplanetas</strong> y posibles signos de vida</li>
              <li>• <strong>Formación de estrellas</strong> y sistemas planetarios</li>
              <li>• <strong>Estructura del universo</strong> y energía oscura</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Imágenes Destacadas
            </button>
            <button
              onClick={() => setActiveTab('discoveries')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discoveries'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Star className="h-4 w-4 inline mr-2" />
              Descubrimientos
            </button>
            <button
              onClick={() => setActiveTab('instruments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'instruments'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Telescope className="h-4 w-4 inline mr-2" />
              Instrumentos
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Imágenes Más Asombrosas del JWST</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative h-48">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h4 className="text-white font-semibold text-sm">{image.title}</h4>
                        <p className="text-gray-300 text-xs">{image.type}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{image.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                        <div>
                          <span className="font-medium">Objetivo:</span> {image.target}
                        </div>
                        <div>
                          <span className="font-medium">Instrumento:</span> {image.instrument}
                        </div>
                        <div>
                          <span className="font-medium">Distancia:</span> {image.distance}
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span> {image.date.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discoveries' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Descubrimientos Revolucionarios</h3>
              <div className="space-y-4">
                {discoveries.map((discovery) => (
                  <div key={discovery.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{discovery.title}</h4>
                      <span className="text-gray-400 text-sm">{discovery.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{discovery.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs ${
                        discovery.category === 'Exoplanetas' ? 'bg-blue-900/50 text-blue-300' :
                        discovery.category === 'Cosmología' ? 'bg-purple-900/50 text-purple-300' :
                        'bg-green-900/50 text-green-300'
                      }`}>
                        {discovery.category}
                      </span>
                      <p className="text-yellow-400 text-xs font-medium">{discovery.significance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instruments' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Instrumentos Científicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">NIRCam (Cámara de Infrarrojo Cercano)</h4>
                  <p className="text-gray-300 text-sm mb-3">La cámara principal del JWST, capaz de detectar luz infrarroja cercana (0.6-5 micras).</p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Imágenes de alta resolución</li>
                    <li>• Detección de galaxias distantes</li>
                    <li>• Estudio de exoplanetas</li>
                  </ul>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">NIRSpec (Espectrógrafo de Infrarrojo Cercano)</h4>
                  <p className="text-gray-300 text-sm mb-3">Analiza la composición química de objetos distantes mediante espectroscopía.</p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Análisis de atmósferas exoplanetarias</li>
                    <li>• Composición de galaxias</li>
                    <li>• Detección de moléculas orgánicas</li>
                  </ul>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">MIRI (Instrumento de Infrarrojo Medio)</h4>
                  <p className="text-gray-300 text-sm mb-3">Observa en longitudes de onda más largas (5-28 micras) para estudiar objetos más fríos.</p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Discos protoplanetarios</li>
                    <li>• Objetos del sistema solar</li>
                    <li>• Galaxias con formación estelar</li>
                  </ul>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">FGS/NIRISS (Sistema de Guía Fina)</h4>
                  <p className="text-gray-300 text-sm mb-3">Mantiene el telescopio apuntando con precisión y realiza observaciones especializadas.</p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Estabilización del telescopio</li>
                    <li>• Detección de exoplanetas</li>
                    <li>• Interferometría</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para ver imagen en detalle */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
              <p className="text-gray-300 mb-4">{selectedImage.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Objetivo:</span>
                  <p className="text-white">{selectedImage.target}</p>
                </div>
                <div>
                  <span className="text-gray-400">Instrumento:</span>
                  <p className="text-white">{selectedImage.instrument}</p>
                </div>
                <div>
                  <span className="text-gray-400">Distancia:</span>
                  <p className="text-white">{selectedImage.distance}</p>
                </div>
                <div>
                  <span className="text-gray-400">Fecha:</span>
                  <p className="text-white">{selectedImage.date.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 