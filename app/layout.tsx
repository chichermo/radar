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
            <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}