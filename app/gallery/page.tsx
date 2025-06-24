"use client";
import { Camera, Image as ImageIcon, Sparkles, Eye, Satellite } from "lucide-react";

const GALLERY = [
  {
    title: "Pilares de la Creación (Hubble)",
    description: "Una de las imágenes más icónicas del Hubble, mostrando la formación estelar en la Nebulosa del Águila.",
    icon: <Camera className="h-6 w-6 text-yellow-400" />,
    emoji: "🌟"
  },
  {
    title: "Galaxia Cartwheel (JWST)",
    description: "Imagen de la galaxia Cartwheel capturada por el James Webb, mostrando detalles nunca antes vistos.",
    icon: <Camera className="h-6 w-6 text-blue-400" />,
    emoji: "🌀"
  },
  {
    title: "Nebulosa de Orión (JWST)",
    description: "Visualización infrarroja de la Nebulosa de Orión, revelando el nacimiento de estrellas.",
    icon: <Sparkles className="h-6 w-6 text-pink-400" />,
    emoji: "✨"
  },
  {
    title: "Agujero Negro en M87 (EHT)",
    description: "Primera imagen real de un agujero negro, obtenida por el Event Horizon Telescope.",
    icon: <ImageIcon className="h-6 w-6 text-orange-400" />,
    emoji: "⚫"
  },
  {
    title: "Supernova SN 1987A (Hubble)",
    description: "Remanente de supernova en la Gran Nube de Magallanes, capturado por el Hubble.",
    icon: <Camera className="h-6 w-6 text-purple-400" />,
    emoji: "💥"
  },
  {
    title: "Galaxia Sombrero (Hubble)",
    description: "La galaxia Sombrero (M104), una de las galaxias más fotogénicas del universo.",
    icon: <Eye className="h-6 w-6 text-cyan-400" />,
    emoji: "👒"
  },
  {
    title: "Nebulosa del Cangrejo (Hubble)",
    description: "Remanente de supernova en la constelación de Tauro, resultado de una explosión en 1054.",
    icon: <Sparkles className="h-6 w-6 text-red-400" />,
    emoji: "🦀"
  },
  {
    title: "Galaxia Andrómeda (Hubble)",
    description: "Nuestra galaxia vecina más cercana, visible a simple vista desde la Tierra.",
    icon: <Eye className="h-6 w-6 text-indigo-400" />,
    emoji: "🌌"
  },
  {
    title: "Estación Espacial Internacional",
    description: "La ISS, el laboratorio espacial más grande en órbita terrestre baja.",
    icon: <Satellite className="h-6 w-6 text-green-400" />,
    emoji: "🛰️"
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Galería Cósmica</h1>
          <p className="text-lg text-gray-300">Imágenes reales y visualizaciones del universo capturadas por los telescopios más avanzados.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY.map((item) => (
            <div key={item.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col hover:bg-white/10 transition-all duration-300 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                {item.icon}
                <span className="text-white font-semibold text-lg">{item.title}</span>
              </div>
              <div className="w-full h-48 mb-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-2">{item.emoji}</div>
                  <div className="text-sm">Visualización</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm flex-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
