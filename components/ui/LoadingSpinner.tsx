"use client";

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        role="status"
        aria-label="Cargando"
      >
        <span className="sr-only">{t('common.loading')}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 