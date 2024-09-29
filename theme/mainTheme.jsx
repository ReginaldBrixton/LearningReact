'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ColorSchemeContext = createContext();

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};

const COLOR_SCHEMES = ['default', 'colorful', 'monochrome', 'pastel', 'neon', 'custom'];

export function ColorSchemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState('default');
  const [customColors, setCustomColors] = useState({
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
  });

  useEffect(() => {
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme && COLOR_SCHEMES.includes(savedScheme)) {
      setColorScheme(savedScheme);
    }
    const savedCustomColors = localStorage.getItem('customColors');
    if (savedCustomColors) {
      setCustomColors(JSON.parse(savedCustomColors));
    }
  }, []);

  useEffect(() => {
    if (colorScheme === 'custom') {
      applyCustomColors(customColors);
    }
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme, customColors]);

  const changeColorScheme = (newScheme) => {
    if (COLOR_SCHEMES.includes(newScheme)) {
      setColorScheme(newScheme);
      localStorage.setItem('colorScheme', newScheme);
    }
  };

  const updateCustomColors = (newColors) => {
    setCustomColors(newColors);
    localStorage.setItem('customColors', JSON.stringify(newColors));
    if (colorScheme === 'custom') {
      applyCustomColors(newColors);
    }
  };

  const applyCustomColors = (colors) => {
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, changeColorScheme, customColors, updateCustomColors }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function MainThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    </NextThemesProvider>
  );
}

export function ClientLayout({ children }) {
  const { colorScheme, customColors } = useColorScheme();

  useEffect(() => {
    if (colorScheme === 'custom') {
      document.documentElement.style.setProperty('--custom-primary-color', customColors.primary);
      document.documentElement.style.setProperty('--custom-secondary-color', customColors.secondary);
      document.documentElement.style.setProperty('--custom-accent-color', customColors.accent);
    }
  }, [colorScheme, customColors]);

  return <>{children}</>;
}
