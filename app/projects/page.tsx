"use client";
import { Rocket, Camera, Moon, Globe, Satellite, Award, Sparkles } from "lucide-react";

const PROJECTS = [
  {
    name: "James Webb Space Telescope (JWST)",
    agency: "NASA/ESA/CSA",
    status: "Operativo",
    description: "El telescopio espacial más avanzado, observando el universo primitivo y exoplanetas.",
    icon: <Camera className="h-7 w-7 text-yellow-400" />,
    link: "https://webb.nasa.gov/"
  },
  {
    name: "Mars Perseverance Rover",
    agency: "NASA",
    status: "Operativo en Marte",
    description: "Rover que explora el cráter Jezero, buscando signos de vida pasada y recolectando muestras.",
    icon: <Rocket className="h-7 w-7 text-red-400" />,
    link: "https://mars.nasa.gov/mars2020/"
  },
  {
    name: "Artemis Program",
    agency: "NASA",
    status: "En desarrollo",
    description: "Programa para regresar humanos a la Luna y establecer una presencia sostenible.",
    icon: <Moon className="h-7 w-7 text-blue-400" />,
    link: "https://www.nasa.gov/specials/artemis/"
  },
  {
    name: "SpaceX Starship",
    agency: "SpaceX",
    status: "Pruebas de vuelo",
    description: "El cohete más grande y potente jamás construido, diseñado para misiones a Marte y más allá.",
    icon: <Rocket className="h-7 w-7 text-purple-400" />,
    link: "https://www.spacex.com/vehicles/starship/"
  },
  {
    name: "Vera Rubin Observatory (LSST)",
    agency: "NSF/DOE/Chile",
    status: "En construcción",
    description: "Observatorio que mapeará el cielo completo cada pocas noches, revolucionando la astronomía de grandes datos.",
    icon: <Camera className="h-7 w-7 text-pink-400" />,
    link: "https://www.lsst.org/"
  },
  {
    name: "Estación Espacial Internacional (ISS)",
    agency: "NASA/Roscosmos/ESA/JAXA/CSA",
    status: "Operativo",
    description: "El mayor laboratorio espacial, con tripulación internacional y experimentos científicos continuos.",
    icon: <Award className="h-7 w-7 text-blue-300" />,
    link: "https://www.nasa.gov/mission_pages/station/main/index.html"
  },
  {
    name: "Europa Clipper",
    agency: "NASA",
    status: "En desarrollo",
    description: "Misión para estudiar la luna Europa de Júpiter y su potencial para albergar vida.",
    icon: <Globe className="h-7 w-7 text-cyan-400" />,
    link: "https://europa.nasa.gov/"
  },
  {
    name: "Starlink",
    agency: "SpaceX",
    status: "Despliegue activo",
    description: "Constelación de satélites para proveer internet global de alta velocidad.",
    icon: <Satellite className="h-7 w-7 text-green-400" />,
    link: "https://www.starlink.com/"
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Proyectos Espaciales Destacados</h1>
          <p className="text-lg text-gray-300">Explora los proyectos más importantes y revolucionarios de la exploración espacial actual.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-start hover:bg-white/10 transition-all duration-300 shadow-lg group"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 border border-blue-500/20">
                  {project.icon}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 font-semibold ml-2">
                  {project.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{project.name}</h2>
              <p className="text-gray-300 text-sm mb-2">{project.agency}</p>
              <p className="text-gray-400 text-sm flex-1">{project.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 