import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface ProfileFeaturesProps {
  showStats: boolean;
  showTopLangs: boolean;
  showTrophies: boolean;
  showProfileViews: boolean;
  showDevToArticles: boolean;
  onToggleStats: (value: boolean) => void;
  onToggleTopLangs: (value: boolean) => void;
  onToggleTrophies: (value: boolean) => void;
  onToggleProfileViews: (value: boolean) => void;
  onToggleDevToArticles: (value: boolean) => void;
}

export function ProfileFeatures({
  showStats,
  showTopLangs,
  showTrophies,
  showProfileViews,
  showDevToArticles,
  onToggleStats,
  onToggleTopLangs,
  onToggleTrophies,
  onToggleProfileViews,
  onToggleDevToArticles,
}: ProfileFeaturesProps) {
  const features = [
    { label: 'GitHub Stats', checked: showStats, onChange: onToggleStats },
    { label: 'Top Languages', checked: showTopLangs, onChange: onToggleTopLangs },
    { label: 'GitHub Trophies', checked: showTrophies, onChange: onToggleTrophies },
    { label: 'Profile Views', checked: showProfileViews, onChange: onToggleProfileViews },
    { 
      label: 'Dev.to Articles',
      checked: showDevToArticles,
      onChange: onToggleDevToArticles,
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <motion.label
          key={feature.label}
          className="feature-card group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={feature.checked}
              onChange={(e) => feature.onChange(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-2">
              {feature.icon}
              {feature.label}
            </span>
          </div>
        </motion.label>
      ))}
    </div>
  );
}