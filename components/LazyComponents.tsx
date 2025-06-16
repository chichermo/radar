import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy loading de componentes pesados
export const LazyGlobe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
      <div className="text-gray-400">Cargando visualización 3D...</div>
    </div>
  ),
});

export const LazySkymap = dynamic(() => import('./SkyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
      <div className="text-gray-400">Cargando mapa del cielo...</div>
    </div>
  ),
});

// Componentes que se crearán más adelante
// export const LazyOrbitalVisualization = dynamic(() => import('./OrbitalVisualization'), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-96 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
//       <div className="text-gray-400">Cargando visualización orbital...</div>
//     </div>
//   ),
// });

// export const LazySpaceDebrisMap = dynamic(() => import('./SpaceDebrisMap'), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-96 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
//       <div className="text-gray-400">Cargando mapa de basura espacial...</div>
//     </div>
//   ),
// });

// Wrapper para componentes con Suspense
export const withSuspense = (Component: React.ComponentType, fallback?: React.ReactNode) => {
  return (props: any) => (
    <Suspense fallback={fallback || (
      <div className="w-full h-32 bg-gray-800/50 rounded-xl border border-gray-700/50 flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    )}>
      <Component {...props} />
    </Suspense>
  );
};

// Componente de carga optimizado
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
    <span className="ml-2 text-gray-400">Cargando...</span>
  </div>
);

// Componente de error optimizado
export const ErrorBoundary = ({ children, fallback }: { children: React.ReactNode, fallback?: React.ReactNode }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error en componente:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback || (
      <div className="w-full h-32 bg-red-900/20 rounded-xl border border-red-500/30 flex items-center justify-center">
        <div className="text-red-400">Error al cargar el componente</div>
      </div>
    );
  }

  return <>{children}</>;
}; 