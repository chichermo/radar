"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card2';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  SkipBack,
  SkipForward,
  RotateCcw,
  Maximize,
  Minimize,
  Download,
  Share2,
  Eye,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Sparkles,
  Globe,
  Brain,
  Rocket,
  Microscope,
  Search,
  Grid,
  List,
  TrendingUp,
  Users,
  GraduationCap,
  Film,
  Video,
  Music,
  Radio
} from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'documentary' | 'interview' | 'lecture' | 'podcast';
  category: string;
  duration: string;
  year: number;
  author: string;
  rating: number;
  views: number;
  likes: number;
  dislikes: number;
  url: string;
  thumbnail?: string;
  language: string;
  quality: string;
  featured?: boolean;
  new?: boolean;
  popular?: boolean;
  tags: string[];
}

interface MediaPlayerProps {
  mediaItems: MediaItem[];
  title?: string;
  description?: string;
}

const getMediaIcon = (type: string) => {
  switch (type) {
    case 'video': return Video;
    case 'audio': return Music;
    case 'documentary': return Film;
    case 'interview': return Users;
    case 'lecture': return GraduationCap;
    case 'podcast': return Radio;
    default: return Play;
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

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function MediaPlayer({ mediaItems, title = "Material Audiovisual", description = "Reproduce documentales, entrevistas, conferencias y más contenido de Carl Sagan" }: MediaPlayerProps) {
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'views' | 'duration'>('date');

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!currentMedia) return;
    
    if (currentMedia.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    
    if (currentMedia?.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = time;
    } else if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (currentMedia?.type === 'video' && videoRef.current) {
      videoRef.current.volume = newVolume;
    } else if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (currentMedia?.type === 'video' && videoRef.current) {
      videoRef.current.muted = !isMuted;
    } else if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleSkip = (seconds: number) => {
    if (currentMedia?.type === 'video' && videoRef.current) {
      videoRef.current.currentTime += seconds;
    } else if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleMediaSelect = (media: MediaItem) => {
    setCurrentMedia(media);
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Reset media elements
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!currentMedia) return;

    const handleTimeUpdate = () => {
      if (currentMedia.type === 'video' && videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      } else if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (currentMedia.type === 'video' && videoRef.current) {
        setDuration(videoRef.current.duration);
      } else if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const mediaElement = currentMedia.type === 'video' ? videoRef.current : audioRef.current;
    if (mediaElement) {
      mediaElement.addEventListener('timeupdate', handleTimeUpdate);
      mediaElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      mediaElement.addEventListener('ended', handleEnded);

      return () => {
        mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
        mediaElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        mediaElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentMedia]);

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedMedia = [...filteredMedia].sort((a, b) => {
    switch (sortBy) {
      case 'date': return b.year - a.year;
      case 'rating': return b.rating - a.rating;
      case 'views': return b.views - a.views;
      case 'duration': return a.duration.localeCompare(b.duration);
      default: return 0;
    }
  });

  const categories = ['all', ...Array.from(new Set(mediaItems.map(item => item.category)))];

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
              placeholder="Buscar contenido..."
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
            <option value="rating">Por rating</option>
            <option value="views">Por vistas</option>
            <option value="duration">Por duración</option>
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

      {/* Media Player */}
      {currentMedia && (
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(getMediaIcon(currentMedia.type), { className: "w-5 h-5" })}
              {currentMedia.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video/Audio Player */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {currentMedia.type === 'video' ? (
                currentMedia.url.includes('youtube.com') || currentMedia.url.includes('youtu.be') ? (
                  <iframe
                    src={currentMedia.url}
                    className="w-full h-64"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={currentMedia.url}
                    className="w-full h-64 object-cover"
                    poster={currentMedia.thumbnail}
                  />
                )
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {React.createElement(getMediaIcon(currentMedia.type), { className: "w-16 h-16 mx-auto text-blue-400" })}
                    <div>
                      <h3 className="text-xl font-semibold text-white">{currentMedia.title}</h3>
                      <p className="text-gray-300">{currentMedia.author}</p>
                    </div>
                  </div>
                  <audio ref={audioRef} src={currentMedia.url} />
                </div>
              )}
            </div>

            {/* Player Controls */}
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-400">{formatTime(duration)}</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePlayPause}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={() => handleSkip(-10)}
                    size="sm"
                    variant="outline"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => handleSkip(10)}
                    size="sm"
                    variant="outline"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => {
                      if (currentMedia.type === 'video' && videoRef.current) {
                        videoRef.current.currentTime = 0;
                      } else if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                      }
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleMuteToggle}
                    size="sm"
                    variant="outline"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  
                  {currentMedia.type === 'video' && (
                    <Button
                      onClick={handleFullscreen}
                      size="sm"
                      variant="outline"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Media Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Autor:</span>
                <p className="text-white">{currentMedia.author}</p>
              </div>
              <div>
                <span className="text-gray-400">Año:</span>
                <p className="text-white">{currentMedia.year}</p>
              </div>
              <div>
                <span className="text-gray-400">Duración:</span>
                <p className="text-white">{currentMedia.duration}</p>
              </div>
              <div>
                <span className="text-gray-400">Calidad:</span>
                <p className="text-white">{currentMedia.quality}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Library */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {sortedMedia.map((media) => {
          const MediaIcon = getMediaIcon(media.type);
          const CategoryIcon = getCategoryIcon(media.category);
          
          return (
            <Card
              key={media.id}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer ${
                currentMedia?.id === media.id ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onClick={() => handleMediaSelect(media)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <MediaIcon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white truncate">{media.title}</h3>
                      {media.featured && <Star className="w-4 h-4 text-yellow-400" />}
                      {media.new && <Sparkles className="w-4 h-4 text-green-400" />}
                      {media.popular && <TrendingUp className="w-4 h-4 text-red-400" />}
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{media.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {media.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {media.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {media.rating}/5
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(media.category)}`}>
                        <CategoryIcon className="w-3 h-3 inline mr-1" />
                        {media.category}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom CSS for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
} 