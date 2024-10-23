'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, Video, Calendar, Clock, AlertTriangle, Award, ChevronRight, FileText, Zap, Info } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const theme = {
  light: {
    primary: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600'
    },
    secondary: {
      bg: 'bg-teal-600', 
      hover: 'hover:bg-teal-700',
      text: 'text-teal-600'
    },
    accent: {
      bg: 'bg-amber-500',
      hover: 'hover:bg-amber-600', 
      text: 'text-amber-500'
    },
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      hover: 'hover:bg-gray-100'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600', 
      muted: 'text-gray-400'
    },
    border: 'border-gray-200',
    divider: 'divide-gray-200'
  },
  dark: {
    primary: {
      bg: 'dark:bg-blue-500',
      hover: 'dark:hover:bg-blue-600',
      text: 'dark:text-blue-400'
    },
    secondary: {
      bg: 'dark:bg-teal-500',
      hover: 'dark:hover:bg-teal-600',
      text: 'dark:text-teal-400'
    },
    accent: {
      bg: 'dark:bg-amber-400',
      hover: 'dark:hover:bg-amber-500',
      text: 'dark:text-amber-400'
    },
    background: {
      primary: 'dark:bg-gray-900',
      secondary: 'dark:bg-gray-800',
      hover: 'dark:hover:bg-gray-700'
    },
    text: {
      primary: 'dark:text-gray-50',
      secondary: 'dark:text-gray-300',
      muted: 'dark:text-gray-500'
    },
    border: 'dark:border-gray-700',
    divider: 'dark:divide-gray-700'
  }
}

const initialProject = {
  id: '1',
  title: 'My Capstone Project',
  sections: [
    {
      name: 'Proposal',
      description: 'Initial project planning and topic selection',
      submissions: {
        'Topic': { status: 'pending', dueDate: '2023-09-15', description: 'Submit your proposed research topic' },
        'Document': { status: 'pending', dueDate: '2023-09-30', description: 'Full proposal document with methodology' },
      },
    },
    {
      name: 'Capstone 2',
      description: 'Research foundation and initial chapters',
      submissions: {
        'Chapter 1': { status: 'pending', dueDate: '2023-10-15', description: 'Introduction and Background' },
        'Chapter 2': { status: 'pending', dueDate: '2023-11-01', description: 'Literature Review' },
        'Chapter 3': { status: 'pending', dueDate: '2023-11-15', description: 'Methodology' },
      },
    },
    {
      name: 'Capstone 3',
      description: 'Results and analysis',
      submissions: {
        'Chapter 4': { status: 'pending', dueDate: '2024-01-15', description: 'Results and Discussion' },
        'Chapter 5': { status: 'pending', dueDate: '2024-02-01', description: 'Conclusions and Recommendations' },
        'Video Defense': { status: 'pending', dueDate: '2024-02-15', description: 'Recorded presentation of findings' },
      },
    },
    {
      name: 'Final Defense',
      description: 'Project completion and defense',
      submissions: {
        'Final Submission': { status: 'pending', dueDate: '2024-03-01', description: 'Complete manuscript with revisions' },
      },
    },
  ],
  currentSection: 0,
  videoDefenseScore: null,
  eligibleForFinalDefense: false,
  startDate: '2023-09-01',
  endDate: '2024-03-15',
  feedback: [],
  milestones: []
}

const useProjectState = () => {
  const [project, setProject] = useState(initialProject)
  const [timeRemaining, setTimeRemaining] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const end = new Date(project.endDate)
      const difference = end.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
      } else {
        setTimeRemaining('Completed')
        clearInterval(timer)
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [project.endDate])

  const handleSubmission = async (sectionIndex, submissionKey) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProject(prev => {
        const newProject = { ...prev }
        newProject.sections[sectionIndex].submissions[submissionKey].status = 'submitted'
        newProject.feedback = [...prev.feedback, {
          date: new Date().toISOString(),
          type: 'submission',
          message: `Submitted ${submissionKey} for ${prev.sections[sectionIndex].name}`
        }]
        return newProject
      })
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (sectionIndex, submissionKey) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProject(prev => {
        const newProject = { ...prev }
        const score = Math.floor(Math.random() * 21) + 80
        newProject.sections[sectionIndex].submissions[submissionKey].status = 'approved'
        newProject.sections[sectionIndex].submissions[submissionKey].score = score
        newProject.feedback = [...prev.feedback, {
          date: new Date().toISOString(),
          type: 'approval',
          message: `${submissionKey} approved with score ${score}/100`
        }]
        
        const allApproved = Object.values(newProject.sections[sectionIndex].submissions)
          .every(sub => sub.status === 'approved')
        
        if (allApproved) {
          const scores = Object.values(newProject.sections[sectionIndex].submissions)
            .map(sub => sub.score || 0)
          newProject.sections[sectionIndex].overallScore = Math.round(
            scores.reduce((a, b) => a + b, 0) / scores.length
          )
          
          if (sectionIndex < newProject.sections.length - 1) {
            newProject.currentSection = sectionIndex + 1
            newProject.milestones = [...prev.milestones, {
              date: new Date().toISOString(),
              title: `Completed ${prev.sections[sectionIndex].name}`,
              score: newProject.sections[sectionIndex].overallScore
            }]
          }
        }
        
        return newProject
      })
    } catch (error) {
      console.error('Approval failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoUpload = async (projectId) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setProject(prev => {
        const score = Math.floor(Math.random() * 21) + 80
        return {
          ...prev,
          videoDefenseScore: score,
          eligibleForFinalDefense: true,
          feedback: [...prev.feedback, {
            date: new Date().toISOString(),
            type: 'video',
            message: `Video defense submitted and scored ${score}/100`
          }]
        }
      })
    } catch (error) {
      console.error('Video upload failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return { 
    project, 
    timeRemaining, 
    loading,
    handleSubmission, 
    handleApproval, 
    handleVideoUpload 
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const OverallProgressCard = ({ project, timeRemaining }) => {
  const completedSections = project.sections.filter((_, index) => index < project.currentSection).length
  const progressPercentage = (completedSections / (project.sections.length - 1)) * 100
  
  return (
    <Card className={`mb-8 ${theme.light.primary.bg} ${theme.dark.primary.bg} text-white`}>
      <CardHeader>
        <CardTitle className="text-2xl">Overall Progress</CardTitle>
        <CardDescription className="text-blue-100">Your journey through the capstone project</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={progressPercentage}
          className="h-2 bg-blue-200" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-blue-100">Current Phase</p>
            <p className="text-lg font-semibold">{project.sections[project.currentSection].name}</p>
          </div>
          <div>
            <p className="text-sm text-blue-100">Completion</p>
            <p className="text-lg font-semibold">{Math.round(progressPercentage)}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Time Remaining</p>
            <p className="text-lg font-semibold">{timeRemaining}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const SubmissionItem = ({ submission, sectionIndex, submissionKey, submissionIndex, handleSubmission, handleApproval, loading }) => {
  const isOverdue = new Date(submission.dueDate) < new Date() && submission.status === 'pending'
  const daysUntilDue = Math.ceil((new Date(submission.dueDate) - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      key={submissionIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: submissionIndex * 0.1 }}
      className={`border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${theme.light.background.primary} ${theme.dark.background.primary}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold flex items-center">
            <FileText className={`mr-2 h-4 w-4 ${theme.light.primary.text} ${theme.dark.primary.text}`} />
            <span>{submissionKey}</span>
          </h3>
          <p className={`text-sm ${theme.light.text.secondary} ${theme.dark.text.secondary} mt-1`}>
            {submission.description}
          </p>
        </div>
        <Badge variant="secondary" className={getStatusColor(submission.status)}>
          {submission.status}
        </Badge>
      </div>
      
      <div className={`text-sm ${theme.light.text.muted} ${theme.dark.text.muted} mb-4 flex items-center justify-between`}>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          Due: {new Date(submission.dueDate).toLocaleDateString()}
        </div>
        {!isOverdue && submission.status === 'pending' && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            {daysUntilDue} days left
          </Badge>
        )}
      </div>

      {isOverdue && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Overdue</AlertTitle>
          <AlertDescription>
            This submission is past its due date. Please submit as soon as possible.
          </AlertDescription>
        </Alert>
      )}

      {submission.status === 'pending' && (
        <div className="space-y-2">
          <Label htmlFor={`file-${sectionIndex}-${submissionIndex}`}>
            Upload Document
          </Label>
          <Input
            id={`file-${sectionIndex}-${submissionIndex}`}
            type="file"
            className="cursor-pointer"
            accept=".pdf,.doc,.docx"
          />
          <Button 
            onClick={() => handleSubmission(sectionIndex, submissionKey)} 
            className={`w-full ${theme.light.primary.bg} ${theme.light.primary.hover} ${theme.dark.primary.bg} ${theme.dark.primary.hover}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Upload className="h-4 w-4" />
                </motion.div>
                Submitting...
              </span>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Submit
              </>
            )}
          </Button>
        </div>
      )}

      {submission.status === 'submitted' && (
        <Button
          onClick={() => handleApproval(sectionIndex, submissionKey)}
          variant="outline"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Check className="h-4 w-4" />
              </motion.div>
              Processing...
            </span>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Approve (Simulated)
            </>
          )}
        </Button>
      )}

      {submission.status === 'approved' && submission.score && (
        <div className="mt-2">
          <Progress value={submission.score} className="h-2 mb-2" />
          <p className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
            <Award className="mr-2 h-4 w-4" />
            Score: {submission.score}/100
          </p>
        </div>
      )}
    </motion.div>
  )
}

const SectionAccordion = ({ project, handleSubmission, handleApproval, loading }) => (
  <Accordion type="single" collapsible className="w-full space-y-4">
    {project.sections.map((section, sectionIndex) => {
      const isCompleted = sectionIndex < project.currentSection
      const isActive = sectionIndex === project.currentSection
      const isLocked = sectionIndex > project.currentSection

      return (
        <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-xl font-semibold flex items-center">
                  <ChevronRight className={`mr-2 h-5 w-5 ${theme.light.primary.text} ${theme.dark.primary.text}`} />
                  {section.name}
                </span>
                <p className={`text-sm ${theme.light.text.secondary} ${theme.dark.text.secondary} text-left mt-1`}>
                  {section.description}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`${
                  isCompleted
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : isActive
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Locked'}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(section.submissions).map(([key, submission], submissionIndex) => (
                      <SubmissionItem
                        key={submissionIndex}
                        submission={submission}
                        sectionIndex={sectionIndex}
                        submissionKey={key}
                        submissionIndex={submissionIndex}
                        handleSubmission={handleSubmission}
                        handleApproval={handleApproval}
                        loading={loading}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm font-medium">Section Progress</div>
                <div className="w-1/2">
                  <Progress
                    value={
                      (Object.values(section.submissions).filter(s => s.status === 'approved').length / 
                      Object.values(section.submissions).length) * 100
                    }
                    className="h-2" />
                </div>
              </CardFooter>
            </Card>
          </AccordionContent>
        </AccordionItem>
      )
    })}
  </Accordion>
)

const ActivityFeed = ({ feedback }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle className="text-xl">Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[200px]">
        {feedback.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 mb-4">
            <div className={`p-2 rounded-full ${
              item.type === 'submission' ? 'bg-blue-100' :
              item.type === 'approval' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              {item.type === 'submission' ? <Upload className="h-4 w-4" /> :
               item.type === 'approval' ? <Check className="h-4 w-4" /> :
               <Video className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm">{item.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </CardContent>
  </Card>
)

export default function ProjectsPage() {
  const { project, timeRemaining, loading, handleSubmission, handleApproval, handleVideoUpload } = useProjectState();

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center">
          <Zap className="mr-2 h-8 w-8 text-blue-500" />
          {project.title}
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Info className="mr-2 h-4 w-4" />
              Project Info
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Project Information</DialogTitle>
              <DialogDescription>
                Key dates and milestones for your capstone project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Project Timeline</h4>
                <p className="text-sm text-gray-500">
                  Start: {new Date(project.startDate).toLocaleDateString()}
                  <br />
                  End: {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Completed Milestones</h4>
                <div className="space-y-2">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-gray-500">
                        Score: {milestone.score}/100
                        <br />
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <OverallProgressCard project={project} timeRemaining={timeRemaining} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionAccordion 
            project={project}
            handleSubmission={handleSubmission}
            handleApproval={handleApproval}
            loading={loading}
          />
        </div>
        <div className="space-y-8">
          <Card className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Final Steps</CardTitle>
              <CardDescription className="text-teal-100">
                Prepare for your defense and final submission
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full">
                <p className="font-semibold mb-2">Video Defense</p>
                {project.videoDefenseScore ? (
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Progress value={project.videoDefenseScore} className="h-2 mb-2" />
                    <p className="text-lg">Score: {project.videoDefenseScore}/100</p>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleVideoUpload(project.id)} 
                    className="w-full bg-white text-teal-600 hover:bg-teal-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Video className="h-4 w-4" />
                        </motion.div>
                        Uploading...
                      </span>
                    ) : (
                      <>
                        <Video className="mr-2 h-4 w-4" /> Upload Video Defense
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="w-full">
                <p className="font-semibold mb-2">Final Defense Eligibility</p>
                {project.eligibleForFinalDefense ? (
                  <Badge className="bg-green-400 text-green-800">
                    Eligible for Final Defense
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Complete all requirements first
                  </Badge>
                )}
              </div>
            </CardFooter>
          </Card>

          <ActivityFeed feedback={project.feedback} />
        </div>
      </div>
    </div>
  );
}