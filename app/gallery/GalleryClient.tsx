"use client";
import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Eye, Satellite, ZoomIn, ExternalLink, Heart, Share2, Download, Filter, Search, Star, Globe, Rocket } from "lucide-react";

// Función helper para formatear números de manera consistente
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Función helper para formatear fechas de manera consistente
const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Componente de filtros
const FilterBar = ({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (filter: string) => void }) => {
  const filters = [
    { id: "all", label: "Todas", icon: <Globe className="h-4 w-4" /> },
    { id: "nebulosas", label: "Nebulosas", icon: <Sparkles className="h-4 w-4" /> },
    { id: "galaxias", label: "Galaxias", icon: <Eye className="h-4 w-4" /> },
    { id: "hubble", label: "Hubble", icon: <Satellite className="h-4 w-4" /> },
    { id: "jwst", label: "JWST", icon: <Rocket className="h-4 w-4" /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
          }`}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Componente de tarjeta de imagen premium
const ImageCard = ({ item, index }: { item: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`card-premium group relative overflow-hidden transition-all duration-700 ${
        imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de categoría */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
          {item.category}
        </span>
      </div>

      {/* Badge de telescopio */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {item.telescope}
        </span>
      </div>

      {/* Imagen */}
      <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
        <img
          src={item.src || item.url}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class=\"w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-lg\">
                  <div class=\"text-center text-gray-400\">
                    <div class=\"text-6xl mb-2\">${item.fallback || '🖼️'}</div>
                    <div class=\"text-sm\">Imagen no disponible</div>
                  </div>
                </div>
              `;
            }
          }}
        />
        {/* Overlay de hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                <ZoomIn className="h-4 w-4 text-white" />
              </button>
              <div className="flex gap-2">
                <button 
                  className={`p-2 rounded-lg transition-colors ${
                    isLiked ? 'bg-red-500/80' : 'bg-white/20'
                  } backdrop-blur-sm hover:bg-white/30`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'text-white fill-white' : 'text-white'}`} />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Share2 className="h-4 w-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {item.icon || <ImageIcon className="h-6 w-6 text-blue-400" />}
          <h3 className="text-white font-semibold text-lg flex-1">{item.title}</h3>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
        {/* Metadatos */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span>{item.year || (item.date ? new Date(item.date).getFullYear() : '')}</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatNumber(item.likes || 0)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(item.views || 0)}
            </span>
          </div>
        </div>
        {/* Botón de acción */}
        <button className="w-full btn-premium flex items-center justify-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

interface GalleryClientProps {
  images: any[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ images }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filtrar y ordenar imágenes
  const filteredImages = images.filter(item => {
    const matchesFilter = activeFilter === "all" || 
      (item.category && item.category.toLowerCase().includes(activeFilter)) ||
      (item.telescope && item.telescope.toLowerCase().includes(activeFilter));
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (parseInt(b.year || (b.date ? new Date(b.date).getFullYear() : 0)) - parseInt(a.year || (a.date ? new Date(a.date).getFullYear() : 0)));
      case "oldest":
        return (parseInt(a.year || (a.date ? new Date(a.date).getFullYear() : 0)) - parseInt(b.year || (b.date ? new Date(b.date).getFullYear() : 0)));
      case "popular":
        return (b.likes || 0) - (a.likes || 0);
      case "views":
        return (b.views || 0) - (a.views || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Galería Cósmica <span className='text-gradient ml-2'>Premium</span></h1>
        <p className="subtitle max-w-2xl mx-auto">Explora las imágenes más impresionantes del universo capturadas por los telescopios más avanzados de la humanidad.</p>
      </div>
      {/* Controles */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar imágenes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="newest">Más Recientes</option>
            <option value="oldest">Más Antiguas</option>
            <option value="popular">Más Populares</option>
            <option value="views">Más Vistas</option>
          </select>
        </div>
        {/* Filtros */}
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>
      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredImages.map((item, index) => (
          <ImageCard key={item.title || item.url || index} item={item} index={index} />
        ))}
      </div>
      {/* Mensaje si no hay resultados */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No se encontraron imágenes</h3>
          <p className="text-gray-400">Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
      {/* Footer */}
      <div className="glass-card p-6 text-center">
        <p className="text-gray-400 mb-2">
          Todas las imágenes son propiedad de NASA, ESA y otras agencias espaciales
        </p>
        <p className="text-sm text-gray-500">
          Datos actualizados en tiempo real • Última actualización: {formatDate(new Date())}
        </p>
      </div>
    </div>
  );
};

export default GalleryClient; 