"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth"
import { app } from "@/lib/firebase" // Adjust this import path as necessary
import {
  BarChart2, Users, Briefcase, UserCheck, Building, Bell,
  FileText, Settings, Activity, HelpCircle, Search,
  Menu, LogOut
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { AdminLoaderComponent } from "@/components/LoadingScreens/admin-loader"

const sidebarItems = [
  { icon: BarChart2, label: "Dashboard", route: "/admin/dashboard", color: "text-blue-600 dark:text-blue-300" },
  { icon: Users, label: "User Management", route: "/admin/users", color: "text-green-600 dark:text-green-300" },
  { icon: Briefcase, label: "Project Management", route: "/admin/projects", color: "text-yellow-600 dark:text-yellow-300" },
  { icon: UserCheck, label: "Supervisor Management", route: "/admin/supervisors", color: "text-purple-600 dark:text-purple-300" },
  { icon: Building, label: "Department Management", route: "/admin/departments", color: "text-pink-600 dark:text-pink-300" },
  { icon: Bell, label: "Announcements", route: "/admin/announcements", color: "text-indigo-600 dark:text-indigo-300" },
  { icon: FileText, label: "Reports", route: "/admin/reports", color: "text-orange-600 dark:text-orange-300" },
  { icon: Settings, label: "Settings", route: "/admin/settings", color: "text-gray-600 dark:text-gray-300" },
  { icon: Activity, label: "Logs", route: "/admin/logs", color: "text-teal-600 dark:text-teal-300" },
  { icon: HelpCircle, label: "Help & Support", route: "/admin/help", color: "text-red-600 dark:text-red-300" },
]

function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    sidebarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-semibold">Admin Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.route}
            className={`flex items-center h-12 px-4 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
              pathname === item.route ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app)
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <nav className="flex flex-col space-y-2">
            {sidebarItems.map((item, index) => (
              <Link key={index} href={item.route} className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center ml-auto space-x-4">
        <form className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-8 w-64"
            placeholder="Search..."
            type="search"
          />
        </form>
        <ThemeSwitcher />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Image
                alt="Admin Avatar"
                className="rounded-full"
                src={user?.photoURL || "/admin-placeholder.svg"}
                width={32}
                height={32}
                priority
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium">{user?.displayName || "Admin"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return <AdminLoaderComponent />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}