'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, HelpCircle, Layout, LogOut, Moon, Search, Settings, Sun, Users, BarChart, Briefcase, AlertTriangle, Download } from 'lucide-react'
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, parseISO, subDays } from 'date-fns'

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
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    details: { location: 'New York, US', device: 'Chrome on Windows' }
  },
  { 
    user: 'Jane Smith', 
    action: 'created a new project "AI Research"', 
    time: '1 hour ago',
    type: 'project',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    details: { projectId: 'PRJ-123', department: 'Research & Development' }
  },
  { 
    user: 'Admin', 
    action: 'posted an announcement about system maintenance', 
    time: '3 hours ago',
    type: 'announcement',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    details: { priority: 'High', affectedUsers: 'All' }
  },
  { 
    user: 'Mike Johnson', 
    action: 'updated department structure', 
    time: '5 hours ago',
    type: 'department',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    details: { changes: ['Added new team', 'Updated reporting lines'] }
  },
].map(activity => ({
  ...activity,
  avatar: (
    <Image 
      src={activity.avatar}
      alt={`${activity.user}'s avatar`}
      width={40}
      height={40}
      className="rounded-full object-cover"
      loading="lazy"
      placeholder="blur"
      blurDataURL="/placeholder.png"
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
      <div className="flex items-center justify-center h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>{error}</CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background transition-colors duration-300", isDarkMode ? 'dark' : '')}>
      <div className="flex h-screen overflow-hidden">
        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTimeRange('7d')}>Last 7 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange('30d')}>Last 30 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange('90d')}>Last 90 Days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={handleExportData} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
              
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
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={card.chartData}>
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#8884d8" 
                              strokeWidth={2} 
                              dot={false}
                            />
                            <Tooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-white p-2 shadow rounded">
                                      <p className="text-sm">{`${payload[0].value}`}</p>
                                    </div>
                                  )
                                }
                                return null
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    {card.metrics && (
                      <div className="mt-4 space-y-2">
                        {card.metrics.map((metric, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-500">{metric.name}</span>
                            <span className="font-medium">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions from users and system</CardDescription>
                  </div>
                  <Input
                    type="search"
                    placeholder="Filter activities..."
                    className="w-64"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                      <div className="relative w-10 h-10 mr-4">
                        <Image
                          src={activity.avatar}
                          alt={`${activity.user}'s avatar`}
                          fill
                          sizes="40px"
                          className="rounded-full object-cover"
                          priority={index === 0}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{activity.user} {activity.action}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{activity.time}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">{activity.type}</span>
                        </div>
                        {activity.details && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {Object.entries(activity.details).map(([key, value], i) => (
                              <span key={i} className="mr-4">
                                {key}: {Array.isArray(value) ? value.join(', ') : value}
                              </span>
                            ))}
                          </div>
                        )}
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