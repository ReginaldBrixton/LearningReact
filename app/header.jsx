"use client"

import React from 'react';
import { Film, Search, Sun, Moon, Menu } from 'lucide-react';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} py-4 px-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Film size={24} className="text-blue-500" />
          <span className="text-xl font-bold">Cinemate</span>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Popular</a>
          <a href="#" className="text-blue-500 font-medium">Top Rated</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Upcoming</a>
        </nav>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleTheme}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className={`${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'} px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Popular</a>
            <a href="#" className="text-blue-500 font-medium">Top Rated</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Upcoming</a>
          </nav>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'} px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;