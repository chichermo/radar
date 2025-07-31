"use client";

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Globe, Star, Activity, Zap, Eye, Database } from 'lucide-react';

interface ExoplanetData {
  pl_name: string;
  hostname: string;
  disc_year: number;
  discoverymethod: string;
  pl_rade: number;
  pl_masse: number;
  pl_eqt: number;
  st_dist: number;
}

interface AnalyticsData {
  discoveryTrends: { year: number; count: number }[];
  methodDistribution: { method: string; count: number; percentage: number }[];
  habitabilityMetrics: {
    earthLike: number;
    superEarths: number;
    gasGiants: number;
    habitable: number;
  };
  distanceAnalysis: {
    nearest: number;
    average: number;
    within100ly: number;
  };
}

export default function ExoplanetAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'discoveries' | 'methods' | 'habitability' | 'distance'>('discoveries');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/exoplanets');
      
      if (response.ok) {
        const exoplanets: ExoplanetData[] = await response.json();
        const processedAnalytics = processExoplanetData(exoplanets);
        setAnalytics(processedAnalytics);
      } else {
        // Datos simulados de fallback
        setAnalytics(generateMockAnalytics());
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics(generateMockAnalytics());
    } finally {
      setLoading(false);
    }
  };

  const processExoplanetData = (exoplanets: ExoplanetData[]): AnalyticsData => {
    // Tendencias de descubrimiento por año
    const yearCounts = exoplanets.reduce((acc, planet) => {
      const year = planet.disc_year;
      if (year && year > 1995 && year <= 2024) {
        acc[year] = (acc[year] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    const discoveryTrends = Object.entries(yearCounts)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);

    // Distribución de métodos de descubrimiento
    const methodCounts = exoplanets.reduce((acc, planet) => {
      const method = planet.discoverymethod || 'Unknown';
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = exoplanets.length;
    const methodDistribution = Object.entries(methodCounts)
      .map(([method, count]) => ({
        method,
        count,
        percentage: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count);

    // Métricas de habitabilidad
    let earthLike = 0;
    let superEarths = 0;
    let gasGiants = 0;
    let habitable = 0;

    exoplanets.forEach(planet => {
      const radius = planet.pl_rade || 0;
      const temp = planet.pl_eqt || 0;
      
      if (radius > 0) {
        if (radius >= 0.5 && radius <= 1.5) earthLike++;
        else if (radius > 1.5 && radius <= 2.5) superEarths++;
        else if (radius > 2.5) gasGiants++;
      }
      
      if (temp >= 200 && temp <= 350) habitable++;
    });

    // Análisis de distancia
    const distances = exoplanets
      .map(p => p.st_dist)
      .filter(d => d && d > 0);
    
    const nearest = distances.length > 0 ? Math.min(...distances) : 0;
    const average = distances.length > 0 ? distances.reduce((a, b) => a + b, 0) / distances.length : 0;
    const within100ly = distances.filter(d => d <= 100).length;

    return {
      discoveryTrends,
      methodDistribution,
      habitabilityMetrics: { earthLike, superEarths, gasGiants, habitable },
      distanceAnalysis: { nearest, average, within100ly }
    };
  };

  const generateMockAnalytics = (): AnalyticsData => {
    return {
      discoveryTrends: [
        { year: 2020, count: 1569 },
        { year: 2021, count: 1748 },
        { year: 2022, count: 2145 },
        { year: 2023, count: 2389 },
        { year: 2024, count: 2567 }
      ],
      methodDistribution: [
        { method: 'Transit', count: 3245, percentage: 58.2 },
        { method: 'Radial Velocity', count: 1876, percentage: 33.6 },
        { method: 'Direct Imaging', count: 234, percentage: 4.2 },
        { method: 'Gravitational Microlensing', count: 156, percentage: 2.8 },
        { method: 'Astrometry', count: 67, percentage: 1.2 }
      ],
      habitabilityMetrics: {
        earthLike: 342,
        superEarths: 1876,
        gasGiants: 2458,
        habitable: 289
      },
      distanceAnalysis: {
        nearest: 4.24,
        average: 1247.3,
        within100ly: 1456
      }
    };
  };

  const renderDiscoveryChart = () => {
    if (!analytics) return null;
    
    const maxCount = Math.max(...analytics.discoveryTrends.map(d => d.count));
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Tendencias de Descubrimiento</h4>
        <div className="space-y-2">
          {analytics.discoveryTrends.slice(-5).map((item) => (
            <div key={item.year} className="flex items-center gap-3">
              <span className="text-sm text-gray-300 w-12">{item.year}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded-full transition-all duration-1000"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                  {item.count.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMethodDistribution = () => {
    if (!analytics) return null;
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Métodos de Descubrimiento</h4>
        <div className="space-y-3">
          {analytics.methodDistribution.slice(0, 5).map((item, index) => (
            <div key={item.method} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{item.method}</span>
                <span className="text-sm text-blue-400 font-medium">{item.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-purple-500' :
                    index === 2 ? 'bg-green-500' :
                    index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHabitabilityMetrics = () => {
    if (!analytics) return null;
    
    const metrics = [
      { label: 'Similares a la Tierra', value: analytics.habitabilityMetrics.earthLike, color: 'text-green-400', icon: Globe },
      { label: 'Super Tierras', value: analytics.habitabilityMetrics.superEarths, color: 'text-blue-400', icon: Star },
      { label: 'Gigantes Gaseosos', value: analytics.habitabilityMetrics.gasGiants, color: 'text-purple-400', icon: Zap },
      { label: 'Zona Habitable', value: analytics.habitabilityMetrics.habitable, color: 'text-emerald-400', icon: Activity }
    ];
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Métricas de Habitabilidad</h4>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white/5 rounded-lg p-4 text-center">
                <Icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDistanceAnalysis = () => {
    if (!analytics) return null;
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Análisis de Distancias</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-gray-300">Más Cercano</span>
            <span className="text-blue-400 font-semibold">{analytics.distanceAnalysis.nearest.toFixed(2)} ly</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-gray-300">Distancia Promedio</span>
            <span className="text-purple-400 font-semibold">{analytics.distanceAnalysis.average.toFixed(1)} ly</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <span className="text-gray-300">Dentro de 100 ly</span>
            <span className="text-green-400 font-semibold">{analytics.distanceAnalysis.within100ly.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  const metrics = [
    { id: 'discoveries', label: 'Descubrimientos', icon: TrendingUp },
    { id: 'methods', label: 'Métodos', icon: Database },
    { id: 'habitability', label: 'Habitabilidad', icon: Globe },
    { id: 'distance', label: 'Distancias', icon: Eye }
  ];

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-blue-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Análisis de Exoplanetas</h3>
            <p className="text-sm text-gray-300">Tendencias y métricas avanzadas</p>
          </div>
        </div>
      </div>

      {/* Selector de métricas */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedMetric === metric.id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{metric.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido del análisis */}
      <div className="min-h-[300px]">
        {selectedMetric === 'discoveries' && renderDiscoveryChart()}
        {selectedMetric === 'methods' && renderMethodDistribution()}
        {selectedMetric === 'habitability' && renderHabitabilityMetrics()}
        {selectedMetric === 'distance' && renderDistanceAnalysis()}
      </div>
    </div>
  );
}