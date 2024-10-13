import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NoRecentActivities from '@/components/ui/no-activity'
import { Clock, Bell, UserPlus } from 'lucide-react'

function RecentActivities() {
  const activities = [
    { title: "Your project has been reviewed.", time: "2 hours ago", icon: Clock },
    { title: "Mr. Ofei made an announcement.", time: "5 hours ago", icon: Bell },
    { title: "New team member added", time: "1 day ago", icon: UserPlus },
  ]

  return (
    <Card className="col-span-4 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950 dark:to-teal-950 border-2 border-cyan-200 dark:border-cyan-800">
      <CardHeader className="bg-cyan-100 dark:bg-cyan-900">
        <CardTitle className="text-2xl font-bold text-cyan-800 dark:text-cyan-200">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 border border-cyan-200 dark:border-cyan-700">
                <activity.icon className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-800 dark:text-gray-200">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
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

export default RecentActivities;
