"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import type { SpaceObject } from '@/types/space';

interface SpaceObjectsGlobeProps {
  objects: SpaceObject[];
  className?: string;
}

const COLORS = {
  satellite: 0xffd700,
  asteroid: 0xff5e5b,
  debris: 0xbdbdbd,
  hazardous: 0xff2e63,
};

export default function SpaceObjectsGlobe({ objects, className = "" }: SpaceObjectsGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState<SpaceObject | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Crear la Tierra
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x3fa7d6,
      transparent: true,
      opacity: 0.8,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Agregar atmósfera
    const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x87ceeb,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Crear un grupo para todos los objetos espaciales
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Crear objetos espaciales con posiciones más realistas
    const objectMeshes: THREE.Mesh[] = [];
    const objectData: SpaceObject[] = [];
    const objectOrbits: { radius: number; inclination: number; speed: number; phase: number }[] = [];

    objects.forEach((obj, index) => {
      if (!obj.position) return;

      const distance = obj.distance || 10;
      const normalizedDistance = Math.max(6, distance / 1000);

      const geometry = new THREE.SphereGeometry(0.15, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: obj.isHazardous ? COLORS.hazardous : COLORS[obj.type as keyof typeof COLORS] || 0xffffff,
        emissive: obj.isHazardous ? 0x330000 : 0x000000,
        emissiveIntensity: obj.isHazardous ? 0.3 : 0,
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Crear órbitas más realistas con diferentes inclinaciones y fases
      const orbitRadius = normalizedDistance;
      const inclination = (Math.random() - 0.5) * Math.PI * 0.3; // Inclinación aleatoria
      const speed = (Math.random() * 0.5 + 0.1) * 0.001; // Velocidad más lenta y variable
      const phase = Math.random() * Math.PI * 2; // Fase inicial aleatoria
      
      // Posición inicial basada en la órbita
      const initialAngle = phase;
      const x = orbitRadius * Math.cos(initialAngle);
      const y = orbitRadius * Math.sin(initialAngle) * Math.cos(inclination);
      const z = orbitRadius * Math.sin(initialAngle) * Math.sin(inclination);
      
      mesh.position.set(x, y, z);
      mesh.userData = { object: obj, index };
      
      objectsGroup.add(mesh);
      objectMeshes.push(mesh);
      objectData.push(obj);
      objectOrbits.push({ radius: orbitRadius, inclination, speed, phase });
    });

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Posición inicial de la cámara
    camera.position.set(0, 0, 25);

    // Variables para la interacción mejoradas
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let earthRotation = { x: 0, y: 0 };

    // Event listeners mejorados
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };

        const rotationSpeed = 0.005; // Velocidad de rotación ajustada
        earthRotation.y += deltaMove.x * rotationSpeed;
        earthRotation.x += deltaMove.y * rotationSpeed;

        // Limitar la rotación vertical para evitar volteretas
        earthRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, earthRotation.x));

        // Aplicar rotación a la Tierra, atmósfera y grupo de objetos
        earth.rotation.x = earthRotation.x;
        earth.rotation.y = earthRotation.y;
        atmosphere.rotation.x = earthRotation.x;
        atmosphere.rotation.y = earthRotation.y;
        objectsGroup.rotation.x = earthRotation.x;
        objectsGroup.rotation.y = earthRotation.y;

        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const handleMouseLeave = (event: MouseEvent) => {
      event.preventDefault();
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomSpeed = 0.1;
      const delta = event.deltaY > 0 ? 1 : -1;
      
      const newDistance = camera.position.length() + delta * zoomSpeed;
      if (newDistance >= 8 && newDistance <= 100) {
        camera.position.normalize().multiplyScalar(newDistance);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (isDragging) return; // No seleccionar si estamos arrastrando
      
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      // Buscar intersecciones con todos los objetos en la escena
      const allObjects = [earth, atmosphere, ...objectMeshes];
      const intersects = raycaster.intersectObjects(allObjects);
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        if (clickedMesh.userData && clickedMesh.userData.object) {
          const clickedObject = clickedMesh.userData.object;
          setSelectedObject(clickedObject);
        } else {
          setSelectedObject(null);
        }
      } else {
        setSelectedObject(null);
      }
    };

    // Agregar event listeners al canvas
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('click', handleClick);

    // Agregar event listeners globales para mejor manejo
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Función de animación mejorada
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016; // Aproximadamente 60 FPS

      // Animar objetos espaciales en sus órbitas
      objectMeshes.forEach((mesh, index) => {
        const orbit = objectOrbits[index];
        if (orbit) {
          const angle = orbit.phase + time * orbit.speed;
          const x = orbit.radius * Math.cos(angle);
          const y = orbit.radius * Math.sin(angle) * Math.cos(orbit.inclination);
          const z = orbit.radius * Math.sin(angle) * Math.sin(orbit.inclination);
          
          mesh.position.set(x, y, z);
        }
      });

      // Rotación automática lenta de la Tierra
      if (!isDragging) {
        earth.rotation.y += 0.001;
        atmosphere.rotation.y += 0.001;
        objectsGroup.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('click', handleClick);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [objects]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab" />
      
      {selectedObject && (
        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-semibold text-white mb-2">{selectedObject.name}</h3>
          <div className="space-y-1 text-sm text-gray-300">
            <p><span className="font-medium">Tipo:</span> {selectedObject.type}</p>
            <p><span className="font-medium">Distancia:</span> {selectedObject.distance?.toFixed(2)} km</p>
            {selectedObject.velocity && (
              <p><span className="font-medium">Velocidad:</span> {Math.sqrt(
                selectedObject.velocity.x ** 2 + 
                selectedObject.velocity.y ** 2 + 
                selectedObject.velocity.z ** 2
              ).toFixed(2)} km/s</p>
            )}
            {selectedObject.isHazardous && (
              <p className="text-red-400 font-medium">⚠️ Objeto peligroso</p>
            )}
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="text-white">Cargando...</div>
        </div>
      )}
    </div>
  );
} 