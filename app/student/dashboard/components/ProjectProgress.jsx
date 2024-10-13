import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function ProjectProgress() {
  const projects = [
    { name: "Research Proposal", progress: 75, color: "bg-emerald-500 dark:bg-emerald-600" },
    { name: "Capstone One", progress: 3, color: "bg-red-500 dark:bg-red-600" },
    { name: "Capstone Two", progress: 2, color: "bg-amber-500 dark:bg-amber-600" },
  ]

  return (
    <Card className="col-span-1 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 border-2 border-violet-200 dark:border-violet-800">
      <CardHeader className="bg-violet-100 dark:bg-violet-900">
        <CardTitle className="text-2xl font-bold text-violet-800 dark:text-violet-200">Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {projects.map((project, index) => (
          <div key={index} className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-violet-200 dark:border-violet-700">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">{project.name}</div>
              <div className={`text-sm font-bold px-2 py-1 rounded ${
                project.progress < 10 ? 'bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200' : 
                project.progress < 50 ? 'bg-amber-200 text-amber-700 dark:bg-amber-800 dark:text-amber-200' : 
                'bg-emerald-200 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200'
              }`}>
                {project.progress}%
              </div>
            </div>
            <Progress value={project.progress} className={`h-2 ${project.color}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ProjectProgress;
