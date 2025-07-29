"use client";

import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function SimulationsPage() {
  // Solo lógica de simulación interactiva, sin datos simulados ni arrays de ejemplo
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  React.useEffect(() => {
    if (isRunning) {
      const animate = () => {
        setTime(prev => prev + speed);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, speed]);

  const startSimulation = () => setIsRunning(true);
  const pauseSimulation = () => setIsRunning(false);
  const resetSimulation = () => { setTime(0); setIsRunning(false); };
  const changeSpeed = (newSpeed: number) => setSpeed(newSpeed);

  return (
    <div className="min-h-screen space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Simulaciones Espaciales</h1>
            <p className="text-gray-300 max-w-xl">
              Explora el cosmos a través de simulaciones interactivas y educativas. Selecciona una simulación para comenzar.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Button onClick={startSimulation} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-2" />Iniciar
              </Button>
              <Button onClick={pauseSimulation} disabled={!isRunning} className="bg-yellow-600 hover:bg-yellow-700">
                <Pause className="h-4 w-4 mr-2" />Pausar
              </Button>
              <Button onClick={resetSimulation} className="bg-red-600 hover:bg-red-700">
                <RotateCcw className="h-4 w-4 mr-2" />Reiniciar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Área de simulación interactiva */}
      <div className="glass-card p-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <span>Simulación Interactiva</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-96 bg-black rounded-lg border border-gray-600"
              style={{ background: 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                {isRunning ? 'Ejecutando' : 'Pausado'}
              </Badge>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                {speed}x
              </Badge>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                Tiempo: {time}
              </Badge>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Mensaje si se requieren datos reales para alguna simulación */}
      <div className="glass-card p-6 text-center text-gray-300">
        Si alguna simulación requiere datos reales, estos se cargarán automáticamente desde APIs externas o se mostrará un mensaje de error si no están disponibles.
      </div>
    </div>
  );
} 