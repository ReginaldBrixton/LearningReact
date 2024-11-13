'use client'

import { memo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Search, Filter } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'

const RecentActivity = memo(({ activities, isLoading, searchQuery, onSearchChange }) => {
  return (
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
              onChange={onSearchChange}
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
            activities.map((activity, index) => (
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
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  )
})

RecentActivity.displayName = 'RecentActivity'

export { RecentActivity } 