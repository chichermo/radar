'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, MessageCircle, ThumbsUp, ThumbsDown, Share2, Flag, Star } from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';
import { useI18n } from '@/lib/i18n';

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

  // Mensajes iniciales simulados
  const initialMessages: Message[] = [
    {
      id: '1',
      content: t('chat.welcome_message'),
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000),
      type: 'message',
      likes: 12,
      dislikes: 0,
      replies: []
    },
    {
      id: '2',
      content: t('chat.asteroid_activity_question'),
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
      type: 'question',
      likes: 8,
      dislikes: 1,
      replies: [
        {
          id: '2-1',
          content: t('chat.asteroid_activity_response'),
          sender: 'bot',
          timestamp: new Date(Date.now() - 1700000),
          type: 'message',
          likes: 5,
          dislikes: 0,
          replies: []
        }
      ]
    },
    {
      id: '3',
      content: t('chat.geographic_alerts_suggestion'),
      sender: 'user',
      timestamp: new Date(Date.now() - 900000),
      type: 'suggestion',
      likes: 15,
      dislikes: 0,
      replies: []
    },
    {
      id: '4',
      content: t('chat.dashboard_praise'),
      sender: 'user',
      timestamp: new Date(Date.now() - 300000),
      type: 'comment',
      likes: 23,
      dislikes: 0,
      replies: []
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
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
    
    // Respuestas contextuales basadas en palabras clave
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
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('sistema')) {
      return "¡Me alegra que estés usando nuestro dashboard! Integramos datos de múltiples fuentes como NASA, ESA, y observatorios terrestres. ¿Hay alguna funcionalidad específica que te gustaría que mejoremos o alguna nueva característica que te gustaría ver?";
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
      return "¡De nada! Es un placer ayudarte con tus preguntas sobre astronomía y exploración espacial. ¿Hay algo más en lo que pueda asistirte?";
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hello')) {
      return "¡Hola! Soy Cosmic Eye, tu asistente especializado en astronomía. Puedo ayudarte con información sobre planetas, estrellas, galaxias, misiones espaciales y mucho más. ¿En qué te puedo ayudar hoy?";
    }
    
    // Respuestas por tipo si no hay palabras clave específicas
    const responses = {
      question: [
        "Excelente pregunta. Basándome en los datos más recientes de nuestros telescopios y observatorios, puedo darte información detallada sobre eso. ¿Te interesa algún aspecto específico?",
        "Interesante consulta. Los datos de nuestros sensores muestran patrones muy interesantes. ¿Te gustaría que analice algún período específico o profundice en algún punto en particular?",
        "Gran pregunta. Según el análisis de datos en tiempo real, puedo confirmar que sí hay actividad significativa en esa área. ¿Quieres que exploremos más detalles?"
      ],
      suggestion: [
        "¡Excelente idea! Esa funcionalidad sería muy útil para la comunidad astronómica. Voy a registrar tu sugerencia para el equipo de desarrollo. ¿Tienes más detalles sobre cómo te gustaría que funcione?",
        "¡Brillante sugerencia! Eso complementaría perfectamente las funcionalidades existentes del dashboard. ¿Te gustaría que exploremos cómo implementarlo o tienes alguna idea específica?",
        "Me parece una propuesta muy interesante. Eso mejoraría significativamente la experiencia del usuario y la accesibilidad de los datos espaciales. ¿Puedes elaborar más sobre tu idea?"
      ],
      comment: [
        "¡Gracias por compartir tu experiencia! Es muy valioso para nosotros saber cómo está funcionando el sistema para los usuarios. ¿Hay algo específico que te gustaría ver mejorado?",
        "Me alegra saber que estás disfrutando de las funcionalidades del dashboard. Es importante para nosotros recibir feedback constructivo. ¿Hay alguna característica en particular que te gustaría que desarrollemos más?",
        "¡Excelente feedback! Es muy importante para nosotros mantener la calidad y utilidad del sistema. ¿Hay algún aspecto específico que te gustaría que mejoremos?"
      ],
      message: [
        "Entiendo perfectamente. Los datos espaciales pueden ser complejos, pero estamos aquí para hacerlos accesibles y comprensibles. ¿En qué más puedo ayudarte con tu exploración del cosmos?",
        "Interesante punto de vista. La exploración espacial está evolucionando rápidamente con nuevas tecnologías y descubrimientos. ¿Te gustaría que analicemos algún aspecto específico o te cuente sobre las últimas novedades?",
        "Gracias por compartir eso con la comunidad. Es importante mantener estas discusiones constructivas sobre astronomía y exploración espacial. ¿Tienes alguna pregunta específica sobre algún fenómeno cósmico?"
      ]
    };

    const typeResponses = responses[type as keyof typeof responses] || responses.message;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
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
    <div className="space-y-6 ml-64">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('chat.title')}
        </h1>
        <p className="text-gray-300">
          {t('chat.subtitle')}
        </p>
      </header>

      {/* Información del usuario */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{currentUser.name}</h3>
              <p className="text-sm text-gray-400">
                {currentUser.role} • {currentUser.messageCount} {t('chat.messages')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              {t('chat.last_activity')}: {formatTimeOnly(new Date())}
            </p>
          </div>
        </div>
      </div>

      {/* Área de chat */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 h-96 flex flex-col">
        {/* Header del chat */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-medium">{t('chat.realtime_chat')}</h2>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{t('chat.online')}</span>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot' 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                      : 'bg-gradient-to-r from-green-400 to-blue-400'
                  }`}>
                    {message.sender === 'bot' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm">{getTypeIcon(message.type)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(message.type)}`}>
                          {t('chat.' + message.type)}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTimeOnly(message.timestamp)}
                      </p>
                    </div>
                    
                    {/* Acciones del mensaje */}
                    <div className={`flex items-center space-x-2 mt-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <button
                        onClick={() => handleLike(message.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{message.likes}</span>
                      </button>
                      <button
                        onClick={() => handleDislike(message.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <ThumbsDown className="w-3 h-3" />
                        <span>{message.dislikes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors">
                        <Share2 className="w-3 h-3" />
                        <span>{t('chat.share')}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                        <Flag className="w-3 h-3" />
                        <span>{t('chat.report')}</span>
                      </button>
                    </div>

                    {/* Respuestas */}
                    {message.replies.length > 0 && (
                      <div className="mt-3 ml-4 space-y-2">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-600/50 rounded-lg p-2">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                                <Bot className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-xs text-gray-300">Cosmic Eye</span>
                            </div>
                            <p className="text-xs text-gray-300">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input del mensaje */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="message">{t('chat.message')}</option>
              <option value="question">{t('chat.question')}</option>
              <option value="suggestion">{t('chat.suggestion')}</option>
              <option value="comment">{t('chat.comment')}</option>
            </select>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('chat.write_message_placeholder')}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas del chat */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">{t('chat.total_messages')}</p>
              <p className="text-2xl font-bold text-white">{messages.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">{t('chat.active_users')}</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">{t('chat.best_suggestion')}</p>
              <p className="text-2xl font-bold text-white">15</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">{t('chat.ai_responses')}</p>
              <p className="text-2xl font-bold text-white">{messages.filter(m => m.sender === 'bot').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reglas del chat */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          {t('chat.community_rules')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('chat.allowed')}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• {t('chat.allowed_1')}</li>
              <li>• {t('chat.allowed_2')}</li>
              <li>• {t('chat.allowed_3')}</li>
              <li>• {t('chat.allowed_4')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('chat.not_allowed')}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• {t('chat.not_allowed_1')}</li>
              <li>• {t('chat.not_allowed_2')}</li>
              <li>• {t('chat.not_allowed_3')}</li>
              <li>• {t('chat.not_allowed_4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
