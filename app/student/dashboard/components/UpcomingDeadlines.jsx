import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function UpcomingDeadlines() {
  const deadlines = [
    { title: "Capstone Proposal", dueIn: "Due in 2 days", urgency: "high" },
    { title: "Capstone One", dueIn: "Due in 5 days", urgency: "medium" },
    { title: "Capstone Two", dueIn: "Due in 7 weeks", urgency: "low" },
  ]

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700"
      case "medium":
        return "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700"
      case "low":
        return "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700"
      default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
    }
  }

  return (
    <Card className="col-span-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-2 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="bg-indigo-100 dark:bg-indigo-900">
        <CardTitle className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className={`flex items-center p-4 rounded-lg border ${getUrgencyColor(deadline.urgency)} transition-all duration-300 hover:shadow-md`}>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{deadline.title}</p>
                <p className="text-xs opacity-80">{deadline.dueIn}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default UpcomingDeadlines;
