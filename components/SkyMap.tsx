"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Star, Eye, ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';

interface StarData {
  id: string;
  name: string;
  ra: number; // Right Ascension
  dec: number; // Declination
  magnitude: number;
  color: string;
  distance: number;
  spectralType: string;
}

interface Constellation {
  name: string;
  stars: string[];
  lines: [number, number][];
}

const SkyMap = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const constellationLinesRef = useRef<THREE.Line[]>([]);
  
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);
  const [showConstellations, setShowConstellations] = useState(true);
  const [magnitudeFilter, setMagnitudeFilter] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de estrellas reales (simplificados)
  const starData: StarData[] = [
    { id: '1', name: 'Sirius', ra: 101.287, dec: -16.716, magnitude: -1.46, color: '#ffffff', distance: 8.6, spectralType: 'A1V' },
    { id: '2', name: 'Canopus', ra: 95.988, dec: -52.696, magnitude: -0.74, color: '#ffffcc', distance: 310, spectralType: 'F0II' },
    { id: '3', name: 'Arcturus', ra: 213.915, dec: 19.182, magnitude: -0.05, color: '#ffcc99', distance: 37, spectralType: 'K1.5III' },
    { id: '4', name: 'Vega', ra: 279.235, dec: 38.784, magnitude: 0.03, color: '#ccffff', distance: 25, spectralType: 'A0V' },
    { id: '5', name: 'Capella', ra: 79.172, dec: 45.998, magnitude: 0.08, color: '#ffffcc', distance: 42, spectralType: 'G8III' },
    { id: '6', name: 'Rigel', ra: 78.634, dec: -8.202, magnitude: 0.12, color: '#ccffff', distance: 860, spectralType: 'B8Ia' },
    { id: '7', name: 'Procyon', ra: 114.825, dec: 5.225, magnitude: 0.34, color: '#ffffcc', distance: 11.4, spectralType: 'F5IV' },
    { id: '8', name: 'Betelgeuse', ra: 88.793, dec: 7.407, magnitude: 0.42, color: '#ff9999', distance: 640, spectralType: 'M2Iab' },
    { id: '9', name: 'Achernar', ra: 24.428, dec: -57.237, magnitude: 0.46, color: '#ccffff', distance: 139, spectralType: 'B3V' },
    { id: '10', name: 'Hadar', ra: 210.956, dec: -60.374, magnitude: 0.61, color: '#ccffff', distance: 390, spectralType: 'B1III' },
    // Agregar más estrellas para llenar el cielo
    ...Array.from({ length: 200 }, (_, i) => ({
      id: `${i + 11}`,
      name: `Star ${i + 11}`,
      ra: Math.random() * 360,
      dec: (Math.random() - 0.5) * 180,
      magnitude: Math.random() * 6 + 1,
      color: ['#ffffff', '#ffffcc', '#ccffff', '#ffcc99', '#ff9999'][Math.floor(Math.random() * 5)],
      distance: Math.random() * 1000 + 10,
      spectralType: ['A', 'B', 'F', 'G', 'K', 'M'][Math.floor(Math.random() * 6)] + Math.floor(Math.random() * 9)
    }))
  ];

  // Constelaciones principales
  const constellations: Constellation[] = [
    {
      name: 'Orion',
      stars: ['Betelgeuse', 'Rigel'],
      lines: [[0, 1]]
    },
    {
      name: 'Ursa Major',
      stars: ['Star 15', 'Star 16', 'Star 17', 'Star 18', 'Star 19', 'Star 20', 'Star 21'],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
    }
  ];

  // Convertir coordenadas astronómicas a coordenadas 3D
  const raDecToXYZ = (ra: number, dec: number, distance: number = 100): THREE.Vector3 => {
    const raRad = THREE.MathUtils.degToRad(ra);
    const decRad = THREE.MathUtils.degToRad(dec);
    
    const x = distance * Math.cos(decRad) * Math.cos(raRad);
    const y = distance * Math.sin(decRad);
    const z = distance * Math.cos(decRad) * Math.sin(raRad);
    
    return new THREE.Vector3(x, y, z);
  };

  // Crear geometría de estrellas
  const createStarGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    const filteredStars = starData.filter(star => star.magnitude <= magnitudeFilter);

    filteredStars.forEach(star => {
      const pos = raDecToXYZ(star.ra, star.dec);
      positions.push(pos.x, pos.y, pos.z);
      
      const color = new THREE.Color(star.color);
      colors.push(color.r, color.g, color.b);
      
      // Tamaño basado en magnitud (más brillante = más grande)
      const size = Math.max(0.5, 3 - star.magnitude);
      sizes.push(size);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    return geometry;
  };

  // Crear material de estrellas
  const createStarMaterial = () => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        selectedIndex: { value: -1 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float selectedIndex;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float pointSize = size * (300.0 / -mvPosition.z);
          
          // Efecto de parpadeo para estrellas seleccionadas
          if (gl_VertexID == int(selectedIndex)) {
            pointSize *= 1.5 + 0.5 * sin(time * 4.0);
            vColor = mix(vColor, vec3(1.0, 1.0, 0.0), 0.3);
          } else {
            pointSize *= (1.0 + 0.1 * sin(time * 2.0));
          }
          
          gl_PointSize = pointSize;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  };

  // Inicializar Three.js
  const initThreeJS = () => {
    if (!mountRef.current) return;

    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 150);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.maxDistance = 500;
    controls.minDistance = 50;
    controlsRef.current = controls;

    // Crear estrellas
    const starGeometry = createStarGeometry();
    const starMaterial = createStarMaterial();
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Crear líneas de constelaciones
    if (showConstellations) {
      createConstellationLines();
    }

    // Agregar al DOM
    mountRef.current.appendChild(renderer.domElement);

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    setIsLoading(false);
  };

  // Crear líneas de constelaciones
  const createConstellationLines = () => {
    // Limpiar líneas existentes
    constellationLinesRef.current.forEach(line => {
      sceneRef.current?.remove(line);
    });
    constellationLinesRef.current = [];

    constellations.forEach(constellation => {
      const points: THREE.Vector3[] = [];
      
      constellation.lines.forEach(([start, end]) => {
        const startStar = starData.find(s => s.name === constellation.stars[start]);
        const endStar = starData.find(s => s.name === constellation.stars[end]);
        
        if (startStar && endStar) {
          points.push(raDecToXYZ(startStar.ra, startStar.dec));
          points.push(raDecToXYZ(endStar.ra, endStar.dec));
        }
      });

      if (points.length > 0) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
          color: 0x4444ff, 
          transparent: true, 
          opacity: 0.3 
        });
        const line = new THREE.Line(geometry, material);
        sceneRef.current?.add(line);
        constellationLinesRef.current.push(line);
      }
    });
  };

  // Manejar clic en estrellas
  const onStarClick = (event: MouseEvent) => {
    if (!cameraRef.current || !starsRef.current || !rendererRef.current) return;

    // Obtener las coordenadas del mouse relativas al canvas de Three.js
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObject(starsRef.current);
    
    if (intersects.length > 0) {
      const index = intersects[0].index;
      if (index !== undefined) {
        const filteredStars = starData.filter(star => star.magnitude <= magnitudeFilter);
        if (filteredStars[index]) {
          setSelectedStar(filteredStars[index]);
          
          // Actualizar el uniform para el efecto visual
          if (starsRef.current.material instanceof THREE.ShaderMaterial) {
            starsRef.current.material.uniforms.selectedIndex.value = index;
          }
          
          console.log('Estrella seleccionada:', filteredStars[index].name);
        }
      }
    } else {
      setSelectedStar(null);
      
      // Resetear el uniform
      if (starsRef.current.material instanceof THREE.ShaderMaterial) {
        starsRef.current.material.uniforms.selectedIndex.value = -1;
      }
    }
  };

  // Manejar redimensionamiento
  const onWindowResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
  };

  // Loop de renderizado
  const animate = () => {
    requestAnimationFrame(animate);

    if (controlsRef.current) {
      controlsRef.current.update();
    }

    if (starsRef.current && starsRef.current.material instanceof THREE.ShaderMaterial) {
      starsRef.current.material.uniforms.time.value += 0.01;
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  // Efectos
  useEffect(() => {
    initThreeJS();
    animate();

    // Agregar event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Agregar event listener al canvas de Three.js
    if (rendererRef.current) {
      rendererRef.current.domElement.addEventListener('click', onStarClick);
    }

    // Remover loading después de un breve delay
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener('click', onStarClick);
      }
      clearTimeout(timer);
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Actualizar cuando cambian los filtros
  useEffect(() => {
    if (starsRef.current) {
      const newGeometry = createStarGeometry();
      starsRef.current.geometry.dispose();
      starsRef.current.geometry = newGeometry;
    }
  }, [magnitudeFilter]);

  useEffect(() => {
    if (showConstellations) {
      createConstellationLines();
    } else {
      constellationLinesRef.current.forEach(line => {
        sceneRef.current?.remove(line);
      });
      constellationLinesRef.current = [];
    }
  }, [showConstellations]);

  return (
    <div className="relative w-full h-full">
      {/* Controles */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Controles del Cielo
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Magnitud máxima</label>
              <input
                type="range"
                min="1"
                max="6"
                value={magnitudeFilter}
                onChange={(e) => setMagnitudeFilter(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-300">{magnitudeFilter}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="constellations"
                checked={showConstellations}
                onChange={(e) => setShowConstellations(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="constellations" className="text-sm">
                Mostrar constelaciones
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Información de estrella seleccionada */}
      {selectedStar && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white max-w-sm">
          <h3 className="text-lg font-semibold mb-2">{selectedStar.name}</h3>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-300">Magnitud:</span> {selectedStar.magnitude}</p>
            <p><span className="text-gray-300">Tipo espectral:</span> {selectedStar.spectralType}</p>
            <p><span className="text-gray-300">Distancia:</span> {selectedStar.distance} años luz</p>
            <p><span className="text-gray-300">RA:</span> {selectedStar.ra.toFixed(2)}°</p>
            <p><span className="text-gray-300">Dec:</span> {selectedStar.dec.toFixed(2)}°</p>
          </div>
        </div>
      )}

      {/* Instrucciones */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4" />
          <span className="font-medium">Controles</span>
        </div>
        <div className="space-y-1 text-xs text-gray-300">
          <p>• Arrastra para rotar</p>
          <p>• Rueda del mouse para zoom</p>
          <p>• Clic en estrellas para información</p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20">
          <div className="bg-black/50 rounded-lg p-6 text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
            <p>Cargando mapa estelar...</p>
          </div>
        </div>
      )}

      {/* Contenedor de Three.js */}
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default SkyMap;