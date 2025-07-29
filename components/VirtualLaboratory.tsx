'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Settings, Target, Zap, Globe, Star, Clock, X, Maximize2, Minimize2, Edit, Info } from 'lucide-react'

interface Experiment {
  id: string
  name: string
  description: string
  category: 'gravity' | 'light' | 'orbit' | 'radiation'
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number // en minutos
}

const TABS = [
  { key: 'simulation', label: 'Simulación' },
  { key: 'spectrum', label: 'Espectro de Luz' },
  { key: 'radiation', label: 'Radiación Cósmica' },
  { key: 'education', label: 'Panel Educativo' }
];

const VirtualLaboratory: React.FC = () => {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [results, setResults] = useState<any>({})
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [tab, setTab] = useState('simulation');
  const [bodies, setBodies] = useState<any[]>([]);
  const [editingBody, setEditingBody] = useState<any | null>(null);
  const [energyHistory, setEnergyHistory] = useState<number[]>([]);
  const [bodiesHistory, setBodiesHistory] = useState<any[][]>([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const experiments: Experiment[] = [
    {
      id: 'gravity-simulation',
      name: 'Simulación de Gravedad',
      description: 'Experimento con múltiples cuerpos celestes y sus interacciones gravitacionales',
      category: 'gravity',
      difficulty: 'medium',
      duration: 5
    },
    {
      id: 'light-spectrum',
      name: 'Espectro de Luz',
      description: 'Análisis del espectro de luz de diferentes estrellas y exoplanetas',
      category: 'light',
      difficulty: 'easy',
      duration: 3
    },
    {
      id: 'orbital-mechanics',
      name: 'Mecánica Orbital',
      description: 'Simulación de órbitas planetarias y satélites artificiales',
      category: 'orbit',
      difficulty: 'hard',
      duration: 8
    },
    {
      id: 'cosmic-radiation',
      name: 'Radiación Cósmica',
      description: 'Estudio de la radiación cósmica y su efecto en el espacio',
      category: 'radiation',
      difficulty: 'hard',
      duration: 10
    }
  ]

  useEffect(() => {
    if (isRunning && activeExperiment) {
      const interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRunning, activeExperiment])

  useEffect(() => {
    if (activeExperiment && canvasRef.current) {
      startSimulation()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [activeExperiment])

  const startSimulation = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Aplicar transformaciones de zoom y offset
      ctx.save();
      ctx.translate(viewOffset.x, viewOffset.y);
      ctx.scale(zoom, zoom);
      
      // Dibujar fondo espacial
      drawSpaceBackground(ctx, canvas.width, canvas.height)
      
      // Usar los cuerpos del estado
      const currentBodies = [...bodies];
      
      // Actualizar y dibujar cuerpos
      updateBodies(currentBodies, canvas.width, canvas.height)
      drawBodies(ctx, currentBodies)
      
      // Restaurar transformaciones
      ctx.restore();
      
      // Actualizar el estado de los cuerpos
      setBodies(currentBodies);
      
      // Actualizar resultados
      updateResults(currentBodies)
      
      // Actualizar energía total
      setTotalEnergy(calculateTotalEnergy());
      
      animationId = requestAnimationFrame(animate)
    }

    animate()
    animationRef.current = animationId
  }

  const generateBodies = (experimentId: string) => {
    switch (experimentId) {
      case 'gravity-simulation':
        return [
          { x: 200, y: 200, vx: 0, vy: 0, mass: 50, radius: 20, color: '#FFD700' },
          { x: 400, y: 200, vx: 0, vy: 2, mass: 10, radius: 8, color: '#87CEEB' },
          { x: 300, y: 300, vx: -1, vy: 0, mass: 15, radius: 12, color: '#FF6B6B' }
        ]
      case 'orbital-mechanics':
        return [
          { x: 300, y: 200, vx: 0, vy: 0, mass: 100, radius: 25, color: '#FFD700' },
          { x: 500, y: 200, vx: 0, vy: 3, mass: 5, radius: 6, color: '#87CEEB' }
        ]
      default:
        return []
    }
  }

  const drawSpaceBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Calcular dimensiones del fondo basadas en el zoom
    const scaledWidth = width / zoom;
    const scaledHeight = height / zoom;
    const offsetX = -viewOffset.x / zoom;
    const offsetY = -viewOffset.y / zoom;
    
    // Gradiente espacial
    const gradient = ctx.createRadialGradient(
      scaledWidth/2 - offsetX, 
      scaledHeight/2 - offsetY, 
      0, 
      scaledWidth/2 - offsetX, 
      scaledHeight/2 - offsetY, 
      Math.max(scaledWidth, scaledHeight)/2
    )
    gradient.addColorStop(0, '#0B1426')
    gradient.addColorStop(1, '#1a1a2e')
    ctx.fillStyle = gradient
    ctx.fillRect(offsetX, offsetY, scaledWidth, scaledHeight)

    // Estrellas
    ctx.fillStyle = '#FFFFFF'
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * scaledWidth + offsetX
      const y = Math.random() * scaledHeight + offsetY
      const size = Math.random() * 2
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Física mejorada con órbitas elípticas y colisiones
  const updateBodies = (bodies: any[], width: number, height: number) => {
    const G = 0.1 // Constante gravitacional
    const dt = 1/60 // Delta tiempo

    // Calcular fuerzas gravitacionales
    for (let i = 0; i < bodies.length; i++) {
      let fx = 0, fy = 0;
      
      for (let j = 0; j < bodies.length; j++) {
        if (i === j) continue;
        
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const force = G * bodies[i].mass * bodies[j].mass / (distance * distance);
          fx += force * dx / distance;
          fy += force * dy / distance;
        }
      }
      
      // Actualizar velocidades
      bodies[i].vx += fx / bodies[i].mass * dt;
      bodies[i].vy += fy / bodies[i].mass * dt;
    }

    // Actualizar posiciones y manejar colisiones
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].x += bodies[i].vx * dt;
      bodies[i].y += bodies[i].vy * dt;
      
      // Colisiones con bordes
      if (bodies[i].x - bodies[i].radius < 0 || bodies[i].x + bodies[i].radius > width) {
        bodies[i].vx *= -0.8; // Rebote con pérdida de energía
      }
      if (bodies[i].y - bodies[i].radius < 0 || bodies[i].y + bodies[i].radius > height) {
        bodies[i].vy *= -0.8;
      }
      
      // Colisiones entre cuerpos
      for (let j = i + 1; j < bodies.length; j++) {
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = bodies[i].radius + bodies[j].radius;
        
        if (distance < minDistance) {
          // Colisión elástica
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);
          
          // Rotar velocidades
          const vx1 = bodies[i].vx * cos + bodies[i].vy * sin;
          const vy1 = bodies[i].vy * cos - bodies[i].vx * sin;
          const vx2 = bodies[j].vx * cos + bodies[j].vy * sin;
          const vy2 = bodies[j].vy * cos - bodies[j].vx * sin;
          
          // Intercambiar velocidades
          bodies[i].vx = vx2 * cos - vy1 * sin;
          bodies[i].vy = vy1 * cos + vx2 * sin;
          bodies[j].vx = vx1 * cos - vy2 * sin;
          bodies[j].vy = vy2 * cos + vx1 * sin;
          
          // Separar cuerpos
          const overlap = minDistance - distance;
          bodies[i].x -= overlap * cos / 2;
          bodies[i].y -= overlap * sin / 2;
          bodies[j].x += overlap * cos / 2;
          bodies[j].y += overlap * sin / 2;
        }
      }
    }

    // Actualizar trayectorias
    bodies.forEach(body => {
      if (!body.trajectory) body.trajectory = [];
      body.trajectory.push({ x: body.x, y: body.y });
      if (body.trajectory.length > 100) {
        body.trajectory.shift();
      }
    });
  }

  const drawBodies = (ctx: CanvasRenderingContext2D, bodies: any[]) => {
    // Dibujar trayectorias primero
    bodies.forEach(body => {
      if (body.trajectory && body.trajectory.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = body.color + '40';
        ctx.lineWidth = 2;
        body.trajectory.forEach((point: any, index: number) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    });

    // Dibujar cuerpos
    bodies.forEach(body => {
      // Cuerpo principal
      ctx.fillStyle = body.color
      ctx.beginPath()
      ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2)
      ctx.fill()

      // Efecto de brillo
      const gradient = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, body.radius)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.fill()

      // Borde brillante
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    })
  }

  const updateResults = (bodies: any[]) => {
    const totalEnergy = bodies.reduce((sum, body) => {
      const kinetic = 0.5 * body.mass * (body.vx * body.vx + body.vy * body.vy)
      return sum + kinetic
    }, 0)

    setResults({
      totalBodies: bodies.length,
      totalEnergy: totalEnergy.toFixed(2),
      averageVelocity: (bodies.reduce((sum, body) => 
        sum + Math.sqrt(body.vx * body.vx + body.vy * body.vy), 0) / bodies.length).toFixed(2)
    })
  }

  const startExperiment = (experimentId: string) => {
    setActiveExperiment(experimentId)
    setIsRunning(true)
    setTime(0)
    setResults({})
    setEnergyHistory([])
    setBodiesHistory([])
    setTotalEnergy(0)
    resetView() // Resetear zoom y vista
    
    // Generar cuerpos iniciales del experimento
    const newBodies = generateBodies(experimentId);
    setBodies(newBodies);
  }

  const stopExperiment = () => {
    setIsRunning(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const resetExperiment = () => {
    stopExperiment()
    setTime(0)
    setResults({})
    setEnergyHistory([])
    setBodiesHistory([])
    setTotalEnergy(0)
    resetView() // Resetear zoom y vista
    
    if (activeExperiment) {
      // Regenerar cuerpos iniciales del experimento
      const newBodies = generateBodies(activeExperiment);
      setBodies(newBodies);
      
      setTimeout(() => {
        setIsRunning(true)
      }, 100)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // NUEVO: Agregar cuerpo con clic
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tab !== 'simulation') return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newBody = {
      x, y, vx: 0, vy: 0, mass: 10, radius: 10, color: '#60a5fa'
    };
    setBodies([...bodies, newBody]);
    setEditingBody({ ...newBody, index: bodies.length });
  };

  // NUEVO: Editar cuerpo
  const handleEditBody = (idx: number) => {
    setEditingBody({ ...bodies[idx], index: idx });
  };
  const handleBodyChange = (body: any) => {
    const newBodies = [...bodies];
    newBodies[body.index] = { ...body };
    delete newBodies[body.index].index;
    setBodies(newBodies);
    setEditingBody(body);
  };
  const handleCloseEditor = () => setEditingBody(null);

  // NUEVO: Pantalla completa
  const handleFullscreen = () => setFullscreen(f => !f);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tab !== 'simulation') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && tab === 'simulation') {
      setViewOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (tab !== 'simulation') return;
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(Math.max(0.1, Math.min(5, zoom * zoomFactor)));
  };

  const resetView = () => {
    console.log('Reset Vista clicked - antes:', { viewOffset, zoom });
    
    // Verificar si hay cambios que hacer
    const hasChanges = viewOffset.x !== 0 || viewOffset.y !== 0 || zoom !== 1;
    
    if (!hasChanges) {
      console.log('No hay cambios que resetear - vista ya está en posición inicial');
      return;
    }
    
    // Resetear transformaciones
    setViewOffset({ x: 0, y: 0 });
    setZoom(1);
    
    // Forzar actualización inmediata del canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Limpiar y redibujar inmediatamente
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('Canvas limpiado - vista reseteada');
      }
    }
    
    console.log('Reset Vista completado - vista centrada y zoom reseteado');
  };

  // Forzar actualización del canvas cuando cambien las transformaciones
  useEffect(() => {
    console.log('Transformaciones cambiadas:', { viewOffset, zoom });
    if (canvasRef.current && isRunning) {
      // Forzar un redibujado del canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('Canvas actualizado por transformaciones');
      }
    }
  }, [viewOffset, zoom, isRunning]);

  // Calcular energía total mejorada
  const calculateTotalEnergy = () => {
    let kinetic = 0;
    let potential = 0;
    const G = 0.1;
    
    for (let i = 0; i < bodies.length; i++) {
      kinetic += 0.5 * bodies[i].mass * (bodies[i].vx * bodies[i].vx + bodies[i].vy * bodies[i].vy);
      
      for (let j = i + 1; j < bodies.length; j++) {
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
          potential -= G * bodies[i].mass * bodies[j].mass / distance;
        }
      }
    }
    
    return kinetic + potential;
  };

  const [totalEnergy, setTotalEnergy] = useState(0);

  useEffect(() => {
    if (bodies.length > 0) {
      setTotalEnergy(calculateTotalEnergy());
    }
  }, [bodies]);

  // NUEVO: Tabs y layout avanzado
  return (
    <div className={`bg-[#101624] min-h-screen w-full ${fullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
      style={fullscreen ? { height: '100vh', width: '100vw', overflow: 'auto' } : {}}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-1">Laboratorio Virtual</h1>
            <p className="text-gray-400">Simulaciones astronómicas interactivas y visuales</p>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={handleFullscreen} className="bg-gray-800 text-white rounded-lg px-3 py-2 hover:bg-blue-700 flex items-center gap-1">
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              {fullscreen ? 'Salir pantalla completa' : 'Pantalla completa'}
            </button>
          </div>
        </div>
        <div className="glass-card rounded-xl shadow-lg p-4 mb-6">
          <div className="flex gap-2 mb-4">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${tab === t.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}>{t.label}</button>
            ))}
          </div>
          {/* TAB: Simulación */}
          {tab === 'simulation' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Panel de experimentos */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">Experimentos Disponibles</h2>
                  <div className="space-y-4">
                    {experiments.map((experiment) => (
                      <div
                        key={experiment.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          activeExperiment === experiment.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => startExperiment(experiment.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{experiment.name}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            experiment.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            experiment.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {experiment.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-200 mb-2">{experiment.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {experiment.duration} min
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Área de simulación avanzada */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Simulación</h2>
                    <div className="flex items-center gap-2">
                      {isRunning ? (
                        <button
                          onClick={stopExperiment}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <Pause className="w-4 h-4" />
                          Pausar
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsRunning(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          <Play className="w-4 h-4" />
                          Iniciar
                        </button>
                      )}
                      <button
                        onClick={resetExperiment}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reiniciar
                      </button>
                    </div>
                  </div>
                  {/* Canvas de simulación avanzado */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-96 cursor-crosshair"
                      onClick={handleCanvasClick}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onWheel={handleWheel}
                    />
                    
                    {/* Controles avanzados */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                          isRunning 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {isRunning ? 'Pausar' : 'Iniciar'}
                      </button>
                      <button
                        onClick={() => {
                          console.log('Botón Reset Vista clickeado');
                          resetView();
                        }}
                        className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                          viewOffset.x === 0 && viewOffset.y === 0 && zoom === 1
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={viewOffset.x === 0 && viewOffset.y === 0 && zoom === 1}
                      >
                        Reset Vista
                      </button>
                      <button
                        onClick={() => setZoom(Math.min(5, zoom * 1.2))}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition-all"
                      >
                        Zoom +
                      </button>
                      <button
                        onClick={() => setZoom(Math.max(0.1, zoom * 0.8))}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition-all"
                      >
                        Zoom -
                      </button>
                    </div>

                    {/* Información de energía mejorada */}
                    <div className="absolute bottom-4 left-4 bg-[#232b3b]/90 backdrop-blur border border-white/20 rounded-lg p-3">
                      <div className="text-white font-semibold">Energía Total: {totalEnergy.toFixed(2)} J</div>
                      <div className="text-gray-300 text-sm">Cuerpos: {bodies.length}</div>
                      <div className="text-gray-300 text-sm">Zoom: {(zoom * 100).toFixed(0)}%</div>
                    </div>

                    {activeExperiment && (
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                        {formatTime(time)}
                      </div>
                    )}
                    
                    {/* Editar cuerpos */}
                    {bodies.map((body, idx) => (
                      <button key={idx} className="absolute" style={{ left: body.x - 10, top: body.y - 10 }} onClick={() => handleEditBody(idx)}>
                        <Edit className="w-4 h-4 text-blue-400 hover:text-blue-600" />
                      </button>
                    ))}
                  </div>
                  {/* Modal de edición de cuerpo */}
                  {editingBody && <BodyEditor body={editingBody} onChange={handleBodyChange} onClose={handleCloseEditor} />}
                  {/* Gráficos en tiempo real */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <EnergyChart energyHistory={energyHistory} />
                    <TrajectoryChart bodiesHistory={bodiesHistory} />
                  </div>
                  {/* Controles y resultados */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6">
                      <h3 className="font-medium mb-2 text-white">Controles</h3>
                      <div className="space-y-2 text-sm text-gray-200">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span>Click para agregar cuerpos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Edit className="w-4 h-4 text-blue-400" />
                          <span>Click en un cuerpo para editar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>Doble click para zoom</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-green-500" />
                          <span>Arrastra para mover vista</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6">
                      <h3 className="font-medium mb-2 text-white">Resultados</h3>
                      <div className="space-y-2 text-sm text-gray-200">
                        {Object.entries(results).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* TAB: Espectro de Luz */}
          {tab === 'spectrum' && <SpectrumTab />}
          {/* TAB: Radiación Cósmica */}
          {tab === 'radiation' && <RadiationTab />}
          {/* TAB: Panel Educativo */}
          {tab === 'education' && (
            <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2"><Info /> Panel Educativo</h2>
              <p className="text-gray-200 text-lg">Explora conceptos clave de física y astronomía a través de simulaciones interactivas. Aprende sobre:</p>
              <ul className="list-disc pl-6 text-gray-200">
                <li>Gravedad y órbitas planetarias</li>
                <li>Espectro electromagnético y análisis de luz</li>
                <li>Radiación cósmica y su impacto</li>
                <li>Conservación de energía y momentum</li>
              </ul>
              <div className="mt-2">
                <a href="https://es.wikipedia.org/wiki/F%C3%ADsica_espacial" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Más sobre física espacial</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Editor de cuerpo celeste mejorado visualmente
const BodyEditor = ({ body, onChange, onClose }: any) => (
  <div className="fixed inset-0 bg-[#181f2a]/90 flex items-center justify-center z-50">
    <div className="bg-[#232b3b] border border-white/20 backdrop-blur shadow-2xl rounded-2xl p-8 w-full max-w-md relative">
      <button className="absolute top-2 right-2 text-gray-300 hover:text-white" onClick={onClose}><X /></button>
      <h2 className="text-xl font-bold mb-4 text-white">Editar Cuerpo Celeste</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-200">Masa</label>
          <input type="number" className="w-full rounded bg-[#232b3b] border border-white/20 text-white p-2" value={body.mass} min={1} max={1000} onChange={e => onChange({ ...body, mass: Number(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Radio</label>
          <input type="number" className="w-full rounded bg-[#232b3b] border border-white/20 text-white p-2" value={body.radius} min={1} max={100} onChange={e => onChange({ ...body, radius: Number(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Velocidad X</label>
          <input type="number" className="w-full rounded bg-[#232b3b] border border-white/20 text-white p-2" value={body.vx} step={0.1} onChange={e => onChange({ ...body, vx: Number(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Velocidad Y</label>
          <input type="number" className="w-full rounded bg-[#232b3b] border border-white/20 text-white p-2" value={body.vy} step={0.1} onChange={e => onChange({ ...body, vy: Number(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Color</label>
          <input type="color" className="w-12 h-8 p-0 border-0" value={body.color} onChange={e => onChange({ ...body, color: e.target.value })} />
        </div>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all" onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

// Gráfico de energía
const EnergyChart = ({ energyHistory }: any) => (
  <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6">
    <h3 className="font-semibold mb-2 text-blue-600">Energía Total (histórico)</h3>
    <svg width="100%" height="80" viewBox="0 0 300 80">
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        points={energyHistory.map((e: number, i: number) => `${i * (300 / energyHistory.length)},${80 - (e / Math.max(...energyHistory, 1)) * 70}`).join(' ')}
      />
    </svg>
  </div>
);

// Gráfico de trayectorias
const TrajectoryChart = ({ bodiesHistory }: any) => (
  <div className="bg-white/10 border border-white/20 backdrop-blur shadow-xl rounded-2xl p-6">
    <h3 className="font-semibold mb-2 text-green-600">Trayectorias (X vs Y)</h3>
    <svg width="100%" height="80" viewBox="0 0 300 80">
      {bodiesHistory.map((history: any[], idx: number) => (
        <polyline
          key={idx}
          fill="none"
          stroke={history[0]?.color || '#888'}
          strokeWidth="2"
          points={history.map((b: any) => `${b.x / 2},${80 - b.y / 4}`).join(' ')}
        />
      ))}
    </svg>
  </div>
);

// Espectro de luz interactivo mejorado
const SpectrumTab = () => {
  const [selectedSpectrum, setSelectedSpectrum] = useState('Estrella Tipo G');
  const [wavelength, setWavelength] = useState(550);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Espectro Visible</h3>
          <div className="relative h-32 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-bold text-lg">400nm - 700nm</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent"></div>
            {/* Indicador de longitud de onda */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${((wavelength - 400) / 300) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Violeta</span>
              <span className="text-gray-300">400nm</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Rojo</span>
              <span className="text-gray-300">700nm</span>
            </div>
            <input
              type="range"
              min="400"
              max="700"
              value={wavelength}
              onChange={(e) => setWavelength(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-white font-semibold">{wavelength}nm</div>
          </div>
        </div>

        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Análisis Espectral</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Temperatura Estelar</span>
              <span className="text-white font-semibold">5,800K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Tipo Espectral</span>
              <span className="text-white font-semibold">G2V</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Luminosidad</span>
              <span className="text-white font-semibold">1.0 L☉</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Color Dominante</span>
              <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Simulación Espectral Interactiva</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Estrella Tipo O', temp: '40,000K', color: 'bg-blue-400' },
            { name: 'Estrella Tipo G', temp: '5,800K', color: 'bg-yellow-400' },
            { name: 'Estrella Tipo M', temp: '3,000K', color: 'bg-red-400' }
          ].map((type) => (
            <button
              key={type.name}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${
                selectedSpectrum === type.name ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => setSelectedSpectrum(type.name)}
            >
              <div className="text-center">
                <div className="text-lg font-semibold">{type.name}</div>
                <div className="text-sm opacity-80">{type.temp}</div>
                <div className={`w-8 h-8 rounded-full mx-auto mt-2 ${type.color}`}></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico espectral animado */}
      <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Gráfico Espectral</h3>
        <div className="relative h-48 bg-black rounded-lg overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="25%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#00ff00" />
                <stop offset="75%" stopColor="#0000ff" />
                <stop offset="100%" stopColor="#8000ff" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="200" fill="url(#spectrumGradient)" opacity="0.3" />
            <path
              d="M0,150 Q50,100 100,120 Q150,80 200,100 Q250,60 300,80 Q350,40 400,60"
              stroke="white"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <circle cx={wavelength * 0.57} cy="100" r="4" fill="yellow" className="animate-ping" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Radiación cósmica animada mejorada
const RadiationTab = () => {
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticleCount(prev => prev + Math.floor(Math.random() * 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Radiación Cósmica de Fondo</h3>
          <div className="relative h-32 bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-bold text-lg">2.725K</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-white font-semibold">Temperatura del Universo</div>
            <div className="text-gray-300 text-sm">Radiación residual del Big Bang</div>
          </div>
        </div>

        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Rayos Cósmicos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Protones</span>
              <span className="text-white font-semibold">89%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Helio</span>
              <span className="text-white font-semibold">9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Elementos Pesados</span>
              <span className="text-white font-semibold">2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Energía Promedio</span>
              <span className="text-white font-semibold">10¹⁵ eV</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Simulación de Radiación</h3>
        <div className="relative h-48 bg-black rounded-lg overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({length: 30}, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
            {Array.from({length: 15}, (_, i) => (
              <div
                key={`blue-${i}`}
                className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 text-white text-sm">
            Partículas detectadas: {particleCount}
          </div>
          <div className="absolute bottom-4 right-4 text-white text-sm">
            Tasa: {Math.floor(Math.random() * 100) + 50}/s
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2">Efectos en Humanos</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <div>• Mutaciones genéticas</div>
            <div>• Daño celular</div>
            <div>• Cáncer</div>
          </div>
        </div>
        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2">Protección</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <div>• Blindaje de plomo</div>
            <div>• Campos magnéticos</div>
            <div>• Distancia de la Tierra</div>
          </div>
        </div>
        <div className="bg-[#232b3b]/50 backdrop-blur border border-white/10 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-2">Aplicaciones</h4>
          <div className="text-gray-300 text-sm space-y-1">
            <div>• Datación por carbono</div>
            <div>• Medicina nuclear</div>
            <div>• Investigación espacial</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualLaboratory; 