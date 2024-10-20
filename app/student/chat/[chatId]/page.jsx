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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/research-illustration.jpg"
              width={800}
              height={600}
              alt="Research illustration"
              className="rounded-lg shadow-md"
              priority
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, learnMoreHref }) {
  return (
    <motion.div 
      className="group rounded-lg bg-background p-6 shadow-sm transition-all hover:bg-muted"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>
      <Link
        href={learnMoreHref}
        className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        prefetch={false}
      >
        Learn More
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

// Features Section Component with Parallax
function FeaturesSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);

  const features = [
    {
      icon: SchoolIcon,
      title: "Student",
      description: "Submit your research papers, view feedback, and track your progress.",
      learnMoreHref: "/student/dashboard",
    },
    {
      icon: LecternIcon,
      title: "Lecturer",
      description: "Review student submissions, provide feedback, and manage your courses.",
      learnMoreHref: "/lecturer",
    },
    {
      icon: MonitorIcon,
      title: "Supervisor",
      description: "Oversee student research, provide guidance, and manage submissions.",
      learnMoreHref: "/supervisor",
    },
    {
      icon: ServerIcon,
      title: "Admin",
      description: "Manage the research portal, users, and overall system administration.",
      learnMoreHref: "/admin",
    },
  ];

  return (
    <motion.section className="py-12 md:py-24" style={{ y }}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-muted py-6 text-center text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <p>&copy; {new Date().getFullYear()} Research Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

// Icon Components
function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20" />
      <path d="M6.5 7v10" />
    </svg>
  );
}

function SchoolIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10L12 15 2 10l10-5 10 5z" />
      <path d="M2 10v6l10 5 10-5v-6" />
      <path d="M6 12v-2" />
    </svg>
  );
}

function LecternIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10L12 15 2 10l10-5 10 5z" />
      <path d="M6 12v-2" />
    </svg>
  );
}

function MonitorIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

function ServerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="8" rx="2" ry="2" />
      <rect x="3" y="12" width="18" height="8" rx="2" ry="2" />
      <path d="M7 8v.01" />
      <path d="M7 16v.01" />
    </svg>
  );
}
