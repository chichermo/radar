import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import { I18nProvider } from '@/lib/i18n';
import { GamificationProvider } from '@/components/GamificationSystem';
import { NotificationProvider } from '@/components/NotificationService';
import Navigation from '@/components/Navigation';
import MobileNavigation from '@/components/MobileNavigation';
import HelpGuide from '@/components/HelpGuide';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Espacio Anomalías Dashboard',
  description: 'Explorando el cosmos y descubriendo anomalías espaciales',
  keywords: 'espacio, astronomía, exoplanetas, asteroides, satélites, clima espacial',
  authors: [{ name: 'Espacio Anomalías Team' }],
  creator: 'Espacio Anomalías Team',
  publisher: 'Espacio Anomalías',
  robots: 'index, follow',
  openGraph: {
    title: 'Espacio Anomalías Dashboard',
    description: 'Explorando el cosmos y descubriendo anomalías espaciales',
    url: 'https://espacio-anomalias.com',
    siteName: 'Espacio Anomalías Dashboard',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'Espacio Anomalías Dashboard',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espacio Anomalías Dashboard',
    description: 'Explorando el cosmos y descubriendo anomalías espaciales',
    images: ['/icon.svg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2cc9ff',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2cc9ff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Espacio Anomalías" />
        <meta name="msapplication-TileColor" content="#2cc9ff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        <I18nProvider>
          <GamificationProvider>
            <NotificationProvider>
              {/* Sistema de partículas de fondo */}
              <div className="particle-system">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 8}s`,
                      animationDuration: `${8 + Math.random() * 12}s`
                    }}
                  />
                ))}
              </div>

              {/* Decoraciones SVG inspiradas en Outreach.space */}
              <div className="svg-decoration" style={{ top: '10%', left: '5%', opacity: 0.1 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient1)" strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" values="40;45;40" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2cc9ff" />
                      <stop offset="100%" stopColor="#a2db3c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="svg-decoration" style={{ top: '60%', right: '10%', opacity: 0.1 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <polygon points="40,10 50,30 70,30 55,45 60,65 40,55 20,65 25,45 10,30 30,30" fill="none" stroke="url(#gradient2)" strokeWidth="2" opacity="0.3">
                    <animateTransform attributeName="transform" type="rotate" values="0 40 40;360 40 40" dur="8s" repeatCount="indefinite" />
                  </polygon>
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff6b6b" />
                      <stop offset="100%" stopColor="#2cc9ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Navegación principal */}
              <Navigation />

              {/* Navegación móvil */}
              <MobileNavigation />

              {/* Contenido principal */}
              <main className={styles.main}>
                {children}
              </main>

              {/* Componente de ayuda */}
              <HelpGuide />

              {/* Footer simplificado */}
              <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                  <div className={styles.footerBottom}>
                    <div className={styles.footerCopyright}>
                      © 2024 Espacio Anomalías. Todos los derechos reservados.
                    </div>
                    <div className={styles.footerPoweredBy}>
                      Desarrollado por Espacio Anomalías Team
                    </div>
                  </div>
                </div>
              </footer>
            </NotificationProvider>
          </GamificationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}