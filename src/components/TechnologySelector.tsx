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
    <div>
      <h3 className="text-lg font-semibold mb-3">{category}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {technologies.map((tech, index) => (
          <label
            key={tech.name}
            className={`relative flex items-center p-4 rounded-lg border transition-all cursor-pointer hover:border-indigo-300 ${
              tech.selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
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
              <img src={tech.badge} alt={tech.name} className="w-full transition-transform transform hover:scale-105" />
              {tech.selected && (
                <CheckCircle2 className="w-5 h-5 text-indigo-600 absolute top-2 right-2" />
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
