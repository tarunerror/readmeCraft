import React from 'react';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <a
          href="https://github.com/tarunerror/readmecraft"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
          aria-label="View source on GitHub"
        >
          <Github className="w-5 h-5" />
          <span className="font-medium">View on GitHub</span>
        </a>
      </div>

      <div className="text-center spacing-responsive">
        <h1 className="gradient-text mb-2 sm:mb-4">ReadMeCraft - GitHub Profile README Generator</h1>
        <p className="text-responsive text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">Create an awesome GitHub profile README in minutes</p>
      </div>
    </>
  );
}