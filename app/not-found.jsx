'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const AnimatedNotFound = () => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className={`text-9xl font-bold text-red-500 mb-4 transition-transform duration-300 ${bounce ? 'transform translate-y-[-20px]' : ''}`}>
        404
      </div>
      <div className="text-2xl font-semibold mb-4 text-gray-700">Oops! Page Not Found</div>
      <AlertTriangle className="w-16 h-16 text-yellow-500 animate-pulse" />
      <p className="mt-4 text-gray-600 max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
      >
        Go Home
      </a>
    </div>
  );
};

export default AnimatedNotFound;