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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="COSMIC EYE" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="description" content="Plataforma de monitoreo en tiempo real de objetos espaciales y señales anómalas" />
        <meta name="keywords" content="espacio, astronomía, satélites, exoplanetas, NASA, ESA, monitoreo espacial" />
        <meta property="og:title" content="COSMIC EYE - Monitoreo Espacial" />
        <meta property="og:description" content="Plataforma de monitoreo en tiempo real de objetos espaciales" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icon-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="COSMIC EYE - Monitoreo Espacial" />
        <meta name="twitter:description" content="Plataforma de monitoreo en tiempo real de objetos espaciales" />
        <meta name="twitter:image" content="/icon-512x512.png" />
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
        <footer className="w-full text-center text-xs text-gray-400 py-4 border-t border-gray-800 mt-8">
          Este sitio utiliza datos públicos de NASA, NOAA, JPL, ESA y otras agencias. Todos los datos y visualizaciones son solo para fines educativos y de divulgación. Las imágenes y datos pertenecen a sus respectivos autores y fuentes. Si tienes dudas sobre el uso de algún dato o imagen, contáctanos.
        </footer>
      </body>
    </html>
  );
}