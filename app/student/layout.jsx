"use client"

import {
  Bell, Calendar as CalendarIcon, ChevronRight, Home, Layout,
  ClipboardCheck, List, Menu, PieChart, Plus, Search, Settings,
  Users, FileText, Archive, HelpCircle, MessageSquare,
  Sun, Moon
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { app } from "../firebaseConfig"
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

// Import UI components individually
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// // Custom breakpoints
// const breakpoints = {
//   sm: '600px',
//   md: '668px',
//   lg: '1024px',
//   xl: '1280px',
//   '2xl': '1536px',
// };

import { MolecularStructureLoaderComponent } from "@/components/LoadingScreens/molecular-structure-loader"

const footbarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard", color: "text-blue-500 dark:text-blue-400" },
  { icon: List, label: "Projects", route: "/student/projects", color: "text-green-500 dark:text-green-400" },
  { icon: PieChart, label: "Score Board", route: "/student/scoreboard", color: "text-purple-500 dark:text-purple-400" },
  { icon: MessageSquare, label: "Chat", route: "/student/chat", color: "text-pink-500 dark:text-pink-400" },
  { icon: Settings, label: "Settings", route: "/student/settings", color: "text-gray-500 dark:text-gray-400" },
]

const sidebarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard", color: "text-blue-600 dark:text-blue-300" },
  { icon: List, label: "Projects", route: "/student/projects", color: "text-green-600 dark:text-green-300" },
  { icon: ClipboardCheck, label: "Review", route: "/student/review", color: "text-yellow-600 dark:text-yellow-300" },
  { icon: PieChart, label: "Score Board", route: "/student/scoreboard", color: "text-purple-600 dark:text-purple-300" },
  { icon: MessageSquare, label: "Chat", route: "/student/chat", color: "text-pink-600 dark:text-pink-300" },
  { icon: Settings, label: "Settings", route: "/student/settings", color: "text-gray-600 dark:text-gray-300" },
  { icon: FileText, label: "Reports", route: "/student/reports", color: "text-indigo-600 dark:text-indigo-300" },
  { icon: Archive, label: "Archived", route: "/student/archived", color: "text-orange-600 dark:text-orange-300" },
  { icon: HelpCircle, label: "Help", route: "/student/help", color: "text-teal-600 dark:text-teal-300" },
]

function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    sidebarItems.forEach(item => {
      router.prefetch(item.route)
    })
    footbarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <aside className={`hidden layout-sm:flex flex-col w-14 layout-lg:w-[12rem] h-screen bg-gray-100 dark:bg-gray-800`}>
      <div className="flex items-center justify-center h-[3rem] bg-gray-200 dark:bg-gray-700">
        <Layout className="h-6 w-6 lg:hidden" />
        <span className="hidden layout-lg:inline text-lg font-semibold">Capstone Project</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.route}
                  className={`flex items-center h-12 px-4 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                    pathname === item.route ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-4 hidden layout-lg:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="layout-lg:hidden">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  )
}

function Header() {
  const [user, setUser] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleLogout = async () => {
    const auth = getAuth(app)
    try {
      await signOut(auth)
      router.push('/login') 
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const springConfig = { type: "spring", stiffness: 700, damping: 30 };

  return (
    <header className={`flex items-center h-[3rem] px-4 border-b shrink-0 md:px-6`}>
      <div className={`flex items-center w-full gap-4 layout-sm:ml-auto layout-sm:gap-2 layout-lg:gap-4`}>
        <form className="flex-1 mr-auto layout-sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className={`pl-8 layout-sm:w-[300px] layout-md:w-[200px] layout-lg:w-[300px]`}
              placeholder="Search projects..."
              type="search"
            />
          </div>
        </form>
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
        <Button className="rounded-full" size="icon" variant="ghost">
          <Bell className="w-4 h-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <Image
                alt="User Avatar"
                className="rounded-full"
                src={user?.photoURL || "/placeholder.svg"}
                width={32}
                height={32}
                priority
              />
              <span className="sr-only">Profile</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">{user?.displayName || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <Button variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Prefetch all routes after initial page load
    footbarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <nav className="layout-sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        {footbarItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.route}
            className={`flex flex-col items-center py-2 ${
              pathname === item.route ? 'text-blue-500' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Prefetch all routes after initial page load
    if (!loading && user) {
      [...sidebarItems, ...footbarItems].forEach(item => {
        router.prefetch(item.route)
      })
    }
  }, [loading, user, router])

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  if (showLoader || loading || !user) {
    return <MolecularStructureLoaderComponent />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header className="sticky top-0 z-10" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-16 sm:pb-4">
          <div className="h-full">{children}</div>
        </main>
        <BottomNav className="sticky bottom-0 z-10" />
      </div>
    </div>
  )
}
