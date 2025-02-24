import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export function ThemeToggle({ isDarkTheme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="btn btn-primary inline-flex items-center"
    >
      {isDarkTheme ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
      <span className="ml-2">{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
}