"use client"

import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[93vh] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-bg">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-white rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-white rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      <p className="text-2xl font-bold text-white animate-pulse animate-text">Loading...</p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin {
          animation: spin 4s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-text {
          animation: text-anim 2s ease-in-out infinite;
        }
        @keyframes text-anim {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bg {
          animation: bg-anim 5s linear infinite;
        }
        @keyframes bg-anim {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}