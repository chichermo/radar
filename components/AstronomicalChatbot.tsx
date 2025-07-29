'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, BookOpen, Eye, Globe, Star } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  category?: 'general' | 'exoplanets' | 'space-weather' | 'satellites' | 'asteroids'
}

interface KnowledgeBase {
  [key: string]: {
    questions: string[]
    answers: string[]
    category: string
  }
}

const AstronomicalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy tu asistente astronomico. Puedo ayudarte con informacion sobre exoplanetas, clima espacial, satelites, asteroides y mucho mas. ¿En que puedo ayudarte hoy?',
      timestamp: new Date(),
      category: 'general'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const knowledgeBase: KnowledgeBase = {
    exoplanets: {
      questions: [
        '¿Que es un exoplaneta?',
        '¿Cuantos exoplanetas se han descubierto?',
        '¿Que es K2-18b?',
        '¿Como se detectan los exoplanetas?',
        '¿Hay exoplanetas habitables?'
      ],
      answers: [
        'Un exoplaneta es un planeta que orbita una estrella diferente al Sol. Son planetas fuera de nuestro sistema solar.',
        'Hasta la fecha se han confirmado mas de 5,000 exoplanetas, con miles mas esperando confirmacion.',
        'K2-18b es un exoplaneta super-Tierra que orbita la estrella enana roja K2-18. Es especialmente interesante porque podria tener agua liquida en su superficie.',
        'Los exoplanetas se detectan principalmente mediante el metodo de transito (cuando pasan frente a su estrella) y el metodo de velocidad radial (midiendo el bamboleo de la estrella).',
        'Si, se han identificado varios exoplanetas en la "zona habitable" de sus estrellas, donde las temperaturas podrian permitir agua liquida.'
      ],
      category: 'exoplanets'
    },
    'space-weather': {
      questions: [
        '¿Que es el clima espacial?',
        '¿Como afecta el clima espacial a la Tierra?',
        '¿Que son las tormentas solares?',
        '¿Como se monitorea el clima espacial?'
      ],
      answers: [
        'El clima espacial se refiere a las condiciones en el espacio que pueden afectar la Tierra y la tecnologia espacial, incluyendo tormentas solares y radiacion cosmica.',
        'Puede afectar satelites, redes electricas, comunicaciones y sistemas GPS. Las tormentas solares intensas pueden causar apagones y danos a la infraestructura.',
        'Las tormentas solares son explosiones de energia del Sol que liberan particulas cargadas y radiacion electromagnetica al espacio.',
        'Se monitorea mediante satelites como SOHO, SDO y la nave espacial Parker Solar Probe, que observan el Sol en tiempo real.'
      ],
      category: 'space-weather'
    },
    satellites: {
      questions: [
        '¿Cuantos satelites hay en orbita?',
        '¿Que es la basura espacial?',
        '¿Como funcionan los satelites GPS?',
        '¿Que es Starlink?'
      ],
      answers: [
        'Actualmente hay mas de 3,000 satelites activos en orbita alrededor de la Tierra, con miles mas de satelites inactivos y basura espacial.',
        'La basura espacial son objetos artificiales en orbita que ya no tienen funcion util, incluyendo satelites muertos, etapas de cohetes y fragmentos de colisiones.',
        'Los satelites GPS transmiten senales de tiempo precisas. Tu dispositivo GPS calcula su posicion comparando las senales de multiples satelites.',
        'Starlink es una constelacion de satelites de SpaceX que proporciona internet de alta velocidad a nivel global, especialmente en areas rurales.'
      ],
      category: 'satellites'
    },
    asteroids: {
      questions: [
        '¿Que son los asteroides?',
        '¿Hay asteroides peligrosos?',
        '¿Como se detectan los asteroides?',
        '¿Que es el cinturon de asteroides?'
      ],
      answers: [
        'Los asteroides son objetos rocosos que orbitan el Sol, principalmente en el cinturon de asteroides entre Marte y Jupiter.',
        'Si, algunos asteroides cercanos a la Tierra (NEOs) podrian ser peligrosos si impactaran la Tierra. Se monitorean constantemente.',
        'Los asteroides se detectan mediante telescopios terrestres y espaciales que buscan objetos en movimiento contra el fondo de estrellas.',
        'El cinturon de asteroides es una region entre las orbitas de Marte y Jupiter donde se encuentran la mayoria de los asteroides del sistema solar.'
      ],
      category: 'asteroids'
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const findBestAnswer = (question: string): string => {
    const questionLower = question.toLowerCase()
    
    for (const category in knowledgeBase) {
      const categoryData = knowledgeBase[category]
      for (let i = 0; i < categoryData.questions.length; i++) {
        const questionKeywords = categoryData.questions[i].toLowerCase().split(' ')
        const inputKeywords = questionLower.split(' ')
        
        const commonKeywords = questionKeywords.filter(keyword => 
          inputKeywords.some(inputKeyword => inputKeyword.includes(keyword) || keyword.includes(inputKeyword))
        )
        
        if (commonKeywords.length >= 2) {
          return categoryData.answers[i]
        }
      }
    }

    if (questionLower.includes('exoplaneta') || questionLower.includes('planeta')) {
      return 'Los exoplanetas son planetas que orbitan estrellas diferentes al Sol. Se han descubierto mas de 5,000 hasta la fecha. ¿Te interesa algun exoplaneta especifico?'
    }
    
    if (questionLower.includes('sol') || questionLower.includes('solar')) {
      return 'El Sol es nuestra estrella mas cercana. Las tormentas solares pueden afectar las comunicaciones y sistemas electricos en la Tierra. ¿Quieres saber mas sobre el clima espacial?'
    }
    
    if (questionLower.includes('satelite') || questionLower.includes('gps')) {
      return 'Los satelites son objetos artificiales que orbitan la Tierra. Se usan para comunicaciones, navegacion, observacion y mas. ¿Que tipo de satelites te interesan?'
    }
    
    if (questionLower.includes('asteroide') || questionLower.includes('meteorito')) {
      return 'Los asteroides son objetos rocosos que orbitan el Sol. Algunos pueden ser peligrosos si se acercan demasiado a la Tierra. ¿Quieres saber mas sobre la deteccion de asteroides?'
    }

    return 'Interesante pregunta. Como asistente astronomico, puedo ayudarte con informacion sobre exoplanetas, clima espacial, satelites, asteroides y mas. ¿Puedes ser mas especifico sobre lo que te interesa?'
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = findBestAnswer(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        category: getCategoryFromInput(input) as Message['category']
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const getCategoryFromInput = (input: string): Message['category'] => {
    const inputLower = input.toLowerCase()
    if (inputLower.includes('exoplaneta') || inputLower.includes('planeta')) return 'exoplanets'
    if (inputLower.includes('sol') || inputLower.includes('solar')) return 'space-weather'
    if (inputLower.includes('satelite') || inputLower.includes('gps')) return 'satellites'
    if (inputLower.includes('asteroide')) return 'asteroids'
    return 'general'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exoplanets': return <Globe className="w-4 h-4" />
      case 'space-weather': return <Sparkles className="w-4 h-4" />
      case 'satellites': return <Eye className="w-4 h-4" />
      case 'asteroids': return <Star className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const filteredMessages = selectedCategory === 'all' 
    ? messages 
    : messages.filter(msg => msg.category === selectedCategory || msg.type === 'user')

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chatbot Astronomico</h1>
          <p className="text-gray-600">Tu asistente de IA para explorar el universo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Categorias</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Todas las conversaciones
                </button>
                
                {Object.keys(knowledgeBase).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {getCategoryIcon(category)}
                    <span className="capitalize">{category.replace('-', ' ')}</span>
                  </button>
                ))}
              </div>

              {/* Sugerencias rapidas */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Preguntas Sugeridas</h3>
                <div className="space-y-2">
                  {Object.entries(knowledgeBase).slice(0, 2).map(([category, data]) => (
                    <div key={category}>
                      <div className="text-sm font-medium text-gray-700 mb-2 capitalize">
                        {category.replace('-', ' ')}
                      </div>
                      {data.questions.slice(0, 2).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(question)}
                          className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 p-2 rounded hover:bg-gray-50"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Area de chat */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Asistente Astronomico</h3>
                    <p className="text-sm text-gray-500">IA especializada en astronomia</p>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu pregunta sobre astronomia..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AstronomicalChatbot 