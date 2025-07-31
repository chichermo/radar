"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card2';
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
  Minimize2,
  Clock,
  Target,
  AlertTriangle
} from 'lucide-react';

interface AtlasTrackerProps {
  realTimeData: any;
  atlasData: any;
}

const AtlasTracker: React.FC<AtlasTrackerProps> = ({ realTimeData, atlasData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [viewMode, setViewMode] = useState<'solar' | 'trajectory' | 'detailed'>('solar');
  const [trajectoryPoints, setTrajectoryPoints] = useState<Array<{x: number, y: number, distance: number, velocity: number, date: string}>>([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [timeToEarthApproach, setTimeToEarthApproach] = useState('');
  const [dynamicStatus, setDynamicStatus] = useState('');

  // Fechas importantes del tracking - CORREGIDAS para 3I/Atlas
  const trackingDates = {
    discovery: new Date('2025-07-15'), // Detección en julio 2025
    perihelion: new Date('2025-11-15'), // Perihelio en noviembre 2025
    earthApproach: new Date('2025-12-01'), // Aproximación a la Tierra en diciembre 2025
    exit: new Date('2026-03-01'), // Salida del sistema solar en marzo 2026
    interstellar: new Date('2026-06-01') // Espacio interestelar en junio 2026
  };

  // Calcular progreso del tracking
  const calculateProgress = () => {
    const now = new Date();
    const totalDuration = trackingDates.interstellar.getTime() - trackingDates.discovery.getTime();
    const elapsed = now.getTime() - trackingDates.discovery.getTime();
    const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
    return progress;
  };

  // Calcular tiempo restante hasta aproximación a la Tierra
  const calculateTimeToEarthApproach = () => {
    const now = new Date();
    const timeDiff = trackingDates.earthApproach.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
      return 'Aproximación completada';
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Generar mensaje de estado dinámico
  const generateDynamicStatus = () => {
    const now = new Date();
    const progress = calculateProgress();
    
    if (progress < 20) {
      return 'Fase de descubrimiento y observación inicial';
    } else if (progress < 40) {
      return 'Aproximación al sistema solar interior';
    } else if (progress < 60) {
      return 'Perihelio - Máxima aproximación al Sol';
    } else if (progress < 80) {
      return 'Aproximación máxima a la Tierra';
    } else if (progress < 100) {
      return 'Salida del sistema solar';
    } else {
      return 'Objeto en espacio interestelar';
    }
  };

  // Actualizar datos dinámicos
  useEffect(() => {
    const updateDynamicData = () => {
      setCurrentDateTime(new Date());
      setProgressPercentage(calculateProgress());
      setTimeToEarthApproach(calculateTimeToEarthApproach());
      setDynamicStatus(generateDynamicStatus());
    };

    updateDynamicData();
    const interval = setInterval(updateDynamicData, 1000);

    return () => clearInterval(interval);
  }, []);

  // Configuración del sistema solar mejorada
  const solarSystem = {
    sun: { x: 400, y: 300, radius: 25, color: '#FFD700' },
    earth: { x: 400, y: 300, radius: 150, color: '#4A90E2', orbitRadius: 150, name: 'Tierra' },
    mars: { x: 400, y: 300, radius: 250, color: '#E27B58', orbitRadius: 250, name: 'Marte' },
    jupiter: { x: 400, y: 300, radius: 400, color: '#D4A574', orbitRadius: 400, name: 'Júpiter' },
    saturn: { x: 400, y: 300, radius: 550, color: '#F4D03F', orbitRadius: 550, name: 'Saturno' }
  };

  // Cálculo mejorado de trayectoria hiperbólica
  const calculateHyperbolicTrajectory = () => {
    const points = [];
    const discoveryDate = new Date('2025-07-15');
    const perihelionDate = new Date('2025-11-15');
    const earthApproachDate = new Date('2025-12-01');
    const exitDate = new Date('2026-03-01');
    const interstellarDate = new Date('2026-06-01');
    
    // Parámetros orbitales reales de 3I/Atlas (no Oumuamua)
    const perihelion = 0.85; // AU
    const eccentricity = 1.1; // Hiperbólica
    const inclination = 45.2 * Math.PI / 180; // radianes
    
    // Generar puntos de trayectoria hiperbólica realista
    for (let i = 0; i <= 300; i++) {
      const t = i / 300;
      const timeProgress = discoveryDate.getTime() + t * (interstellarDate.getTime() - discoveryDate.getTime());
      const currentDate = new Date(timeProgress);
      
      // Parámetro de la hipérbola (ángulo verdadero)
      const trueAnomaly = (t - 0.5) * Math.PI * 2; // De -π a π
      
      // Ecuación de la hipérbola: r = a(e²-1)/(1 + e*cos(θ))
      const a = perihelion / (eccentricity - 1); // Semi-eje mayor
      const distance = a * (eccentricity * eccentricity - 1) / (1 + eccentricity * Math.cos(trueAnomaly));
      
      // Convertir a coordenadas cartesianas
      const x = distance * Math.cos(trueAnomaly);
      const y = distance * Math.sin(trueAnomaly);
      
      // Aplicar inclinación orbital
      const xRotated = x * Math.cos(inclination) - y * Math.sin(inclination);
      const yRotated = x * Math.sin(inclination) + y * Math.cos(inclination);
      
      // Escalar para visualización
      const scale = 80; // 1 AU = 80 píxeles
      const canvasX = 400 + xRotated * scale;
      const canvasY = 300 + yRotated * scale;
      
      // Calcular velocidad (más alta cerca del perihelio)
      const velocity = 32.5 + (perihelion / distance) * 15;
      
      points.push({
        x: canvasX,
        y: canvasY,
        distance,
        velocity,
        date: currentDate.toISOString().split('T')[0],
        trueAnomaly
      });
    }
    
    return points;
  };

  // Calcular posición actual de 3I/Atlas con mayor precisión
  const calculateAtlasPosition = () => {
    const now = new Date();
    const discoveryTime = new Date('2025-07-15').getTime();
    const perihelionTime = new Date('2025-11-15').getTime();
    const earthApproachTime = new Date('2025-12-01').getTime();
    const exitTime = new Date('2026-03-01').getTime();
    const interstellarTime = new Date('2026-06-01').getTime();
    
    // Calcular progreso del tiempo
    const totalDuration = interstellarTime - discoveryTime;
    const elapsed = now.getTime() - discoveryTime;
    const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
    
    // Parámetros orbitales de 3I/Atlas
    const perihelion = 0.85; // AU
    const eccentricity = 1.1;
    const inclination = 45.2 * Math.PI / 180;
    
    // Ángulo verdadero basado en el progreso temporal
    const trueAnomaly = (progress - 0.5) * Math.PI * 2; // De -π a π
    
    // Ecuación de la hipérbola
    const a = perihelion / (eccentricity - 1);
    const distance = a * (eccentricity * eccentricity - 1) / (1 + eccentricity * Math.cos(trueAnomaly));
    
    // Convertir a coordenadas cartesianas
    const x = distance * Math.cos(trueAnomaly);
    const y = distance * Math.sin(trueAnomaly);
    
    // Aplicar inclinación
    const xRotated = x * Math.cos(inclination) - y * Math.sin(inclination);
    const yRotated = x * Math.sin(inclination) + y * Math.cos(inclination);
    
    // Escalar para visualización
    const scale = 80;
    const canvasX = 400 + xRotated * scale;
    const canvasY = 300 + yRotated * scale;
    
    // Calcular velocidad
    const velocity = 32.5 + (perihelion / distance) * 15;
    
    return { 
      x: canvasX, 
      y: canvasY, 
      distance, 
      angle: trueAnomaly, 
      velocity,
      progress 
    };
  };

  // Dibujar sistema solar mejorado
  const drawSolarSystem = (ctx: CanvasRenderingContext2D) => {
    const { sun, earth, mars, jupiter, saturn } = solarSystem;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, 800, 600);
    
    // Fondo estrellado
    drawStarfield(ctx);
    
    // Dibujar órbitas con gradientes
    drawOrbits(ctx);
    
    // Dibujar Sol con efectos mejorados
    drawSun(ctx, sun);
    
    // Dibujar planetas animados
    drawPlanets(ctx);
  };

  // Dibujar campo de estrellas
  const drawStarfield = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, 800, 600);
    
    // Estrellas de fondo
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      const brightness = Math.random() * 0.5 + 0.1;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // Dibujar órbitas con efectos
  const drawOrbits = (ctx: CanvasRenderingContext2D) => {
    const { sun } = solarSystem;
    
    // Órbita de la Tierra
    ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 150, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Órbita de Marte
    ctx.strokeStyle = 'rgba(226, 123, 88, 0.3)';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 250, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Órbita de Júpiter
    ctx.strokeStyle = 'rgba(212, 165, 116, 0.3)';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 400, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Órbita de Saturno
    ctx.strokeStyle = 'rgba(244, 208, 63, 0.3)';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 550, 0, 2 * Math.PI);
    ctx.stroke();
  };

  // Dibujar Sol con efectos mejorados
  const drawSun = (ctx: CanvasRenderingContext2D, sun: any) => {
    // Corona solar
    const gradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.radius * 3);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius * 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Sol principal
    ctx.fillStyle = sun.color;
    ctx.shadowColor = sun.color;
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Efecto de brillo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(sun.x - 8, sun.y - 8, 4, 0, 2 * Math.PI);
    ctx.fill();
  };

  // Dibujar planetas con animación
  const drawPlanets = (ctx: CanvasRenderingContext2D) => {
    const { sun } = solarSystem;
    const time = Date.now() * 0.0001;
    
    // Tierra
    const earthX = sun.x + Math.cos(time * 0.5) * 150;
    const earthY = sun.y + Math.sin(time * 0.5) * 150;
    drawPlanet(ctx, earthX, earthY, 8, '#4A90E2', 'Tierra');
    
    // Marte
    const marsX = sun.x + Math.cos(time * 0.3) * 250;
    const marsY = sun.y + Math.sin(time * 0.3) * 250;
    drawPlanet(ctx, marsX, marsY, 6, '#E27B58', 'Marte');
    
    // Júpiter
    const jupiterX = sun.x + Math.cos(time * 0.1) * 400;
    const jupiterY = sun.y + Math.sin(time * 0.1) * 400;
    drawPlanet(ctx, jupiterX, jupiterY, 12, '#D4A574', 'Júpiter');
    
    // Saturno
    const saturnX = sun.x + Math.cos(time * 0.05) * 550;
    const saturnY = sun.y + Math.sin(time * 0.05) * 550;
    drawPlanet(ctx, saturnX, saturnY, 10, '#F4D03F', 'Saturno');
  };

  // Dibujar planeta individual
  const drawPlanet = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, name: string) => {
    // Sombra del planeta
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(x + 2, y + 2, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Planeta
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Etiqueta
    ctx.fillStyle = '#FFF';
    ctx.font = '10px Arial';
    ctx.fillText(name, x + radius + 5, y + 3);
  };

  // Dibujar trayectoria de 3I/Atlas mejorada
  const drawAtlasTrajectory = (ctx: CanvasRenderingContext2D) => {
    const atlasPos = calculateAtlasPosition();
    
    // Trayectoria completa con puntos históricos
    const trajectoryPoints = calculateHyperbolicTrajectory();
    
    // Dibujar trayectoria hiperbólica realista
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    
    // Solo dibujar la parte visible de la trayectoria
    let started = false;
    trajectoryPoints.forEach((point, index) => {
      // Verificar si el punto está dentro del canvas
      if (point.x >= -100 && point.x <= 900 && point.y >= -100 && point.y <= 700) {
        if (!started) {
          ctx.moveTo(point.x, point.y);
          started = true;
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
    });
    
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Dibujar flechas de dirección en la trayectoria
    drawTrajectoryArrows(ctx, trajectoryPoints);
    
    // Puntos importantes en la trayectoria
    drawTrajectoryMilestones(ctx, trajectoryPoints);
    
    // Dibujar 3I/Atlas actual
    drawAtlasObject(ctx, atlasPos);
    
    // Vector de velocidad
    drawVelocityVector(ctx, atlasPos);
    
    // Textos dinámicos sobre el canvas
    drawDynamicTexts(ctx);
  };

  // Dibujar flechas de dirección en la trayectoria
  const drawTrajectoryArrows = (ctx: CanvasRenderingContext2D, points: any[]) => {
    // Dibujar flechas cada 50 puntos para mostrar dirección
    for (let i = 25; i < points.length - 25; i += 50) {
      const point = points[i];
      const nextPoint = points[i + 5];
      
      if (point && nextPoint && 
          point.x >= -100 && point.x <= 900 && point.y >= -100 && point.y <= 700) {
        
        // Calcular dirección
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const angle = Math.atan2(dy, dx);
        
        // Dibujar flecha
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(
          point.x + Math.cos(angle) * 15,
          point.y + Math.sin(angle) * 15
        );
        ctx.stroke();
        
        // Punta de flecha
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(
          point.x + Math.cos(angle) * 15,
          point.y + Math.sin(angle) * 15
        );
        ctx.lineTo(
          point.x + Math.cos(angle - 0.3) * 8,
          point.y + Math.sin(angle - 0.3) * 8
        );
        ctx.lineTo(
          point.x + Math.cos(angle + 0.3) * 8,
          point.y + Math.sin(angle + 0.3) * 8
        );
        ctx.closePath();
        ctx.fill();
      }
    }
  };

  // Dibujar hitos de la trayectoria
  const drawTrajectoryMilestones = (ctx: CanvasRenderingContext2D, points: any[]) => {
    const milestones = [
      { name: 'Descubrimiento', date: '2025-07-15', color: '#4CAF50' },
      { name: 'Perihelio', date: '2025-11-15', color: '#FF9800' },
      { name: 'Aproximación Tierra', date: '2025-12-01', color: '#2196F3' },
      { name: 'Salida', date: '2026-03-01', color: '#F44336' }
    ];
    
    milestones.forEach(milestone => {
      const point = points.find(p => p.date === milestone.date);
      if (point) {
        ctx.fillStyle = milestone.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#FFF';
        ctx.font = '10px Arial';
        ctx.fillText(milestone.name, point.x + 10, point.y - 5);
      }
    });
  };

  // Dibujar textos dinámicos sobre el canvas
  const drawDynamicTexts = (ctx: CanvasRenderingContext2D) => {
    // Fecha y hora actual
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Fecha: ${currentDateTime.toLocaleDateString('es-ES')}`, 20, 30);
    ctx.fillText(`Hora: ${currentDateTime.toLocaleTimeString('es-ES')}`, 20, 50);
    
    // Progreso del tracking
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Progreso: ${progressPercentage.toFixed(1)}%`, 20, 80);
    
    // Estado dinámico
    ctx.fillStyle = '#00FF88';
    ctx.font = '12px Arial';
    ctx.fillText(`Estado: ${dynamicStatus}`, 20, 100);
    
    // Tiempo hasta aproximación a la Tierra
    ctx.fillStyle = '#FF6B6B';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Aproximación Tierra: ${timeToEarthApproach}`, 20, 130);
    
    // Barra de progreso visual
    const barWidth = 200;
    const barHeight = 8;
    const barX = 20;
    const barY = 150;
    
    // Fondo de la barra
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Progreso
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(barX, barY, (progressPercentage / 100) * barWidth, barHeight);
    
    // Etiquetas de la barra
    ctx.fillStyle = '#FFF';
    ctx.font = '10px Arial';
    ctx.fillText('Descubrimiento', barX, barY - 5);
    ctx.fillText('Interestelar', barX + barWidth - 50, barY - 5);
  };

  // Dibujar objeto 3I/Atlas
  const drawAtlasObject = (ctx: CanvasRenderingContext2D, atlasPos: any) => {
    // Efecto de resplandor
    ctx.shadowColor = '#FF6B6B';
    ctx.shadowBlur = 20;
    
    // Cuerpo principal
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(atlasPos.x, atlasPos.y, 12, 0, 2 * Math.PI);
    ctx.fill();
    
    // Detalles del objeto
    ctx.fillStyle = '#FF8E53';
    ctx.beginPath();
    ctx.arc(atlasPos.x - 3, atlasPos.y - 3, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    // Etiqueta
    ctx.fillStyle = '#FF6B6B';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('3I/Atlas', atlasPos.x + 15, atlasPos.y - 5);
    
    // Información de distancia
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Arial';
    ctx.fillText(`${atlasPos.distance.toFixed(2)} AU`, atlasPos.x + 15, atlasPos.y + 10);
    ctx.fillText(`${atlasPos.velocity.toFixed(1)} km/s`, atlasPos.x + 15, atlasPos.y + 25);
  };

  // Dibujar vector de velocidad
  const drawVelocityVector = (ctx: CanvasRenderingContext2D, atlasPos: any) => {
    const vectorLength = 30;
    const angle = atlasPos.angle + Math.PI / 2; // Perpendicular a la trayectoria
    
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(atlasPos.x, atlasPos.y);
    ctx.lineTo(
      atlasPos.x + Math.cos(angle) * vectorLength,
      atlasPos.y + Math.sin(angle) * vectorLength
    );
    ctx.stroke();
    
    // Punta de flecha
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(
      atlasPos.x + Math.cos(angle) * vectorLength,
      atlasPos.y + Math.sin(angle) * vectorLength
    );
    ctx.lineTo(
      atlasPos.x + Math.cos(angle - 0.3) * (vectorLength - 8),
      atlasPos.y + Math.sin(angle - 0.3) * (vectorLength - 8)
    );
    ctx.lineTo(
      atlasPos.x + Math.cos(angle + 0.3) * (vectorLength - 8),
      atlasPos.y + Math.sin(angle + 0.3) * (vectorLength - 8)
    );
    ctx.closePath();
    ctx.fill();
  };

  // Dibujar trayectoria detallada mejorada
  const drawDetailedTrajectory = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 800, 600);
    
    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#0B1426');
    gradient.addColorStop(1, '#1A2332');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Eje de coordenadas con etiquetas
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(800, 300);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.stroke();
    
    // Etiquetas de ejes
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('Distancia (AU)', 700, 320);
    ctx.save();
    ctx.translate(20, 300);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Tiempo', 0, 0);
    ctx.restore();
    
    // Trayectoria detallada de 3I/Atlas
    const trajectoryPoints = calculateHyperbolicTrajectory();
    
    // Curva principal de distancia vs tiempo
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    trajectoryPoints.forEach((point, index) => {
      // Mapear tiempo (0-1) a posición X (0-800)
      const timeProgress = index / trajectoryPoints.length;
      const x = timeProgress * 800;
      
      // Mapear distancia a posición Y (invertido para mejor visualización)
      const y = 300 - (point.distance - 0.85) * 150; // Escalar distancia
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Punto actual de 3I/Atlas
    const atlasPos = calculateAtlasPosition();
    const currentTimeProgress = atlasPos.progress;
    const currentX = currentTimeProgress * 800;
    const currentY = 300 - (atlasPos.distance - 0.85) * 150;
    
    ctx.fillStyle = '#FF6B6B';
    ctx.shadowColor = '#FF6B6B';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Marcadores de tiempo importantes
    drawDetailedTimeMarkers(ctx);
    
    // Textos dinámicos en vista detallada
    drawDetailedDynamicTexts(ctx);
  };

  // Dibujar marcadores de tiempo detallados
  const drawDetailedTimeMarkers = (ctx: CanvasRenderingContext2D) => {
    const markers = [
      { date: '2025-07-15', label: 'Descubrimiento', x: 0.05, color: '#4CAF50' },
      { date: '2025-11-15', label: 'Perihelio', x: 0.6, color: '#FF9800' },
      { date: '2025-12-01', label: 'Aproximación Tierra', x: 0.7, color: '#2196F3' },
      { date: '2026-03-01', label: 'Salida Sistema', x: 0.85, color: '#F44336' },
      { date: '2026-06-01', label: 'Interestelar', x: 1.0, color: '#9C27B0' }
    ];
    
    markers.forEach(marker => {
      const x = marker.x * 800;
      
      // Línea vertical
      ctx.strokeStyle = marker.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 600);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Etiqueta
      ctx.fillStyle = marker.color;
      ctx.font = 'bold 12px Arial';
      ctx.fillText(marker.label, x + 5, 20);
      
      // Punto en la línea
      const trajectoryPoints = calculateHyperbolicTrajectory();
      const pointIndex = Math.floor(marker.x * trajectoryPoints.length);
      if (pointIndex < trajectoryPoints.length) {
        const point = trajectoryPoints[pointIndex];
        const y = 300 - (point.distance - 0.85) * 150;
        
        ctx.fillStyle = marker.color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  // Dibujar textos dinámicos en vista detallada
  const drawDetailedDynamicTexts = (ctx: CanvasRenderingContext2D) => {
    // Información de tiempo real
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Tiempo Real: ${currentDateTime.toLocaleString('es-ES')}`, 20, 30);
    
    // Progreso detallado
    ctx.fillStyle = '#FFD700';
    ctx.font = '14px Arial';
    ctx.fillText(`Progreso del Tracking: ${progressPercentage.toFixed(1)}%`, 20, 60);
    
    // Estado actual
    ctx.fillStyle = '#00FF88';
    ctx.font = '12px Arial';
    ctx.fillText(`Estado: ${dynamicStatus}`, 20, 85);
    
    // Información actual de 3I/Atlas
    const atlasPos = calculateAtlasPosition();
    ctx.fillStyle = '#FF6B6B';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Distancia Actual: ${atlasPos.distance.toFixed(2)} AU`, 20, 110);
    ctx.fillText(`Velocidad Actual: ${atlasPos.velocity.toFixed(1)} km/s`, 20, 130);
    
    // Fechas importantes de 3I/Atlas
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Arial';
    ctx.fillText('Descubrimiento: 15 Jul 2025', 20, 160);
    ctx.fillText('Perihelio: 15 Nov 2025', 20, 180);
    ctx.fillText('Aproximación Tierra: 01 Dic 2025', 20, 200);
    ctx.fillText('Salida Sistema: 01 Mar 2026', 20, 220);
    ctx.fillText('Espacio Interestelar: 01 Jun 2026', 20, 240);
    
    // Información adicional
    ctx.fillStyle = '#FFD700';
    ctx.font = '12px Arial';
    ctx.fillText('Objeto: 3I/Atlas (3I/2024 A1)', 20, 270);
    ctx.fillText('Tipo: Cometa Interestelar', 20, 290);
    ctx.fillText('Trayectoria: Hiperbólica', 20, 310);
  };

  // Función de animación mejorada
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (viewMode === 'solar') {
      drawSolarSystem(ctx);
      drawAtlasTrajectory(ctx);
    } else if (viewMode === 'trajectory') {
      drawDetailedTrajectory(ctx);
    } else {
      // Modo detallado con múltiples vistas - mostrar solo trayectoria detallada
      drawDetailedTrajectory(ctx);
    }
    
    if (isPlaying) {
      requestAnimationFrame(animate);
    }
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
      {/* Controles mejorados */}
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
                onChange={(e) => setViewMode(e.target.value as 'solar' | 'trajectory' | 'detailed')}
                className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
              >
                <option value="solar">Sistema Solar</option>
                <option value="trajectory">Trayectoria Detallada</option>
                <option value="detailed">Vista Completa</option>
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
          
          {/* Canvas mejorado */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-auto border border-gray-600 rounded-lg bg-black"
            />
            
            {/* Overlay de información mejorado */}
            <div className="absolute top-4 left-4 bg-black/80 p-4 rounded-lg text-white text-sm backdrop-blur-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold">3I/Atlas</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Distancia: {realTimeData.currentDistance.toFixed(2)} AU</div>
                  <div>Velocidad: {realTimeData.currentVelocity} km/s</div>
                  <div>Estado: {realTimeData.status}</div>
                  <div>Tiempo: {realTimeData.timeSinceDiscovery.toFixed(0)} días</div>
                </div>
              </div>
            </div>
            
            {/* Leyenda */}
            <div className="absolute bottom-4 right-4 bg-black/80 p-3 rounded-lg text-white text-xs backdrop-blur-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>3I/Atlas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Tierra</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Marte</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información en tiempo real mejorada */}
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
              <Clock className="w-5 h-5 text-blue-400" />
              Cronología Dinámica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-400">Fecha Actual</div>
                  <div className="text-white font-semibold">{currentDateTime.toLocaleDateString('es-ES')}</div>
                  <div className="text-xs text-gray-500">{currentDateTime.toLocaleTimeString('es-ES')}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-400">Aproximación Tierra</div>
                  <div className="text-white font-semibold">{timeToEarthApproach}</div>
                  <div className="text-xs text-gray-500">01 Dic 2025</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-400">Progreso</div>
                  <div className="text-white font-semibold">{progressPercentage.toFixed(1)}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-purple-400" />
              Estado Dinámico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-400">Estado Actual:</div>
              <div className="text-white font-semibold text-sm">{dynamicStatus}</div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Descubrimiento:</span>
                  <span className="text-white">15 Jul 2025</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Perihelio:</span>
                  <span className="text-white">15 Nov 2025</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Aproximación Tierra:</span>
                  <span className="text-white">01 Dic 2025</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Salida Sistema:</span>
                  <span className="text-white">01 Mar 2026</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Espacio Interestelar:</span>
                  <span className="text-white">01 Jun 2026</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtlasTracker; 