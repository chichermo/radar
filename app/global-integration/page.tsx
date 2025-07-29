'use client';

import React from 'react';
import { Globe, Users, Satellite, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const collaborations = [
  { project: 'ISS', agencies: ['NASA', 'ESA', 'JAXA', 'Roscosmos', 'CSA'], description: 'Estación Espacial Internacional, laboratorio orbital conjunto.', link: 'https://www.nasa.gov/mission_pages/station/main/index.html' },
  { project: 'JWST', agencies: ['NASA', 'ESA', 'CSA'], description: 'Telescopio espacial James Webb, observatorio infrarrojo.', link: 'https://www.jwst.nasa.gov/' },
  { project: 'ExoMars', agencies: ['ESA', 'Roscosmos'], description: 'Misión a Marte para buscar vida pasada.', link: 'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars' },
  { project: 'Artemis', agencies: ['NASA', 'ESA', 'JAXA', 'CSA'], description: 'Programa para regresar a la Luna.', link: 'https://www.nasa.gov/specials/artemis/' },
  { project: 'BepiColombo', agencies: ['ESA', 'JAXA'], description: 'Misión conjunta a Mercurio.', link: 'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo_overview' }
];

export default function GlobalIntegrationPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Integración Global</h1>
        <p className="subtitle max-w-2xl mx-auto">Descubre los proyectos y misiones internacionales que unen agencias espaciales de todo el mundo.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {collaborations.map((c, i) => (
          <div key={i} className="glass-card p-6 flex flex-col items-center">
            <Globe className="w-8 h-8 text-blue-400 mb-2" />
            <h2 className="text-xl font-semibold text-white mb-1">{c.project}</h2>
            <div className="text-gray-300 text-sm mb-2">Agencias: {c.agencies.join(', ')}</div>
            <div className="text-gray-400 text-sm mb-2">{c.description}</div>
            <a href={c.link} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 mt-2 px-4 py-2 rounded text-white flex items-center justify-center gap-2 font-semibold transition-colors">
              <ExternalLink className="w-4 h-4 mr-1" /> Ver más
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
