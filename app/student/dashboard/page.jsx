"use client"

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
        <div className="flex flex-col space-y-6">
          <StatCards />
          {/* Updated grid layout for RecentActivities and UpcomingDeadlines */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
            <RecentActivities />
            <UpcomingDeadlines />
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <ProjectProgress />
            <QuickActions />
          </div>
        </div>
        <div className="lg:w-1/2">
          <Calendar />
        </div>
      </div>
    </Suspense>
  );
}

export default DashboardPage;
