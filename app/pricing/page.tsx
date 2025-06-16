"use client";

import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Users, Database, Download, Bell, Globe, Shield } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      description: 'Perfecto para empezar',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Acceso básico a datos espaciales',
        'Visualización orbital limitada',
        'Alertas básicas',
        '5 exportaciones por mes',
        'Soporte por email',
        'Anuncios incluidos'
      ],
      icon: Users,
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Para entusiastas del espacio',
      price: { monthly: 9.99, yearly: 99.99 },
      features: [
        'Todo del plan Free',
        'Datos en tiempo real',
        'Exportaciones ilimitadas',
        'Notificaciones push',
        'Analytics avanzados',
        'Sin anuncios',
        'Soporte prioritario',
        'API access limitado'
      ],
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Para organizaciones',
      price: { monthly: 49.99, yearly: 499.99 },
      features: [
        'Todo del plan Pro',
        'API completo',
        'Datos históricos completos',
        'Integración personalizada',
        'Soporte 24/7',
        'Dashboard personalizado',
        'Múltiples usuarios',
        'White-label disponible'
      ],
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      popular: false
    }
  ];

  const getPrice = (plan: any) => {
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
    return price === 0 ? 'Gratis' : `$${price}`;
  };

  const getPeriod = () => {
    return billingCycle === 'monthly' ? '/mes' : '/año';
  };

  const getSavings = (plan: any) => {
    if (billingCycle === 'yearly' && plan.price.monthly > 0) {
      const monthlyTotal = plan.price.monthly * 12;
      const yearlyPrice = plan.price.yearly;
      const savings = ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100;
      return `${Math.round(savings)}% de descuento`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Planes y Precios</h1>
          <p className="text-xl text-gray-300 mb-8">
            Elige el plan perfecto para explorar el cosmos
          </p>
          
          {/* Toggle de facturación */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Mensual
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Anual
            </span>
          </div>
        </div>

        {/* Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const savings = getSavings(plan);
            
            return (
              <div
                key={plan.name}
                className={`relative bg-gray-800/50 border rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{getPrice(plan)}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-400">{getPeriod()}</span>
                    )}
                  </div>
                  
                  {savings && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2 mb-4">
                      <span className="text-green-400 text-sm font-medium">{savings}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      : plan.price.monthly === 0
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {plan.price.monthly === 0 ? 'Comenzar Gratis' : 'Comenzar Ahora'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Características Adicionales */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Características Premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Database className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Datos Completos</h3>
              <p className="text-gray-400 text-sm">
                Acceso a todas las fuentes de datos espaciales
              </p>
            </div>
            <div className="text-center">
              <Download className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Exportaciones</h3>
              <p className="text-gray-400 text-sm">
                Descarga datos en múltiples formatos
              </p>
            </div>
            <div className="text-center">
              <Bell className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Alertas Avanzadas</h3>
              <p className="text-gray-400 text-sm">
                Notificaciones personalizadas en tiempo real
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Soporte Premium</h3>
              <p className="text-gray-400 text-sm">
                Atención prioritaria y soporte técnico
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h3>
              <p className="text-gray-300">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Ofrecen reembolsos?
              </h3>
              <p className="text-gray-300">
                Ofrecemos reembolsos completos dentro de los primeros 30 días de suscripción.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Los datos están actualizados en tiempo real?
              </h3>
              <p className="text-gray-300">
                Sí, todos nuestros datos se actualizan en tiempo real desde las fuentes oficiales.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Puedo cancelar mi suscripción?
              </h3>
              <p className="text-gray-300">
                Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para explorar el cosmos?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de usuarios que ya están descubriendo los secretos del universo
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
            Comenzar Gratis
          </button>
        </section>
      </div>
    </div>
  );
} 