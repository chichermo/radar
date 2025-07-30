"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Sun, 
  Moon, 
  Star, 
  Orbit, 
  Activity, 
  Gauge, 
  Calendar,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface AtlasTrackerProps {
  realTimeData: any;
  atlasData: any;
}

const AtlasTracker: React.FC<AtlasTrackerProps> = ({ realTimeData, atlasData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [viewMode, setViewMode] = useState<'solar' | 'trajectory'>('solar');

  // Configuración del sistema solar
  const solarSystem = {
    sun: { x: 400, y: 300, radius: 20, color: '#FFD700' },
    earth: { x: 400, y: 300, radius: 150, color: '#4A90E2', orbitRadius: 150 },
    mars: { x: 400, y: 300, radius: 250, color: '#E27B58', orbitRadius: 250 },
    jupiter: { x: 400, y: 300, radius: 400, color: '#D4A574', orbitRadius: 400 }
  };

  // Calcular posición actual de 3I/Atlas
  const calculateAtlasPosition = () => {
    const now = new Date();
    const perihelionTime = new Date('2024-11-15').getTime();
    const timeSincePerihelion = (now.getTime() - perihelionTime) / (24 * 60 * 60 * 1000);
    
    // Posición en coordenadas polares
    const distance = 0.85 + (timeSincePerihelion * 0.01); // AU
    const angle = (timeSincePerihelion * 0.5) % (2 * Math.PI); // Rotación gradual
    
    // Convertir a coordenadas cartesianas
    const x = 400 + Math.cos(angle) * distance * 100;
    const y = 300 + Math.sin(angle) * distance * 100;
    
    return { x, y, distance, angle };
  };

  // Dibujar sistema solar
  const drawSolarSystem = (ctx: CanvasRenderingContext2D) => {
    const { sun, earth, mars, jupiter } = solarSystem;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, 800, 600);
    
    // Dibujar órbitas
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, earth.orbitRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, mars.orbitRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, jupiter.orbitRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Dibujar Sol
    ctx.fillStyle = sun.color;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Efecto de brillo del Sol
    ctx.shadowColor = sun.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Dibujar planetas
    const time = Date.now() * 0.0001;
    
    // Tierra
    const earthX = sun.x + Math.cos(time * 0.5) * earth.orbitRadius;
    const earthY = sun.y + Math.sin(time * 0.5) * earth.orbitRadius;
    ctx.fillStyle = earth.color;
    ctx.beginPath();
    ctx.arc(earthX, earthY, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Marte
    const marsX = sun.x + Math.cos(time * 0.3) * mars.orbitRadius;
    const marsY = sun.y + Math.sin(time * 0.3) * mars.orbitRadius;
    ctx.fillStyle = mars.color;
    ctx.beginPath();
    ctx.arc(marsX, marsY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Júpiter
    const jupiterX = sun.x + Math.cos(time * 0.1) * jupiter.orbitRadius;
    const jupiterY = sun.y + Math.sin(time * 0.1) * jupiter.orbitRadius;
    ctx.fillStyle = jupiter.color;
    ctx.beginPath();
    ctx.arc(jupiterX, jupiterY, 12, 0, 2 * Math.PI);
    ctx.fill();
  };

  // Dibujar trayectoria de 3I/Atlas
  const drawAtlasTrajectory = (ctx: CanvasRenderingContext2D) => {
    const atlasPos = calculateAtlasPosition();
    
    // Dibujar trayectoria
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    
    // Trayectoria hiperbólica simplificada
    for (let i = 0; i < 100; i++) {
      const t = i / 100;
      const x = 400 + Math.cos(t * Math.PI) * (0.85 + t * 3) * 100;
      const y = 300 + Math.sin(t * Math.PI) * (0.85 + t * 3) * 100;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Dibujar 3I/Atlas
    ctx.fillStyle = '#FF6B6B';
    ctx.shadowColor = '#FF6B6B';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(atlasPos.x, atlasPos.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Etiqueta
    ctx.fillStyle = '#FF6B6B';
    ctx.font = '14px Arial';
    ctx.fillText('3I/Atlas', atlasPos.x + 15, atlasPos.y - 5);
    
    // Información de distancia
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Arial';
    ctx.fillText(`${atlasPos.distance.toFixed(2)} AU`, atlasPos.x + 15, atlasPos.y + 10);
  };

  // Función de animación
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (viewMode === 'solar') {
      drawSolarSystem(ctx);
      drawAtlasTrajectory(ctx);
    } else {
      // Modo trayectoria detallada
      drawDetailedTrajectory(ctx);
    }
    
    if (isPlaying) {
      requestAnimationFrame(animate);
    }
  };

  // Dibujar trayectoria detallada
  const drawDetailedTrajectory = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 800, 600);
    
    // Eje de coordenadas
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(800, 300);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.stroke();
    
    // Trayectoria detallada
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < 200; i++) {
      const t = i / 200;
      const x = 400 + (t - 0.5) * 600;
      const y = 300 - Math.sin(t * Math.PI * 4) * 100;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // Punto actual
    const atlasPos = calculateAtlasPosition();
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(atlasPos.x, atlasPos.y, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    if (isPlaying) {
      animate();
    }
  }, [isPlaying, viewMode, speed]);

  useEffect(() => {
    animate();
  }, []);

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-blue-400" />
            Tracking Interactivo de 3I/Atlas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </button>
              
              <button
                onClick={() => animate()}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
              
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'solar' | 'trajectory')}
                className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
              >
                <option value="solar">Sistema Solar</option>
                <option value="trajectory">Trayectoria Detallada</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Velocidad:</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-white">{speed}x</span>
            </div>
          </div>
          
          {/* Canvas */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-auto border border-gray-600 rounded-lg bg-black"
            />
            
            {/* Overlay de información */}
            <div className="absolute top-4 left-4 bg-black/70 p-3 rounded-lg text-white text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>3I/Atlas</span>
                </div>
                <div>Distancia: {realTimeData.currentDistance.toFixed(2)} AU</div>
                <div>Velocidad: {realTimeData.currentVelocity} km/s</div>
                <div>Estado: {realTimeData.status}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información en tiempo real */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Gauge className="w-5 h-5 text-green-400" />
              Estado Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Posición:</span>
                <span className="text-white">{atlasData.currentStatus.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Distancia del Sol:</span>
                <span className="text-white">{atlasData.currentStatus.distanceFromSun}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Distancia de la Tierra:</span>
                <span className="text-white">{atlasData.currentStatus.distanceFromEarth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Velocidad:</span>
                <span className="text-white">{atlasData.currentStatus.velocity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Visibilidad:</span>
                <Badge variant="outline" className="text-xs">
                  {atlasData.currentStatus.visibility}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-blue-400" />
              Cronología
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Descubrimiento:</span>
                <span className="text-white">15 Ene 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Perihelio:</span>
                <span className="text-white">15 Nov 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Salida del sistema:</span>
                <span className="text-white">01 Mar 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Espacio interestelar:</span>
                <span className="text-white">01 Jun 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Última observación:</span>
                <span className="text-white">{atlasData.currentStatus.lastObservation}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Orbit className="w-5 h-5 text-purple-400" />
              Descubrimientos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {atlasData.observations.discoveries.map((discovery: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-300">{discovery}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtlasTracker; 