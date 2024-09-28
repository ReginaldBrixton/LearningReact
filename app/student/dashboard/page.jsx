"use client"

// Importing necessary icons from lucide-react library
import { Bell, Calendar as CalendarIcon, ChevronRight, Home, Layout, List, Menu, PieChart, Plus, Search, Settings, Users, FileText, Archive, HelpCircle } from "lucide-react"
// Importing Link component from next/link for navigation
import Link from "next/link"
// Importing useState hook from react for state management
import { useState } from "react"

import { Button } from "@/app/student/dashboard/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/student/dashboard/components/ui/card"
import { Input } from "@/app/student/dashboard/components/ui/input"
import { Progress } from "@/app/student/dashboard/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/app/student/dashboard/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/student/dashboard/components/ui/tooltip"
import Calendar from "@/app/student/dashboard/components/ui/calendar"; 
import DashboardLayout from "@/app/student/layout" 

// Component to display a statistical card with title, value, change, and an icon
function StatCard({ title, value, change, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{change}</p>
      </CardContent>
    </Card>
  )
}

// Component to display recent activities in a card
function RecentActivities() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { title: "New task added to Project X", time: "2 hours ago" },
            { title: "Project Y completed", time: "5 hours ago" },
            { title: "New team member added", time: "1 day ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Component to display upcoming deadlines in a card
function UpcomingDeadlines() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { title: "Project A Milestone", dueIn: "Due in 2 days" },
            { title: "Project B Presentation", dueIn: "Due in 5 days" },
          ].map((deadline, index) => (
            <div key={index} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{deadline.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{deadline.dueIn}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Component to display project progress in a card
function ProjectProgress() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { name: "Project X", progress: 75 },
          { name: "Project Y", progress: 50 },
          { name: "Project Z", progress: 25 },
        ].map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</div>
            </div>
            <Progress value={project.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Component to display quick action buttons in a card
function QuickActions() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
        <Button className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </CardContent>
    </Card>
  )
}

// Main component to display the project dashboard
export default function ProjectDashboard() {
  return (
    <div>
      {/* Grid layout for statistical cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value="15" change="+2 from last month" icon={ChevronRight} />
        <StatCard title="Active Tasks" value="42" change="+5 from last week" icon={List} />
        <StatCard title="Team Members" value="8" change="+1 new this month" icon={Users} />
        <StatCard title="Completion Rate" value="78%" change="+2% from last month" icon={PieChart} />
      </div>
      {/* Grid layout for recent activities and upcoming deadlines */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <RecentActivities />
        <UpcomingDeadlines />
      </div>
      {/* Grid layout for project progress and quick actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <ProjectProgress />
        <QuickActions />
      </div>
      {/* Calendar component */}
      <div className="mt-4">
        <Calendar />
      </div>
    </div>
  )
}