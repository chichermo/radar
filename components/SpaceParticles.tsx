'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SpaceParticlesProps {
  particleCount?: number;
  speed?: number;
  size?: number;
  color?: string;
}

export default function SpaceParticles({
  particleCount = 1000,
  speed = 0.001,
  size = 2,
  color = '#ffffff',
}: SpaceParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Configuración del renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Crear geometría de partículas
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorObj = new THREE.Color(color);

    for (let i = 0; i < particleCount; i++) {
      // Posiciones aleatorias en el espacio
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      // Colores con variación
      const colorVariation = Math.random() * 0.3 + 0.7;
      colors[i * 3] = colorObj.r * colorVariation;
      colors[i * 3 + 1] = colorObj.g * colorVariation;
      colors[i * 3 + 2] = colorObj.b * colorVariation;

      // Tamaños variables
      sizes[i] = Math.random() * size + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Material de partículas
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        size: { value: size },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Animación de movimiento
          mvPosition.xyz += sin(time + position.x * 0.1) * 0.5;
          mvPosition.xyz += cos(time + position.y * 0.1) * 0.5;
          
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Crear sistema de partículas
    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    // Función de animación
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (particlesRef.current && material) {
        material.uniforms.time.value += speed;
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Manejar redimensionamiento
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [particleCount, speed, size, color]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// Componente adicional para efectos de estrellas
export function StarField({ count = 500 }: { count?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = mountRef.current.clientWidth;
    canvas.height = mountRef.current.clientHeight;
    mountRef.current.appendChild(canvas);

    // Crear estrellas
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Mover estrella
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Parpadeo
        star.opacity += (Math.random() - 0.5) * 0.1;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Manejar redimensionamiento
    const handleResize = () => {
      if (!mountRef.current) return;
      canvas.width = mountRef.current.clientWidth;
      canvas.height = mountRef.current.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && canvas) {
        mountRef.current.removeChild(canvas);
      }
    };
  }, [count]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
} 