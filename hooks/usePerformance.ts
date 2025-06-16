import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

// Extender Window interface para gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const usePerformance = () => {
  const measurePerformance = useCallback(() => {
    const metrics: Partial<PerformanceMetrics> = {};

    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          metrics.fcp = fcpEntry.startTime;
          console.log('FCP:', metrics.fcp);
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          metrics.lcp = lastEntry.startTime;
          console.log('LCP:', metrics.lcp);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // First Input Delay
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'first-input') {
            const firstInputEntry = entry as any;
            metrics.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
            console.log('FID:', metrics.fid);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    }

    // Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'layout-shift') {
            const layoutShiftEntry = entry as any;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
              metrics.cls = clsValue;
              console.log('CLS:', metrics.cls);
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      console.log('TTFB:', metrics.ttfb);
    }

    return metrics;
  }, []);

  const logPerformanceMetrics = useCallback(() => {
    const metrics = measurePerformance();
    
    // Enviar métricas a analytics (ejemplo)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metrics', {
        event_category: 'Performance',
        event_label: 'Core Web Vitals',
        value: Math.round(metrics.lcp || 0),
        custom_parameter_fcp: Math.round(metrics.fcp || 0),
        custom_parameter_fid: Math.round(metrics.fid || 0),
        custom_parameter_cls: Math.round((metrics.cls || 0) * 1000),
        custom_parameter_ttfb: Math.round(metrics.ttfb || 0),
      });
    }
  }, [measurePerformance]);

  useEffect(() => {
    // Medir rendimiento después de que la página se haya cargado
    if (document.readyState === 'complete') {
      logPerformanceMetrics();
    } else {
      window.addEventListener('load', logPerformanceMetrics);
      return () => window.removeEventListener('load', logPerformanceMetrics);
    }
  }, [logPerformanceMetrics]);

  return {
    measurePerformance,
    logPerformanceMetrics,
  };
};

// Hook para monitorear el rendimiento de componentes específicos
export const useComponentPerformance = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`${componentName} render time:`, duration.toFixed(2), 'ms');
      
      // Alertar si el componente tarda demasiado
      if (duration > 100) {
        console.warn(`${componentName} is taking too long to render:`, duration.toFixed(2), 'ms');
      }
    };
  });
};

// Hook para optimizar re-renders
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
}; 