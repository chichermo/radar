"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Camera, Info, User, RefreshCw, ExternalLink } from 'lucide-react';

interface APODData {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  copyright?: string;
}

function getLastNDates(n: number) {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function NASAAPODPage() {
  const [apodData, setApodData] = useState<APODData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAPODData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/nasa-apod');
      const result = await response.json();
      
      if (result.success) {
        setApodData(result.data);
        setError(null);
      } else {
        setError('Error al cargar datos de NASA APOD');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPODData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando imágenes astronómicas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">NASA APOD</h1>
          <p className="text-lg text-gray-300">Imagen Astronómica del Día - NASA</p>
          <button
            onClick={fetchAPODData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {apodData.map((item, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="mb-4 flex items-center gap-2">
                <Camera className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              </div>
              
              {item.media_type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg mb-4 border border-white/10"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x300/1f2937/ffffff?text=Imagen+No+Disponible";
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-400">Video no disponible</p>
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.date).toLocaleDateString('es-ES')}</span>
                </div>
                
                {item.copyright && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{item.copyright}</span>
                  </div>
                )}
                
                <p className="text-gray-300 text-sm leading-relaxed">{item.explanation}</p>
                
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver imagen original
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 