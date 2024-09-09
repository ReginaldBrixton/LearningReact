"use client"

import React, { useState } from 'react';
import { Film, Search, Sun, Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-gray-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Film size={24} className="text-blue-500" />
          <span className="text-xl font-bold">Cinemate</span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Popular</a>
          <a href="#" className="text-blue-500 font-medium">Top Rated</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Upcoming</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Sun size={20} />
          </button>
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-gray-100 px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
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
              className="w-full bg-gray-800 text-gray-100 px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;