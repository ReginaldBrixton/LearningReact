'use client'

import { useState, useEffect } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { StatsCard } from './components/StatsCard'
import { RecentActivity } from './components/RecentActivity'
import { statsCards, recentActivities } from './data'
import { AlertTriangle } from 'lucide-react'
import DashboardHeader from './components/DashboardHeader'
import DashboardError from './components/DashboardError'

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
        setError(null)
        
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockNotifications = [
          { id: 1, title: 'New User Registration', time: '1m ago', priority: 'low' },
          { id: 2, title: 'System Update Required', time: '1h ago', priority: 'high' },
          { id: 3, title: 'Backup Completed', time: '2h ago', priority: 'medium' },
        ]
        
        setNotifications(mockNotifications)
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [timeRange])

  const handleExportData = () => {
    try {
      const csvData = statsCards.map(card => ({
        metric: card.title,
        value: card.value,
        growth: card.growth || 'N/A'
      }))
      
      // TODO: Implement actual CSV download
      const csvString = JSON.stringify(csvData)
      const blob = new Blob([csvString], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `dashboard-stats-${timeRange}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to export data:', err)
      // You might want to show a toast notification here
    }
  }

  if (error) {
    return <DashboardError message={error} />
  }

  return (
    <div className={cn("min-h-screen bg-background transition-colors duration-300", isDarkMode ? 'dark' : '')}>
      <div className="flex min-h-screen">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DashboardHeader 
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              onExport={handleExportData}
            />

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
              {/* ... Tabs content */}
            </Tabs>
              
            {/* Stats Grid */}
            <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {statsCards.map((card, index) => (
                <StatsCard key={index} card={card} index={index} />
              ))}
            </div>

            {/* Recent Activity */}
            <RecentActivity 
              activities={recentActivities}
              isLoading={isLoading}
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </main>
      </div>
    </div>
  )
}