
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Quick Stats
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              Sample admin content goes here
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Recent Activity
            </h2>
            <div className="text-gray-600 dark:text-gray-300">
              Sample activity content goes here
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
