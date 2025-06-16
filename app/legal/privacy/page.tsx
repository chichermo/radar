"use client";

import React from 'react';
import { Shield, Eye, Database, Globe, Lock, Users } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Política de Privacidad</h1>
          </div>
          <p className="text-xl text-gray-300">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>

        {/* Contenido */}
        <div className="space-y-8">
          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-400" />
              Información que Recopilamos
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong className="text-white">Información Personal:</strong> Cuando te registras, recopilamos tu nombre, 
                correo electrónico y ubicación geográfica para personalizar tu experiencia.
              </p>
              <p>
                <strong className="text-white">Datos de Uso:</strong> Recopilamos información sobre cómo utilizas nuestra 
                plataforma, incluyendo páginas visitadas, tiempo de sesión y funcionalidades utilizadas.
              </p>
              <p>
                <strong className="text-white">Datos Técnicos:</strong> Información sobre tu dispositivo, navegador, 
                dirección IP y cookies para mejorar el rendimiento y seguridad.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2 text-green-400" />
              Cómo Utilizamos tu Información
            </h2>
            <div className="text-gray-300 space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Personalizar tu experiencia y contenido</li>
                <li>Enviar notificaciones sobre eventos espaciales</li>
                <li>Mejorar nuestros servicios y funcionalidades</li>
                <li>Detectar y prevenir actividades fraudulentas</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-purple-400" />
              Compartir Información
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong className="text-white">No vendemos tu información personal.</strong> Solo compartimos datos con:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
                <li>Autoridades cuando sea requerido por ley</li>
                <li>Socios comerciales con tu consentimiento explícito</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-orange-400" />
              Seguridad de Datos
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                <li>Almacenamiento seguro en servidores protegidos</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo continuo de seguridad</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-yellow-400" />
              Tus Derechos
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>Tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de datos</li>
                <li>Portabilidad de datos</li>
                <li>Retirar el consentimiento en cualquier momento</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Para cualquier pregunta sobre esta política de privacidad, contáctanos en:
              </p>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p><strong className="text-white">Email:</strong> privacy@cosmic-eye.com</p>
                <p><strong className="text-white">Dirección:</strong> [Tu dirección legal]</p>
                <p><strong className="text-white">Teléfono:</strong> [Tu número de contacto]</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 