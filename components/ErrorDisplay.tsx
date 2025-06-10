"use client";

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface ErrorDisplayProps {
  error: string | Error;
  title?: string;
  onDismiss?: () => void;
  showDetails?: boolean;
}

export default function ErrorDisplay({ 
  error, 
  title = "Error", 
  onDismiss, 
  showDetails = true 
}: ErrorDisplayProps) {
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errorMessage}</p>
            
            {showDetails && errorStack && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setShowFullDetails(!showFullDetails)}
                  className="text-red-600 hover:text-red-500 underline text-xs"
                >
                  {showFullDetails ? 'Ocultar detalles' : 'Mostrar detalles técnicos'}
                </button>
                
                {showFullDetails && (
                  <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto max-h-32">
                    {errorStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 