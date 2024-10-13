"use client"

import {
  Home, Layout, ClipboardCheck, List, PieChart, Settings,
  FileText, Archive, HelpCircle, MessageSquare
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarItems = [
  { icon: Home, label: "Dashboard", route: "/student/dashboard", color: "text-blue-600 dark:text-blue-300" },
  { icon: List, label: "Projects", route: "/student/projects", color: "text-green-600 dark:text-green-300" },
  { icon: ClipboardCheck, label: "Review", route: "/student/review", color: "text-yellow-600 dark:text-yellow-300" },
  { icon: PieChart, label: "Score Board", route: "/student/scoreboard", color: "text-purple-600 dark:text-purple-300" },
  { icon: MessageSquare, label: "Chat", route: "/student/chat", color: "text-pink-600 dark:text-pink-300" },
  { icon: Settings, label: "Settings", route: "/student/settings", color: "text-gray-600 dark:text-gray-300" },
  { icon: FileText, label: "Reports", route: "/student/reports", color: "text-indigo-600 dark:text-indigo-300" },
  { icon: Archive, label: "Archived", route: "/student/archived", color: "text-orange-600 dark:text-orange-300" },
  { icon: HelpCircle, label: "Help", route: "/student/help", color: "text-teal-600 dark:text-teal-300" },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    sidebarItems.forEach(item => {
      router.prefetch(item.route)
    })
  }, [router])

  return (
    <aside className={`hidden layout-sm:flex flex-col w-14 layout-lg:w-[12rem] h-screen bg-gray-100 dark:bg-gray-800`}>
      <div className="flex items-center justify-center h-[3rem] bg-gray-200 dark:bg-gray-700">
        <Layout className="h-6 w-6 lg:hidden" />
        <span className="hidden layout-lg:inline text-lg font-semibold">Capstone Project</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.route}
                  className={`flex items-center h-12 px-4 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                    pathname === item.route ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-4 hidden layout-lg:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="layout-lg:hidden">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  )
}

