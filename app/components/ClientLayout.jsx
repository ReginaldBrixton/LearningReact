'use client';

import { useEffect } from 'react';
import { useColorScheme } from './color-scheme-provider';

export default function ClientLayout({ children }) {
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