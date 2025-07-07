"use client";

import React from 'react';
import { FileText, AlertTriangle, Scale, Copyright, Users, Shield } from 'lucide-react';
import ClientDate from '@/components/ClientDate';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Términos de Servicio</h1>
          </div>
          <p className="text-sm text-gray-400 mb-8">
            Última actualización: <ClientDate 
              date={new Date()} 
              type="date" 
              options={{
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }}
            />
          </p>
        </div>

        {/* Contenido */}
        <div className="space-y-8">
          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-400" />
              Aceptación de Términos
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Al acceder y utilizar COSMIC EYE, aceptas estar sujeto a estos términos de servicio. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-green-400" />
              Descripción del Servicio
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                COSMIC EYE es una plataforma de monitoreo espacial que proporciona:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Datos en tiempo real de satélites y objetos espaciales</li>
                <li>Información sobre exoplanetas y eventos astronómicos</li>
                <li>Alertas de clima espacial y fenómenos cósmicos</li>
                <li>Herramientas de visualización y análisis</li>
                <li>Contenido educativo sobre astronomía</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
              Uso Aceptable
            </h2>
            <div className="text-gray-300 space-y-4">
              <p><strong className="text-white">Está permitido:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Usar el servicio para fines educativos y de investigación</li>
                <li>Compartir información no comercial</li>
                <li>Crear contenido derivado con atribución</li>
              </ul>
              <p><strong className="text-white">Está prohibido:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Usar el servicio para actividades ilegales</li>
                <li>Intentar acceder no autorizado a nuestros sistemas</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Usar bots o scripts automatizados sin permiso</li>
                <li>Vender o redistribuir nuestros datos sin autorización</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Copyright className="w-6 h-6 mr-2 text-purple-400" />
              Propiedad Intelectual
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong className="text-white">Nuestro contenido:</strong> Todo el contenido original de COSMIC EYE 
                está protegido por derechos de autor y es propiedad de nuestra empresa.
              </p>
              <p>
                <strong className="text-white">Datos de terceros:</strong> Utilizamos datos de fuentes como NASA, ESA, 
                y otros observatorios. Estos datos están sujetos a sus respectivas licencias y políticas.
              </p>
              <p>
                <strong className="text-white">Tu contenido:</strong> Mantienes los derechos sobre el contenido que 
                compartas en nuestra plataforma.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-orange-400" />
              Limitación de Responsabilidad
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong className="text-white">Exención de garantías:</strong> El servicio se proporciona "tal como está" 
                sin garantías de ningún tipo.
              </p>
              <p>
                <strong className="text-white">Limitación de daños:</strong> No seremos responsables por daños indirectos, 
                incidentales o consecuentes.
              </p>
              <p>
                <strong className="text-white">Precisión de datos:</strong> Aunque nos esforzamos por proporcionar 
                información precisa, no garantizamos la exactitud de todos los datos.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Suscripciones y Pagos</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong className="text-white">Suscripciones:</strong> Ofrecemos planes gratuitos y premium. 
                Los pagos se procesan a través de proveedores seguros de terceros.
              </p>
              <p>
                <strong className="text-white">Renovación automática:</strong> Las suscripciones se renuevan 
                automáticamente a menos que las canceles.
              </p>
              <p>
                <strong className="text-white">Reembolsos:</strong> Ofrecemos reembolsos dentro de los primeros 
                30 días de suscripción.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Modificaciones</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación.
              </p>
              <p>
                Te notificaremos sobre cambios importantes por correo electrónico o a través de la plataforma.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Para preguntas sobre estos términos, contáctanos en:
              </p>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p><strong className="text-white">Email:</strong> legal@cosmic-eye.com</p>
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