import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

export function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const springConfig = { type: 'spring', stiffness: 700, damping: 30 };

  return (
    <div className="flex items-center space-x-2">
      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 0.7 : 1,
          opacity: isDarkMode ? 0.3 : 1,
        }}
        transition={springConfig}
      >
        <Sun className="h-4 w-4 text-yellow-500" />
      </motion.div>
      <Switch
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
      >
        <motion.div
          className="switch-thumb"
          layout
          transition={springConfig}
        />
      </Switch>
      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 1 : 0.7,
          opacity: isDarkMode ? 1 : 0.3,
        }}
        transition={springConfig}
      >
        <Moon className="h-4 w-4 text-blue-500" />
      </motion.div>
    </div>
  );
}
