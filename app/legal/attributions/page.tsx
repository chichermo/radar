"use client";

import React from 'react';
import { ExternalLink, Database, Globe, Satellite, Camera, Star } from 'lucide-react';

export default function Attributions() {
  const dataSources = [
    {
      name: "NASA",
      description: "National Aeronautics and Space Administration",
      services: ["APOD", "Exoplanet Archive", "Asteroid Data", "Space Weather"],
      url: "https://www.nasa.gov",
      license: "Public Domain",
      icon: "🚀"
    },
    {
      name: "ESA",
      description: "European Space Agency",
      services: ["Satellite Tracking", "Space Debris", "Astronomy Data"],
      url: "https://www.esa.int",
      license: "ESA License",
      icon: "🌍"
    },
    {
      name: "Space-Track.org",
      description: "Space Surveillance Network",
      services: ["Satellite Orbital Elements", "TLE Data"],
      url: "https://www.space-track.org",
      license: "US Government",
      icon: "🛰️"
    },
    {
      name: "Minor Planet Center",
      description: "International Astronomical Union",
      services: ["Asteroid Data", "Comet Information"],
      url: "https://minorplanetcenter.net",
      license: "IAU License",
      icon: "☄️"
    },
    {
      name: "NOAA Space Weather",
      description: "National Oceanic and Atmospheric Administration",
      services: ["Solar Activity", "Geomagnetic Storms"],
      url: "https://www.swpc.noaa.gov",
      license: "Public Domain",
      icon: "☀️"
    },
    {
      name: "Vera C. Rubin Observatory",
      description: "Legacy Survey of Space and Time",
      services: ["LSST Alerts", "Astronomical Data"],
      url: "https://www.lsst.org",
      license: "LSST License",
      icon: "🔭"
    },
    {
      name: "LIGO/Virgo",
      description: "Gravitational Wave Observatories",
      services: ["Gravitational Wave Detections"],
      url: "https://www.ligo.org",
      license: "LIGO License",
      icon: "🌊"
    },
    {
      name: "IceCube",
      description: "Neutrino Observatory",
      services: ["Neutrino Detections"],
      url: "https://icecube.wisc.edu",
      license: "IceCube License",
      icon: "🧊"
    }
  ];

  const libraries = [
    {
      name: "Next.js",
      description: "React Framework",
      url: "https://nextjs.org",
      license: "MIT"
    },
    {
      name: "React",
      description: "JavaScript Library",
      url: "https://reactjs.org",
      license: "MIT"
    },
    {
      name: "Three.js",
      description: "3D Graphics Library",
      url: "https://threejs.org",
      license: "MIT"
    },
    {
      name: "Tailwind CSS",
      description: "CSS Framework",
      url: "https://tailwindcss.com",
      license: "MIT"
    },
    {
      name: "Lucide React",
      description: "Icon Library",
      url: "https://lucide.dev",
      license: "MIT"
    },
    {
      name: "Mapbox",
      description: "Mapping Platform",
      url: "https://www.mapbox.com",
      license: "Commercial"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Atribuciones y Licencias</h1>
          </div>
          <p className="text-xl text-gray-300">
            Reconocimiento a todas las fuentes de datos y tecnologías utilizadas en COSMIC EYE
          </p>
        </div>

        {/* Fuentes de Datos */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-blue-400" />
            Fuentes de Datos Espaciales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataSources.map((source) => (
              <div key={source.name} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{source.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{source.name}</h3>
                      <p className="text-sm text-gray-400">{source.description}</p>
                    </div>
                  </div>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-300">Servicios:</span>
                    <p className="text-sm text-gray-400">{source.services.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-300">Licencia:</span>
                    <p className="text-sm text-gray-400">{source.license}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bibliotecas y Tecnologías */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Satellite className="w-6 h-6 mr-2 text-green-400" />
            Bibliotecas y Tecnologías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {libraries.map((library) => (
              <div key={library.name} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{library.name}</h3>
                  <a 
                    href={library.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-2">{library.description}</p>
                <p className="text-xs text-gray-500">Licencia: {library.license}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Declaración de Cumplimiento */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-400" />
            Declaración de Cumplimiento
          </h2>
          <div className="text-gray-300 space-y-4">
            <p>
              COSMIC EYE se compromete a respetar todas las licencias y términos de uso de las fuentes 
              de datos y tecnologías utilizadas. Nos esforzamos por:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Atribuir correctamente todas las fuentes de datos</li>
              <li>Respetar las licencias de software de código abierto</li>
              <li>Mantener enlaces a las fuentes originales</li>
              <li>Actualizar las atribuciones cuando sea necesario</li>
              <li>Responder a solicitudes de corrección de atribuciones</li>
            </ul>
          </div>
        </section>

        {/* Contacto para Atribuciones */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              Si eres propietario de algún contenido o tecnología utilizada en COSMIC EYE y 
              necesitas que actualicemos las atribuciones, contáctanos en:
            </p>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p><strong className="text-white">Email:</strong> attributions@cosmic-eye.com</p>
              <p><strong className="text-white">Asunto:</strong> Solicitud de Atribución</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 