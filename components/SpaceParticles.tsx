'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'star' | 'dust' | 'meteor';
}

interface SpaceParticlesProps {
  width: number;
  height: number;
  particleCount?: number;
  isActive?: boolean;
}

export default function SpaceParticles({ 
  width, 
  height, 
  particleCount = 100, 
  isActive = true 
}: SpaceParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = width;
    canvas.height = height;

    // Inicializar partículas
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const type = Math.random() < 0.7 ? 'star' : Math.random() < 0.8 ? 'dust' : 'meteor';
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: type === 'meteor' ? (Math.random() - 0.5) * 2 : 0,
        vy: type === 'meteor' ? Math.random() * 2 + 1 : 0,
        size: type === 'star' ? Math.random() * 2 + 1 : type === 'dust' ? Math.random() * 1 + 0.5 : Math.random() * 3 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        type
      });
    }
    
    particlesRef.current = particles;

    // Función de animación
    const animate = () => {
      if (!ctx || !isActive) return;

      // Limpiar canvas con fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Actualizar y dibujar partículas
      particles.forEach((particle) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around para estrellas y polvo
        if (particle.type !== 'meteor') {
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
        }

        // Remover meteoros que salen de la pantalla
        if (particle.type === 'meteor' && (particle.y > height || particle.x < 0 || particle.x > width)) {
          particle.x = Math.random() * width;
          particle.y = -10;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = Math.random() * 2 + 1;
        }

        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        switch (particle.type) {
          case 'star':
            // Estrellas brillantes
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = particle.size * 2;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Efecto de parpadeo
            if (Math.random() < 0.01) {
              particle.opacity = Math.random() * 0.8 + 0.2;
            }
            break;

          case 'dust':
            // Polvo espacial
            ctx.fillStyle = '#87CEEB';
            ctx.shadowColor = '#87CEEB';
            ctx.shadowBlur = particle.size;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'meteor':
            // Meteoros con estela
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              particle.x - particle.vx * 10, particle.y - particle.vy * 10
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 100, 50, 0.2)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x - particle.vx * 10, particle.y - particle.vy * 10);
            ctx.lineWidth = particle.size;
            ctx.stroke();
            
            // Cuerpo del meteoro
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ff6600';
            ctx.shadowBlur = particle.size * 3;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, particleCount, isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width, height }}
    />
  );
} 