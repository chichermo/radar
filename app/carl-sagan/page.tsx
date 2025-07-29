"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ResourceDownloader from '@/components/ResourceDownloader';
import MediaPlayer from '../../components/MediaPlayer';
import { 
  User, 
  BookOpen, 
  Video, 
  Quote, 
  Award, 
  Globe, 
  Star, 
  Rocket, 
  Eye, 
  Microscope, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Share2, 
  Download, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Bell, 
  Settings, 
  Camera, 
  Headphones, 
  Smartphone, 
  Monitor, 
  Watch, 
  Speaker, 
  Wifi, 
  Bluetooth, 
  Battery, 
  Power, 
  Lock, 
  Unlock, 
  Key, 
  Fingerprint, 
  QrCode, 
  CreditCard, 
  Wallet, 
  Coins, 
  DollarSign, 
  Euro, 
  PoundSterling, 
  Bitcoin, 
  ArrowRight, 
  CheckCircle, 
  MapPin as MapPinIcon, 
  Info, 
  ChevronRight, 
  Timer, 
  Trash2, 
  AlertCircle, 
  XCircle, 
  HelpCircle, 
  CheckSquare, 
  Square, 
  Circle, 
  Home, 
  Building, 
  TestTube, 
  Atom, 
  Dna, 
  Archive, 
  FileText, 
  SortAsc, 
  SortDesc, 
  PieChart, 
  LineChart, 
  BarChart, 
  Layers, 
  Grid, 
  List, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  Database, 
  TrendingUp, 
  Activity, 
  Target, 
  Shield, 
  Crown, 
  Brain, 
  History, 
  Filter, 
  Triangle, 
  Hexagon, 
  Rocket as RocketIcon, 
  Shield as ShieldIcon, 
  Zap as ZapIcon, 
  Users as UsersIcon, 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  Grid as GridIcon, 
  List as ListIcon, 
  Layers as LayersIcon, 
  PieChart as PieChartIcon,
  Image as ImageIcon,
  Clock,
  GraduationCap,
  Book,
  Film,
  Sparkles
} from 'lucide-react';
import SpaceCanvas from '@/components/SpaceCanvas';

interface Book {
  id: string;
  title: string;
  year: number;
  description: string;
  category: string;
  rating: number;
  cover: string;
}

interface Documentary {
  id: string;
  title: string;
  year: number;
  description: string;
  duration: string;
  rating: number;
  poster: string;
}

interface Quote {
  id: string;
  text: string;
  source: string;
  year?: number;
  category: string;
}

const carlSaganData = {
  biography: {
    name: "Carl Edward Sagan",
    birth: "9 de noviembre de 1934",
    death: "20 de diciembre de 1996",
    birthplace: "Brooklyn, Nueva York, Estados Unidos",
    education: "Universidad de Chicago",
    degrees: ["Física", "Astronomía"],
    achievements: [
      "Astrofísico y cosmólogo",
      "Divulgador científico",
      "Escritor y comunicador",
      "Investigador de SETI",
      "Consultor de NASA"
    ]
  },
  books: [
    {
      id: '1',
      title: 'Cosmos',
      year: 1980,
      description: 'La obra maestra de Sagan que acompaña la serie de televisión, explorando el universo y la historia de la ciencia.',
      category: 'Divulgación Científica',
      rating: 4.9,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Contacto',
      year: 1985,
      description: 'Novela de ciencia ficción sobre el primer contacto con vida extraterrestre inteligente.',
      category: 'Ciencia Ficción',
      rating: 4.7,
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'El Mundo y sus Demonios',
      year: 1995,
      description: 'Defensa del pensamiento científico y crítica al pensamiento mágico y pseudociencia.',
      category: 'Filosofía de la Ciencia',
      rating: 4.8,
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Pale Blue Dot',
      year: 1994,
      description: 'Una visión de la humanidad en el futuro del espacio, basada en la famosa fotografía de la Tierra.',
      category: 'Divulgación Científica',
      rating: 4.9,
      cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'Los Dragones del Edén',
      year: 1977,
      description: 'Especulaciones sobre la evolución de la inteligencia humana.',
      category: 'Evolución',
      rating: 4.6,
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
    },
    {
      id: '6',
      title: 'El Cerebro de Broca',
      year: 1979,
      description: 'Reflexiones sobre el romance de la ciencia.',
      category: 'Divulgación Científica',
      rating: 4.5,
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
    }
  ],
  documentaries: [
    {
      id: '1',
      title: 'Cosmos: Un Viaje Personal',
      year: 1980,
      description: 'Serie de televisión de 13 episodios que explora el universo y la historia de la ciencia.',
      duration: '13 episodios',
      rating: 4.9,
      poster: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Contacto (Película)',
      year: 1997,
      description: 'Adaptación cinematográfica de su novela, dirigida por Robert Zemeckis.',
      duration: '2h 30m',
      rating: 4.6,
      poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Cosmos: Una Odisea en el Espacio-Tiempo',
      year: 2014,
      description: 'Secuela de la serie original, presentada por Neil deGrasse Tyson.',
      duration: '13 episodios',
      rating: 4.8,
      poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop'
    }
  ],
  quotes: [
    {
      id: '1',
      text: "Somos polvo de estrellas.",
      source: "Cosmos",
      year: 1980,
      category: "Cosmología"
    },
    {
      id: '2',
      text: "La ciencia no es solo compatible con la espiritualidad; es una fuente profunda de espiritualidad.",
      source: "El Mundo y sus Demonios",
      year: 1995,
      category: "Filosofía"
    },
    {
      id: '3',
      text: "En algún lugar, algo increíble está esperando ser conocido.",
      source: "Cosmos",
      year: 1980,
      category: "Exploración"
    },
    {
      id: '4',
      text: "La ausencia de evidencia no es evidencia de ausencia.",
      source: "El Mundo y sus Demonios",
      year: 1995,
      category: "Pensamiento Crítico"
    },
    {
      id: '5',
      text: "Mira de nuevo ese punto. Eso es aquí. Eso es nuestro hogar. Eso somos nosotros.",
      source: "Pale Blue Dot",
      year: 1994,
      category: "Perspectiva Cósmica"
    },
    {
      id: '6',
      text: "La ciencia es más que un cuerpo de conocimiento. Es una forma de pensar.",
      source: "El Mundo y sus Demonios",
      year: 1995,
      category: "Método Científico"
    },
    {
      id: '7',
      text: "La imaginación a menudo nos llevará a mundos que nunca existieron. Pero sin ella no vamos a ninguna parte.",
      source: "Cosmos",
      year: 1980,
      category: "Imaginación"
    },
    {
      id: '8',
      text: "Para hacer una tarta de manzana desde cero, primero debes inventar el universo.",
      source: "Cosmos",
      year: 1980,
      category: "Cosmología"
    }
  ],
  timeline: [
    {
      year: 1934,
      event: "Nacimiento en Brooklyn, Nueva York",
      description: "Carl Edward Sagan nace el 9 de noviembre."
    },
    {
      year: 1951,
      event: "Ingresa a la Universidad de Chicago",
      description: "Comienza sus estudios en física y astronomía."
    },
    {
      year: 1960,
      event: "Doctorado en Astronomía",
      description: "Obtiene su doctorado en la Universidad de Chicago."
    },
    {
      year: 1968,
      event: "Profesor en Cornell",
      description: "Se convierte en profesor de astronomía en la Universidad de Cornell."
    },
    {
      year: 1971,
      event: "Mariner 9",
      description: "Participa en la misión Mariner 9 a Marte."
    },
    {
      year: 1972,
      event: "Pioneer 10",
      description: "Diseña la placa Pioneer con información sobre la humanidad."
    },
    {
      year: 1977,
      event: "Voyager Golden Record",
      description: "Crea el disco de oro de las Voyager con sonidos de la Tierra."
    },
    {
      year: 1980,
      event: "Serie Cosmos",
      description: "Presenta la revolucionaria serie de televisión 'Cosmos'."
    },
    {
      year: 1985,
      event: "Novela Contacto",
      description: "Publica su novela de ciencia ficción 'Contacto'."
    },
    {
      year: 1994,
      event: "Pale Blue Dot",
      description: "Publica 'Pale Blue Dot' basado en la famosa fotografía."
    },
    {
      year: 1996,
      event: "Fallecimiento",
      description: "Muere el 20 de diciembre a los 62 años."
    }
  ]
};

// Datos de recursos descargables
const downloadableResources = [
  {
    id: '1',
    title: 'Cosmos - Carl Sagan (PDF Completo)',
    description: 'La obra maestra de Sagan que acompaña la serie de televisión, explorando el universo y la historia de la ciencia.',
    type: 'pdf' as const,
    category: 'Divulgación Científica',
    size: '15.2MB',
    downloads: 15420,
    rating: 4.9,
    year: 1980,
    author: 'Carl Sagan',
    tags: ['cosmología', 'divulgación', 'ciencia', 'universo'],
    url: '/resources/cosmos-carl-sagan.pdf',
    language: 'Español',
    format: 'PDF',
    pages: 365,
    isbn: '978-0-394-50294-6',
    publisher: 'Random House',
    featured: true,
    popular: true
  },
  {
    id: '2',
    title: 'El Mundo y sus Demonios - Edición Digital',
    description: 'Defensa del pensamiento científico y crítica al pensamiento mágico y pseudociencia.',
    type: 'pdf' as const,
    category: 'Filosofía de la Ciencia',
    size: '8.7MB',
    downloads: 8920,
    rating: 4.8,
    year: 1995,
    author: 'Carl Sagan',
    tags: ['filosofía', 'pensamiento crítico', 'ciencia', 'escepticismo'],
    url: '/resources/el-mundo-y-sus-demonios.pdf',
    language: 'Español',
    format: 'PDF',
    pages: 457,
    isbn: '978-0-345-40946-1',
    publisher: 'Ballantine Books',
    featured: true
  },
  {
    id: '3',
    title: 'Pale Blue Dot - Versión Extendida',
    description: 'Una visión de la humanidad en el futuro del espacio, basada en la famosa fotografía de la Tierra.',
    type: 'pdf' as const,
    category: 'Divulgación Científica',
    size: '12.1MB',
    downloads: 12350,
    rating: 4.9,
    year: 1994,
    author: 'Carl Sagan',
    tags: ['perspectiva cósmica', 'tierra', 'humanidad', 'espacio'],
    url: '/resources/pale-blue-dot.pdf',
    language: 'Español',
    format: 'PDF',
    pages: 429,
    isbn: '978-0-679-43841-0',
    publisher: 'Random House',
    popular: true
  },
  {
    id: '4',
    title: 'Contacto - Novela Completa',
    description: 'Novela de ciencia ficción sobre el primer contacto con vida extraterrestre inteligente.',
    type: 'pdf' as const,
    category: 'Ciencia Ficción',
    size: '6.3MB',
    downloads: 9870,
    rating: 4.7,
    year: 1985,
    author: 'Carl Sagan',
    tags: ['ciencia ficción', 'extraterrestres', 'contacto', 'SETI'],
    url: '/resources/contacto-novela.pdf',
    language: 'Español',
    format: 'PDF',
    pages: 432,
    isbn: '978-0-671-43400-7',
    publisher: 'Simon & Schuster'
  },
  {
    id: '5',
    title: 'Los Dragones del Edén - Edición Digital',
    description: 'Especulaciones sobre la evolución de la inteligencia humana.',
    type: 'pdf' as const,
    category: 'Evolución',
    size: '9.8MB',
    downloads: 6540,
    rating: 4.6,
    year: 1977,
    author: 'Carl Sagan',
    tags: ['evolución', 'inteligencia', 'cerebro', 'humanidad'],
    url: '/resources/los-dragones-del-eden.pdf',
    language: 'Español',
    format: 'PDF',
    pages: 263,
    isbn: '978-0-394-41045-7',
    publisher: 'Random House'
  },
  {
    id: '6',
    title: 'El Cerebro de Broca - Reflexiones Científicas',
    description: 'Reflexiones sobre el romance de la ciencia.',
    type: 'pdf' as const,
    category: 'Divulgación Científica',
    size: '7.2MB',
    downloads: 5430,
    rating: 4.5,
    year: 1979,
    author: 'Carl Sagan',
    tags: ['ciencia', 'reflexiones', 'romance científico'],
    url: '/resources/el-cerebro-de-broca.pdf',
    language: 'Español',
    format: 'PDF',
    pages: 347,
    isbn: '978-0-394-50115-6',
    publisher: 'Random House'
  }
];

// Datos de contenido audiovisual
const audiovisualContent = [
  {
    id: '1',
    title: 'Cosmos: Un Viaje Personal - Episodio 1',
    description: 'El primer episodio de la revolucionaria serie que cambió la forma de comunicar la ciencia.',
    type: 'documentary' as const,
    category: 'Divulgación',
    duration: '60:00',
    year: 1980,
    author: 'Carl Sagan',
    rating: 4.9,
    views: 2500000,
    likes: 125000,
    dislikes: 1200,
    url: 'https://samplelib.com/mp4/sample-5s.mp4',
    language: 'Español',
    quality: 'HD',
    featured: true,
    popular: true,
    tags: ['cosmos', 'divulgación', 'universo', 'serie']
  },
  {
    id: '2',
    title: 'Entrevista con Carl Sagan - 1994',
    description: 'Entrevista completa donde Sagan habla sobre el futuro de la humanidad y la exploración espacial.',
    type: 'interview' as const,
    category: 'Entrevista',
    duration: '45:30',
    year: 1994,
    author: 'Carl Sagan',
    rating: 4.8,
    views: 890000,
    likes: 45000,
    dislikes: 800,
    url: 'https://samplelib.com/mp4/sample-10s.mp4',
    language: 'Inglés',
    quality: 'SD',
    featured: true,
    tags: ['entrevista', 'futuro', 'espacio', 'humanidad']
  },
  {
    id: '3',
    title: 'Pale Blue Dot - Narración Original',
    description: 'La famosa narración de Sagan sobre la fotografía de la Tierra desde el espacio.',
    type: 'audio' as const,
    category: 'Conferencia',
    duration: '3:45',
    year: 1994,
    author: 'Carl Sagan',
    rating: 4.9,
    views: 3500000,
    likes: 180000,
    dislikes: 500,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    language: 'Inglés',
    quality: 'HD',
    popular: true,
    tags: ['pale blue dot', 'tierra', 'perspectiva', 'narración']
  },
  {
    id: '4',
    title: 'Conferencia en Cornell - 1985',
    description: 'Conferencia completa sobre la búsqueda de vida extraterrestre y el proyecto SETI.',
    type: 'lecture' as const,
    category: 'Conferencia',
    duration: '90:00',
    year: 1985,
    author: 'Carl Sagan',
    rating: 4.7,
    views: 650000,
    likes: 32000,
    dislikes: 1200,
    url: 'https://samplelib.com/mp4/sample-10s.mp4',
    language: 'Inglés',
    quality: 'SD',
    tags: ['SETI', 'extraterrestres', 'vida', 'conferencia']
  },
  {
    id: '5',
    title: 'El Mundo y sus Demonios - Documental',
    description: 'Documental basado en el libro homónimo sobre el pensamiento crítico y científico.',
    type: 'documentary' as const,
    category: 'Documental',
    duration: '120:00',
    year: 1996,
    author: 'Carl Sagan',
    rating: 4.8,
    views: 980000,
    likes: 52000,
    dislikes: 1500,
    url: 'https://www.youtube.com/embed/9d8wWcJLnFI',
    language: 'Español',
    quality: 'HD',
    tags: ['pensamiento crítico', 'escepticismo', 'ciencia', 'documental']
  },
  {
    id: '6',
    title: 'Podcast: Sagan sobre la Ciencia',
    description: 'Serie de podcasts donde Sagan explica conceptos científicos complejos de manera accesible.',
    type: 'podcast' as const,
    category: 'Educativo',
    duration: '30:00',
    year: 1988,
    author: 'Carl Sagan',
    rating: 4.6,
    views: 450000,
    likes: 23000,
    dislikes: 900,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    language: 'Inglés',
    quality: 'HD',
    tags: ['podcast', 'educativo', 'ciencia', 'divulgación']
  }
];

// Componente para animar texto caracter por caracter
const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayedText.split('').map((char, index) => (
        <span
          key={index}
          className="char-animation"
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default function CarlSaganPage() {
  const [activeTab, setActiveTab] = useState('biografia');

  const getQuoteCategoryColor = (category: string) => {
    switch (category) {
      case 'Cosmología': return 'bg-blue-600/20 text-blue-400';
      case 'Filosofía': return 'bg-purple-600/20 text-purple-400';
      case 'Exploración': return 'bg-green-600/20 text-green-400';
      case 'Pensamiento Crítico': return 'bg-yellow-600/20 text-yellow-400';
      case 'Perspectiva Cósmica': return 'bg-red-600/20 text-red-400';
      case 'Método Científico': return 'bg-indigo-600/20 text-indigo-400';
      case 'Imaginación': return 'bg-pink-600/20 text-pink-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const filteredQuotes = carlSaganData.quotes;

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="title gradient-text glow-text">CARL SAGAN</h1>
        <p className="subtitle max-w-3xl mx-auto">Astrónomo, astrofísico, cosmólogo, astrobiólogo, escritor y divulgador científico estadounidense</p>
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>1934 - 1996</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>Brooklyn, Nueva York</span>
          </div>
        </div>
      </div>
      <div className="glass-card p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="biografia" className="nav-item">
              <User className="w-4 h-4 mr-2" />
              Biografía
            </TabsTrigger>
            <TabsTrigger value="legado" className="nav-item">
              <Award className="w-4 h-4 mr-2" />
              Legado
            </TabsTrigger>
            <TabsTrigger value="citas" className="nav-item">
              <Quote className="w-4 h-4 mr-2" />
              Citas
            </TabsTrigger>
            <TabsTrigger value="obras" className="nav-item">
              <BookOpen className="w-4 h-4 mr-2" />
              Obras
            </TabsTrigger>
            <TabsTrigger value="recursos" className="nav-item">
              <Download className="w-4 h-4 mr-2" />
              Recursos
            </TabsTrigger>
            <TabsTrigger value="media" className="nav-item">
              <Video className="w-4 h-4 mr-2" />
              Audiovisual
            </TabsTrigger>
          </TabsList>

          {/* Contenido de las pestañas */}
          <TabsContent value="biografia" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card hover-glow card-3d">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                    <span>Vida y Educación</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p>
                    Carl Edward Sagan nació el 9 de noviembre de 1934 en Brooklyn, Nueva York. 
                    Desde temprana edad mostró un profundo interés por la astronomía y la ciencia.
                  </p>
                  <p>
                    Se graduó en la Universidad de Chicago con doctorados en astronomía y astrofísica. 
                    Su trabajo pionero incluyó estudios sobre las atmósferas planetarias y la búsqueda de vida extraterrestre.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">1934</div>
                      <div className="text-sm text-gray-400">Nacimiento</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">1996</div>
                      <div className="text-sm text-gray-400">Fallecimiento</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow card-3d">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Eye className="w-6 h-6 text-purple-400" />
                    <span>Contribuciones Científicas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Exploración Planetaria</h4>
                        <p className="text-sm">Participó en las misiones Mariner, Viking y Voyager</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">SETI</h4>
                        <p className="text-sm">Fundador del programa de búsqueda de inteligencia extraterrestre</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Divulgación Científica</h4>
                        <p className="text-sm">Revolucionó la forma de comunicar la ciencia al público</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="legado" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card hover-glow card-3d">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span>Influencia Cultural</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Sagan transformó la forma en que el público ve la ciencia, 
                    inspirando a generaciones de científicos y entusiastas del espacio.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow card-3d">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span>Pale Blue Dot</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Su concepto del "punto azul pálido" cambió nuestra perspectiva 
                    sobre la Tierra y nuestro lugar en el universo.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow card-3d">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>Pensamiento Crítico</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>
                    Promovió el escepticismo científico y el pensamiento crítico 
                    como herramientas fundamentales para la sociedad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="citas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carlSaganData.quotes.map((quote, index) => (
                <Card key={index} className="glass-card hover-glow card-3d">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-blue-400 mb-4" />
                    <blockquote className="text-lg text-white italic mb-4">
                      "{quote.text}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{quote.source}</span>
                      <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-xs rounded-full">
                        {quote.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="obras" className="space-y-8">
            {/* Libros */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Book className="w-6 h-6 text-green-400" />
                <span>Libros Principales</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carlSaganData.books.map((book, index) => (
                  <Card key={index} className="glass-card hover-glow card-3d">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-white">
                          {book.title}
                        </CardTitle>
                        <span className="text-sm text-gray-400">{book.year}</span>
                      </div>
                      <CardDescription className="text-gray-300">
                        {book.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="px-3 py-1 bg-purple-400/20 text-purple-400 text-xs rounded-full">
                        {book.category}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Documentales */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Film className="w-6 h-6 text-red-400" />
                <span>Documentales</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {carlSaganData.documentaries.map((doc, index) => (
                  <Card key={index} className="glass-card hover-glow card-3d">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-white">
                          {doc.title}
                        </CardTitle>
                        <span className="text-sm text-gray-400">{doc.year}</span>
                      </div>
                      <CardDescription className="text-gray-300">
                        {doc.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-gray-400">{doc.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Nueva pestaña de Recursos Descargables */}
          <TabsContent value="recursos" className="space-y-6">
            <ResourceDownloader 
              resources={downloadableResources}
              title="Recursos Descargables de Carl Sagan"
              description="Descarga libros, papers, presentaciones y más material de Carl Sagan en formato digital"
            />
          </TabsContent>

          {/* Nueva pestaña de Contenido Audiovisual */}
          <TabsContent value="media" className="space-y-6">
            <MediaPlayer 
              mediaItems={audiovisualContent}
              title="Contenido Audiovisual"
              description="Reproduce documentales, entrevistas, conferencias y más contenido de Carl Sagan"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 