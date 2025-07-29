"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Eye, Satellite, ZoomIn, ExternalLink, Heart, Share2, Download, Filter, Search, Star, Globe, Rocket } from "lucide-react";
import dynamic from 'next/dynamic';

// Nuevo Client Component para la galería
const GalleryClient = dynamic(() => import('./GalleryClient'), { ssr: false });

// Componente server que obtiene los datos reales de la API
export default async function GalleryPage() {
  // Aquí deberías obtener los datos reales de la API (ejemplo: Vera Rubin, NASA, etc.)
  // Por ejemplo, usando fetch:
  let images: any[] = [];
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GALLERY_API || 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10', { cache: 'no-store' });
    images = await res.json();
    // Si la API devuelve un objeto con .data, usa images = images.data;
  } catch (e) {
    images = [];
  }
  return <GalleryClient images={images} />;
}
