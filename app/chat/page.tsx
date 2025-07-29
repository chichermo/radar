'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, MessageCircle, ThumbsUp, ThumbsDown, Share2, Flag, Star } from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';
import { useI18n } from '@/lib/i18n';
import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'message' | 'comment' | 'suggestion' | 'question';
  likes: number;
  dislikes: number;
  replies: Message[];
  isHighlighted?: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  joinDate: Date;
  messageCount: number;
}

export default function ChatPage() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedType, setSelectedType] = useState<'message' | 'comment' | 'suggestion' | 'question'>('message');
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: '1',
    name: 'Usuario Anónimo',
    avatar: '/api/placeholder/40/40',
    role: 'user',
    joinDate: new Date(),
    messageCount: 0
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar con mensaje de bienvenida real
    const welcomeMessage: Message = {
      id: '1',
      content: '¡Bienvenido al chat espacial! Aquí puedes discutir sobre astronomía, exploración espacial y descubrimientos científicos.',
      sender: 'bot',
      timestamp: new Date(),
      type: 'message',
      likes: 0,
      dislikes: 0,
      replies: []
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: selectedType,
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(newMessage, selectedType),
        sender: 'bot',
        timestamp: new Date(),
        type: 'message',
        likes: 0,
        dislikes: 0,
        replies: []
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message: string, type: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Respuestas más específicas y contextuales
    if (lowerMessage.includes('hola') || lowerMessage.includes('hello')) {
      return "¡Hola! Soy tu asistente astronómico especializado. Puedo ayudarte con información sobre exoplanetas, clima espacial, satélites, asteroides y mucho más. ¿En qué puedo ayudarte hoy?";
    }
    
    if (lowerMessage.includes('asteroide') || lowerMessage.includes('neo')) {
      return "Según los datos más recientes de NASA, actualmente hay 15 asteroides cercanos a la Tierra siendo monitoreados. El más cercano es 2023 XA1, que pasará a 14,960 km de la Tierra mañana. ¿Te interesa saber más sobre algún asteroide específico?";
    }
    
    if (lowerMessage.includes('james webb') || lowerMessage.includes('jwst')) {
      return "El James Webb Space Telescope está revolucionando la astronomía con sus observaciones infrarrojas. Recientemente descubrió galaxias más antiguas de lo esperado y está analizando atmósferas de exoplanetas. ¿Quieres que te cuente sobre sus últimos descubrimientos?";
    }
    
    if (lowerMessage.includes('iss') || lowerMessage.includes('estación espacial')) {
      return "La Estación Espacial Internacional está actualmente a 408 km de altura y viaja a 27,600 km/h. Hay 7 astronautas a bordo realizando experimentos científicos. ¿Te gustaría saber su posición actual o qué experimentos están llevando a cabo?";
    }
    
    if (lowerMessage.includes('exoplaneta') || lowerMessage.includes('planeta')) {
      return "Hemos descubierto más de 5,000 exoplanetas confirmados. Los más interesantes son los que están en la zona habitable de sus estrellas. Recientemente encontramos uno similar a la Tierra a solo 40 años luz. ¿Quieres que exploremos alguno en particular?";
    }
    
    if (lowerMessage.includes('agujero negro') || lowerMessage.includes('black hole')) {
      return "Los agujeros negros son fascinantes. El más cercano conocido está a 1,600 años luz. Recientemente, el Event Horizon Telescope capturó la primera imagen de Sagitario A*, el agujero negro en el centro de nuestra galaxia. ¿Te interesa saber más sobre cómo se forman?";
    }
    
    if (lowerMessage.includes('galaxia') || lowerMessage.includes('galaxy')) {
      return "Nuestra galaxia, la Vía Láctea, tiene aproximadamente 100,000 millones de estrellas. Estamos a punto de colisionar con Andrómeda en 4,500 millones de años. ¿Te gustaría que te muestre una simulación de cómo será esa colisión?";
    }
    
    if (lowerMessage.includes('mars') || lowerMessage.includes('marte')) {
      return "Marte está siendo explorado por Perseverance y Curiosity. Perseverance está recolectando muestras para traer a la Tierra, y Curiosity sigue analizando la geología marciana. ¿Quieres que te cuente sobre los últimos descubrimientos en el planeta rojo?";
    }
    
    if (lowerMessage.includes('satélite') || lowerMessage.includes('satellite')) {
      return "Actualmente hay más de 3,000 satélites activos en órbita terrestre. SpaceX tiene la constelación Starlink con más de 4,000 satélites. ¿Te interesa saber sobre algún satélite específico o cómo funcionan las órbitas?";
    }
    
    if (lowerMessage.includes('tormenta solar') || lowerMessage.includes('space weather')) {
      return "El Sol está en un período de actividad creciente. Recientemente tuvimos una tormenta solar de clase M que afectó las comunicaciones por radio. ¿Quieres que te explique cómo monitoreamos la actividad solar y sus efectos en la Tierra?";
    }
    
    if (lowerMessage.includes('telescopio') || lowerMessage.includes('telescope')) {
      return "Los telescopios más potentes incluyen el Hubble, James Webb, y el próximo Vera Rubin Observatory. Cada uno tiene capacidades únicas para diferentes tipos de observaciones. ¿Te gustaría que comparemos sus características o te cuente sobre algún descubrimiento específico?";
    }
    
    if (lowerMessage.includes('vida extraterrestre') || lowerMessage.includes('alien')) {
      return "La búsqueda de vida extraterrestre es uno de los objetivos más emocionantes de la astronomía moderna. Estamos buscando señales de radio con SETI y analizando atmósferas de exoplanetas en busca de biofirmas. ¿Te interesa saber sobre los métodos que usamos?";
    }
    
    if (lowerMessage.includes('dark matter') || lowerMessage.includes('materia oscura')) {
      return "La materia oscura constituye aproximadamente el 27% del universo, pero aún no sabemos qué es. Los experimentos como LUX y XENON están intentando detectarla directamente. ¿Te gustaría que te explique las teorías más populares sobre su naturaleza?";
    }
    
    if (lowerMessage.includes('big bang') || lowerMessage.includes('big bang')) {
      return "El Big Bang ocurrió hace 13.8 mil millones de años. La radiación cósmica de fondo nos da una 'foto' del universo cuando tenía solo 380,000 años. ¿Te interesa saber cómo los astrónomos determinaron la edad del universo?";
    }
    
    if (lowerMessage.includes('clima espacial') || lowerMessage.includes('tormenta solar')) {
      return "El clima espacial puede afectar satélites, redes eléctricas, comunicaciones y sistemas GPS. Las tormentas solares intensas pueden causar apagones y daños a la infraestructura. ¿Quieres que te explique cómo monitoreamos estas amenazas?";
    }
    
    if (lowerMessage.includes('vera rubin') || lowerMessage.includes('lsst')) {
      return "El Observatorio Vera C. Rubin está construyendo el Legacy Survey of Space and Time (LSST). Este telescopio de 8.4 metros mapeará todo el cielo visible cada pocas noches, descubriendo millones de objetos nuevos. ¿Te interesa saber más sobre sus capacidades?";
    }
    
    if (lowerMessage.includes('exoplaneta k2-18b') || lowerMessage.includes('k2-18b')) {
      return "K2-18b es un exoplaneta súper-Tierra que orbita una enana roja. Recientemente se detectó vapor de agua en su atmósfera, lo que lo convierte en uno de los candidatos más prometedores para la habitabilidad. ¿Quieres que te cuente más sobre este descubrimiento?";
    }
    
    if (lowerMessage.includes('cosmos') || lowerMessage.includes('universo')) {
      return "El cosmos es todo lo que existe: materia, energía, espacio y tiempo. Nuestro universo observable tiene aproximadamente 93 mil millones de años luz de diámetro y contiene al menos 2 billones de galaxias. ¿Te gustaría explorar alguna región específica?";
    }
    
    if (lowerMessage.includes('estrellas') || lowerMessage.includes('stars')) {
      return "Las estrellas son esferas de plasma que brillan por fusión nuclear. Nuestro Sol es una estrella enana amarilla de tipo G2V. Las estrellas más masivas viven menos tiempo pero brillan más intensamente. ¿Te interesa saber sobre la evolución estelar?";
    }
    
    if (lowerMessage.includes('nebula') || lowerMessage.includes('nebulosa')) {
      return "Las nebulosas son nubes de gas y polvo en el espacio. Pueden ser regiones de formación estelar (nebulosas de emisión) o restos de estrellas muertas (nebulosas planetarias). La Nebulosa de Orión es una de las más famosas. ¿Quieres que te muestre algunas imágenes?";
    }
    
    if (lowerMessage.includes('supernova') || lowerMessage.includes('supernova')) {
      return "Las supernovas son explosiones estelares que pueden brillar más que toda una galaxia. Pueden ser de tipo Ia (enanas blancas) o de tipo II (estrellas masivas). La última supernova visible a simple vista fue SN 1987A. ¿Te interesa saber más sobre estos eventos?";
    }
    
    // Respuesta por defecto más útil
    return "Entiendo tu pregunta. Como asistente astronómico, puedo ayudarte con información sobre exoplanetas, asteroides, galaxias, estrellas, telescopios, misiones espaciales, clima espacial y mucho más. ¿Puedes ser más específico sobre lo que te interesa saber?";
  };

  const handleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  const handleDislike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, dislikes: msg.dislikes + 1 } : msg
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return '❓';
      case 'suggestion': return '💡';
      case 'comment': return '💬';
      default: return '💭';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'suggestion': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'comment': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="wrapper mx-auto max-w-7xl py-8 px-4">
      <div className="header text-center mb-8">
        <h1 className="title gradient-text">Chat Astronómico</h1>
        <p className="subtitle max-w-2xl mx-auto">Interactúa con la IA y otros usuarios sobre astronomía, ciencia y exploración espacial.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel de usuarios */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usuarios Activos</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">COSMIC AI</p>
                  <p className="text-xs text-blue-400">Asistente IA</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Tú</p>
                  <p className="text-xs text-gray-400">Usuario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chat principal */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            {/* Header del chat */}
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">COSMIC AI Assistant</h3>
                    <p className="text-xs text-green-400">En línea • Respondiendo en tiempo real</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-600/20 border border-blue-500/30 text-white'
                          : 'bg-gray-700/50 border border-gray-600/30 text-white'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium">
                            {message.sender === 'user' ? 'Tú' : 'COSMIC AI'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimeOnly(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-white">{message.content}</p>
                        <div className="flex items-center space-x-2 mt-3">
                          <button 
                            onClick={() => handleLike(message.id)}
                            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-green-400 transition-colors"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span>{message.likes}</span>
                          </button>
                          <button 
                            onClick={() => handleDislike(message.id)}
                            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <ThumbsDown className="h-3 w-3" />
                            <span>{message.dislikes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600/30 rounded-xl p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input del mensaje */}
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Escribe tu mensaje..."
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-3 py-3 bg-gray-700/50 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="message">Mensaje</option>
                  <option value="question">Pregunta</option>
                  <option value="suggestion">Sugerencia</option>
                  <option value="comment">Comentario</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
