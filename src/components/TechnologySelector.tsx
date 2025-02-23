import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Technology } from '../types';

interface TechnologySelectorProps {
  technologies: Technology[];
  onToggle: (index: number) => void;
  category: string;
}

export function TechnologySelector({ technologies, onToggle, category }: TechnologySelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base sm:text-lg font-semibold">{category}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {technologies.map((tech, index) => (
          <label
            key={tech.name}
            className={`relative flex items-center p-2 sm:p-4 rounded-lg border transition-all cursor-pointer hover:border-indigo-300 ${
              tech.selected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'
            }`}
            title={`Select ${tech.name}`}
          >
            <input
              type="checkbox"
              checked={tech.selected}
              onChange={() => onToggle(index)}
              className="absolute opacity-0"
              aria-label={`Select ${tech.name}`}
            />
            <div className="flex flex-col items-center w-full gap-2">
              <img 
                src={tech.badge} 
                alt={tech.name} 
                className="w-full max-w-[120px] transition-transform transform hover:scale-105"
                loading="lazy"
              />
              {tech.selected && (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 absolute top-1 right-1 sm:top-2 sm:right-2" />
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}