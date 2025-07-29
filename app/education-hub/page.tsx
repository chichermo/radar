"use client";

import React from 'react'
import { BookOpen, GraduationCap, Users, Video, FileText, Award, Globe, Star, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const resources = [
  { type: 'Curso', name: 'Astronomía para Principiantes', provider: 'Coursera', link: 'https://www.coursera.org/learn/astronomia', description: 'Curso gratuito de introducción a la astronomía.' },
  { type: 'Video', name: 'NASA Science Live', provider: 'NASA', link: 'https://www.youtube.com/c/NASA', description: 'Videos y transmisiones en vivo de la NASA.' },
  { type: 'Artículo', name: '¿Qué es un agujero negro?', provider: 'ESA', link: 'https://www.esa.int/Space_in_Member_States/Spain/Que_es_un_agujero_negro', description: 'Artículo divulgativo sobre agujeros negros.' },
  { type: 'Evento', name: 'Noche Internacional de Observación Lunar', provider: 'IAU', link: 'https://moon.nasa.gov/observe-the-moon-night/', description: 'Evento global anual para observar la Luna.' },
  { type: 'Curso', name: 'Exploración Espacial', provider: 'edX', link: 'https://www.edx.org/course/space-exploration', description: 'Curso online sobre misiones y tecnología espacial.' }
]

export default function EducationHubPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Centro Educativo COSMIC DATA</h1>
        <p className="subtitle max-w-2xl mx-auto">Aprende astronomía de la mano de expertos y accede a recursos, cursos y comunidad.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Cursos */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Cursos Disponibles</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Astronomía Básica</h3>
              <p className="text-sm text-gray-600 mb-3">
                Fundamentos de astronomía para principiantes
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">4 semanas</span>
                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                  Inscribirse
                </button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Exoplanetas</h3>
              <p className="text-sm text-gray-600 mb-3">
                Descubre mundos más allá del sistema solar
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">6 semanas</span>
                <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                  Inscribirse
                </button>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Clima Espacial</h3>
              <p className="text-sm text-gray-600 mb-3">
                Entiende las tormentas solares y sus efectos
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">3 semanas</span>
                <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                  Inscribirse
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recursos */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Recursos Educativos</h2>
          </div>
          
          <div className="space-y-4">
            {resources.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {r.type === 'Curso' && <BookOpen className="w-5 h-5 text-blue-500" />}
                {r.type === 'Video' && <Video className="w-5 h-5 text-red-500" />}
                {r.type === 'Artículo' && <Award className="w-5 h-5 text-yellow-500" />}
                {r.type === 'Evento' && <Calendar className="w-5 h-5 text-green-500" />}
                <div>
                  <h4 className="font-medium">{r.name}</h4>
                  <p className="text-sm text-gray-600">{r.description}</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 mt-2">
                  <a href={r.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" /> Ver más
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Comunidad */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold">Comunidad</h2>
          </div>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-sm text-blue-700">Estudiantes Activos</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">89</div>
              <div className="text-sm text-green-700">Cursos Completados</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-sm text-purple-700">Expertos Disponibles</div>
            </div>
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Unirse a la Comunidad
          </button>
        </div>
      </div>

      {/* Características destacadas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">Características Educativas</h2>
        <div className="metricsGrid">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Certificaciones</h3>
            <p className="text-sm text-gray-600">
              Obtén certificados reconocidos por instituciones astronómicas
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mentoría</h3>
            <p className="text-sm text-gray-600">
              Conecta con expertos en astronomía y astrofísica
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Logros</h3>
            <p className="text-sm text-gray-600">
              Sistema de logros y recompensas por aprendizaje
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Práctica</h3>
            <p className="text-sm text-gray-600">
              Acceso a telescopios remotos y observatorios
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">¿Listo para Explorar el Universo?</h2>
        <p className="text-lg mb-6">Únete a miles de estudiantes que ya están aprendiendo astronomía con COSMIC DATA</p>
        <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-gray-100">
          Comenzar Ahora
        </button>
      </div>
    </div>
  )
} 