"use client";

import React, { useState, useRef } from 'react';
import { Send, MessageCircle, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AstronomicalChatbotPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu asistente astronómico. Pregúntame sobre el universo, misiones espaciales, planetas, estrellas y más.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchChatResponse = async (question: string) => {
    setLoading(true);
    setError(null);
    try {
      // Llamada real a la API del chatbot
      const response = await fetch('/api/astronomical-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      if (!response.ok) throw new Error('No se pudo obtener respuesta del chatbot');
      const data = await response.json();
      setMessages(prev => ([...prev, { role: 'user', content: question }, { role: 'assistant', content: data.answer || 'No se pudo obtener respuesta.' }]));
    } catch (err) {
      setMessages(prev => ([...prev, { role: 'user', content: question }]));
      setError('No se pudo obtener respuesta del chatbot.');
    } finally {
      setLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    fetchChatResponse(input.trim());
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white/10 rounded-xl shadow-lg p-6 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'assistant' ? 'bg-blue-800/80 text-white' : 'bg-blue-400/80 text-white'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {error && (
          <div className="flex items-center text-red-400 mb-2"><AlertTriangle className="h-4 w-4 mr-2" />{error}</div>
        )}
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </div>
    </div>
  );
} 