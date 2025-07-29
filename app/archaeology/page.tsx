"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Search, Eye, BookOpen, Globe, Clock, AlertTriangle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface ArchaeologicalFind {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  period: string;
  significance: string;
  category: string;
  imageUrl: string;
  details: string;
}

const mockFinds: ArchaeologicalFind[] = [
  {
    id: "1",
    title: "Antikythera - La Primera Computadora Mecánica",
    description: "Un dispositivo astronómico de 2,000 años de antigüedad que predice eclipses y posiciones planetarias con precisión asombrosa.",
    location: "Isla de Antikythera, Grecia",
    date: "1901",
    period: "100-150 a.C.",
    significance: "Demuestra que los antiguos griegos tenían conocimientos astronómicos avanzados",
    category: "Tecnología Antigua",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    details: "El mecanismo de Antikythera es considerado la primera computadora analógica del mundo. Sus engranajes de bronce podían calcular las posiciones del Sol, la Luna y los planetas, así como predecir eclipses con una precisión extraordinaria para su época."
  },
  {
    id: "2",
    title: "Göbekli Tepe - El Primer Templo de la Humanidad",
    description: "Un complejo megalítico de 12,000 años que desafía nuestra comprensión de la evolución de las civilizaciones.",
    location: "Sureste de Turquía",
    date: "1994",
    period: "9,600-8,200 a.C.",
    significance: "Reescribe la historia de la arquitectura y la religión",
    category: "Arquitectura Megalítica",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    details: "Göbekli Tepe es 6,000 años más antiguo que Stonehenge y las pirámides de Egipto. Sus pilares tallados con animales sugieren que la religión organizada precedió a la agricultura, cambiando fundamentalmente nuestra comprensión del desarrollo humano."
  },
  {
    id: "3",
    title: "Mapa de Piri Reis - Cartografía Antigua Precisa",
    description: "Un mapa del siglo XVI que muestra la costa de la Antártida antes de su descubrimiento oficial, con detalles inexplicables.",
    location: "Estambul, Turquía",
    date: "1513",
    period: "Siglo XVI",
    significance: "Sugiere conocimientos geográficos perdidos o fuentes desconocidas",
    category: "Cartografía Misteriosa",
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop",
    details: "El mapa de Piri Reis muestra la costa de la Antártida sin hielo, algo que solo pudo haber ocurrido hace millones de años. ¿Cómo pudo un cartógrafo del siglo XVI tener acceso a esta información?"
  },
  {
    id: "4",
    title: "Esferas de Piedra de Costa Rica",
    description: "Cientos de esferas perfectamente esféricas de granito que desafían las capacidades tecnológicas de su época.",
    location: "Delta del Diquís, Costa Rica",
    date: "1930s",
    period: "300-1500 d.C.",
    significance: "Demuestra habilidades de tallado y matemáticas avanzadas",
    category: "Artefactos Misteriosos",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    details: "Las esferas varían en tamaño desde unos pocos centímetros hasta más de 2 metros de diámetro. Su perfección esférica sugiere conocimientos matemáticos y herramientas de precisión que no deberían existir en esa época."
  },
  {
    id: "5",
    title: "Líneas de Nazca - Geoglifos Gigantes",
    description: "Enormes dibujos en el desierto peruano visibles solo desde el aire, creados hace más de 2,000 años.",
    location: "Desierto de Nazca, Perú",
    date: "1927",
    period: "200 a.C. - 600 d.C.",
    significance: "Muestra capacidades de medición y diseño a gran escala",
    category: "Geoglifos",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    details: "Las líneas de Nazca incluyen figuras de animales, plantas y formas geométricas que se extienden por kilómetros. Su propósito exacto sigue siendo un misterio, aunque se cree que tenían significado astronómico o ceremonial."
  },
  {
    id: "6",
    title: "Biblioteca de Ashurbanipal - Conocimiento Perdido",
    description: "La biblioteca más antigua del mundo, conteniendo miles de tablillas con conocimientos astronómicos y matemáticos.",
    location: "Nínive, Irak",
    date: "1853",
    period: "668-627 a.C.",
    significance: "Preserva conocimientos científicos antiguos",
    category: "Biblioteca Antigua",
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop",
    details: "La biblioteca contenía más de 30,000 tablillas cuneiformes con textos sobre astronomía, matemáticas, medicina y literatura. Muchos de estos conocimientos se perdieron durante siglos y fueron redescubiertos solo recientemente."
  }
];

export default function ArchaeologyPage() {
  const { t } = useI18n();
  const [finds] = useState<ArchaeologicalFind[]>(mockFinds);
  const [selectedFind, setSelectedFind] = useState<ArchaeologicalFind | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(finds.map(find => find.category)))];
  const filteredFinds = activeCategory === 'all' ? finds : finds.filter(find => find.category === activeCategory);

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Arqueología y Astronomía Antigua</h1>
        <p className="subtitle max-w-2xl mx-auto">Descubre los hallazgos arqueológicos más sorprendentes relacionados con la astronomía y la ciencia antigua.</p>
      </div>

      {/* Métricas principales */}
      <div className="metricsGrid mb-8">
        <div className="glass-card p-6 flex flex-col items-center">
          <Search className="h-8 w-8 text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-white">{finds.length}</div>
          <div className="text-gray-400 text-sm">Hallazgos</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <Globe className="h-8 w-8 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-blue-400">6</div>
          <div className="text-gray-400 text-sm">Regiones</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <Clock className="h-8 w-8 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-green-400">12K</div>
          <div className="text-gray-400 text-sm">Años</div>
        </div>
        <div className="glass-card p-6 flex flex-col items-center">
          <AlertTriangle className="h-8 w-8 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-purple-400">{t('archaeology.unsolved')}</div>
          <div className="text-gray-400 text-sm">Misterios</div>
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? t('archaeology.all') : category}
          </button>
        ))}
      </div>

      {/* Lista de hallazgos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFinds.map((find) => (
          <div
            key={find.id}
            className="glass-card bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => setSelectedFind(find)}
          >
            <div className="relative h-48">
              <img
                src={find.imageUrl}
                alt={find.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-semibold text-sm">{find.title}</h3>
                <p className="text-gray-300 text-xs">{find.period}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{find.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{find.location}</span>
                </div>
                <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                  {find.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para detalles */}
      {selectedFind && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="glass-card bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto border border-gray-600">
            <div className="relative h-64">
              <img
                src={selectedFind.imageUrl}
                alt={selectedFind.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedFind(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedFind.title}</h2>
              <p className="text-gray-300 mb-4">{selectedFind.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-400">{t('archaeology.location')}:</span>
                  <p className="text-white">{selectedFind.location}</p>
                </div>
                <div>
                  <span className="text-gray-400">{t('archaeology.discovered')}:</span>
                  <p className="text-white">{selectedFind.date}</p>
                </div>
                <div>
                  <span className="text-gray-400">{t('archaeology.period')}:</span>
                  <p className="text-white">{selectedFind.period}</p>
                </div>
                <div>
                  <span className="text-gray-400">{t('archaeology.category')}:</span>
                  <p className="text-white">{selectedFind.category}</p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">{t('archaeology.historical_significance')}</h3>
                <p className="text-gray-300">{selectedFind.significance}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">{t('archaeology.find_details')}</h3>
                <p className="text-gray-300 leading-relaxed">{selectedFind.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 