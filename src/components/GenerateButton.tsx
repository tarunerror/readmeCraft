import React from 'react';
import { Code2 } from 'lucide-react';

interface GenerateButtonProps {
  onGenerate: () => void;
}

export function GenerateButton({ onGenerate }: GenerateButtonProps) {
  return (
    <button
      onClick={onGenerate}
      className="w-full btn btn-primary flex items-center justify-center gap-2"
    >
      <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
      Generate README
    </button>
  );
}