"use client";

import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationCategories = {
    'Exploración': [
      { href: '/exoplanets', label: 'Exoplanetas' },
      { href: '/asteroids', label: 'Asteroides' },
      { href: '/satellites', label: 'Satélites' },
      { href: '/space-weather', label: 'Clima Espacial' },
      { href: '/space-debris', label: 'Basura Espacial' },
      { href: '/people-in-space', label: 'Personas en el Espacio' },
      { href: '/iss-location', label: 'Ubicación ISS' },
      { href: '/nasa-apod', label: 'Imagen del Día NASA' },
      { href: '/nasa-epic', label: 'EPIC NASA' },
      { href: '/nasa-asteroids', label: 'Asteroides NASA' },
      { href: '/asteroids-near-earth', label: 'Asteroides Cerca de la Tierra' },
      { href: '/space-track', label: 'Space Track' },
      { href: '/satnogs', label: 'SatNOGS' },
      { href: '/heavens', label: 'Heavens Above' },
      { href: '/manifest', label: 'Manifest' },
    ],
    'Herramientas': [
      { href: '/skymap', label: 'Mapa del Cielo' },
      { href: '/orbital', label: 'Visualización Orbital' },
      { href: '/signals', label: 'Señales Espaciales' },
      { href: '/satellite-map', label: 'Mapa de Satélites' },
      { href: '/space-tools', label: 'Herramientas Espaciales' },
      { href: '/professional-tools', label: 'Herramientas Profesionales' },
      { href: '/data-export', label: 'Exportación de Datos' },
      { href: '/pattern-analysis', label: 'Análisis de Patrones' },
      { href: '/auto-classification', label: 'Clasificación Automática' },
      { href: '/signal-detection', label: 'Detección de Señales' },
      { href: '/collision-alert', label: 'Alertas de Colisión' },
      { href: '/real-time-alerts', label: 'Alertas en Tiempo Real' },
      { href: '/earthquakes', label: 'Sismos en Tiempo Real' },
    ],
    'Ciencia': [
      { href: '/black-holes', label: 'Agujeros Negros' },
      { href: '/gravitational-waves', label: 'Ondas Gravitacionales' },
      { href: '/dark-matter', label: 'Materia Oscura' },
      { href: '/neutrinos', label: 'Neutrinos' },
      { href: '/supernovae', label: 'Supernovas' },
      { href: '/jwst', label: 'Telescopio James Webb' },
      { href: '/vera-rubin', label: 'Observatorio Vera Rubin' },
      { href: '/seti', label: 'SETI' },
      { href: '/interstellar-probes', label: 'Sondas Interestelares' },
      { href: '/mars-missions', label: 'Misiones a Marte' },
      { href: '/reusable-rockets', label: 'Cohetes Reutilizables' },
      { href: '/starlink', label: 'Starlink' },
      { href: '/tiangong', label: 'Tiangong' },
    ],
    'Tecnología': [
      { href: '/machine-learning', label: 'Machine Learning' },
      { href: '/ai-predictions', label: 'Predicciones IA' },
      { href: '/advanced-analytics', label: 'Analítica Avanzada' },
      { href: '/advanced-3d-visualizations', label: 'Visualizaciones 3D' },
      { href: '/advanced-notifications', label: 'Notificaciones Avanzadas' },
      { href: '/image-optimizer', label: 'Optimizador de Imágenes' },
      { href: '/lazy-components', label: 'Componentes Lazy' },
      { href: '/performance', label: 'Rendimiento' },
    ],
    'Virtual': [
      { href: '/virtual-reality', label: 'Realidad Virtual' },
      { href: '/virtual-exploration', label: 'Exploración Virtual' },
      { href: '/virtual-laboratory', label: 'Laboratorio Virtual' },
      { href: '/simulations', label: 'Simulaciones' },
      { href: '/gamification', label: 'Gamificación' },
      { href: '/voice-commands', label: 'Comandos de Voz' },
      { href: '/astronomical-chatbot', label: 'Chatbot Astronómico' },
    ],
    'Educación': [
      { href: '/education', label: 'Educación' },
      { href: '/education-hub', label: 'Centro Educativo' },
      { href: '/carl-sagan', label: 'Carl Sagan' },
      { href: '/faq', label: 'Preguntas Frecuentes' },
      { href: '/resources', label: 'Recursos' },
      { href: '/gallery', label: 'Galería' },
    ],
    'Datos': [
      { href: '/historical-data', label: 'Datos Históricos' },
      { href: '/space-analytics', label: 'Analítica Espacial' },
      { href: '/metrics', label: 'Métricas' },
      { href: '/timeline', label: 'Línea de Tiempo' },
      { href: '/projects', label: 'Proyectos' },
      { href: '/climate-predictions', label: 'Predicciones Climáticas' },
    ],
    'Sistema': [
      { href: '/settings', label: 'Configuración' },
      { href: '/notifications', label: 'Notificaciones' },
      { href: '/personalization', label: 'Personalización' },
      { href: '/mobile-app', label: 'Aplicación Móvil' },
      { href: '/global-integration', label: 'Integración Global' },
      { href: '/social-integration', label: 'Integración Social' },
    ],
    'Recursos': [
      { href: '/pricing', label: 'Precios' },
      { href: '/legal/terms', label: 'Términos de Servicio' },
      { href: '/legal/privacy', label: 'Política de Privacidad' },
      { href: '/legal/attributions', label: 'Atribuciones' },
      { href: '/tools', label: 'Herramientas' },
      { href: '/passes', label: 'Pases' },
    ],
  };

  const toggleDropdown = (category: string) => {
    console.log(`Toggle dropdown: ${category} Current: ${activeDropdown}`);
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>🌌</span>
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Cosmic Eye
            </span>
          </div>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {Object.entries(navigationCategories).map(([category, links]) => (
              <div key={category} style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleDropdown(category)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    color: '#d1d5db',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {category}
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === category && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '0.25rem',
                      backgroundColor: 'rgba(31, 41, 55, 0.95)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '0.5rem',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      zIndex: 1001,
                      minWidth: '200px',
                      display: 'block',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                    }}
                    onMouseLeave={closeDropdown}
                  >
                    <div style={{ padding: '0.5rem' }}>
                      {links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          style={{
                            display: 'block',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                            color: '#d1d5db',
                            textDecoration: 'none',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#d1d5db';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#d1d5db',
              cursor: 'pointer',
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(75, 85, 99, 0.5)',
            zIndex: 1001,
          }}>
            <div style={{ padding: '1rem' }}>
              {Object.entries(navigationCategories).map(([category, links]) => (
                <div key={category} style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() => toggleDropdown(category)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      color: '#d1d5db',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {category}
                    <ChevronDown size={20} />
                  </button>
                  {activeDropdown === category && (
                    <div style={{ paddingLeft: '1rem' }}>
                      {links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          style={{
                            display: 'block',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                            color: '#9ca3af',
                            textDecoration: 'none',
                          }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 