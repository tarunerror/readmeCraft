import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Book, Users, Sparkles } from 'lucide-react';

interface AboutMeProps {
  currentWork: string;
  setCurrentWork: (value: string) => void;
  learning: string;
  setLearning: (value: string) => void;
  collaboration: string;
  setCollaboration: (value: string) => void;
  funFact: string;
  setFunFact: (value: string) => void;
}

export function AboutMe({
  currentWork,
  setCurrentWork,
  learning,
  setLearning,
  collaboration,
  setCollaboration,
  funFact,
  setFunFact,
}: AboutMeProps) {
  const fields = [
    {
      label: "Current Work",
      value: currentWork,
      onChange: setCurrentWork,
      placeholder: "What are you working on?",
      icon: <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      label: "Learning",
      value: learning,
      onChange: setLearning,
      placeholder: "What are you learning?",
      icon: <Book className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
    {
      label: "Collaboration",
      value: collaboration,
      onChange: setCollaboration,
      placeholder: "Looking to collaborate on...",
      icon: <Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    },
    {
      label: "Fun Fact",
      value: funFact,
      onChange: setFunFact,
      placeholder: "Share something interesting about yourself",
      icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    },
  ];

  return (
    <div className="spacing-responsive">
      <h2 className="section-title">About Me</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="input-group"
          >
            <label className="input-label flex items-center gap-2" htmlFor={field.label.toLowerCase().replace(/\s+/g, '-')}>
              {field.icon}
              {field.label}
            </label>
            <input
              type="text"
              id={field.label.toLowerCase().replace(/\s+/g, '-')}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={field.placeholder}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}