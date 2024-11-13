'use client'

import { Download, ChevronDown, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { memo } from 'react'

const TIME_RANGES = {
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days', 
  '90d': 'Last 90 Days',
  'custom': 'Custom Range'
}

const DashboardHeader = memo(({ timeRange, setTimeRange, onExport }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tight">
            Dashboard
          </h1>
        </div>
        <p className="text-base text-gray-600 dark:text-gray-400 font-medium pl-4">
          Welcome back, <span className="text-indigo-600 dark:text-indigo-400">Admin</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-[180px] justify-between bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
              aria-label="Select time range"
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium dark:text-gray-400">{TIME_RANGES[timeRange]}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
            {Object.entries(TIME_RANGES).map(([value, label]) => (
              <DropdownMenuItem 
                key={value}
                onClick={() => setTimeRange(value)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 transition-colors"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          onClick={onExport}
          className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 dark:from-indigo-500 dark:to-indigo-600 dark:hover:from-indigo-600 dark:hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          aria-label="Export report"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
    </header>
  )
})

DashboardHeader.displayName = 'DashboardHeader'

export default DashboardHeader