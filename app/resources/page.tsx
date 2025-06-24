"use client";
import { BookOpen, Globe, Camera, Sparkles, Sun, Star, Code, Database } from "lucide-react";

const RESOURCES = [
  {
    name: "NASA Space Place",
    description: "Recursos educativos de la NASA para aprender sobre el espacio de forma divertida.",
    icon: <Globe className="h-7 w-7 text-blue-400" />,
    link: "https://spaceplace.nasa.gov/"
  },
  {
    name: "ESA Kids",
    description: "Portal educativo de la Agencia Espacial Europea para niños y jóvenes.",
    icon: <Camera className="h-7 w-7 text-purple-400" />,
    link: "https://www.esa.int/kids/"
  },
  {
    name: "Astronomy Picture of the Day",
    description: "Imagen astronómica del día con explicaciones detalladas de la NASA.",
    icon: <BookOpen className="h-7 w-7 text-green-400" />,
    link: "https://apod.nasa.gov/"
  },
  {
    name: "James Webb Space Telescope",
    description: "Sitio oficial del JWST con las últimas imágenes y descubrimientos.",
    icon: <Sparkles className="h-7 w-7 text-yellow-400" />,
    link: "https://webb.nasa.gov/"
  },
  {
    name: "Hubble Space Telescope",
    description: "Galería oficial del Hubble con miles de imágenes del universo.",
    icon: <Star className="h-7 w-7 text-pink-400" />,
    link: "https://hubblesite.org/"
  },
  {
    name: "Solar System Exploration",
    description: "Explora el sistema solar interactivamente con datos de la NASA.",
    icon: <Sun className="h-7 w-7 text-orange-400" />,
    link: "https://solarsystem.nasa.gov/"
  },
  {
    name: "GitHub - Space APIs",
    description: "Colección de APIs espaciales y herramientas de código abierto.",
    icon: <Code className="h-7 w-7 text-cyan-400" />,
    link: "https://github.com/topics/space-api"
  },
  {
    name: "Space-Track.org",
    description: "Base de datos de objetos espaciales y satélites (requiere registro).",
    icon: <Database className="h-7 w-7 text-indigo-400" />,
    link: "https://www.space-track.org/"
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Recursos y Tutoriales</h1>
          <p className="text-lg text-gray-300">Aprende astronomía, astrofotografía y explora documentación científica de calidad.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCES.map((resource) => (
            <a
              key={resource.name}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-start hover:bg-white/10 transition-all duration-300 shadow-lg group"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 border border-blue-500/20">
                  {resource.icon}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{resource.name}</h2>
              <p className="text-gray-400 text-sm flex-1">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 