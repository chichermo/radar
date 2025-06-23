"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Star, Eye, ZoomIn, ZoomOut, RotateCcw, Filter, Globe, Satellite } from 'lucide-react';
import { 
  brightStars, 
  constellations, 
  getPlanetPositions, 
  getBrightAsteroids, 
  getVisibleSatellites,
  raDecToXYZ,
  getSpectralColor,
  type StarData,
  type PlanetData
} from '@/services/astronomicalData';

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
  const planetsRef = useRef<THREE.Mesh[]>([]);
  const asteroidsRef = useRef<THREE.Mesh[]>([]);
  const satellitesRef = useRef<THREE.Mesh[]>([]);
  
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showConstellations, setShowConstellations] = useState(true);
  const [showPlanets, setShowPlanets] = useState(true);
  const [showAsteroids, setShowAsteroids] = useState(false);
  const [showSatellites, setShowSatellites] = useState(false);
  const [magnitudeFilter, setMagnitudeFilter] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [skyData, setSkyData] = useState({
    stars: brightStars,
    planets: [] as PlanetData[],
    asteroids: [] as any[],
    satellites: [] as any[]
  });

  // Cargar datos del cielo
  useEffect(() => {
    const loadSkyData = async () => {
      try {
        const [planets, asteroids, satellites] = await Promise.all([
          getPlanetPositions(),
          getBrightAsteroids(),
          getVisibleSatellites()
        ]);
        
        setSkyData({
          stars: brightStars,
          planets,
          asteroids,
          satellites
        });
      } catch (error) {
        console.error('Error cargando datos del cielo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkyData();
  }, []);

  // Convertir coordenadas astronómicas a coordenadas 3D
  const raDecToXYZVector = (ra: number, dec: number, distance: number = 100): THREE.Vector3 => {
    const [x, y, z] = raDecToXYZ(ra, dec, distance);
    return new THREE.Vector3(x, y, z);
  };

  // Crear geometría de estrellas
  const createStarGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    const filteredStars = skyData.stars.filter(star => star.magnitude <= magnitudeFilter);

    filteredStars.forEach(star => {
      const pos = raDecToXYZVector(star.ra, star.dec);
      positions.push(pos.x, pos.y, pos.z);
      
      // Usar color basado en tipo espectral
      const color = new THREE.Color(getSpectralColor(star.spectralType));
      colors.push(color.r, color.g, color.b);
      
      // Tamaño basado en magnitud (más brillante = más grande)
      const size = Math.max(0.5, 4 - star.magnitude);
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

  // Crear planetas
  const createPlanets = () => {
    // Limpiar planetas existentes
    planetsRef.current.forEach(planet => {
      if (planet.parent) planet.parent.remove(planet);
    });
    planetsRef.current = [];

    if (!showPlanets || !sceneRef.current) return;

    skyData.planets.forEach((planet, index) => {
      const geometry = new THREE.SphereGeometry(2, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: getPlanetColor(planet.name),
        transparent: true,
        opacity: 0.8
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      const pos = raDecToXYZVector(planet.ra, planet.dec, 80);
      mesh.position.copy(pos);
      
      // Añadir etiqueta
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 256;
        canvas.height = 64;
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.textAlign = 'center';
        context.fillText(planet.name, canvas.width / 2, canvas.height / 2 + 8);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(10, 2.5);
        const labelMaterial = new THREE.MeshBasicMaterial({ 
          map: texture, 
          transparent: true,
          side: THREE.DoubleSide
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(pos.x, pos.y + 5, pos.z);
        if(sceneRef.current) sceneRef.current.add(label);
      }
      
      if(sceneRef.current) sceneRef.current.add(mesh);
      planetsRef.current.push(mesh);
    });
  };

  // Obtener color del planeta
  const getPlanetColor = (planetName: string): string => {
    const colors: { [key: string]: string } = {
      'Marte': '#ff6b35',
      'Júpiter': '#ffd93d',
      'Saturno': '#ffb347',
      'Venus': '#ffd700',
      'Mercurio': '#c0c0c0',
      'Urano': '#87ceeb',
      'Neptuno': '#4169e1'
    };
    return colors[planetName] || '#ffffff';
  };

  // Crear líneas de constelaciones
  const createConstellationLines = () => {
    // Limpiar líneas existentes
    constellationLinesRef.current.forEach(line => {
      if (line.parent) line.parent.remove(line);
    });
    constellationLinesRef.current = [];

    if (!showConstellations || !sceneRef.current) return;

    constellations.forEach(constellation => {
      const starPositions = constellation.stars.map(starId => {
        const star = skyData.stars.find(s => s.id === starId);
        if (star) {
          return raDecToXYZVector(star.ra, star.dec);
        }
        return new THREE.Vector3();
      }).filter(pos => pos.length() > 0);

      constellation.lines.forEach(([start, end]) => {
        if (starPositions[start] && starPositions[end]) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            starPositions[start],
            starPositions[end]
          ]);
          
          const material = new THREE.LineBasicMaterial({ 
            color: 0x4444ff, 
            transparent: true, 
            opacity: 0.3 
          });
          
          const line = new THREE.Line(geometry, material);
          sceneRef.current!.add(line);
          constellationLinesRef.current.push(line);
        }
      });
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

    // Crear planetas y constelaciones
    createPlanets();
    createConstellationLines();

    // Añadir fondo de estrellas débiles
    const backgroundStars = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 1000 }, () => {
          const ra = Math.random() * 360;
          const dec = (Math.random() - 0.5) * 180;
          return raDecToXYZVector(ra, dec, 200);
        })
      ),
      new THREE.PointsMaterial({
        color: 0x444444,
        size: 0.5,
        transparent: true,
        opacity: 0.3
      })
    );
    scene.add(backgroundStars);

    // Añadir renderer al DOM
    mountRef.current.appendChild(renderer.domElement);

    // Event listeners
    window.addEventListener('resize', onWindowResize);
  };

  // Evento de clic en estrellas
  const onStarClick = (event: MouseEvent) => {
    if (!cameraRef.current || !starsRef.current) return;

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObject(starsRef.current);
    
    if (intersects.length > 0) {
      const index = intersects[0].index;
      if (index !== undefined) {
        const filteredStars = skyData.stars.filter(star => star.magnitude <= magnitudeFilter);
        const selectedStar = filteredStars[index];
        setSelectedStar(selectedStar);
        
        // Actualizar shader para resaltar estrella seleccionada
        if (starsRef.current.material instanceof THREE.ShaderMaterial) {
          starsRef.current.material.uniforms.selectedIndex.value = index;
        }
      }
    }
  };

  // Evento de redimensionamiento
  const onWindowResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  // Animación
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

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onStarClick);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', onStarClick);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Actualizar cuando cambian los datos o filtros
  useEffect(() => {
    if (sceneRef.current && starsRef.current) {
      const newGeometry = createStarGeometry();
      starsRef.current.geometry.dispose();
      starsRef.current.geometry = newGeometry;
      
      createPlanets();
      createConstellationLines();
    }
  }, [skyData, magnitudeFilter, showPlanets, showConstellations]);

  return (
    <div className="relative w-full h-full">
      {/* Controles */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300">Filtros</span>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={showConstellations}
                onChange={(e) => setShowConstellations(e.target.checked)}
                className="rounded"
              />
              Constelaciones
            </label>
            
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={showPlanets}
                onChange={(e) => setShowPlanets(e.target.checked)}
                className="rounded"
              />
              Planetas
            </label>
            
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={showAsteroids}
                onChange={(e) => setShowAsteroids(e.target.checked)}
                className="rounded"
              />
              Asteroides
            </label>
            
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={showSatellites}
                onChange={(e) => setShowSatellites(e.target.checked)}
                className="rounded"
              />
              Satélites
            </label>
          </div>
          
          <div>
            <label className="text-sm text-gray-300">Magnitud máxima: {magnitudeFilter}</label>
            <input
              type="range"
              min="1"
              max="6"
              value={magnitudeFilter}
              onChange={(e) => setMagnitudeFilter(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Información de objeto seleccionado */}
      {selectedStar && (
        <div className="absolute top-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-semibold text-white mb-2">{selectedStar.name}</h3>
          <div className="space-y-1 text-sm text-gray-300">
            <p><strong>Constelación:</strong> {selectedStar.constellation || 'N/A'}</p>
            <p><strong>Magnitud:</strong> {selectedStar.magnitude}</p>
            <p><strong>Distancia:</strong> {selectedStar.distance} años luz</p>
            <p><strong>Tipo espectral:</strong> {selectedStar.spectralType}</p>
            {selectedStar.bayer && <p><strong>Bayer:</strong> {selectedStar.bayer}</p>}
          </div>
        </div>
      )}

      {/* Contenedor del mapa */}
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Cargando datos astronómicos...</div>
        </div>
      )}
    </div>
  );
};

export default SkyMap;