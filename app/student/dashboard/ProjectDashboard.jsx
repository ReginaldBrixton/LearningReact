import { useState, useEffect } from "react"
import StatCards from './components/StatCards'
import RecentActivities from './components/RecentActivities'
import UpcomingDeadlines from './components/UpcomingDeadlines'
import ProjectProgress from './components/ProjectProgress'
import QuickActions from './components/QuickActions'
import Calendar from "@/components/ui/calendar"

function ProjectDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    // Uncomment the following lines to simulate loading delay
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
    // return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Project Dashboard</h1>
      <StatCards />
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
  )
}

export default ProjectDashboard;
