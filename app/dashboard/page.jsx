"use client"

import { Bell, Calendar as CalendarIcon, ChevronRight, Home, Layout, List, Menu, PieChart, Plus, Search, Settings, Users, FileText, Archive, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/app/dashboard/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/dashboard/components/ui/card"
import { Input } from "@/app/dashboard/components/ui/input"
import { Progress } from "@/app/dashboard/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/app/dashboard/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/dashboard/components/ui/tooltip"
import Calendar from "@/app/dashboard/components/ui/calendar"; // Import the Calendar component

const sidebarItems = [
  { icon: Home, label: "Dashboard" },
  { icon: List, label: "Projects" },
  { icon: Users, label: "Team" },
  { icon: Settings, label: "Settings" },
  { icon: FileText, label: "Reports" }, // New item
  
  { icon: Archive, label: "Archived" }, // New item
  { icon: HelpCircle, label: "Help" }, // New item
]

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-14 lg:w-[12rem] h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-center h-[3rem] bg-gray-200 dark:bg-gray-700">
        <Layout className="h-6 w-6 lg:hidden" />
        <span className="hidden lg:inline text-lg font-semibold">Capstone Project</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex items-center h-12 px-4 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-4 hidden lg:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="lg:hidden">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  )
}

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center h-[3rem] px-4 border-b shrink-0 md:px-6">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col gap-4">
            {sidebarItems.map((item, index) => (
              <Link key={index} href="#" className="flex items-center gap-2 text-lg">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search projects..."
              type="search"
            />
          </div>
        </form>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Bell className="w-4 h-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <img
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="/placeholder.svg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}

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

export default function ProjectDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Projects" value="15" change="+2 from last month" icon={ChevronRight} />
            <StatCard title="Active Tasks" value="42" change="+5 from last week" icon={List} />
            <StatCard title="Team Members" value="8" change="+1 new this month" icon={Users} />
            <StatCard title="Completion Rate" value="78%" change="+2% from last month" icon={PieChart} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <RecentActivities />
            <UpcomingDeadlines />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <ProjectProgress />
            <QuickActions />
          </div>
          <div className="mt-4">
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  )
}