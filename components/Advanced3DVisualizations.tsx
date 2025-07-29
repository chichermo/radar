'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Orbit, Globe, Star, Satellite, Eye, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

interface CelestialBody {
  id: string
  name: string
  type: 'planet' | 'star' | 'satellite' | 'asteroid'
  position: { x: number; y: number; z: number }
  size: number
  color: string
  orbitRadius?: number
  orbitSpeed?: number
}

const Advanced3DVisualizations: React.FC = () => {
  const [viewMode, setViewMode] = useState<'solar-system' | 'galaxy' | 'satellites' | 'asteroids'>('solar-system')
  const [camera, setCamera] = useState({ x: 0, y: 0, z: 500 })
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  const solarSystemBodies: CelestialBody[] = [
    { id: 'sun', name: 'Sol', type: 'star', position: { x: 0, y: 0, z: 0 }, size: 50, color: '#FFD700' },
    { id: 'mercury', name: 'Mercurio', type: 'planet', position: { x: 100, y: 0, z: 0 }, size: 8, color: '#8B7355', orbitRadius: 100, orbitSpeed: 0.02 },
    { id: 'venus', name: 'Venus', type: 'planet', position: { x: 150, y: 0, z: 0 }, size: 12, color: '#FFA500', orbitRadius: 150, orbitSpeed: 0.015 },
    { id: 'earth', name: 'Tierra', type: 'planet', position: { x: 200, y: 0, z: 0 }, size: 15, color: '#4169E1', orbitRadius: 200, orbitSpeed: 0.01 },
    { id: 'mars', name: 'Marte', type: 'planet', position: { x: 250, y: 0, z: 0 }, size: 10, color: '#CD5C5C', orbitRadius: 250, orbitSpeed: 0.008 },
    { id: 'jupiter', name: 'Jupiter', type: 'planet', position: { x: 350, y: 0, z: 0 }, size: 25, color: '#DEB887', orbitRadius: 350, orbitSpeed: 0.005 },
    { id: 'saturn', name: 'Saturno', type: 'planet', position: { x: 450, y: 0, z: 0 }, size: 20, color: '#F4A460', orbitRadius: 450, orbitSpeed: 0.004 }
  ]

  const satelliteBodies: CelestialBody[] = [
    { id: 'iss', name: 'ISS', type: 'satellite', position: { x: 0, y: 0, z: 0 }, size: 5, color: '#87CEEB' },
    { id: 'starlink1', name: 'Starlink-1', type: 'satellite', position: { x: 50, y: 0, z: 0 }, size: 3, color: '#32CD32' },
    { id: 'starlink2', name: 'Starlink-2', type: 'satellite', position: { x: -50, y: 0, z: 0 }, size: 3, color: '#32CD32' },
    { id: 'gps1', name: 'GPS-1', type: 'satellite', position: { x: 0, y: 50, z: 0 }, size: 4, color: '#FF6347' },
    { id: 'gps2', name: 'GPS-2', type: 'satellite', position: { x: 0, y: -50, z: 0 }, size: 4, color: '#FF6347' }
  ]

  const asteroidBodies: CelestialBody[] = [
    { id: 'asteroid1', name: 'Asteroid-1', type: 'asteroid', position: { x: 100, y: 50, z: 0 }, size: 6, color: '#A0522D' },
    { id: 'asteroid2', name: 'Asteroid-2', type: 'asteroid', position: { x: -100, y: -50, z: 0 }, size: 8, color: '#8B4513' },
    { id: 'asteroid3', name: 'Asteroid-3', type: 'asteroid', position: { x: 150, y: -100, z: 0 }, size: 4, color: '#654321' },
    { id: 'asteroid4', name: 'Asteroid-4', type: 'asteroid', position: { x: -150, y: 100, z: 0 }, size: 10, color: '#8B7355' }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      drawSpaceBackground(ctx, canvas.width, canvas.height)
      
      let bodies: CelestialBody[] = []
      switch (viewMode) {
        case 'solar-system':
          bodies = solarSystemBodies
          break
        case 'satellites':
          bodies = satelliteBodies
          break
        case 'asteroids':
          bodies = asteroidBodies
          break
        case 'galaxy':
          bodies = generateGalaxyBodies()
          break
      }

      updateOrbitalPositions(bodies)
      drawBodies3D(ctx, bodies, canvas.width, canvas.height)
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [viewMode, camera, rotation, zoom])

  const drawSpaceBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2)
    gradient.addColorStop(0, '#0B1426')
    gradient.addColorStop(0.5, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#FFFFFF'
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 1.5
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    if (viewMode === 'galaxy') {
      drawNebulae(ctx, width, height)
    }
  }

  const drawNebulae = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gradient1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.3, height * 0.3, 100)
    gradient1.addColorStop(0, 'rgba(255, 0, 255, 0.1)')
    gradient1.addColorStop(1, 'rgba(255, 0, 255, 0)')
    ctx.fillStyle = gradient1
    ctx.fillRect(0, 0, width, height)

    const gradient2 = ctx.createRadialGradient(width * 0.7, height * 0.7, 0, width * 0.7, height * 0.7, 80)
    gradient2.addColorStop(0, 'rgba(0, 255, 255, 0.1)')
    gradient2.addColorStop(1, 'rgba(0, 255, 255, 0)')
    ctx.fillStyle = gradient2
    ctx.fillRect(0, 0, width, height)
  }

  const generateGalaxyBodies = (): CelestialBody[] => {
    const bodies: CelestialBody[] = []
    
    bodies.push({
      id: 'galaxy-center',
      name: 'Centro Galactico',
      type: 'star',
      position: { x: 0, y: 0, z: 0 },
      size: 30,
      color: '#FFD700'
    })

    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 4
      const radius = 50 + (i * 3)
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      bodies.push({
        id: `star-${i}`,
        name: `Estrella-${i}`,
        type: 'star',
        position: { x, y, z: 0 },
        size: Math.random() * 3 + 1,
        color: ['#FFFFFF', '#87CEEB', '#FFB6C1', '#F0E68C'][Math.floor(Math.random() * 4)]
      })
    }

    return bodies
  }

  const updateOrbitalPositions = (bodies: CelestialBody[]) => {
    bodies.forEach(body => {
      if (body.orbitRadius && body.orbitSpeed) {
        const time = Date.now() * body.orbitSpeed
        body.position.x = Math.cos(time) * body.orbitRadius
        body.position.z = Math.sin(time) * body.orbitRadius
      }
    })
  }

  const drawBodies3D = (ctx: CanvasRenderingContext2D, bodies: CelestialBody[], width: number, height: number) => {
    const sortedBodies = [...bodies].sort((a, b) => a.position.z - b.position.z)

    sortedBodies.forEach(body => {
      const scale = 1000 / (1000 + body.position.z + camera.z)
      const x = (body.position.x + camera.x) * scale + width / 2
      const y = (body.position.y + camera.y) * scale + height / 2
      const size = body.size * scale * zoom

      ctx.fillStyle = body.color
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.fill()

      if (body.type === 'planet' && body.name === 'Saturno') {
        ctx.strokeStyle = body.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.ellipse(x, y, size * 1.5, size * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (size > 5) {
        ctx.fillStyle = '#FFFFFF'
        ctx.font = `${Math.max(10, size * 0.5)}px Arial`
        ctx.textAlign = 'center'
        ctx.fillText(body.name, x, y + size + 15)
      }
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      setRotation(prev => ({
        x: prev.x + e.movementY * 0.01,
        y: prev.y + e.movementX * 0.01,
        z: prev.z
      }))
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setZoom(prev => Math.max(0.1, Math.min(3, prev - e.deltaY * 0.001)))
  }

  const resetView = () => {
    setCamera({ x: 0, y: 0, z: 500 })
    setRotation({ x: 0, y: 0, z: 0 })
    setZoom(1)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Visualizaciones 3D Avanzadas</h1>
          <p className="text-gray-600">Explora el universo en tres dimensiones</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de controles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Controles</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Modo de Vista</h3>
                <div className="space-y-2">
                  {[
                    { id: 'solar-system', name: 'Sistema Solar', icon: Orbit },
                    { id: 'galaxy', name: 'Galaxia', icon: Star },
                    { id: 'satellites', name: 'Satelites', icon: Satellite },
                    { id: 'asteroids', name: 'Asteroides', icon: Globe }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        viewMode === mode.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <mode.icon className="w-4 h-4" />
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Camara</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Zoom</label>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.1x</span>
                      <span>3x</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={resetView}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Resetear Vista
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Instrucciones</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Arrastra para rotar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    <span>Rueda para zoom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Click para seleccionar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Area de visualizacion 3D */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {viewMode === 'solar-system' && 'Sistema Solar'}
                  {viewMode === 'galaxy' && 'Via Lactea'}
                  {viewMode === 'satellites' && 'Satelites Terrestres'}
                  {viewMode === 'asteroids' && 'Cinturon de Asteroides'}
                </h2>
                <div className="text-sm text-gray-500">
                  Zoom: {zoom.toFixed(1)}x
                </div>
              </div>

              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 cursor-grab active:cursor-grabbing"
                  onMouseMove={handleMouseMove}
                  onWheel={handleWheel}
                />
                
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  {viewMode === 'solar-system' && '8 planetas principales'}
                  {viewMode === 'galaxy' && '50+ estrellas visibles'}
                  {viewMode === 'satellites' && '5 satelites activos'}
                  {viewMode === 'asteroids' && '4 asteroides cercanos'}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {viewMode === 'solar-system' ? '8' :
                     viewMode === 'galaxy' ? '51' :
                     viewMode === 'satellites' ? '5' : '4'}
                  </div>
                  <div className="text-sm text-gray-600">Objetos</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {zoom.toFixed(1)}x
                  </div>
                  <div className="text-sm text-gray-600">Zoom</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(rotation.x * 180 / Math.PI)}°
                  </div>
                  <div className="text-sm text-gray-600">Rotacion X</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(rotation.y * 180 / Math.PI)}°
                  </div>
                  <div className="text-sm text-gray-600">Rotacion Y</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advanced3DVisualizations 