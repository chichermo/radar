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