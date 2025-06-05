"use client";

import { useEffect, useState } from 'react';
import { JWSTImage, JWSTStatus } from '@/types/space';
import { fetchJWSTImages, fetchJWSTStatus, fetchJWSTDiscoveries } from '@/services/jwstData';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { Thermometer, MapPin, Fuel, Activity, Calendar, Tag } from 'lucide-react';

export default function JWSTPage() {
  const [images, setImages] = useState<JWSTImage[]>([]);
  const [status, setStatus] = useState<JWSTStatus | null>(null);
  const [discoveries, setDiscoveries] = useState<Array<{
    id: string;
    title: string;
    description: string;
    date: Date;
    category: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<JWSTImage | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [imagesData, statusData, discoveriesData] = await Promise.all([
          fetchJWSTImages(),
          fetchJWSTStatus(),
          fetchJWSTDiscoveries()
        ]);
        setImages(imagesData);
        setStatus(statusData);
        setDiscoveries(discoveriesData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del JWST');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000); // Actualizar cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorAlert message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Telescopio Espacial James Webb</h1>

      {/* Estado actual */}
      {status && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center space-x-3">
              <Thermometer className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Temperatura</h3>
                <p className="text-lg font-semibold">{status.temperature.primary}°C</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Posición</h3>
                <p className="text-lg font-semibold">
                  {Math.round(status.position.x / 1000)}k km
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center space-x-3">
              <Fuel className="h-6 w-6 text-yellow-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Combustible</h3>
                <p className="text-lg font-semibold">{status.fuel}%</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-purple-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                <p className="text-lg font-semibold capitalize">{status.status}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Últimas imágenes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Últimas Imágenes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div 
                className="relative h-48 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.type}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Descubrimientos recientes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Descubrimientos Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discoveries.map((discovery) => (
            <Card key={discovery.id}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{discovery.title}</h3>
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">{discovery.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{discovery.date.toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{discovery.category}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Modal para ver imagen en detalle */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-600 mb-4">{selectedImage.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{selectedImage.date.toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{selectedImage.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 