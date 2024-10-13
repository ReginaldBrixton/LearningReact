"use client"

import { Bell, Calendar as CalendarIcon, ChevronRight, Home, Layout, List, Menu, PieChart, Plus, Search, Settings, Users, FileText, Archive, HelpCircle, Trophy } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"


import Calendar from "@/components/ui/calendar"
import DashboardLoading from "./loading"
import RecentActivities from "./components/RecentActivities"
import UpcomingDeadlines from "./components/UpcomingDeadlines"
import ProjectProgress from "./components/ProjectProgress"
import QuickActions from "./components/QuickActions"
import StatCards from "./components/StatCards"

function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
        <div className="space-y-6">
      <h1 className="text-3xl font-bold">Project Dashboard</h1>
      <StatCards /> 
      <RecentActivities />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivities />
        <UpcomingDeadlines />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <ProjectProgress />
        <QuickActions />
      </div>
      <div>
        <Calendar />
      </div>
    </div>
    </Suspense>
  );
}

export default DashboardPage;
