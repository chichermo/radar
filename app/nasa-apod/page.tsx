"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Camera, Info } from 'lucide-react';

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

export default function NasaApodPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener miniaturas de los últimos 4 días
  const lastDates = getLastNDates(4);
  const [previousImages, setPreviousImages] = React.useState<any[]>([]);
  const [loadingPrevious, setLoadingPrevious] = React.useState(true);
  
  React.useEffect(() => {
    setLoadingPrevious(true);
    // Usar Promise.allSettled para manejar errores individuales
    Promise.allSettled(
      lastDates.map(date =>
        fetch(`/api/nasa-apod?date=${date}`)
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            return data;
          })
      )
    ).then(results => {
      const images = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return { 
            error: `Error al cargar imagen para ${lastDates[index]}`,
            date: lastDates[index],
            title: `Error - ${lastDates[index]}`,
            url: "https://apod.nasa.gov/apod/image/2401/ngc1566_hst_960.jpg"
          };
        }
      });
      setPreviousImages(images);
      setLoadingPrevious(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/nasa-apod')
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setError(json.error);
          setData(null);
        } else {
          setData(json);
          setError(null);
        }
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Error al cargar la imagen</h1>
            <p className="text-red-300">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center text-white">
            <Camera className="mr-3 h-8 w-8" />
            Imagen del Día de la NASA
          </h1>
          <p className="text-gray-400 flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {data?.date && new Date(data.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
                {data.media_type === 'video' ? (
                  <iframe
                    src={data.url}
                    title={data.title}
                    className="w-full h-96"
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={data.url}
                    alt={data.title}
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = "https://apod.nasa.gov/apod/image/2401/ngc1566_hst_960.jpg";
                    }}
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-white">{data.title}</h2>
                  <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
                  {data.copyright && (
                    <p className="mt-4 text-sm text-gray-400">
                      Crédito: {data.copyright}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                  <Info className="mr-2 h-5 w-5" />
                  Información
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">Tipo:</span>
                    <span className="ml-2 capitalize text-white">{data.media_type}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Fecha:</span>
                    <span className="ml-2 text-white">{data.date}</span>
                  </div>
                  {data.hdurl && (
                    <a
                      href={data.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      Ver en HD
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Imágenes Anteriores</h3>
                {loadingPrevious ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {previousImages.map((image, index) => (
                      <div key={index} className="border border-white/10 rounded p-3 bg-white/5">
                        {image.error ? (
                          <div className="text-red-400 text-sm">
                            <p className="font-semibold">{image.title}</p>
                            <p className="text-xs">{image.error}</p>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-16 h-16 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = "https://apod.nasa.gov/apod/image/2401/ngc1566_hst_960.jpg";
                              }}
                            />
                            <div>
                              <p className="text-sm font-medium line-clamp-2 text-white">{image.title}</p>
                              <p className="text-xs text-gray-400">{image.date}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 