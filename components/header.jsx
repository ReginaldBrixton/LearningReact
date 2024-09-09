"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">
          <Link href="/" className="hover:text-blue-300 transition duration-300">
            My App
          </Link>
        </h1>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-lg">
            <li>
              <Link href="/" className="block hover:text-blue-300 transition duration-300">Home</Link>
            </li>
            <li>
              <Link href="/about" className="block hover:text-blue-300 transition duration-300">About</Link>
            </li>
            <li>
              <Link href="/services" className="block hover:text-blue-300 transition duration-300">Services</Link>
            </li>
            <li>
              <Link href="/contact" className="block hover:text-blue-300 transition duration-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;