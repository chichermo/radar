"use client";

import React from 'react';
import { Star, Globe, Eye, Rocket, Atom, Satellite } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const elements = [
    { icon: Star, className: "text-yellow-400/30", delay: 0 },
    { icon: Globe, className: "text-blue-400/30", delay: 2 },
    { icon: Eye, className: "text-purple-400/30", delay: 4 },
    { icon: Rocket, className: "text-red-400/30", delay: 6 },
    { icon: Atom, className: "text-green-400/30", delay: 8 },
    { icon: Satellite, className: "text-cyan-400/30", delay: 10 }
  ];

  return (
    <>
      {elements.map((element, index) => {
        const Icon = element.icon;
        return (
          <div
            key={index}
            className="floating-element"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index * 10)}%`,
              animationDelay: `${element.delay}s`
            }}
          >
            <Icon className={`w-4 h-4 ${element.className}`} />
          </div>
        );
      })}
    </>
  );
};

export default FloatingElements; 