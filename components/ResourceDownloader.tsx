"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card2';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileText, 
  Book, 
  File, 
  Eye, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  ExternalLink,
  CheckCircle,
  Clock,
  Star,
  Users,
  Calendar,
  Tag,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Brain,
  Rocket,
  Microscope,
  Search,
  Grid,
  List,
  TrendingUp,
  GraduationCap,
  Film,
  Video,
  Music,
  Radio,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'book' | 'video' | 'audio' | 'document' | 'presentation' | 'dataset' | 'image' | 'archive';
  category: string;
  size: string;
  downloads: number;
  rating: number;
  year: number;
  author: string;
  tags: string[];
  url: string;
  thumbnail?: string;
  duration?: string;
  language: string;
  format: string;
  pages?: number;
  isbn?: string;
  publisher?: string;
  featured?: boolean;
  new?: boolean;
  popular?: boolean;
}

interface ResourceDownloaderProps {
  resources: Resource[];
  title?: string;
  description?: string;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return FileText;
    case 'book': return Book;
    case 'video': return FileVideo;
    case 'audio': return FileAudio;
    case 'document': return FileText;
    case 'presentation': return FileText;
    case 'dataset': return FileSpreadsheet;
    case 'image': return FileImage;
    case 'archive': return FileArchive;
    default: return File;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Cosmología': return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
    case 'Astrobiología': return 'bg-green-500/20 text-green-600 border-green-500/30';
    case 'Astronomía': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
    case 'Filosofía': return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
    case 'Educación': return 'bg-teal-500/20 text-teal-600 border-teal-500/30';
    default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Cosmología': return Microscope;
    case 'Astrobiología': return Brain;
    case 'Astronomía': return Globe;
    case 'Filosofía': return Sparkles;
    case 'Educación': return GraduationCap;
    default: return Star;
  }
};

export default function ResourceDownloader({ resources, title = "Recursos de Carl Sagan", description = "Descarga libros, documentales, entrevistas y más material de Carl Sagan" }: ResourceDownloaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'downloads' | 'rating' | 'size'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleDownload = async (resource: Resource) => {
    setDownloading(resource.id);
    try {
      // Descargar el archivo usando fetch y blob
      const response = await fetch(resource.url);
      if (!response.ok) {
        throw new Error('No se pudo descargar el recurso.');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.title + '.' + (resource.format?.toLowerCase() || '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloaded(prev => new Set(Array.from(prev).concat([resource.id])));
    } catch (error) {
      alert('Error al descargar el recurso: ' + (error as Error).message);
      console.error('Error downloading resource:', error);
    } finally {
      setDownloading(null);
    }
  };

  const getFileSizeColor = (size: string) => {
    const sizeNum = parseInt(size.replace(/[^\d]/g, ''));
    if (sizeNum < 10) return 'text-green-400';
    if (sizeNum < 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'date': return b.year - a.year;
      case 'downloads': return b.downloads - a.downloads;
      case 'rating': return b.rating - a.rating;
      case 'size': return a.size.localeCompare(b.size);
      default: return 0;
    }
  });

  const categories = ['all', ...Array.from(new Set(resources.map(resource => resource.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="date">Por fecha</option>
            <option value="downloads">Por descargas</option>
            <option value="rating">Por rating</option>
            <option value="size">Por tamaño</option>
          </select>

          <div className="flex bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resources Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {sortedResources.map((resource) => {
          const FileIcon = getFileIcon(resource.type);
          const CategoryIcon = getCategoryIcon(resource.category);
          
          return (
            <Card
              key={resource.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <FileIcon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white truncate">{resource.title}</h3>
                      {resource.featured && <Star className="w-4 h-4 text-yellow-400" />}
                      {resource.new && <Sparkles className="w-4 h-4 text-green-400" />}
                      {resource.popular && <TrendingUp className="w-4 h-4 text-red-400" />}
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{resource.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {resource.rating}/5
                      </div>
                      <div className={`flex items-center gap-1 ${getFileSizeColor(resource.size)}`}>
                        <File className="w-3 h-3" />
                        {resource.size}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(resource.category)}`}>
                        <CategoryIcon className="w-3 h-3 inline mr-1" />
                        {resource.category}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600/50">
                        {resource.format.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleDownload(resource)}
                        disabled={downloading === resource.id}
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {downloading === resource.id ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Descargando...
                          </div>
                        ) : downloaded.has(resource.id) ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Descargado
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Descargar
                          </div>
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs bg-gray-800/50 text-gray-300 border border-gray-600/50"
                          >
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 3 && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-800/50 text-gray-300 border border-gray-600/50">
                            +{resource.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{resources.length}</div>
            <div className="text-sm text-gray-400">Total de Recursos</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Descargas Totales</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {(resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-400">Rating Promedio</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {Array.from(new Set(resources.map(r => r.category))).length}
            </div>
            <div className="text-sm text-gray-400">Categorías</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 