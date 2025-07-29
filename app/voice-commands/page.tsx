"use client";

import React, { useState, useRef } from 'react';
import { Mic, CheckCircle, XCircle, Volume2, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const comandosReales = [
  { comando: 'Mostrar asteroides', descripcion: 'Abre la sección de asteroides cercanos a la Tierra.' },
  { comando: 'Buscar exoplanetas', descripcion: 'Realiza una búsqueda sobre exoplanetas descubiertos.' },
  { comando: 'Activar modo oscuro', descripcion: 'Cambia el tema del dashboard a modo oscuro.' },
  { comando: 'Ir a inicio', descripcion: 'Navega a la página principal del dashboard.' },
  { comando: 'Mostrar clima espacial', descripcion: 'Abre la sección de clima espacial y actividad solar.' },
  { comando: 'Ver satélites', descripcion: 'Muestra información sobre satélites en órbita.' },
  { comando: 'Buscar agujeros negros', descripcion: 'Realiza una búsqueda sobre agujeros negros conocidos.' },
  { comando: 'Mostrar basura espacial', descripcion: 'Abre la sección de monitoreo de basura espacial.' }
];

const accionesReales: Record<string, string> = {
  'mostrar asteroides': 'Navegando a la sección de asteroides... 🪨',
  'buscar exoplanetas': 'Buscando información sobre exoplanetas... 🌍',
  'activar modo oscuro': 'Cambiando a modo oscuro... 🌙',
  'ir a inicio': 'Redirigiendo a la página principal... 🏠',
  'mostrar clima espacial': 'Abriendo datos de clima espacial... ☀️',
  'ver satélites': 'Mostrando información de satélites... 🛰️',
  'buscar agujeros negros': 'Buscando información sobre agujeros negros... ⚫',
  'mostrar basura espacial': 'Abriendo monitoreo de basura espacial... 🗑️'
};

export default function VoiceCommandsPage() {
  const [escuchando, setEscuchando] = useState(false);
  const [transcripcion, setTranscripcion] = useState('');
  const [resultado, setResultado] = useState<'ok' | 'error' | null>(null);
  const [accion, setAccion] = useState('');
  const recognitionRef = useRef<any>(null);

  // Iniciar reconocimiento de voz real si está disponible
  const handleEscuchar = () => {
    setEscuchando(true);
    setResultado(null);
    setAccion('');
    setTranscripcion('');
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognitionRef.current = recognition;
      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscripcion(event.results[i][0].transcript);
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (interim) setTranscripcion(interim);
      };
      recognition.onend = () => {
        setEscuchando(false);
        procesarComando(transcripcion);
      };
      recognition.onerror = () => {
        setEscuchando(false);
        setResultado('error');
        setAccion('Error al reconocer el comando.');
      };
      recognition.start();
    } else {
      // Simulación si no hay soporte
      setTimeout(() => {
        const comandos = comandosReales.map(c => c.comando.toLowerCase());
        const random = Math.random();
        if (random < 0.7) {
          const idx = Math.floor(Math.random() * comandos.length);
          setTranscripcion(comandosReales[idx].comando);
          procesarComando(comandosReales[idx].comando);
        } else {
          setTranscripcion('Comando no reconocido');
          setResultado('error');
          setAccion('No se reconoció ningún comando válido.');
        }
        setEscuchando(false);
      }, 2000);
    }
  };

  const procesarComando = (texto: string) => {
    const comando = texto.trim().toLowerCase();
    if (accionesReales[comando]) {
      setResultado('ok');
      setAccion(accionesReales[comando]);
    } else {
      setResultado('error');
      setAccion('No se reconoció ningún comando válido.');
    }
  };

  const handleDetener = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setEscuchando(false);
    }
  };

  return (
    <div className="wrapper mx-auto max-w-3xl py-8 px-4">
      {/* Header */}
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Comandos de Voz</h1>
        <p className="subtitle max-w-2xl mx-auto">
          Controla el dashboard y accede a funciones usando tu voz. Prueba los comandos sugeridos o crea los tuyos propios.
        </p>
      </div>
      {/* Demo interactivo */}
      <div className="glass-card p-8 flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Mic className={`w-14 h-14 ${escuchando ? 'animate-pulse text-blue-400' : 'text-gray-400'}`} />
          {escuchando && <Loader2 className="absolute -right-6 top-2 w-6 h-6 animate-spin text-blue-400" />}
        </div>
        <Button onClick={escuchando ? handleDetener : handleEscuchar} className="mb-4 bg-blue-600 hover:bg-blue-700">
          {escuchando ? 'Detener' : 'Hablar ahora'}
        </Button>
        <div className="h-8 flex items-center text-lg font-mono text-white">
          {escuchando && <span className="animate-pulse">{transcripcion || 'Escuchando...'}</span>}
          {!escuchando && transcripcion && (
            resultado === 'ok' ? (
              <span className="flex items-center text-green-400 font-semibold"><CheckCircle className="w-5 h-5 mr-1" /> {transcripcion}</span>
            ) : resultado === 'error' ? (
              <span className="flex items-center text-red-400 font-semibold"><XCircle className="w-5 h-5 mr-1" /> {transcripcion}</span>
            ) : null
          )}
        </div>
        {accion && (
          <div className={`mt-4 text-center rounded-lg px-4 py-2 ${resultado === 'ok' ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'}`}>
            <Sparkles className="inline w-5 h-5 mr-2" />{accion}
          </div>
        )}
        <div className="text-xs text-gray-400 mt-2">{typeof window !== 'undefined' && 'webkitSpeechRecognition' in window ? 'Reconocimiento de voz real (Web Speech API)' : '(Simulación: reconocimiento de voz básico)'}</div>
      </div>
      {/* Ejemplos de comandos */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center"><Volume2 className="w-5 h-5 mr-2" />Ejemplos de comandos</h2>
        <ul className="space-y-2">
          {comandosReales.map((c, i) => (
            <li key={i} className="flex flex-col md:flex-row md:items-center md:gap-4">
              <span className="font-mono text-white bg-gray-800/60 rounded px-2 py-1 text-sm">{c.comando}</span>
              <span className="text-gray-300 text-sm">{c.descripcion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 