import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default UpcomingDeadlines;
