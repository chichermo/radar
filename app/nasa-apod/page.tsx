"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Camera, Info } from 'lucide-react';
// import useSWR from "swr";

function getLastNDates(n: number) {
  const dates = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function NasaApodPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/nasa-apod')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Obtener miniaturas de los últimos 4 días
  const lastDates = getLastNDates(4);
  const [previousImages, setPreviousImages] = React.useState<any[]>([]);
  React.useEffect(() => {
    Promise.all(
      lastDates.map(date =>
        fetch(`/api/nasa-apod?date=${date}`).then(res => res.json())
      )
    ).then(setPreviousImages);
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-300">Cargando imagen del día...</div>;
  }
  if (error || data?.error) {
    return <div className="text-center text-red-400">No se pudo cargar la imagen de la NASA.</div>;
  }

  const apod = data;

  return (
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          NASA Astronomy Picture of the Day
        </h1>
        <p className="text-gray-300">
          Descubre una nueva imagen o fotografía del fascinante universo cada día.
          Cada imagen viene acompañada de una explicación escrita por un astrónomo profesional.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="relative aspect-video">
              {apod.media_type === 'image' ? (
                <img
                  src={apod.url}
                  alt={apod.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="w-full h-full min-h-[300px]"
                  allowFullScreen
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {apod.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{apod.date}</span>
                  </div>
                  {apod.copyright && (
                    <div className="flex items-center space-x-1">
                      <Camera className="h-4 w-4" />
                      <span>© {apod.copyright}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-primary mt-1" />
                <p className="text-gray-300 leading-relaxed">
                  {apod.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Imágenes Anteriores
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {previousImages.map((img, idx) => (
                  <a
                    key={img.date || idx}
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition"
                    title={img.title}
                  >
                    {img.media_type === 'image' ? (
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full text-xs text-gray-400">Video</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Información
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-medium text-white mb-2">Acerca de APOD</h3>
                <p className="text-sm text-gray-300">
                  Astronomy Picture of the Day (APOD) es un proyecto de la NASA y
                  la Universidad Tecnológica de Michigan. Cada día se presenta una
                  imagen o fotografía diferente de nuestro fascinante universo.
                </p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-medium text-white mb-2">Créditos</h3>
                <p className="text-sm text-gray-300">
                  Imágenes y datos: NASA, ESA, y otros colaboradores.
                  Explicaciones: Astrónomos profesionales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 