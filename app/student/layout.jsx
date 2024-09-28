"use client"

import { Bell, Calendar as CalendarIcon, ChevronRight, Home, Layout, List, Menu, PieChart, Plus, Search, Settings, Users, FileText, Archive, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "./dashboard/components/ui/button"
import { Input } from "./dashboard/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "./dashboard/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./dashboard/components/ui/tooltip"

const sidebarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard" },
  { icon: List, label: "Projects", route: "/student/projects" },
  { icon: Users, label: "Team", route: "/student/team" },
  { icon: Settings, label: "Settings", route: "/student/settings" },
  { icon: FileText, label: "Reports", route: "/student/reports" }, // New item
  { icon: Archive, label: "Archived", route: "/student/archived" }, // New item
  { icon: HelpCircle, label: "Help", route: "/student/help" }, // New item
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
                  href={item.route}
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
              <Link key={index} href={item.route} className="flex items-center gap-2 text-lg">
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

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}