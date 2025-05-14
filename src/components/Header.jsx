import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Activity } from 'lucide-react';

function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Claude Token Counter
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;