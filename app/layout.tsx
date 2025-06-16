import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard de Monitoreo Espacial',
  description:
    'Plataforma de monitoreo en tiempo real de objetos espaciales y señales anómalas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full bg-gray-900">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="COSMIC EYE" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="description" content="Plataforma de monitoreo en tiempo real de objetos espaciales y señales anómalas" />
        <meta name="keywords" content="espacio, astronomía, satélites, exoplanetas, NASA, ESA, monitoreo espacial" />
        <meta property="og:title" content="COSMIC EYE - Monitoreo Espacial" />
        <meta property="og:description" content="Plataforma de monitoreo en tiempo real de objetos espaciales" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="COSMIC EYE - Monitoreo Espacial" />
        <meta name="twitter:description" content="Plataforma de monitoreo en tiempo real de objetos espaciales" />
        <meta name="twitter:image" content="/icons/icon-512x512.png" />
      </head>
      <body className="h-full font-sans">
        <div className="min-h-full flex flex-col">
          <Navbar />
          <div className="flex flex-1 overflow-hidden pt-16">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-900 p-6 lg:ml-72 transition-all duration-300">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
        {/* Footer con información adicional */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Información Principal */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <img 
                    src="/logorad.png" 
                    alt="Cosmic Eye Logo" 
                    className="w-8 h-8 rounded-lg mr-3"
                  />
                  <h3 className="text-xl font-bold text-white">COSMIC EYE</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Plataforma de monitoreo en tiempo real de objetos espaciales y señales anómalas. 
                  Explora el cosmos desde la comodidad de tu pantalla.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Sistema Activo</span>
                  </div>
                  <div className="text-gray-500">•</div>
                  <div className="text-gray-400 text-sm">Última actualización: hace 2 minutos</div>
                </div>
              </div>

              {/* Enlaces Rápidos */}
              <div>
                <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-2">
                  <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Precios</a></li>
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">Acerca de</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
                  <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">Privacidad</a></li>
                  <li><a href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">Términos</a></li>
                  <li><a href="/legal/attributions" className="text-gray-400 hover:text-white transition-colors">Atribuciones</a></li>
                  <li><a href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-gray-700 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  © {new Date().getFullYear()} COSMIC EYE. Todos los derechos reservados.
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Hecho con ❤️ para exploradores del cosmos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}