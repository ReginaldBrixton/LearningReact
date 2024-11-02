import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const springConfig = { type: 'spring', stiffness: 700, damping: 30 };

  const handleThemeChange = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

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
        onCheckedChange={handleThemeChange}
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
