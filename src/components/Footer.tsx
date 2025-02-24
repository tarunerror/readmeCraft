import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
      Made with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> by{' '}
      <a
        href="https://github.com/tarunerror"
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Tarun Gautam
      </a>
    </div>
  );
}