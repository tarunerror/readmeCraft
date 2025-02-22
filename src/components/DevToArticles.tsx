import React from 'react';
import { motion } from 'framer-motion';
import { DevToArticle } from '../types';
import { Calendar, Clock, Tag } from 'lucide-react';

interface DevToArticlesProps {
  articles: DevToArticle[];
}

export function DevToArticles({ articles }: DevToArticlesProps) {
  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <motion.a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="card p-4 hover:border-indigo-500">
            <h3 className="text-lg font-semibold mb-2 gradient-text">{article.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{article.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.published_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.reading_time_minutes} min read
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {article.tag_list.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}