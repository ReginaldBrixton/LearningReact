import { format } from 'date-fns'
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'

export function ProjectDetailsDialog({ project, getDepartmentColor, getScoreColor }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30">
          <Eye className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">View</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{project.title}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Completed on {format(new Date(project.completionDate), 'MMMM d, yyyy')}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Description:</h4>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Department:</h4>
              <Badge className={`${getDepartmentColor(project.department)}`}>
                {project.department}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Status:</h4>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {project.status}
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Supervisor:</h4>
            <p className="text-gray-600 dark:text-gray-300">{project.supervisor}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Score:</h4>
            <p className={`text-2xl font-bold ${getScoreColor(project.score)}`}>{project.score}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 