'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, HelpCircle, Layout, LogOut, Moon, Search, Settings, Sun, Users, BarChart, Briefcase, AlertTriangle, Download, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
import Image from 'next/image'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { format, parseISO, subDays } from 'date-fns'
import { Skeleton } from "@/components/ui/skeleton"

const statsCards = [
  { 
    title: 'Total Users', 
    value: '1,234', 
    growth: '+5.25%', 
    period: 'from last month',
    icon: Users,
    chartData: Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      value: Math.floor(Math.random() * 300) + 1000
    }))
  },
  { 
    title: 'Active Projects', 
    value: '42', 
    growth: '+2', 
    period: 'new this week',
    icon: Briefcase,
    chartData: Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      value: Math.floor(Math.random() * 10) + 35
    }))
  },
  { 
    title: 'Announcements', 
    value: '7', 
    subtext: '3 unread',
    icon: Bell,
    priority: 'high',
    notifications: [
      { title: 'System Maintenance', time: 'Tomorrow at 2 AM' },
      { title: 'New Feature Release', time: 'Next Week' },
      { title: 'Team Meeting', time: 'Today at 4 PM' }
    ]
  },
  { 
    title: 'System Health', 
    value: '99.9%', 
    subtext: 'Operational',
    icon: BarChart,
    status: 'healthy',
    metrics: [
      { name: 'CPU Usage', value: '45%' },
      { name: 'Memory', value: '60%' },
      { name: 'Storage', value: '75%' }
    ]
  },
]

const recentActivities = [
  { 
    user: 'John Doe', 
    action: 'logged in', 
    time: '2 minutes ago',
    type: 'auth',
    avatar: '/avatars/avatar1.jpg',
    details: { location: 'New York, US', device: 'Chrome on Windows' }
  },
  { 
    user: 'Jane Smith', 
    action: 'created a new project "AI Research"', 
    time: '1 hour ago',
    type: 'project',
    avatar: '/avatars/avatar2.jpg',
    details: { projectId: 'PRJ-123', department: 'Research & Development' }
  },
  { 
    user: 'Admin', 
    action: 'posted an announcement about system maintenance', 
    time: '3 hours ago',
    type: 'announcement',
    avatar: '/avatars/avatar3.jpg',
    details: { priority: 'High', affectedUsers: 'All' }
  },
  { 
    user: 'Mike Johnson', 
    action: 'updated department structure', 
    time: '5 hours ago',
    type: 'department',
    avatar: '/avatars/avatar4.jpg',
    details: { changes: ['Added new team', 'Updated reporting lines'] }
  },
].map(activity => ({
  ...activity,
  avatar: activity.avatar && (
    <Image 
      src={activity.avatar}
      alt={`${activity.user}'s avatar`}
      width={40}
      height={40}
      className="rounded-full object-cover"
      loading="lazy"
    />
  )
}))

export default function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([])
  const [timeRange, setTimeRange] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simulated notifications fetch
        setNotifications([
          { id: 1, title: 'New User Registration', time: '1m ago', priority: 'low' },
          { id: 2, title: 'System Update Required', time: '1h ago', priority: 'high' },
          { id: 3, title: 'Backup Completed', time: '2h ago', priority: 'medium' },
        ])
        
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch dashboard data')
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [timeRange])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Implement real-time search filtering
  }

  const handleExportData = () => {
    // Implement CSV export functionality
    const csvData = statsCards.map(card => ({
      metric: card.title,
      value: card.value,
      growth: card.growth || 'N/A'
    }))
    console.log('Exporting data:', csvData)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-lg mx-4 border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error Occurred
            </CardTitle>
          </CardHeader>
          <CardContent>{error}</CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()} variant="destructive">
              Retry Loading Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background transition-colors duration-300", isDarkMode ? 'dark' : '')}>
      <div className="flex min-h-screen">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-base text-gray-600 dark:text-gray-300">Welcome back, Admin</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setTimeRange('7d')}>Last 7 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange('30d')}>Last 30 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange('90d')}>Last 90 Days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={handleExportData} variant="default" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                <TabsTrigger value="overview" className="rounded-md px-6">Overview</TabsTrigger>
                <TabsTrigger value="analytics" className="rounded-md px-6">Analytics</TabsTrigger>
                <TabsTrigger value="reports" className="rounded-md px-6">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
              
            {/* Stats Grid */}
            <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-8 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-[100px] w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                statsCards.map((card, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02]" style={{
                    borderLeftColor: card.priority === 'high' ? '#ef4444' : 
                                   card.status === 'healthy' ? '#22c55e' : '#e2e8f0'
                  }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-semibold">
                        {card.title}
                      </CardTitle>
                      <card.icon className={cn(
                        "h-5 w-5",
                        card.priority === 'high' ? 'text-red-500' : 'text-gray-500',
                        card.status === 'healthy' ? 'text-green-500' : ''
                      )} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{card.value}</div>
                      {card.growth && (
                        <p className={cn(
                          "text-sm font-medium flex items-center gap-1",
                          parseFloat(card.growth) > 0 ? 'text-green-600' : 'text-red-600'
                        )}>
                          {parseFloat(card.growth) > 0 ? '↑' : '↓'} {card.growth} 
                          <span className="text-gray-500 text-xs">({card.period})</span>
                        </p>
                      )}
                      {card.subtext && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {card.subtext}
                        </p>
                      )}
                      {card.chartData && (
                        <div className="h-[80px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={card.chartData}>
                              <defs>
                                <linearGradient id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8}/>
                                  <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1}/>
                                </linearGradient>
                              </defs>
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#8884d8" 
                                fill={`url(#gradient${index})`}
                                strokeWidth={2} 
                              />
                              <Tooltip 
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border">
                                        <p className="text-sm font-medium">{payload[0].value}</p>
                                      </div>
                                    )
                                  }
                                  return null
                                }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      {card.metrics && (
                        <div className="mt-4 space-y-3">
                          {card.metrics.map((metric, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-300">{metric.name}</span>
                              <div className="w-1/2">
                                <div className="h-2 bg-gray-200 rounded-full">
                                  <div 
                                    className="h-2 bg-blue-500 rounded-full"
                                    style={{ width: metric.value }}
                                  />
                                </div>
                              </div>
                              <span className="text-sm font-medium">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Recent Activity */}
            <Card className="mb-8 overflow-hidden">
              <CardHeader className="border-b bg-gray-50 dark:bg-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl">Recent Activity</CardTitle>
                    <CardDescription>Track the latest actions across your system</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Input
                      type="search"
                      placeholder="Search activities..."
                      className="w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={handleSearch}
                      icon={<Search className="h-4 w-4 text-gray-500" />}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>All Activities</DropdownMenuItem>
                        <DropdownMenuItem>System Events</DropdownMenuItem>
                        <DropdownMenuItem>User Actions</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                      <li key={i} className="p-4">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    recentActivities.map((activity, index) => (
                      <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="p-4 sm:px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              {activity.avatar}
                              <span className={cn(
                                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                                activity.type === 'auth' ? 'bg-green-500' :
                                activity.type === 'project' ? 'bg-blue-500' :
                                activity.type === 'announcement' ? 'bg-yellow-500' : 'bg-gray-500'
                              )} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                <span className="font-semibold">{activity.user}</span> {activity.action}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{activity.time}</span>
                                <span>•</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                  {activity.type}
                                </span>
                              </div>
                              {activity.details && (
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  {Object.entries(activity.details).map(([key, value], i) => (
                                    <span key={i} className="inline-flex items-center gap-1 mr-4">
                                      <span className="font-medium capitalize">{key}:</span>
                                      <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}