'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { Book, User, UserPlus, Users, Settings, Sun, Moon, ChevronDown, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setIsDarkMode(savedTheme === 'dark')

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <ParallaxProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Research Portal</span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <NavLink href="/student/dashboard" icon={<User className="h-4 w-4" />} text="Student" />
              <NavLink href="/lecturer" icon={<UserPlus className="h-4 w-4" />} text="Lecturer" />
              <NavLink href="/supervisor" icon={<Users className="h-4 w-4" />} text="Supervisor" />
              <NavLink href="/admin" icon={<Settings className="h-4 w-4" />} text="Admin" />
            </nav>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="rounded-full"
                    >
                      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
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
                <NavLink href="/student/dashboard" icon={<User className="h-4 w-4" />} text="Student" />
                <NavLink href="/lecturer" icon={<UserPlus className="h-4 w-4" />} text="Lecturer" />
                <NavLink href="/supervisor" icon={<Users className="h-4 w-4" />} text="Supervisor" />
                <NavLink href="/admin" icon={<Settings className="h-4 w-4" />} text="Admin" />
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main className="pt-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Parallax speed={-20}>
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
                    Empower Your Research Journey
                  </h1>
                  <p className="text-xl text-white mb-8">
                    Collaborate, innovate, and accelerate your research with our cutting-edge platform.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    Get Started Now
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 md:mt-0 md:w-1/2"
                >
                  <Parallax translateY={['-20%', '20%']}>
                    <Image
                      src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Research collaboration illustration"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-2xl object-cover"
                    />
                  </Parallax>
                </motion.div>
              </div>
            </section>
          </Parallax>

          <Parallax speed={10}>
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard
                    title="Collaborative Research"
                    description="Work together with peers and mentors on groundbreaking projects."
                    icon={<Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
                    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  />
                  <FeatureCard
                    title="Resource Library"
                    description="Access a vast collection of academic papers and research materials."
                    icon={<Book className="h-12 w-12 text-green-600 dark:text-green-400" />}
                    image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1590&q=80"
                  />
                  <FeatureCard
                    title="Project Management"
                    description="Efficiently manage your research projects from inception to completion."
                    icon={<Settings className="h-12 w-12 text-purple-600 dark:text-purple-400" />}
                    image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  />
                </div>
              </div>
            </section>
          </Parallax>

          <Parallax speed={-10}>
            <section className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <TestimonialCard
                    quote="The Research Portal has revolutionized how I collaborate with my team. It's an indispensable tool for modern researchers."
                    author="Dr. Jane Smith"
                    role="Professor of Biology"
                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  />
                  <TestimonialCard
                    quote="As a student, I've found the resource library invaluable. It's helped me discover new areas of study and stay up-to-date with the latest research."
                    author="Alex Johnson"
                    role="PhD Candidate"
                    image="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  />
                  <TestimonialCard
                    quote="The project management features have streamlined our research process. We're more productive than ever before."
                    author="Prof. Michael Lee"
                    role="Department Head, Chemistry"
                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  />
                </div>
              </div>
            </section>
          </Parallax>

          <Parallax speed={5}>
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto">
                  <FAQItem
                    question="How do I get started with the Research Portal?"
                    answer="To get started, simply click the 'Get Started' button and create an account. Once registered, you can explore our features, join research projects, and access our resource library."
                  />
                  <FAQItem
                    question="Is the Research Portal free to use?"
                    answer="We offer a free tier with basic features for individual researchers. For advanced collaboration tools and increased storage, we have premium plans available for teams and institutions."
                  />
                  <FAQItem
                    question="Can I integrate the Research Portal with other tools?"
                    answer="Yes, the Research Portal offers integrations with popular academic tools and reference managers. Check our integrations page for a full list of supported platforms."
                  />
                </div>
              </div>
            </section>
          </Parallax>

          <section className="relative py-20 overflow-hidden">
            <Parallax translateY={['-30%', '30%']} className="absolute inset-0 z-0">
              <div className="h-full w-full bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 opacity-30" />
            </Parallax>
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Join Our Research Community</h2>
              <p className="text-xl text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
                Connect with researchers worldwide, share your findings, and contribute to the advancement of knowledge.
              </p>
              <div className="text-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up Now
                </Button>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-sm text-gray-400">The Research Portal is dedicated to empowering researchers and fostering collaboration in the academic community.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">About</Link></li>
                  <li><Link href="/features" className="text-sm text-gray-400 hover:text-white">Features</Link></li>
                  <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">Pricing</Link></li>
                  <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438  9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-sm text-gray-400">&copy; 2024 Research Portal. All rights reserved.</p>
            </div>
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

function FeatureCard({ title, description, icon, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">{description}</p>
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        className="rounded-lg object-cover w-full h-48"
      />
    </motion.div>
  )
}

function TestimonialCard({ quote, author, role, image }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Star className="text-yellow-400 mr-1" />
        <Star className="text-yellow-400 mr-1" />
        <Star className="text-yellow-400 mr-1" />
        <Star className="text-yellow-400 mr-1" />
        <Star className="text-yellow-400" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{quote}</p>
      <div className="flex items-center">
        <Image
          src={image}
          alt={author}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white">{question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-2 text-gray-600 dark:text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}