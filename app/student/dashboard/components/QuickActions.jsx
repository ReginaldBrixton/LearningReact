import { Plus, FileText, Calendar, MessageSquare, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

function QuickActions() {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

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
    <Card className="col-span-1 bg-card">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-2xl font-bold text-primary">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Project Submission
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "sm:max-w-[425px]",
            isMobile && "slide-in-from-bottom-2 rounded-b-none"
          )}>
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
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "sm:max-w-[425px]",
            isMobile && "slide-in-from-bottom-2 rounded-b-none"
          )}>
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

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View Resources
        </Button>

        <Button className="w-full bg-muted hover:bg-muted/90 text-muted-foreground" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>

        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Supervisor
        </Button>

        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" variant="outline">
          <HelpCircle className="mr-2 h-4 w-4" />
          Get Help
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuickActions;
