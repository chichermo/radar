"use client";
import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  Globe, 
  Database, 
  Satellite, 
  Rocket, 
  Satellite as SatelliteIcon, 
  Brain, 
  Code, 
  Video, 
  FileText, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp,
  Filter,
  Search,
  Download,
  Share2,
  Bookmark,
  Eye,
  Clock,
  Award,
  Zap,
  Shield,
  Cpu,
  Network,
  Target,
  Lightbulb,
  Atom,
  Magnet,
  Radiation,
  Snowflake,
  TrendingDown,
  Tags,
  Building,
  Crown,
  ChevronRight,
  Sparkles,
  Calculator,
  MapPin,
  DollarSign,
  BarChart3,
  Activity,
  MessageCircle,
  Bell,
  Settings,
  Menu,
  X,
  Circle,
  Waves,
  SatelliteDish,
  Camera,
  Image as ImageIcon,
  AlertTriangle,
  FlaskConical,
  Moon,
  Sun,
  Cloud,
  Layers,
  Radar,
  Eye as EyeIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  BarChart3 as BarChart3Icon,
  Activity as ActivityIcon,
  Brain as BrainIcon,
  MessageCircle as MessageCircleIcon,
  Star as StarIcon,
  Circle as CircleIcon,
  Waves as WavesIcon,
  SatelliteDish as SatelliteDishIcon,
  Cpu as CpuIcon,
  Network as NetworkIcon,
  Target as TargetIcon,
  Lightbulb as LightbulbIcon,
  Atom as AtomIcon,
  Magnet as MagnetIcon,
  Radiation as RadiationIcon,
  Snowflake as SnowflakeIcon,
  TrendingUp as TrendingUpIcon,
  Tags as TagsIcon,
  Building as BuildingIcon,
  Crown as CrownIcon,
  Clock as ClockIcon,
  ChevronRight as ChevronRightIcon,
  Sparkles as SparklesIcon,
  Database as DatabaseIcon,
  Calculator as CalculatorIcon,
  BookOpen as BookOpenIcon,
  Users as UsersIcon,
  MapPin as MapPinIcon,
  DollarSign as DollarSignIcon
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { useI18n } from '@/lib/i18n';
import ClientDate from '@/components/ClientDate';

const RESOURCES = [
  {
    category: "🔭 Telescopios y Observatorios",
    items: [
      {
        title: "Hubble Space Telescope",
        description: "El telescopio espacial más famoso de la NASA, operando desde 1990",
        url: "https://hubblesite.org",
        icon: <Satellite className="h-5 w-5 text-blue-400" />,
        type: "Observatorio",
        tags: ["NASA", "Espacial", "Óptico"],
        rating: 5,
        visits: 12500
      },
      {
        title: "James Webb Space Telescope",
        description: "El telescopio más potente jamás lanzado al espacio",
        url: "https://webb.nasa.gov",
        icon: <Rocket className="h-5 w-5 text-purple-400" />,
        type: "Observatorio",
        tags: ["NASA", "Infrarrojo", "Moderno"],
        rating: 5,
        visits: 18900
      },
      {
        title: "Event Horizon Telescope",
        description: "Red global de telescopios para observar agujeros negros",
        url: "https://eventhorizontelescope.org",
        icon: <Globe className="h-5 w-5 text-green-400" />,
        type: "Red de Telescopios",
        tags: ["Internacional", "Radio", "Agujeros Negros"],
        rating: 5,
        visits: 8900
      }
    ]
  },
  {
    category: "📊 Bases de Datos Espaciales",
    items: [
      {
        title: "NASA Exoplanet Archive",
        description: "Base de datos completa de exoplanetas confirmados",
        url: "https://exoplanetarchive.ipac.caltech.edu",
        icon: <Database className="h-5 w-5 text-cyan-400" />,
        type: "Base de Datos",
        tags: ["NASA", "Exoplanetas", "Científico"],
        rating: 5,
        visits: 15600
      },
      {
        title: "ESA Space Science Data",
        description: "Datos científicos de misiones espaciales europeas",
        url: "https://www.cosmos.esa.int/web/esa-space-science-data",
        icon: <Database className="h-5 w-5 text-blue-400" />,
        type: "Base de Datos",
        tags: ["ESA", "Europa", "Misiones"],
        rating: 4,
        visits: 7800
      },
      {
        title: "Space-Track.org",
        description: "Seguimiento de objetos espaciales y satélites",
        url: "https://www.space-track.org",
        icon: <Satellite className="h-5 w-5 text-orange-400" />,
        type: "Seguimiento",
        tags: ["Satélites", "Órbita", "Militar"],
        rating: 4,
        visits: 12300
      }
    ]
  },
  {
    category: "🧠 Investigación y Ciencia",
    items: [
      {
        title: "arXiv.org - Astrophysics",
        description: "Artículos científicos de astrofísica y cosmología",
        url: "https://arxiv.org/list/astro-ph/recent",
        icon: <Brain className="h-5 w-5 text-purple-400" />,
        type: "Investigación",
        tags: ["Científico", "Artículos", "Académico"],
        rating: 5,
        visits: 23400
      },
      {
        title: "Nature Astronomy",
        description: "Revista científica líder en astronomía",
        url: "https://www.nature.com/natastron",
        icon: <BookOpen className="h-5 w-5 text-green-400" />,
        type: "Revista",
        tags: ["Científico", "Peer Review", "Premium"],
        rating: 5,
        visits: 8900
      },
      {
        title: "Science - Space Science",
        description: "Sección de ciencia espacial de la revista Science",
        url: "https://www.science.org/topic/space-science",
        icon: <BookOpen className="h-5 w-5 text-red-400" />,
        type: "Revista",
        tags: ["Científico", "Internacional", "Premium"],
        rating: 5,
        visits: 11200
      }
    ]
  },
  {
    category: "🎓 Educación y Divulgación",
    items: [
      {
        title: "Khan Academy - Cosmology",
        description: "Cursos gratuitos de cosmología y astronomía",
        url: "https://www.khanacademy.org/science/cosmology-and-astronomy",
        icon: <BookOpen className="h-5 w-5 text-blue-400" />,
        type: "Educación",
        tags: ["Gratuito", "Cursos", "Básico"],
        rating: 4,
        visits: 45600
      },
      {
        title: "Crash Course Astronomy",
        description: "Serie educativa de astronomía en YouTube",
        url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL",
        icon: <Video className="h-5 w-5 text-red-400" />,
        type: "Video",
        tags: ["YouTube", "Educativo", "Entretenido"],
        rating: 5,
        visits: 89000
      },
      {
        title: "NASA STEM Engagement",
        description: "Recursos educativos de la NASA para estudiantes",
        url: "https://www.nasa.gov/stem",
        icon: <Users className="h-5 w-5 text-green-400" />,
        type: "Educación",
        tags: ["NASA", "STEM", "Estudiantes"],
        rating: 4,
        visits: 23400
      }
    ]
  },
  {
    category: "🛠️ Herramientas y Software",
    items: [
      {
        title: "Stellarium",
        description: "Software de planetario gratuito y de código abierto",
        url: "https://stellarium.org",
        icon: <Code className="h-5 w-5 text-cyan-400" />,
        type: "Software",
        tags: ["Gratuito", "Open Source", "Planetario"],
        rating: 5,
        visits: 67800
      },
      {
        title: "Celestia",
        description: "Simulador espacial 3D de código abierto",
        url: "https://celestia.space",
        icon: <Code className="h-5 w-5 text-purple-400" />,
        type: "Software",
        tags: ["3D", "Simulación", "Open Source"],
        rating: 4,
        visits: 34500
      },
      {
        title: "AstroPy",
        description: "Biblioteca Python para astronomía",
        url: "https://www.astropy.org",
        icon: <Code className="h-5 w-5 text-orange-400" />,
        type: "Software",
        tags: ["Python", "Programación", "Científico"],
        rating: 5,
        visits: 28900
      }
    ]
  },
  {
    category: "📰 Noticias y Actualizaciones",
    items: [
      {
        title: "Space.com",
        description: "Noticias y actualizaciones del mundo espacial",
        url: "https://www.space.com",
        icon: <FileText className="h-5 w-5 text-blue-400" />,
        type: "Noticias",
        tags: ["Noticias", "Actualizado", "General"],
        rating: 4,
        visits: 156000
      },
      {
        title: "Astronomy Now",
        description: "Revista de astronomía para astrónomos aficionados",
        url: "https://astronomynow.com",
        icon: <FileText className="h-5 w-5 text-purple-400" />,
        type: "Revista",
        tags: ["Aficionados", "Revista", "Mensual"],
        rating: 4,
        visits: 23400
      },
      {
        title: "Sky & Telescope",
        description: "Revista líder en astronomía amateur",
        url: "https://skyandtelescope.org",
        icon: <FileText className="h-5 w-5 text-green-400" />,
        type: "Revista",
        tags: ["Amateur", "Observación", "Práctica"],
        rating: 5,
        visits: 45600
      }
    ]
  }
];

// Componente de tarjeta de recurso premium
const ResourceCard = ({ resource, index }: { resource: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div 
      className={`card-premium group relative overflow-hidden transition-all duration-700 ${
        'opacity-100 translate-y-0'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de tipo */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {resource.type}
        </span>
      </div>

      {/* Botón de bookmark */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked ? 'bg-yellow-500/80' : 'bg-white/20'
          } backdrop-blur-sm hover:bg-white/30`}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'text-white fill-white' : 'text-white'}`} />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse-glow">
            {resource.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-2">{resource.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{resource.description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag: string, tagIndex: number) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-white/10 text-white text-xs rounded-md border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400" />
              {resource.rating}/5
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {resource.visits.toLocaleString('es-ES')}
            </span>
          </div>
          <span className="text-green-400 font-medium">Gratuito</span>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <a 
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-premium flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Visitar
          </a>
          <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <Share2 className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de filtros
const FilterBar = ({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (filter: string) => void }) => {
  const filters = [
    { id: "all", label: "Todos", icon: <Globe className="h-4 w-4" /> },
    { id: "observatorio", label: "Observatorios", icon: <Satellite className="h-4 w-4" /> },
    { id: "base de datos", label: "Bases de Datos", icon: <Database className="h-4 w-4" /> },
    { id: "investigación", label: "Investigación", icon: <Brain className="h-4 w-4" /> },
    { id: "educación", label: "Educación", icon: <BookOpen className="h-4 w-4" /> },
    { id: "software", label: "Software", icon: <Code className="h-4 w-4" /> },
    { id: "noticias", label: "Noticias", icon: <FileText className="h-4 w-4" /> }
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

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  // Filtrar y ordenar recursos
  const filteredResources = RESOURCES.flatMap(category => 
    category.items.filter(item => {
      const matchesFilter = activeFilter === "all" || 
        item.type.toLowerCase().includes(activeFilter);
      
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    })
  ).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "visits":
        return b.visits - a.visits;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Recursos Espaciales</h1>
        <p className="subtitle max-w-2xl mx-auto">Accede a material educativo, papers, documentales y más recursos del cosmos.</p>
      </div>
      <div className="glass-card p-6 mb-8">
        {/* Controles */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recursos..."
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
            <option value="rating">Mejor Valorados</option>
            <option value="visits">Más Visitados</option>
            <option value="name">Alfabético</option>
          </select>
        </div>
        {/* Filtros */}
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>
      {/* Grid de recursos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredResources.map((resource, index) => (
          <ResourceCard key={resource.title} resource={resource} index={index} />
        ))}
      </div>
      {/* Mensaje si no hay resultados */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No se encontraron recursos</h3>
          <p className="text-gray-400">Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
      {/* Footer */}
      <div className="glass-card p-6 text-center">
        <p className="text-gray-400 mb-2">
          Todos los recursos son verificados y actualizados regularmente
        </p>
        <p className="text-sm text-gray-500">
          Última actualización: <ClientDate 
            date={new Date()} 
            type="date" 
            options={{
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }}
          /> • {filteredResources.length} recursos disponibles
        </p>
      </div>
    </div>
  );
}
