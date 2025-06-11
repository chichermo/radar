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
      
      scene.add(mesh);
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

        earth.rotation.x = earthRotation.x;
        earth.rotation.y = earthRotation.y;
        atmosphere.rotation.x = earthRotation.x;
        atmosphere.rotation.y = earthRotation.y;

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

      const intersects = raycaster.intersectObjects(objectMeshes);
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object.userData.object;
        setSelectedObject(clickedObject);
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
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animar objetos espaciales con movimiento orbital más realista
      objectMeshes.forEach((mesh, index) => {
        const orbit = objectOrbits[index];
        if (orbit) {
          // Movimiento orbital más lento y realista
          const angle = time * orbit.speed + orbit.phase;
          
          // Calcular posición en la órbita
          const x = orbit.radius * Math.cos(angle);
          const y = orbit.radius * Math.sin(angle) * Math.cos(orbit.inclination);
          const z = orbit.radius * Math.sin(angle) * Math.sin(orbit.inclination);
          
          mesh.position.set(x, y, z);
          
          // Rotación lenta del objeto sobre sí mismo
          mesh.rotation.y += 0.01;
        }
        
        // Efecto de pulso para objetos peligrosos (más sutil)
        const obj = objectData[index];
        if (obj?.isHazardous) {
          const pulse = Math.sin(time * 2) * 0.05 + 1;
          mesh.scale.setScalar(pulse);
        }
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('click', handleClick);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [objects]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mountRef} 
        className="w-full h-96 rounded-lg overflow-hidden cursor-grab" 
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
          <div className="text-white">Cargando mapa 3D...</div>
        </div>
      )}

      {/* Panel de información del objeto seleccionado */}
      {selectedObject && (
        <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            {selectedObject.name}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Tipo:</span>
              <span className="text-gray-200">{selectedObject.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Peligroso:</span>
              <span className={selectedObject.isHazardous ? "text-red-400" : "text-green-400"}>
                {selectedObject.isHazardous ? "Sí ⚠️" : "No ✅"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distancia:</span>
              <span className="text-gray-200">
                {selectedObject.distance?.toLocaleString()} km
              </span>
            </div>
            {selectedObject.velocity && (
              <div className="flex justify-between">
                <span className="text-gray-400">Velocidad:</span>
                <span className="text-gray-200">
                  {Math.sqrt(
                    selectedObject.velocity.x ** 2 + 
                    selectedObject.velocity.y ** 2 + 
                    selectedObject.velocity.z ** 2
                  ).toFixed(2)} km/s
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSelectedObject(null)}
            className="mt-3 w-full bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded text-sm transition-colors"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Leyenda de colores */}
      <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-gray-100 mb-2">Leyenda</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-300">Satélites</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-300">Asteroides</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-300">Basura espacial</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-300">Peligrosos</span>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="absolute top-4 left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
        <div className="text-xs text-gray-400 mb-1">Controles</div>
        <div className="space-y-1 text-xs text-gray-300">
          <div>🖱️ Arrastra para rotar</div>
          <div>🔍 Rueda para zoom</div>
          <div>👆 Clic para seleccionar</div>
        </div>
      </div>
    </div>
  );
} 