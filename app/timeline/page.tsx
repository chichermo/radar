"use client";
import { Clock, Rocket, Satellite, Globe, Star, Camera, Moon, Award, Sparkles } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    year: 1957,
    title: "Lanzamiento de Sputnik 1",
    description: "La Unión Soviética lanza el primer satélite artificial de la historia, marcando el inicio de la era espacial.",
    icon: <Satellite className="h-6 w-6 text-blue-400" />,
  },
  {
    year: 1961,
    title: "Yuri Gagarin: Primer humano en el espacio",
    description: "El cosmonauta soviético Yuri Gagarin orbita la Tierra a bordo de la nave Vostok 1.",
    icon: <Globe className="h-6 w-6 text-green-400" />,
  },
  {
    year: 1969,
    title: "Apolo 11: Primer alunizaje",
    description: "Neil Armstrong y Buzz Aldrin caminan sobre la superficie lunar. 'Un pequeño paso para el hombre, un gran salto para la humanidad.'",
    icon: <Moon className="h-6 w-6 text-yellow-300" />,
  },
  {
    year: 1977,
    title: "Lanzamiento de Voyager 1 y 2",
    description: "Las sondas Voyager inician su viaje hacia los confines del Sistema Solar y el espacio interestelar.",
    icon: <Rocket className="h-6 w-6 text-purple-400" />,
  },
  {
    year: 1990,
    title: "Telescopio Espacial Hubble",
    description: "La NASA lanza el Hubble, revolucionando la astronomía con imágenes profundas del universo.",
    icon: <Camera className="h-6 w-6 text-pink-400" />,
  },
  {
    year: 1998,
    title: "Inicio de la Estación Espacial Internacional (ISS)",
    description: "Se lanza el primer módulo de la ISS, el mayor laboratorio espacial construido por la humanidad.",
    icon: <Award className="h-6 w-6 text-blue-300" />,
  },
  {
    year: 2012,
    title: "Curiosity aterriza en Marte",
    description: "El rover Curiosity de la NASA aterriza exitosamente en Marte para explorar el cráter Gale.",
    icon: <Rocket className="h-6 w-6 text-red-400" />,
  },
  {
    year: 2021,
    title: "James Webb Space Telescope (JWST)",
    description: "Se lanza el telescopio espacial más avanzado, abriendo una nueva era en la observación del universo.",
    icon: <Camera className="h-6 w-6 text-yellow-400" />,
  },
  {
    year: 2024,
    title: "Artemis II (próximo)",
    description: "La NASA planea enviar astronautas alrededor de la Luna, preparando el regreso humano a la superficie lunar.",
    icon: <Rocket className="h-6 w-6 text-blue-400 animate-pulse" />,
  },
  {
    year: 2030,
    title: "Misión tripulada a Marte (estimado)",
    description: "Se proyecta la primera misión humana a Marte, un hito para la exploración interplanetaria.",
    icon: <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" />,
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Timeline Espacial</h1>
          <p className="text-lg text-gray-300">Principales hitos de la exploración espacial, desde Sputnik hasta el futuro de Marte.</p>
        </div>
        <div className="relative border-l-4 border-blue-500/30 pl-8">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={event.year} className="mb-12 flex items-start group">
              <div className="absolute -left-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border-2 border-blue-500/30 shadow-lg">
                {event.icon}
              </div>
              <div className="ml-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 w-full hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-blue-300">{event.year}</span>
                  <span className="text-lg font-semibold text-white">{event.title}</span>
                </div>
                <p className="text-gray-300 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 