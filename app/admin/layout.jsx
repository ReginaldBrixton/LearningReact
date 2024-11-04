'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, HelpCircle, Layout, LogOut, Moon, Search, Settings, Sun, Users, BarChart, Briefcase, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import Link from 'next/link'

const sidebarItems = [
  { icon: Layout, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'User Management', href: '/admin/user-management' },
  { icon: Briefcase, label: 'Project Management', href: '/admin/project-management' },
  { icon: Users, label: 'Supervisor Management', href: '/admin/supervisor-management' },
  { icon: Layout, label: 'Department Management', href: '/admin/department-management' },
  { icon: Bell, label: 'Announcements', href: '/admin/announcements' },
  { icon: BarChart, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
  { icon: AlertTriangle, label: 'Logs', href: '/admin/logs' },
  { icon: HelpCircle, label: 'Help & Support', href: '/admin/support' },
]

export default function AdminLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulated notifications fetch
    const fetchNotifications = () => {
      setNotifications([
        { id: 1, title: 'New User Registration', time: '1m ago' },
        { id: 2, title: 'System Update Required', time: '1h ago' },
      ])
    }
    fetchNotifications()
  }, [])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Implement search functionality
  }
  return (
    <div className={cn("min-h-screen bg-background transition-colors duration-300", isDarkMode ? 'dark' : '')}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-64 overflow-y-auto border-r bg-gray-50 md:block dark:bg-gray-800 transition-colors duration-300">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-center h-16 border-b">
              <span className="text-lg font-bold">Admin Dashboard</span>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2">
              {sidebarItems.map((item, index) => (
                <Link key={index} href={item.href} passHref>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search anything..."
                className="w-96 mr-4"
                value={searchQuery}
                onChange={handleSearch}
                icon={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <CardHeader>
                    <CardTitle className="text-sm">Notifications</CardTitle>
                  </CardHeader>
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id}>
                      <span>{notification.title}</span>
                      <span className="text-xs text-gray-400 ml-auto">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="transition-transform hover:rotate-45"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Image
                      src="/avatars/admin.jpg"
                      alt="Admin avatar"
                      className="rounded-full object-cover"
                      layout="fill"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex-col items-start">
                    <p className="font-medium">Admin User</p>
                    <p className="text-sm text-gray-500">admin@example.com</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
