import React from 'react';
import { Social } from '../types';
import { motion } from 'framer-motion';

interface SocialLinksProps {
  socials: Social[];
  onUpdate: (index: number, value: string) => void;
}

export function SocialLinks({ socials, onUpdate }: SocialLinksProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center mb-4">🌐 Connect with Me</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socials.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="social-card"
          >
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
              {React.cloneElement(social.icon, { className: 'w-6 h-6 text-indigo-600 dark:text-indigo-400' })}
              <input
                type="text"
                value={social.value}
                onChange={(e) => onUpdate(index, e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder={social.placeholder}
                aria-label={`Enter your ${social.name} ${social.placeholder}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}