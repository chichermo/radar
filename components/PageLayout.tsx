import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function PageLayout({ 
  children, 
  title, 
  description, 
  className = "" 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen space-y-8 ${className}`}>
      {title && (
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              {description && (
                <p className="text-gray-300 max-w-xl">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
} 