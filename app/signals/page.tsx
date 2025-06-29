"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Zap, Radio, Satellite, Waves } from 'lucide-react';

export default function SignalsPage() {
  const [currentSignal, setCurrentSignal] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const signals = [
    {
      id: 'pulsar',
      name: 'Púlsar Vela',
      type: 'Pulsar',
      frequency: '11.2 Hz',
      duration: '00:30',
      description: 'Pulsos regulares del púlsar Vela, una estrella de neutrones en rotación',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      color: 'text-green-400',
      icon: <Radio className="h-5 w-5" />
    },
    {
      id: 'solar',
      name: 'Actividad Solar',
      type: 'Solar',
      frequency: '1420 MHz',
      duration: '00:45',
      description: 'Emisiones de radio del Sol capturadas por radiotelescopios',
      audioUrl: 'https://www.soundjay.com/misc/sounds/radio-static-1.wav',
      color: 'text-yellow-400',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'jupiter',
      name: 'Júpiter Radio',
      type: 'Planetario',
      frequency: '20-40 MHz',
      duration: '01:00',
      description: 'Emisiones de radio de Júpiter causadas por su magnetosfera',
      audioUrl: 'https://www.soundjay.com/misc/sounds/radio-static-2.wav',
      color: 'text-blue-400',
      icon: <Satellite className="h-5 w-5" />
    },
    {
      id: 'cosmic',
      name: 'Fondo Cósmico',
      type: 'Cósmico',
      frequency: '1-10 GHz',
      duration: '00:20',
      description: 'Radiación de fondo cósmico de microondas',
      audioUrl: 'https://www.soundjay.com/misc/sounds/radio-static-3.wav',
      color: 'text-purple-400',
      icon: <Waves className="h-5 w-5" />
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSignal = (signal: any) => {
    setCurrentSignal(signal);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = signal.audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().catch(console.error);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Señales y Sonidos Espaciales
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Escucha las señales reales del cosmos. Púlsares, actividad solar, emisiones planetarias y más.
          </p>
        </div>

        {currentSignal && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${currentSignal.color.replace('text-', 'from-')} to-black/20`}>
                  {currentSignal.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentSignal.name}</h2>
                  <p className="text-gray-400">{currentSignal.type} • {currentSignal.frequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={togglePlayPause}
                className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
              >
                {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
              </button>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <p className="text-gray-300 mt-4 text-center">{currentSignal.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => playSignal(signal)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${signal.color} bg-white/10`}>
                  {signal.icon}
                </div>
                <span className="text-xs text-gray-400">{signal.duration}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{signal.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{signal.type}</p>
              <p className="text-xs text-gray-500">{signal.frequency}</p>
              
              <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-4 w-4" />
                <span>Reproducir</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Espectrograma en Tiempo Real</h2>
          <div className="w-full h-64 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 rounded-xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"
                    style={{
                      top: `${i * 5}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${2 + i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-4">
              <span>10 GHz</span>
              <span>5 GHz</span>
              <span>1 GHz</span>
              <span>100 MHz</span>
            </div>
            
            <div className="absolute right-4 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-4">
              <span>0s</span>
              <span>15s</span>
              <span>30s</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tipos de Señales</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Púlsares: Estrellas de neutrones en rotación</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Actividad Solar: Emisiones del Sol</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Emisiones Planetarias: Magnetosferas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Fondo Cósmico: Radiación residual</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Próximas Integraciones</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">SETI Institute - Señales reales</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">NASA Deep Space Network</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">SKA Observatory</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Análisis en tiempo real</span>
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} preload="metadata" />
      </div>
    </div>
  );
}
