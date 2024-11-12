'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ColorSchemeContext = createContext();

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};

const COLOR_SCHEMES = ['default', 'colorful', 'monochrome', 'pastel', 'neon', 'custom', 'dark', 'light'];

const THEME_COLORS = {
  default: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#f5f7fa',
    text: '#2c3e50',
    muted: '#95a5a6',
    border: '#dcdde1',
    card: '#ffffff',
  },
  dark: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c', 
    background: '#1a1a1a',
    text: '#ffffff',
    muted: '#888888',
    border: '#333333',
    card: '#2d2d2d',
  },
  light: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ffffff', 
    text: '#000000',
    muted: '#666666',
    border: '#e0e0e0',
    card: '#f5f5f5',
  },
  colorful: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#feca57',
    background: '#f7f1e3',
    text: '#2d3436',
    muted: '#778ca3',
    border: '#dcdde1',
    card: '#ffffff',
  },
  monochrome: {
    primary: '#4a4a4a',
    secondary: '#7a7a7a',
    accent: '#9a9a9a',
    background: '#f0f0f0',
    text: '#2c2c2c',
    muted: '#b0b0b0',
    border: '#d4d4d4',
    card: '#ffffff',
  },
  pastel: {
    primary: '#a8d8ea',
    secondary: '#aa96da',
    accent: '#fcbad3',
    background: '#ffffd2',
    text: '#5d576b',
    muted: '#e6e6e6',
    border: '#f0e4eb',
    card: '#ffffff',
  },
  neon: {
    primary: '#00ff00',
    secondary: '#ff00ff',
    accent: '#00ffff',
    background: '#121212',
    text: '#ffffff',
    muted: '#444444',
    border: '#333333',
    card: '#1a1a1a',
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
    border: '#dcdde1',
    card: '#ffffff',
  });

  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }, []);

  const rgbToHsl = useCallback((r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  const applyColors = useCallback((colors) => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
      // Also set CSS custom properties for HSL values
      if (value.startsWith('#')) {
        const rgb = hexToRgb(value);
        if (rgb) {
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          document.documentElement.style.setProperty(`--${key}`, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
        }
      }
    });
  }, [hexToRgb, rgbToHsl]);

  // Load saved preferences
  useEffect(() => {
    try {
      const savedScheme = localStorage.getItem('colorScheme');
      if (savedScheme && COLOR_SCHEMES.includes(savedScheme)) {
        setColorScheme(savedScheme);
      }
      
      const savedCustomColors = localStorage.getItem('customColors');
      if (savedCustomColors) {
        setCustomColors(JSON.parse(savedCustomColors));
      }

      // Set initial system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!savedScheme) {
        setColorScheme(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error loading theme preferences:', error);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    try {
      const colors = colorScheme === 'custom' ? customColors : THEME_COLORS[colorScheme];
      applyColors(colors);
      document.documentElement.setAttribute('data-color-scheme', colorScheme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [colorScheme, customColors, applyColors]);

  const changeColorScheme = useCallback((newScheme) => {
    if (COLOR_SCHEMES.includes(newScheme)) {
      setColorScheme(newScheme);
      localStorage.setItem('colorScheme', newScheme);
    }
  }, []);

  const updateCustomColors = useCallback((newColors) => {
    const mergedColors = { ...customColors, ...newColors };
    setCustomColors(mergedColors);
    localStorage.setItem('customColors', JSON.stringify(mergedColors));
    if (colorScheme === 'custom') {
      applyColors(mergedColors);
    }
  }, [customColors, colorScheme, applyColors]);

  return (
    <ColorSchemeContext.Provider 
      value={{ 
        colorScheme, 
        changeColorScheme, 
        customColors, 
        updateCustomColors,
        availableSchemes: COLOR_SCHEMES,
        themeColors: THEME_COLORS
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function MainThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    </NextThemesProvider>
  );
}

export function ClientLayout({ children }) {
  const { colorScheme, customColors } = useColorScheme();

  useEffect(() => {
    try {
      const colors = colorScheme === 'custom' ? customColors : THEME_COLORS[colorScheme];
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}-color`, value);
      });
    } catch (error) {
      console.error('Error in ClientLayout:', error);
    }
  }, [colorScheme, customColors]);

  return <>{children}</>;
}
