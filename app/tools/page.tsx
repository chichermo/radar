"use client";
import { Calculator, Globe, Satellite, Ruler, Sun, ArrowRightLeft, Sparkles } from "lucide-react";

const TOOLS = [
  {
    name: "Calculadora de Distancias Estelares",
    description: "Convierte años luz, parsecs y unidades astronómicas de forma precisa.",
    icon: <Ruler className="h-7 w-7 text-blue-400" />,
    link: "https://www.calculatorsoup.com/calculators/astronomy/light-years.php"
  },
  {
    name: "Simulador de Órbitas Planetarias",
    description: "Visualiza y simula órbitas de planetas y satélites en el Sistema Solar.",
    icon: <Globe className="h-7 w-7 text-green-400" />,
    link: "https://orbitsimulator.com/"
  },
  {
    name: "Convertidor de Unidades Astronómicas",
    description: "Convierte entre UA, km, millas, años luz y más.",
    icon: <ArrowRightLeft className="h-7 w-7 text-purple-400" />,
    link: "https://www.unitconverters.net/astronomical-unit-converter.html"
  },
  {
    name: "Calculadora de Magnitud Estelar",
    description: "Calcula la magnitud aparente y absoluta de estrellas.",
    icon: <Sun className="h-7 w-7 text-yellow-400" />,
    link: "https://www.astro.unlp.edu.ar/astronomia/recursos/magnitud.html"
  },
  {
    name: "Simulador de Cielo Nocturno Stellarium",
    description: "Explora el cielo nocturno en tiempo real desde cualquier lugar del mundo.",
    icon: <Sparkles className="h-7 w-7 text-pink-400" />,
    link: "https://stellarium-web.org/"
  },
  {
    name: "Calculadora de Fases Lunares",
    description: "Consulta las fases lunares actuales y futuras.",
    icon: <Calculator className="h-7 w-7 text-cyan-400" />,
    link: "https://www.timeanddate.com/moon/phases/"
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Herramientas Astronómicas</h1>
          <p className="text-lg text-gray-300">Utilidades y simuladores para explorar y calcular fenómenos astronómicos.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-start hover:bg-white/10 transition-all duration-300 shadow-lg group"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 border border-blue-500/20">
                  {tool.icon}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{tool.name}</h2>
              <p className="text-gray-400 text-sm flex-1">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 