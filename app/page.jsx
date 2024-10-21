'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { Book, User, UserPlus, Users, Settings, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setIsDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <ParallaxProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <header className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Research Portal</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <NavLink href="/student" icon={<User className="h-4 w-4" />} text="Student" />
              <NavLink href="/lecturer" icon={<UserPlus className="h-4 w-4" />} text="Lecturer" />
              <NavLink href="/supervisor" icon={<Users className="h-4 w-4" />} text="Supervisor" />
              <NavLink href="/admin" icon={<Settings className="h-4 w-4" />} text="Admin" />
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white dark:bg-gray-800 px-4 py-2 space-y-2"
              >
                <NavLink href="/student" icon={<User className="h-4 w-4" />} text="Student" />
                <NavLink href="/lecturer" icon={<UserPlus className="h-4 w-4" />} text="Lecturer" />
                <NavLink href="/supervisor" icon={<Users className="h-4 w-4" />} text="Supervisor" />
                <NavLink href="/admin" icon={<Settings className="h-4 w-4" />} text="Admin" />
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <Parallax translateY={['-50%', '50%']} className="absolute inset-0 z-0">
              <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-700 dark:to-purple-700 opacity-50" />
            </Parallax>
            <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center md:text-left md:w-1/2"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Welcome to the Research Portal
                </h1>
                <p className="text-xl text-white mb-8">
                  Empowering researchers and students to collaborate and innovate.
                </p>
                <Link
                  href="/get-started"
                  className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 md:mt-0 md:w-1/2"
              >
                <Parallax translateY={['-20%', '20%']}>
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Research illustration"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                </Parallax>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  title="Collaborative Research"
                  description="Work together with peers and mentors on groundbreaking projects."
                  icon={<Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
                />
                <FeatureCard
                  title="Resource Library"
                  description="Access a vast collection of academic papers and research materials."
                  icon={<Book className="h-12 w-12 text-green-600 dark:text-green-400" />}
                />
                <FeatureCard
                  title="Project Management"
                  description="Efficiently manage your research projects from inception to completion."
                  icon={<Settings className="h-12 w-12 text-purple-600 dark:text-purple-400" />}
                />
              </div>
            </div>
          </section>

          <section className="relative py-20 overflow-hidden">
            <Parallax translateY={['-30%', '30%']} className="absolute inset-0 z-0">
              <div className="h-full w-full bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 opacity-30" />
            </Parallax>
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Join Our Community</h2>
              <p className="text-xl text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
                Connect with researchers from around the world, share your findings, and contribute to the advancement of knowledge.
              </p>
              <div className="text-center">
                <Link
                  href="/sign-up"
                  className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Color Palette Showcase</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <ColorSwatch color="bg-red-500 dark:bg-red-700" name="Red" />
                <ColorSwatch color="bg-blue-500 dark:bg-blue-700" name="Blue" />
                <ColorSwatch color="bg-green-500 dark:bg-green-700" name="Green" />
                <ColorSwatch color="bg-yellow-500 dark:bg-yellow-700" name="Yellow" />
                <ColorSwatch color="bg-purple-500 dark:bg-purple-700" name="Purple" />
                <ColorSwatch color="bg-pink-500 dark:bg-pink-700" name="Pink" />
                <ColorSwatch color="bg-indigo-500 dark:bg-indigo-700" name="Indigo" />
                <ColorSwatch color="bg-teal-500 dark:bg-teal-700" name="Teal" />
                <ColorSwatch color="bg-orange-500 dark:bg-orange-700" name="Orange" />
                <ColorSwatch color="bg-cyan-500 dark:bg-cyan-700" name="Cyan" />
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Research Portal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ParallaxProvider>
  )
}

function NavLink({ href, icon, text }) {
  return (
    <Link href={href} className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
    </motion.div>
  )
}

function ColorSwatch({ color, name }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 rounded-full ${color} shadow-lg`}></div>
      <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
    </div>
  )
}