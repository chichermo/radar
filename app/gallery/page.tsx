"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Eye, Satellite, ZoomIn, ExternalLink, Heart, Share2, Download, Filter, Search, Star, Globe, Rocket } from "lucide-react";
import dynamic from 'next/dynamic';

// Nuevo Client Component para la galería
const GalleryClient = dynamic(() => import('./GalleryClient'), { ssr: false });

// Componente que obtiene los datos en el cliente
export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener imágenes en el cliente para evitar timeouts en build
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/nasa-apod');
        if (res.ok) {
          const data = await res.json();
          setImages(Array.isArray(data) ? data : [data]);
        }
      } catch (e) {
        console.error('Error fetching images:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return <GalleryClient images={images} />;
}
