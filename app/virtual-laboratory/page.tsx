'use client';

import React from 'react';
import VirtualLaboratory from '@/components/VirtualLaboratory';

export default function VirtualLaboratoryPage() {
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text text-4xl font-bold mb-2">Laboratorio Virtual</h1>
        <p className="subtitle max-w-2xl mx-auto text-lg text-gray-300">
          Explora experimentos astronómicos interactivos, simulaciones físicas y herramientas avanzadas para aprender y descubrir el universo de forma práctica y visual.
        </p>
      </div>
      <VirtualLaboratory />
    </div>
  );
} 