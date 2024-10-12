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

const THEME_COLORS = {
  default: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ffffff',
    text: '#333333',
    muted: '#95a5a6',
  },
  colorful: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#feca57',
    background: '#f7f1e3',
    text: '#2d3436',
    muted: '#778ca3',
  },
  monochrome: {
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#7f8c8d',
    background: '#ecf0f1',
    text: '#2c3e50',
    muted: '#bdc3c7',
  },
  pastel: {
    primary: '#a8d8ea',
    secondary: '#aa96da',
    accent: '#fcbad3',
    background: '#ffffd2',
    text: '#5d576b',
    muted: '#e6e6e6',
  },
  neon: {
    primary: '#00ff00',
    secondary: '#ff00ff',
    accent: '#00ffff',
    background: '#000000',
    text: '#ffffff',
    muted: '#444444',
  },
};

export function ColorSchemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState('default');
  const [customColors, setCustomColors] = useState({
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ffffff',
    text: '#333333',
    muted: '#95a5a6',
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
      applyColors(customColors);
    } else {
      applyColors(THEME_COLORS[colorScheme]);
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
      applyColors(newColors);
    }
  };

  const applyColors = (colors) => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
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
    const colors = colorScheme === 'custom' ? customColors : THEME_COLORS[colorScheme];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
  }, [colorScheme, customColors]);

  return <>{children}</>;
}
