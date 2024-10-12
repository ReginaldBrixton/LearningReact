"use client"

// Importing necessary icons from lucide-react library
import { Bell, Calendar as CalendarIcon, ChevronRight, Home, Layout, List, Menu, PieChart, Plus, Search, Settings, Users, FileText, Archive, HelpCircle, Trophy } from "lucide-react"
// Importing Link component from next/link for navigation
import Link from "next/link"
// Importing useState, useEffect, and Suspense hooks from react
import { useState, useEffect, Suspense } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Calendar from "@/components/ui/calendar"
import DashboardLoading from './loading'
import NoRecentActivities from '@/components/ui/no-activity'

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

// Function for Total Projects StatCard
function TotalProjectsCard() {
  return <StatCard title="Total Projects" value="15" change="+2 from last month" icon={ChevronRight} />;
}

// Function for Active Tasks StatCard
function ActiveTasksCard() {
  return <StatCard title="Active Tasks" value="42" change="+5 from last week" icon={List} />;
}

// Function for Score Board StatCard
function ScoreBoardCard() {
  return <StatCard title="Score Board" value="8" change="+1 new this month" icon={Trophy} />;
}

// Function for Completion Rate StatCard
function CompletionRateCard() {
  return <StatCard title="Completion Rate" value="78%" change="+2% from last month" icon={PieChart} />;
}

// Component to display recent activities in a card
function RecentActivities() {
  const activities = [
    // { title: "Your project has been reviewed.", time: "2 hours ago" },
    // { title: "Mr. Ofei made an announcement.", time: "5 hours ago" },
    // { title: "New team member added", time: "1 day ago" },
  ]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoRecentActivities />
        )}
      </CardContent>
    </Card>
  )
}

// Component to display upcoming deadlines in a card
function UpcomingDeadlines() {
  const deadlines = [
    { title: "Capstone Proposal", dueIn: "Due in 2 days" },
    { title: "Capstone One", dueIn: "Due in 5 days" },
    { title: "Capstone Two", dueIn: "Due in 7 weeks" },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
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
  const projects = [
    { name: "Research Proposal", progress: 75 },
    { name: "Capstone One", progress: 3 },
    { name: "Capstone Two", progress: 2 },
  ]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
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
          Project Submission
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
function ProjectDashboard() {
  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold">Project Dashboard</h1>
      {/* Grid layout for statistical cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <TotalProjectsCard />
        <ActiveTasksCard />
        <ScoreBoardCard />
        <CompletionRateCard />
      </div>
      {/* Grid layout for recent activities and upcoming deadlines */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivities />
        <UpcomingDeadlines />
      </div>
      {/* Grid layout for project progress and quick actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <ProjectProgress />
        <QuickActions />
      </div>
      {/* Calendar component */}
      <div>
        <Calendar />
      </div>
    </div>
  )
}

// Modify the DashboardWrapper component
function DashboardWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    // Uncomment the following lines to enable the loading delay for debugging
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000); // 3 seconds delay

    // Comment out the next line when using the loading delay
    setIsLoading(false);

    // Uncomment the following line when using the loading delay
    // return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<DashboardLoading />}>
      {isLoading ? <DashboardLoading /> : <ProjectDashboard />}
    </Suspense>
  );
}

// Export the wrapped component as the default export
export default DashboardWrapper;