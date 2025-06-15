'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, MessageCircle, ThumbsUp, ThumbsDown, Share2, Flag, Star } from 'lucide-react';
import { formatDate, formatTimeOnly } from '@/utils/formatters';

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
      content: '¡Hola! Bienvenidos al chat de Cosmic Eye. Aquí pueden compartir sus observaciones, preguntas y sugerencias sobre el monitoreo espacial.',
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000),
      type: 'message',
      likes: 12,
      dislikes: 0,
      replies: []
    },
    {
      id: '2',
      content: '¿Alguien más notó el aumento en la actividad de asteroides este mes? Parece inusual.',
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
      type: 'question',
      likes: 8,
      dislikes: 1,
      replies: [
        {
          id: '2-1',
          content: 'Sí, he estado monitoreando los datos y efectivamente hay un incremento del 15% en detecciones.',
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
      content: 'Sugerencia: Sería genial tener alertas personalizadas por región geográfica.',
      sender: 'user',
      timestamp: new Date(Date.now() - 900000),
      type: 'suggestion',
      likes: 15,
      dislikes: 0,
      replies: []
    },
    {
      id: '4',
      content: 'Excelente trabajo con el dashboard. La visualización 3D es impresionante.',
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
    const responses = {
      question: [
        'Excelente pregunta. Te ayudo a encontrar esa información.',
        'Basándome en los datos actuales, puedo responder tu consulta.',
        'Esa es una observación muy interesante. Déjame investigar.'
      ],
      suggestion: [
        '¡Excelente sugerencia! La tomaremos en cuenta para futuras actualizaciones.',
        'Gracias por tu propuesta. Es muy valiosa para mejorar el sistema.',
        'Interesante idea. La evaluaremos con el equipo de desarrollo.'
      ],
      comment: [
        '¡Gracias por tu comentario! Nos alegra saber que te gusta el sistema.',
        'Apreciamos mucho tu feedback positivo.',
        'Es genial saber que el dashboard está siendo útil.'
      ],
      message: [
        'Entiendo tu mensaje. ¿En qué más puedo ayudarte?',
        'Gracias por compartir eso con nosotros.',
        'Estoy aquí para ayudarte con cualquier consulta.'
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
          Chat Interactivo
        </h1>
        <p className="text-gray-300">
          Comparte tus observaciones, preguntas y sugerencias con la comunidad de Cosmic Eye.
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
                {currentUser.role} • {currentUser.messageCount} mensajes
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">
              Última actividad: {formatTimeOnly(new Date())}
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
            <h2 className="text-white font-medium">Chat en Tiempo Real</h2>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>En línea</span>
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
                          {message.type}
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
                        <span>Compartir</span>
                      </button>
                      <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                        <Flag className="w-3 h-3" />
                        <span>Reportar</span>
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
              <option value="message">Mensaje</option>
              <option value="question">Pregunta</option>
              <option value="suggestion">Sugerencia</option>
              <option value="comment">Comentario</option>
            </select>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
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
              <p className="text-sm text-gray-400">Total Mensajes</p>
              <p className="text-2xl font-bold text-white">{messages.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Usuarios Activos</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Mejor Sugerencia</p>
              <p className="text-2xl font-bold text-white">15</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Respuestas IA</p>
              <p className="text-2xl font-bold text-white">{messages.filter(m => m.sender === 'bot').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reglas del chat */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Reglas de la Comunidad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">✅ Permitido</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Preguntas sobre astronomía y espacio</li>
              <li>• Sugerencias para mejorar el sistema</li>
              <li>• Compartir observaciones interesantes</li>
              <li>• Discusiones científicas respetuosas</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">❌ No Permitido</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Spam o contenido irrelevante</li>
              <li>• Lenguaje ofensivo o discriminatorio</li>
              <li>• Información falsa o conspirativa</li>
              <li>• Promoción comercial no autorizada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
