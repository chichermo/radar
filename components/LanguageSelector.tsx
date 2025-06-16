"use client";

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n.tsx';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSelector() {
  const { t, changeLanguage, locale, availableLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguageInfo = availableLanguages.find(lang => lang.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentLanguageInfo?.name || locale.toUpperCase()}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/90 border border-gray-700/50 rounded-lg shadow-xl backdrop-blur-sm z-50">
          <div className="py-2">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-700/50 transition-colors ${
                  locale === language.code
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300'
                }`}
              >
                <span>{language.name}</span>
                {locale === language.code && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 