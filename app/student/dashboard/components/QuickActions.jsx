import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function QuickActions() {
  return (
    <Card className="col-span-3 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 border-2 border-rose-200 dark:border-rose-800">
      <CardHeader className="bg-rose-100 dark:bg-rose-900">
        <CardTitle className="text-2xl font-bold text-rose-800 dark:text-rose-200">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white dark:bg-rose-700 dark:hover:bg-rose-600">
          <Plus className="mr-2 h-4 w-4" />
          Project Submission
        </Button>
        <Button className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-800 dark:hover:bg-pink-700 dark:text-pink-100" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuickActions;
