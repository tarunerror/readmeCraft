import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Technology } from '../types';

interface TechnologySelectorProps {
  technologies: Technology[];
  onToggle: (index: number) => void;
  category: string;
}

export function TechnologySelector({ technologies, onToggle, category }: TechnologySelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{category}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <label
              className={`relative flex flex-col items-center p-3 rounded-lg border transition-all cursor-pointer hover:shadow-lg ${
                tech.selected 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
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
              <img 
                src={tech.badge} 
                alt={tech.name} 
                className="w-full max-w-[150px] transition-transform transform hover:scale-105"
                loading="lazy"
              />
              {tech.selected && (
                <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-indigo-600" />
              )}
              <span className="mt-2 text-sm text-center font-medium text-gray-700 dark:text-gray-300">
                {tech.name}
              </span>
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
}