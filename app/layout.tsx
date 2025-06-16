import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { I18nProvider } from '@/lib/i18n.tsx';

const inter = Inter({ subsets: ['latin'] });

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
      </head>
      <body className={`${inter.className} antialiased`}>
        <I18nProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
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