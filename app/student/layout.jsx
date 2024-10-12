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

// Import UI components individually
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Custom breakpoints
const breakpoints = {
  sm: '600px',
  md: '668px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

import { MolecularStructureLoaderComponent } from "@/components/LoadingScreens/molecular-structure-loader"

const footbarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard" },
  { icon: List, label: "Projects", route: "/student/projects" },
  { icon: PieChart, label: "Score Board", route: "/student/scoreboard" },
  { icon: MessageSquare, label: "Chat", route: "/student/chat" },
  { icon: Settings, label: "Settings", route: "/student/settings" },
]

const sidebarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard" },
  { icon: List, label: "Projects", route: "/student/projects" },
  { icon: ClipboardCheck, label: "Review", route: "/student/review" },
  { icon: PieChart, label: "Score Board", route: "/student/scoreboard" },
  { icon: MessageSquare, label: "Chat", route: "/student/chat" },
  { icon: Settings, label: "Settings", route: "/student/settings" },
  { icon: FileText, label: "Reports", route: "/student/reports" },
  { icon: Archive, label: "Archived", route: "/student/archived" },
  { icon: HelpCircle, label: "Help", route: "/student/help" },
]

function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Prefetch all routes after initial page load
    sidebarItems.forEach(item => {
      router.prefetch(item.route)
    })
    footbarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <aside className={`hidden sm:flex flex-col w-14 lg:w-[12rem] h-screen bg-gray-100 dark:bg-gray-800`}>
      <div className="flex items-center justify-center h-[3rem] bg-gray-200 dark:bg-gray-700">
        <Layout className="h-6 w-6 lg:hidden" />
        <span className="hidden lg:inline text-lg font-semibold">Capstone Project</span>
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
                  <span className="ml-4 hidden lg:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="lg:hidden">
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

  return (
    <header className={`flex items-center h-[3rem] px-4 border-b shrink-0 md:px-6`}>
      <div className={`flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4`}>
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className={`pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]`}
              placeholder="Search projects..."
              type="search"
            />
          </div>
        </form>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-16 sm:pb-4`}>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
