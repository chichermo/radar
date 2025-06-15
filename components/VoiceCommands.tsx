"use client";

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Settings } from 'lucide-react';

// Declaraciones de tipos para SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
  keywords: string[];
}

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const recognitionRef = useRef<any>(null);

  // Comandos de voz disponibles
  const availableCommands: VoiceCommand[] = [
    {
      command: 'mostrar exoplanetas',
      action: () => {
        window.location.href = '/exoplanets';
      },
      description: 'Navegar a la página de exoplanetas',
      keywords: ['exoplanetas', 'planetas', 'mostrar exoplanetas', 'ir a exoplanetas']
    },
    {
      command: 'mostrar satélites',
      action: () => {
        window.location.href = '/orbital';
      },
      description: 'Navegar a la página de satélites',
      keywords: ['satélites', 'orbital', 'mostrar satélites', 'ir a satélites']
    },
    {
      command: 'clima espacial',
      action: () => {
        window.location.href = '/space-weather';
      },
      description: 'Navegar a la página del clima espacial',
      keywords: ['clima', 'espacial', 'clima espacial', 'tiempo espacial']
    },
    {
      command: 'buscar jupiter',
      action: () => {
        // Simular búsqueda de Júpiter
        console.log('Buscando información sobre Júpiter...');
      },
      description: 'Buscar información sobre Júpiter',
      keywords: ['jupiter', 'júpiter', 'buscar jupiter', 'información jupiter']
    },
    {
      command: 'alertas activas',
      action: () => {
        // Mostrar alertas activas
        console.log('Mostrando alertas activas...');
      },
      description: 'Mostrar alertas espaciales activas',
      keywords: ['alertas', 'activas', 'alertas activas', 'mostrar alertas']
    },
    {
      command: 'estadísticas',
      action: () => {
        window.location.href = '/metrics';
      },
      description: 'Mostrar estadísticas del sistema',
      keywords: ['estadísticas', 'métricas', 'mostrar estadísticas', 'datos']
    }
  ];

  useEffect(() => {
    setCommands(availableCommands);
    
    // Verificar soporte de reconocimiento de voz
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        // Procesar comando cuando se detecta uno final
        if (finalTranscript) {
          processCommand(finalTranscript.toLowerCase());
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Error en reconocimiento de voz:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const processCommand = (command: string) => {
    console.log('Comando detectado:', command);
    
    // Buscar comando que coincida
    const matchedCommand = commands.find(cmd => 
      cmd.keywords.some(keyword => command.includes(keyword))
    );
    
    if (matchedCommand) {
      console.log('Ejecutando comando:', matchedCommand.command);
      matchedCommand.action();
      
      // Feedback visual/auditivo
      speakResponse(`Ejecutando ${matchedCommand.description}`);
    } else {
      console.log('Comando no reconocido:', command);
      speakResponse('Comando no reconocido. Di "ayuda" para ver comandos disponibles.');
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!isSupported) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const showHelp = () => {
    const helpText = commands.map(cmd => 
      `${cmd.command}: ${cmd.description}`
    ).join('. ');
    
    speakResponse(`Comandos disponibles: ${helpText}`);
  };

  if (!isSupported) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center">
          <MicOff className="w-6 h-6 text-red-400 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-white">Comandos de Voz</h3>
            <p className="text-gray-400">Tu navegador no soporta reconocimiento de voz</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Mic className="w-6 h-6 text-blue-400 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-white">Comandos de Voz</h3>
            <p className="text-gray-400">Controla la aplicación con tu voz</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={showHelp}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Mostrar ayuda"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title={isListening ? 'Detener escucha' : 'Iniciar escucha'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Estado de escucha */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Estado:</span>
          <span className={`text-sm font-medium ${
            isListening ? 'text-green-400' : 'text-gray-400'
          }`}>
            {isListening ? 'Escuchando...' : 'Inactivo'}
          </span>
        </div>
        
        {isListening && (
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="text-xs text-blue-400">Escuchando comandos...</span>
          </div>
        )}
      </div>

      {/* Transcripción */}
      {transcript && (
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Comando detectado:</div>
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3">
            <p className="text-white">{transcript}</p>
          </div>
        </div>
      )}

      {/* Comandos disponibles */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Comandos disponibles:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {commands.map((cmd, index) => (
            <div key={index} className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-3">
              <div className="font-medium text-white text-sm">{cmd.command}</div>
              <div className="text-xs text-gray-400">{cmd.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Instrucciones */}
      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
        <div className="flex items-start">
          <Volume2 className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
          <div className="text-sm text-blue-200">
            <strong>Instrucciones:</strong> Haz clic en el micrófono y di uno de los comandos disponibles. 
            El sistema reconocerá tu voz y ejecutará la acción correspondiente.
          </div>
        </div>
      </div>
    </div>
  );
} 