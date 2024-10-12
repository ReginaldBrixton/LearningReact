import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NoRecentActivities from '@/components/ui/no-activity'

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

export default RecentActivities;
