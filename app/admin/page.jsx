'use client'

import { useState, useEffect } from 'react'
import { Bell, Moon, Search, Settings, Sun, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from 'next/image'

export default function AdminDashboard() {
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
    <div className={cn("min-h-screen bg-background p-8", isDarkMode ? 'dark' : '')}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="w-64"
            value={searchQuery}
            onChange={handleSearch}
          />

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
            <DropdownMenuContent align="end" className="w-64">
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
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Image
                  src="/placeholder.svg"
                  alt="Admin avatar"
                  className="rounded-full"
                  width={32}
                  height={32}
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
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}