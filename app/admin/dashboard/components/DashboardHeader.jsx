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
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-[160px] justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
              aria-label="Select time range"
            >
              <Calendar className="h-4 w-4 mr-2" />
              {TIME_RANGES[timeRange]}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {Object.entries(TIME_RANGES).map(([value, label]) => (
              <DropdownMenuItem 
                key={value}
                onClick={() => setTimeRange(value)}
                className="cursor-pointer"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          onClick={onExport}
          variant="default"
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 transition-colors"
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