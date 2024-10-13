import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function ProjectProgress() {
  const projects = [
    { name: "Research Proposal", progress: 75 },
    { name: "Capstone One", progress: 3 },
    { name: "Capstone Two", progress: 2 },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</div>
            </div>
            <Progress value={project.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ProjectProgress;
