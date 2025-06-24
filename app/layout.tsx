import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { I18nProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'COSMIC EYE - Monitoreo Avanzado de Anomalías Espaciales',
  description: 'Plataforma profesional de monitoreo espacial con IA, análisis predictivo y detección de anomalías en tiempo real. Solución empresarial para observatorios, agencias espaciales y centros de investigación.',
  keywords: 'monitoreo espacial, IA, anomalías, satélites, astronomía, predicciones, análisis, observatorio, espacio, tecnología',
  authors: [{ name: 'COSMIC EYE Team' }],
  creator: 'COSMIC EYE',
  publisher: 'COSMIC EYE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cosmic-eye.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'COSMIC EYE - Monitoreo Avanzado de Anomalías Espaciales',
    description: 'Plataforma profesional de monitoreo espacial con IA, análisis predictivo y detección de anomalías en tiempo real.',
    url: 'https://cosmic-eye.com',
    siteName: 'COSMIC EYE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'COSMIC EYE - Monitoreo Espacial Avanzado',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'COSMIC EYE - Monitoreo Avanzado de Anomalías Espaciales',
    description: 'Plataforma profesional de monitoreo espacial con IA y análisis predictivo.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
  classification: 'Space Monitoring Platform',
  other: {
    'mobile-web-app-capable': 'yes',
    'mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-title': 'COSMIC EYE',
    'application-name': 'COSMIC EYE',
    'apple-mobile-web-app-title': 'COSMIC EYE',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#1e40af',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="COSMIC EYE" />
        <meta name="application-name" content="COSMIC EYE" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans bg-black overflow-x-hidden">
        <I18nProvider>
          {/* Fondo animado con estrellas */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
            
            {/* Estrellas animadas */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
            
            {/* Nebulosa flotante */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 min-h-screen">
            <Sidebar />
            <main className="lg:ml-72 min-h-screen">
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}