"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Radio, Brain } from 'lucide-react';

const signals = [
  { name: 'WOW! Signal Replica', frequency: '1420.405 MHz', confidence: 87.5, status: 'En análisis' },
  { name: 'Fast Radio Burst', frequency: '1.4 GHz', confidence: 94.2, status: 'Confirmado' }
];
const patterns = [
  { type: 'Variación de brillo', object: 'HD 209458', confidence: 94.2, severity: 'Alta' },
  { type: 'Movimiento orbital', object: 'Oumuamua', confidence: 92.1, severity: 'Alta' }
];

export default function SignalAnalysisPage() {
  const [tab, setTab] = useState('signals');
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Análisis de Señales y Patrones</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora la detección de señales espaciales y el análisis de anomalías y patrones en los datos astronómicos.</p>
      </div>
      <div className="glass-card p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="glass-card mb-6">
            <TabsTrigger value="signals"><Radio className="w-4 h-4 mr-1" />Señales</TabsTrigger>
            <TabsTrigger value="patterns"><Brain className="w-4 h-4 mr-1" />Patrones/Anomalías</TabsTrigger>
          </TabsList>
          <TabsContent value="signals">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">Detección de Señales</h2>
              <ul className="space-y-3">
                {signals.map((s, i) => (
                  <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{s.name}</span>
                    <span className="text-gray-300 text-sm">{s.frequency} • Confianza: {s.confidence}% • Estado: {s.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="patterns">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">Análisis de Patrones y Anomalías</h2>
              <ul className="space-y-3">
                {patterns.map((p, i) => (
                  <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{p.type} ({p.object})</span>
                    <span className="text-gray-300 text-sm">Confianza: {p.confidence}% • Severidad: {p.severity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 