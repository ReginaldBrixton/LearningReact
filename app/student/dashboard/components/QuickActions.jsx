import { Plus, FileText, Calendar, MessageSquare, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function QuickActions() {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  const handleProjectSubmit = (e) => {
    e.preventDefault()
    // Handle project submission logic here
    setIsProjectDialogOpen(false)
  }

  const handleTaskCreate = (e) => {
    e.preventDefault()
    // Handle task creation logic here
    setIsTaskDialogOpen(false)
  }

  return (
    <Card className="col-span-1 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 border-2 border-rose-200 dark:border-rose-800">
      <CardHeader className="bg-rose-100 dark:bg-rose-900">
        <CardTitle className="text-2xl font-bold text-rose-800 dark:text-rose-200">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white dark:bg-rose-700 dark:hover:bg-rose-600">
              <Plus className="mr-2 h-4 w-4" />
              Project Submission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <Input placeholder="Project Title" required />
              <Textarea placeholder="Project Description" required />
              <Input type="file" accept=".pdf,.doc,.docx" required />
              <Button type="submit">Submit Project</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-800 dark:hover:bg-pink-700 dark:text-pink-100" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleTaskCreate} className="space-y-4">
              <Input placeholder="Task Title" required />
              <Textarea placeholder="Task Description" required />
              <Input type="date" required />
              <Button type="submit">Create Task</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:hover:bg-indigo-700 dark:text-indigo-100" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View Resources
        </Button>

        <Button className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 dark:text-emerald-100" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>

        <Button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800 dark:hover:bg-amber-700 dark:text-amber-100" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Supervisor
        </Button>

        <Button className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-800 dark:bg-cyan-800 dark:hover:bg-cyan-700 dark:text-cyan-100" variant="outline">
          <HelpCircle className="mr-2 h-4 w-4" />
          Get Help
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuickActions;
