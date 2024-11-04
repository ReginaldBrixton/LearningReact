'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, HelpCircle, Layout, LogOut, Moon, Search, Settings, Sun, Users, BarChart, Briefcase, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const statsCards = [
  { 
    title: 'Total Users', 
    value: '1,234', 
    growth: '+5.25%', 
    period: 'from last month',
    icon: Users,
    chartData: [
      { name: 'Jan', value: 1000 },
      { name: 'Feb', value: 1100 },
      { name: 'Mar', value: 1234 }
    ]
  },
  { 
    title: 'Active Projects', 
    value: '42', 
    growth: '+2', 
    period: 'new this week',
    icon: Briefcase,
    chartData: [
      { name: 'Jan', value: 35 },
      { name: 'Feb', value: 38 },
      { name: 'Mar', value: 42 }
    ]
  },
  { 
    title: 'Announcements', 
    value: '7', 
    subtext: '3 unread',
    icon: Bell,
    priority: 'high'
  },
  { 
    title: 'System Health', 
    value: '99.9%', 
    subtext: 'Operational',
    icon: BarChart,
    status: 'healthy'
  },
]

const recentActivities = [
  { 
    user: 'John Doe', 
    action: 'logged in', 
    time: '2 minutes ago',
    type: 'auth',
    avatar: '/avatars/john-doe.jpg'
  },
  { 
    user: 'Jane Smith', 
    action: 'created a new project "AI Research"', 
    time: '1 hour ago',
    type: 'project',
    avatar: '/avatars/jane-smith.jpg'
  },
  { 
    user: 'Admin', 
    action: 'posted an announcement about system maintenance', 
    time: '3 hours ago',
    type: 'announcement',
    avatar: '/avatars/admin.jpg'
  },
  { 
    user: 'Mike Johnson', 
    action: 'updated department structure', 
    time: '5 hours ago',
    type: 'department',
    avatar: '/avatars/mike-johnson.jpg'
  },
]

export default function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
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
        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
              
            {/* Stats Grid */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {statsCards.map((card, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon className={cn(
                      "h-4 w-4",
                      card.priority === 'high' ? 'text-red-500' : 'text-gray-500',
                      card.status === 'healthy' ? 'text-green-500' : ''
                    )} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    {card.growth && (
                      <p className={cn(
                        "text-xs",
                        parseFloat(card.growth) > 0 ? 'text-green-500' : 'text-red-500'
                      )}>
                        {card.growth} {card.period}
                      </p>
                    )}
                    {card.subtext && (
                      <p className="text-xs text-muted-foreground">
                        {card.subtext}
                      </p>
                    )}
                    {card.chartData && (
                      <div className="h-[60px] mt-4">
                        {/* Chart placeholder - install and import recharts to show charts */}
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                          <span className="text-sm text-gray-500">Chart data available</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions from users and system</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <img
                        src={activity.avatar}
                        alt={`${activity.user}'s avatar`}
                        className="w-10 h-10 rounded-full mr-4 object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{activity.user} {activity.action}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{activity.time}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}