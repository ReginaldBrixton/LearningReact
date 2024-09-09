"use client"

import React, { useState, useEffect } from 'react';
import Header from "@/app/header";

// These styles apply to every route in the application
import './globals.css'

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300`}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        {children}
      </body>
    </html>
  );
}