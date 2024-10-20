"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../components/ui/navigation-menu";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

// Header Component
function Header() {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-background shadow-sm"
      style={{ opacity: headerOpacity, scale: headerScale }}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Research Portal</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {[
              { href: "/student", icon: SchoolIcon, text: "Student" },
              { href: "/lecturer", icon: LecternIcon, text: "Lecturer" },
              { href: "/supervisor", icon: MonitorIcon, text: "Supervisor" },
              { href: "/admin", icon: ServerIcon, text: "Admin" },
            ].map(({ href, icon: Icon, text }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  href={href}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/50 data-[state=open]:bg-primary/50"
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{text}</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.header>
  );
}

// Hero Section Component with Parallax
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <motion.section 
      className="bg-gradient-to-r from-primary to-primary/80 py-20 md:py-32 overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Welcome to the Research Portal
            </h1>
            <p className="text-lg text-primary-foreground/90 sm:text-xl">
              Streamline your research submission process with our user-friendly platform.
            </p>
            <Link
              href="/student"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              prefetch={false}
            >
              Get Started
            </Link>
          </motion.div>
          <motion.div 
            className="justify-self-center md:justify-self-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/hero-image.jpg" 
              alt="Hero Image" 
              width={400} 
              height={300} 
              className="rounded-md shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Features Section Component with Parallax
function FeaturesSection() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <motion.section 
      className="bg-background py-20 md:py-32"
      style={{ x, opacity }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Key Features
            </h2>
            <ul className="list-none space-y-4 text-lg text-primary-foreground/90 sm:text-xl">
              <li>Streamlined research submission process</li>
              <li>Easy collaboration and feedback tools</li>
              <li>Secure and reliable data storage</li>
            </ul>
          </motion.div>
          <motion.div 
            className="justify-self-center md:justify-self-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/features-image.jpg" 
              alt="Features Image" 
              width={400} 
              height={300} 
              className="rounded-md shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}