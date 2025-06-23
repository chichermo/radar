"use client";

import React from 'react';
import { HelpCircle, Star, Globe, Database, Users, Zap } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: "Datos y Fuentes",
      icon: <Database className="w-6 h-6 text-blue-400" />,
      questions: [
        {
          question: "¿De dónde provienen los datos astronómicos?",
          answer: "COSMIC EYE integra datos de múltiples fuentes oficiales incluyendo NASA, ESA, Space-Track.org, y el Observatorio Vera Rubin. Todos los datos se actualizan en tiempo real para garantizar la máxima precisión."
        },
        {
          question: "¿Con qué frecuencia se actualizan los datos?",
          answer: "Los datos se actualizan automáticamente cada 5-15 minutos dependiendo de la fuente. Los datos de asteroides y satélites se actualizan en tiempo real, mientras que las imágenes astronómicas se actualizan diariamente."
        },
        {
          question: "¿Son precisos los datos mostrados?",
          answer: "Sí, todos los datos provienen de fuentes oficiales y verificadas. Utilizamos las mismas APIs que emplean las agencias espaciales para sus operaciones diarias."
        }
      ]
    },
    {
      category: "Funcionalidades",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      questions: [
        {
          question: "¿Qué incluye el plan gratuito?",
          answer: "El plan gratuito incluye acceso a datos básicos de asteroides, imágenes diarias de NASA APOD, mapa estelar básico, y alertas de eventos espaciales importantes. Perfecto para astrónomos aficionados."
        },
        {
          question: "¿Qué ventajas tiene el plan Pro?",
          answer: "El plan Pro incluye datos avanzados del Vera Rubin Observatory, predicciones de IA, análisis de patrones, datos históricos completos, y alertas personalizadas. Ideal para investigadores y entusiastas avanzados."
        },
        {
          question: "¿Puedo exportar los datos para análisis?",
          answer: "Sí, el plan Pro incluye herramientas de exportación en múltiples formatos (CSV, JSON, Excel) para que puedas realizar análisis personalizados con los datos."
        }
      ]
    },
    {
      category: "Tecnología",
      icon: <Globe className="w-6 h-6 text-green-400" />,
      questions: [
        {
          question: "¿Qué tecnologías utiliza COSMIC EYE?",
          answer: "Utilizamos tecnologías de vanguardia como Three.js para visualizaciones 3D, Next.js para el frontend, APIs de NASA y ESA, y algoritmos de IA para predicciones y detección de anomalías."
        },
        {
          question: "¿Es compatible con móviles?",
          answer: "Sí, COSMIC EYE está completamente optimizado para dispositivos móviles. Todas las funcionalidades están disponibles en smartphones y tablets con una experiencia adaptada."
        },
        {
          question: "¿Necesito instalar algún software?",
          answer: "No, COSMIC EYE funciona completamente en el navegador web. Solo necesitas una conexión a internet y un navegador moderno para acceder a todas las funcionalidades."
        }
      ]
    },
    {
      category: "Comunidad",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      questions: [
        {
          question: "¿Puedo contribuir con datos o reportes?",
          answer: "¡Absolutamente! COSMIC EYE tiene una comunidad activa de astrónomos aficionados y profesionales. Puedes reportar observaciones, sugerir mejoras, o contribuir con análisis."
        },
        {
          question: "¿Hay un foro o comunidad donde discutir?",
          answer: "Sí, tenemos un sistema de chat integrado y estamos desarrollando una comunidad más amplia donde los usuarios pueden compartir descubrimientos y discutir eventos astronómicos."
        },
        {
          question: "¿Organizan eventos o webinars?",
          answer: "Regularmente organizamos webinars con expertos de NASA y ESA, sesiones de observación en vivo, y eventos especiales durante fenómenos astronómicos importantes."
        }
      ]
    },
    {
      category: "Suscripciones",
      icon: <Star className="w-6 h-6 text-orange-400" />,
      questions: [
        {
          question: "¿Puedo cancelar mi suscripción en cualquier momento?",
          answer: "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario. Mantendrás acceso hasta el final del período facturado."
        },
        {
          question: "¿Hay un período de prueba gratuito?",
          answer: "Sí, ofrecemos un período de prueba gratuito de 7 días para el plan Pro, sin compromiso y sin necesidad de tarjeta de crédito."
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos todas las tarjetas de crédito principales, PayPal, y transferencias bancarias para suscripciones anuales."
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Preguntas Frecuentes</h1>
        </div>
        <p className="text-gray-300 max-w-3xl">
          Encuentra respuestas a las preguntas más comunes sobre COSMIC EYE. 
          Si no encuentras lo que buscas, no dudes en contactarnos.
        </p>
      </header>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-700/50 backdrop-blur-sm rounded-lg border border-blue-500/20 p-6 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-2">15+</div>
          <div className="text-sm text-gray-300">Fuentes de Datos</div>
        </div>
        <div className="bg-gradient-to-br from-green-900/50 to-green-700/50 backdrop-blur-sm rounded-lg border border-green-500/20 p-6 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">24/7</div>
          <div className="text-sm text-gray-300">Monitoreo</div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-700/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">10k+</div>
          <div className="text-sm text-gray-300">Usuarios Activos</div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/50 to-orange-700/50 backdrop-blur-sm rounded-lg border border-orange-500/20 p-6 text-center">
          <div className="text-2xl font-bold text-orange-400 mb-2">99.9%</div>
          <div className="text-sm text-gray-300">Tiempo Activo</div>
        </div>
      </div>

      {/* FAQ por categorías */}
      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              {category.icon}
              <h2 className="text-xl font-semibold text-white">{category.category}</h2>
            </div>
            
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => (
                <details key={faqIndex} className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                    <span className="text-white font-medium">{faq.question}</span>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 bg-gray-700/30 rounded-b-lg">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sección de contacto */}
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-lg border border-blue-500/20 p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">¿No encontraste tu respuesta?</h3>
        <p className="text-gray-300 mb-6">
          Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos en menos de 24 horas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Contactar Soporte
          </a>
          <a 
            href="/chat" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Chat en Vivo
          </a>
        </div>
      </div>
    </div>
  );
} 