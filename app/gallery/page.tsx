"use client";
import { Camera, Image as ImageIcon, Sparkles, Telescope, Satellite } from "lucide-react";

const GALLERY = [
  {
    title: "Pilares de la Creación (Hubble)",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_Creation.jpg",
    description: "Una de las imágenes más icónicas del Hubble, mostrando la formación estelar en la Nebulosa del Águila.",
    icon: <Camera className="h-6 w-6 text-yellow-400" />,
  },
  {
    title: "Galaxia Cartwheel (JWST)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Cartwheel_Galaxy.jpg/1200px-Cartwheel_Galaxy.jpg",
    description: "Imagen de la galaxia Cartwheel capturada por el James Webb, mostrando detalles nunca antes vistos.",
    icon: <Camera className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Nebulosa de Orión (JWST)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/1200px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    description: "Visualización infrarroja de la Nebulosa de Orión, revelando el nacimiento de estrellas.",
    icon: <Sparkles className="h-6 w-6 text-pink-400" />,
  },
  {
    title: "Agujero Negro en M87 (EHT)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/1200px-Black_hole_-_Messier_87_crop_max_res.jpg",
    description: "Primera imagen real de un agujero negro, obtenida por el Event Horizon Telescope.",
    icon: <ImageIcon className="h-6 w-6 text-orange-400" />,
  },
  {
    title: "Supernova SN 1987A (Hubble)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/SN1987A.jpg/1200px-SN1987A.jpg",
    description: "Remanente de supernova en la Gran Nube de Magallanes, capturado por el Hubble.",
    icon: <Camera className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Galaxia Sombrero (Hubble)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg/1200px-M104_ngc4594_sombrero_galaxy_hi-res.jpg",
    description: "La galaxia Sombrero (M104), una de las galaxias más fotogénicas del universo.",
    icon: <Telescope className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Nebulosa del Cangrejo (Hubble)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/1200px-Crab_Nebula.jpg",
    description: "Remanente de supernova en la constelación de Tauro, resultado de una explosión en 1054.",
    icon: <Sparkles className="h-6 w-6 text-red-400" />,
  },
  {
    title: "Galaxia Andrómeda (Hubble)",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/1200px-Andromeda_Galaxy_%28with_h-alpha%29.jpg",
    description: "Nuestra galaxia vecina más cercana, visible a simple vista desde la Tierra.",
    icon: <Telescope className="h-6 w-6 text-indigo-400" />,
  },
  {
    title: "Estación Espacial Internacional",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station_after_undocking_of_STS-132.jpg/1200px-International_Space_Station_after_undocking_of_STS-132.jpg",
    description: "La ISS, el laboratorio espacial más grande en órbita terrestre baja.",
    icon: <Satellite className="h-6 w-6 text-green-400" />,
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
              <img
                src={item.src}
                alt={item.title}
                className="rounded-lg w-full h-48 object-cover mb-2 border border-white/10 shadow"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400x300/1f2937/ffffff?text=Imagen+No+Disponible";
                }}
              />
              <p className="text-gray-300 text-sm flex-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 