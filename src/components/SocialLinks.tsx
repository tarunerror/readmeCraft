import React from 'react';
import { Social } from '../types';
import { Github, Twitter, Linkedin, Instagram, Code2, Terminal, Hash, Binary, Cpu } from 'lucide-react';

interface SocialLinksProps {
  socials: Social[];
  onUpdate: (index: number, value: string) => void;
}

export function SocialLinks({ socials, onUpdate }: SocialLinksProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {socials.map((social, index) => (
        <div
          key={social.name}
          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
        >
          {React.cloneElement(social.icon, { className: 'w-6 h-6 text-gray-700 dark:text-gray-400' })}
          <input
            type="text"
            value={social.value}
            onChange={(e) => onUpdate(index, e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder={social.placeholder}
            aria-label={`Enter your ${social.name} ${social.placeholder}`}
          />
        </div>
      ))}
    </div>
  );
}