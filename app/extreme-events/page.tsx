"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Star, Zap, Award } from 'lucide-react';

const blackHoles = [
  { name: 'Sagittarius A*', type: 'Supermasivo', mass: '4.15M M☉', distance: '26,000 ly', status: 'Activo' },
  { name: 'M87*', type: 'Supermasivo', mass: '6.5B M☉', distance: '55M ly', status: 'Activo' }
];
const gravitationalWaves = [
  { id: 'GW190521', type: 'BBH', date: '2019-05-21', significance: 14.7, status: 'Confirmado' },
  { id: 'GW200105', type: 'NSBH', date: '2020-01-05', significance: 12.8, status: 'Confirmado' }
];
const supernovae = [
  { name: 'SN 1987A', type: 'II', date: '1987-02-23', distance: '168,000 ly', status: 'Remanente' },
  { name: 'SN 2011fe', type: 'Ia', date: '2011-08-24', distance: '21M ly', status: 'Remanente' }
];

export default function ExtremeEventsPage() {
  const [tab, setTab] = useState('blackholes');
  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Fenómenos Extremos</h1>
        <p className="subtitle max-w-2xl mx-auto">Explora los eventos más extremos del universo: agujeros negros, ondas gravitacionales y supernovas.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="glass-card mb-6">
          <TabsTrigger value="blackholes"><Star className="w-4 h-4 mr-1" />Agujeros Negros</TabsTrigger>
          <TabsTrigger value="waves"><Zap className="w-4 h-4 mr-1" />Ondas Gravitacionales</TabsTrigger>
          <TabsTrigger value="supernovae"><Award className="w-4 h-4 mr-1" />Supernovas</TabsTrigger>
        </TabsList>
        <TabsContent value="blackholes">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-blue-400 mb-4">Agujeros Negros</h2>
            <ul className="space-y-3">
              {blackHoles.map((b, i) => (
                <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{b.name}</span>
                  <span className="text-gray-300 text-sm">{b.type} • Masa: {b.mass} • Distancia: {b.distance} • Estado: {b.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="waves">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-blue-400 mb-4">Ondas Gravitacionales</h2>
            <ul className="space-y-3">
              {gravitationalWaves.map((g, i) => (
                <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{g.id}</span>
                  <span className="text-gray-300 text-sm">{g.type} • Fecha: {g.date} • Significancia: {g.significance} • Estado: {g.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="supernovae">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-blue-400 mb-4">Supernovas</h2>
            <ul className="space-y-3">
              {supernovae.map((s, i) => (
                <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{s.name}</span>
                  <span className="text-gray-300 text-sm">{s.type} • Fecha: {s.date} • Distancia: {s.distance} • Estado: {s.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 