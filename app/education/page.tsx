"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Award, 
  Clock, 
  Star, 
  Globe, 
  Rocket, 
  Satellite, 
  Eye, 
  Zap, 
  Bell, 
  Settings, 
  Share2, 
  Heart, 
  MessageCircle, 
  Camera, 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
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
  ExternalLink, 
  MapPin, 
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
  Microscope, 
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
  Map, 
  Search, 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  Database, 
  TrendingUp, 
  Activity, 
  Calendar, 
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
  PieChart as PieChartIcon
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // hours
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  topics: string[];
  certificate: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  type: 'video' | 'interactive' | 'quiz' | 'lab';
  completed: boolean;
}

const courses: Course[] = [
  {
    id: 'astronomy-basics',
    title: 'Fundamentos de Astronomía',
    description: 'Aprende los conceptos básicos de astronomía y observación del cielo',
    level: 'beginner',
    duration: 12,
    lessons: 24,
    students: 15420,
    rating: 4.8,
    instructor: 'Dr. María González',
    topics: ['Sistema Solar', 'Constelaciones', 'Telescopios', 'Historia de la Astronomía'],
    certificate: true
  },
  {
    id: 'space-exploration',
    title: 'Exploración Espacial',
    description: 'Descubre las misiones espaciales más importantes de la historia',
    level: 'intermediate',
    duration: 18,
    lessons: 36,
    students: 8920,
    rating: 4.9,
    instructor: 'Prof. Carlos Rodríguez',
    topics: ['Misiones Apollo', 'Estación Espacial', 'Rovers Marcianos', 'Futuro de la Exploración'],
    certificate: true
  },
  {
    id: 'astrophysics',
    title: 'Astrofísica Avanzada',
    description: 'Conceptos avanzados de física aplicada al estudio del universo',
    level: 'advanced',
    duration: 24,
    lessons: 48,
    students: 3450,
    rating: 4.7,
    instructor: 'Dr. Ana Martínez',
    topics: ['Cosmología', 'Agujeros Negros', 'Ondas Gravitacionales', 'Materia Oscura'],
    certificate: true
  },
  {
    id: 'satellite-technology',
    title: 'Tecnología Satelital',
    description: 'Aprende sobre satélites, órbitas y aplicaciones espaciales',
    level: 'intermediate',
    duration: 15,
    lessons: 30,
    students: 6780,
    rating: 4.6,
    instructor: 'Ing. Luis Fernández',
    topics: ['Tipos de Órbitas', 'Comunicaciones', 'GPS', 'Observación Terrestre'],
    certificate: true
  },
  {
    id: 'space-weather',
    title: 'Clima Espacial',
    description: 'Estudia los fenómenos solares y su impacto en la Tierra',
    level: 'intermediate',
    duration: 10,
    lessons: 20,
    students: 4560,
    rating: 4.5,
    instructor: 'Dra. Elena Sánchez',
    topics: ['Actividad Solar', 'Tormentas Solares', 'Auroras', 'Protección Espacial'],
    certificate: true
  },
  {
    id: 'exoplanets',
    title: 'Exoplanetas y Búsqueda de Vida',
    description: 'Explora planetas fuera del sistema solar y la búsqueda de vida extraterrestre',
    level: 'advanced',
    duration: 16,
    lessons: 32,
    students: 2340,
    rating: 4.8,
    instructor: 'Dr. Roberto Jiménez',
    topics: ['Métodos de Detección', 'Habitabilidad', 'SETI', 'Futuras Misiones'],
    certificate: true
  }
];

const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introducción al Sistema Solar',
    description: 'Descripción general de nuestro sistema planetario',
    duration: 45,
    type: 'video',
    completed: true
  },
  {
    id: 'lesson-2',
    title: 'Identificación de Constelaciones',
    description: 'Aprende a reconocer las constelaciones principales',
    duration: 60,
    type: 'interactive',
    completed: true
  },
  {
    id: 'lesson-3',
    title: 'Uso de Telescopios',
    description: 'Guía práctica para usar telescopios amateur',
    duration: 90,
    type: 'lab',
    completed: false
  },
  {
    id: 'lesson-4',
    title: 'Quiz: Fundamentos Básicos',
    description: 'Evaluación de los conceptos aprendidos',
    duration: 30,
    type: 'quiz',
    completed: false
  }
];

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [progress, setProgress] = useState(65);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-600/20 text-green-400';
      case 'intermediate': return 'bg-yellow-600/20 text-yellow-400';
      case 'advanced': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'interactive': return Eye;
      case 'quiz': return HelpCircle;
      case 'lab': return TestTube;
      default: return BookOpen;
    }
  };

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Educación Espacial</h1>
        <p className="subtitle max-w-2xl mx-auto">Recursos, cursos y comunidad para aprender astronomía y ciencia espacial.</p>
      </div>
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Centro Educativo Espacial</h1>
            <p className="text-gray-300 max-w-xl">
              Aprende astronomía y exploración espacial con cursos interactivos y certificaciones
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
              <GraduationCap className="h-4 w-4 mr-1" />
              {courses.length} Cursos
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-400">
              {courses.reduce((acc, course) => acc + course.students, 0).toString()} Estudiantes
            </Badge>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card">
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="my-learning">Mi Aprendizaje</TabsTrigger>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="glass-card hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Duración</div>
                      <div className="text-white font-semibold">{course.duration}h</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Lecciones</div>
                      <div className="text-white font-semibold">{course.lessons}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Estudiantes</div>
                      <div className="text-white font-semibold">{course.students.toString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Rating</div>
                      <div className="text-white font-semibold flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Temas:</div>
                    <div className="flex flex-wrap gap-1">
                      {course.topics.slice(0, 2).map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {course.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.topics.length - 2} más
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 text-sm">
                      Instructor: {course.instructor}
                    </div>
                    {course.certificate && (
                      <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                        <Award className="h-3 w-3 mr-1" />
                        Certificado
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedCourse(course.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ver Curso
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-learning" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">Mi Progreso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progreso General</span>
                      <span className="text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${progress}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-black/20 rounded-lg">
                      <div className="text-white text-2xl font-bold">3</div>
                      <div className="text-gray-400 text-sm">Cursos Activos</div>
                    </div>
                    <div className="text-center p-4 bg-black/20 rounded-lg">
                      <div className="text-white text-2xl font-bold">12</div>
                      <div className="text-gray-400 text-sm">Lecciones Completadas</div>
                    </div>
                    <div className="text-center p-4 bg-black/20 rounded-lg">
                      <div className="text-white text-2xl font-bold">2</div>
                      <div className="text-gray-400 text-sm">Certificados</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">Lecciones Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lessons.map((lesson) => {
                      const LessonIcon = getLessonTypeIcon(lesson.type);
                      return (
                        <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
                          <div className={`p-2 rounded-lg ${
                            lesson.completed ? 'bg-green-600/20' : 'bg-blue-600/20'
                          }`}>
                            <LessonIcon className={`h-4 w-4 ${
                              lesson.completed ? 'text-green-400' : 'text-blue-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm">{lesson.title}</div>
                            <div className="text-gray-400 text-xs">{lesson.duration} min</div>
                          </div>
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Mis Certificados</CardTitle>
              <CardDescription className="text-gray-300">
                Certificados obtenidos por completar cursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Fundamentos de Astronomía',
                    date: '2024-01-15',
                    instructor: 'Dr. María González',
                    score: 95,
                    certificateId: 'CERT-001'
                  },
                  {
                    title: 'Exploración Espacial',
                    date: '2024-01-10',
                    instructor: 'Prof. Carlos Rodríguez',
                    score: 88,
                    certificateId: 'CERT-002'
                  }
                ].map((cert, i) => (
                  <Card key={i} className="glass-card border border-green-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Award className="h-8 w-8 text-green-400" />
                        <Badge className="bg-green-600/20 text-green-400">
                          Completado
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-white font-semibold">{cert.title}</div>
                          <div className="text-gray-400 text-sm">Instructor: {cert.instructor}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400">Fecha</div>
                            <div className="text-white">{new Date(cert.date).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Puntuación</div>
                            <div className="text-white">{cert.score}%</div>
                          </div>
                        </div>
                        <div className="text-gray-400 text-xs">
                          ID: {cert.certificateId}
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar Certificado
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Biblioteca Digital',
                description: 'Libros, artículos y recursos de astronomía',
                icon: BookOpen,
                items: 150,
                color: 'blue'
              },
              {
                title: 'Simulaciones Interactivas',
                description: 'Experimentos virtuales y simulaciones',
                icon: Eye,
                items: 25,
                color: 'green'
              },
              {
                title: 'Videos Educativos',
                description: 'Contenido audiovisual de alta calidad',
                icon: Video,
                items: 80,
                color: 'purple'
              },
              {
                title: 'Herramientas de Observación',
                description: 'Guías para telescopios y observación',
                icon: Eye,
                items: 12,
                color: 'yellow'
              },
              {
                title: 'Comunidad de Estudiantes',
                description: 'Foros y grupos de discusión',
                icon: Users,
                items: 500,
                color: 'pink'
              },
              {
                title: 'Eventos y Webinars',
                description: 'Sesiones en vivo con expertos',
                icon: Calendar,
                items: 8,
                color: 'orange'
              }
            ].map((resource, i) => (
              <Card key={i} className="glass-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-${resource.color}-600/20 rounded-lg`}>
                      <resource.icon className={`h-6 w-6 text-${resource.color}-400`} />
                    </div>
                    <div>
                      <CardTitle className="text-white">{resource.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {resource.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">{resource.items} elementos</div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 