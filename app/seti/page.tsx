"use client";

import React, { useState } from "react";

const mockSignals = [
  { id: 1, fecha: "2024-02-27", frecuencia: "1420 MHz", intensidad: "Fuerte", origen: "Arecibo", comentario: "Posible anomalía" },
  { id: 2, fecha: "2024-02-25", frecuencia: "408 MHz", intensidad: "Débil", origen: "Green Bank", comentario: "Ruido de fondo" },
  { id: 3, fecha: "2024-02-20", frecuencia: "1665 MHz", intensidad: "Moderada", origen: "FAST", comentario: "Señal periódica" },
];

export default function SetiPage() {
  const [signals] = useState(mockSignals);
  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold mb-4">SETI: Búsqueda de Inteligencia Extraterrestre</h1>
      <p className="mb-6 text-gray-600 max-w-2xl">
        Visualiza señales, eventos y hallazgos relacionados con la búsqueda de inteligencia extraterrestre. Aquí se mostrarán datos de radio, anomalías y resultados de proyectos SETI.
      </p>
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-400 mb-6">
        Próximamente: integración de datos SETI.
      </div>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Señales Recientes (Mock)</h2>
        <table className="min-w-full text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Frecuencia</th>
              <th className="px-4 py-2">Intensidad</th>
              <th className="px-4 py-2">Origen</th>
              <th className="px-4 py-2">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {signals.map(signal => (
              <tr key={signal.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{signal.fecha}</td>
                <td className="px-4 py-2">{signal.frecuencia}</td>
                <td className="px-4 py-2">{signal.intensidad}</td>
                <td className="px-4 py-2">{signal.origen}</td>
                <td className="px-4 py-2">{signal.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 