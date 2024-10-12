'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, Video, Calendar, Clock, AlertTriangle, Award, ChevronRight, FileText, Zap } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const initialProject = {
  id: '1',
  title: 'My Capstone Project',
  sections: [
    {
      name: 'Proposal',
      submissions: {
        'Topic': { status: 'pending', dueDate: '2023-09-15' },
        'Document': { status: 'pending', dueDate: '2023-09-30' },
      },
    },
    {
      name: 'Capstone 2',
      submissions: {
        'Chapter 1': { status: 'pending', dueDate: '2023-10-15' },
        'Chapter 2': { status: 'pending', dueDate: '2023-11-01' },
        'Chapter 3': { status: 'pending', dueDate: '2023-11-15' },
      },
    },
    {
      name: 'Capstone 3',
      submissions: {
        'Chapter 4': { status: 'pending', dueDate: '2024-01-15' },
        'Chapter 5': { status: 'pending', dueDate: '2024-02-01' },
        'Video Defense': { status: 'pending', dueDate: '2024-02-15' },
      },
    },
    {
      name: 'Final Defense',
      submissions: {
        'Final Submission': { status: 'pending', dueDate: '2024-03-01' },
      },
    },
  ],
  currentSection: 0,
  videoDefenseScore: null,
  eligibleForFinalDefense: false,
  startDate: '2023-09-01',
  endDate: '2024-03-15',
}

const useProjectState = () => {
  const [project, setProject] = useState(initialProject)
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const end = new Date(project.endDate)
      const difference = end.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        setTimeRemaining(`${days}d ${hours}h`)
      } else {
        setTimeRemaining('Completed')
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [project.endDate])

  const handleSubmission = (sectionIndex, submissionKey) => {
    setProject(prev => {
      const newProject = { ...prev }
      newProject.sections[sectionIndex].submissions[submissionKey].status = 'submitted'
      return newProject
    })
  }

  const handleApproval = (sectionIndex, submissionKey) => {
    setProject(prev => {
      const newProject = { ...prev }
      newProject.sections[sectionIndex].submissions[submissionKey].status = 'approved'
      newProject.sections[sectionIndex].submissions[submissionKey].score = Math.floor(Math.random() * 21) + 80 // Random score between 80-100
      
      const allApproved = Object.values(newProject.sections[sectionIndex].submissions).every(sub => sub.status === 'approved')
      if (allApproved) {
        const scores = Object.values(newProject.sections[sectionIndex].submissions).map(sub => sub.score || 0)
        newProject.sections[sectionIndex].overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        
        if (sectionIndex < newProject.sections.length - 1) {
          newProject.currentSection = sectionIndex + 1
        }
      }
      
      return newProject
    })
  }

  const handleVideoUpload = (projectId) => {
    setProject(prev => ({
      ...prev,
      videoDefenseScore: Math.floor(Math.random() * 21) + 80, // Random score between 80-100
      eligibleForFinalDefense: true,
    }))
  }

  return { project, timeRemaining, handleSubmission, handleApproval, handleVideoUpload }
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

const OverallProgressCard = ({ project, timeRemaining }) => (
  <Card className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
    <CardHeader>
      <CardTitle className="text-2xl">Overall Progress</CardTitle>
      <CardDescription className="text-indigo-100">Your journey through the capstone project</CardDescription>
    </CardHeader>
    <CardContent>
      <Progress
        value={(project.currentSection / (project.sections.length - 1)) * 100}
        className="h-2 bg-indigo-200" />
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-indigo-100">Current Phase</p>
          <p className="text-lg font-semibold">{project.sections[project.currentSection].name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-indigo-100">Time Remaining</p>
          <p className="text-lg font-semibold">{timeRemaining}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const SubmissionItem = ({ submission, sectionIndex, submissionKey, submissionIndex, handleSubmission, handleApproval }) => {
  const isOverdue = new Date(submission.dueDate) < new Date() && submission.status === 'pending'

  return (
    <motion.div
      key={submissionIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: submissionIndex * 0.1 }}
      className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold flex items-center">
          <FileText className="mr-2 h-4 w-4 text-indigo-500" />
          <span>{submissionKey}</span>
        </h3>
        <Badge variant="secondary" className={getStatusColor(submission.status)}>
          {submission.status}
        </Badge>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center">
        <Calendar className="mr-2 h-4 w-4" />
        Due: {new Date(submission.dueDate).toLocaleDateString()}
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
          <Label htmlFor={`file-${sectionIndex}-${submissionIndex}`} className="sr-only">
            Upload {submissionKey}
          </Label>
          <Input
            id={`file-${sectionIndex}-${submissionIndex}`}
            type="file"
            className="cursor-pointer" />
          <Button onClick={() => handleSubmission(sectionIndex, submissionKey)} className="w-full bg-indigo-500 hover:bg-indigo-600">
            <Upload className="mr-2 h-4 w-4" /> Submit
          </Button>
        </div>
      )}
      {submission.status === 'submitted' && (
        <Button
          onClick={() => handleApproval(sectionIndex, submissionKey)}
          variant="outline"
          className="w-full">
          <Check className="mr-2 h-4 w-4" /> Approve (Simulated)
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

const SectionAccordion = ({ project, handleSubmission, handleApproval }) => (
  <Accordion type="single" collapsible className="w-full space-y-4">
    {project.sections.map((section, sectionIndex) => (
      <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-semibold flex items-center">
              <ChevronRight className="mr-2 h-5 w-5 text-indigo-500" />
              {section.name}
            </span>
            <Badge
              variant="outline"
              className={`${
                sectionIndex < project.currentSection
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : sectionIndex === project.currentSection
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {sectionIndex < project.currentSection ? 'Completed' : sectionIndex === project.currentSection ? 'In Progress' : 'Locked'}
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent className="pt-6">
              <ScrollArea className="h-[300px] pr-4">
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
                    />
                  ))}
                </div>
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
    ))}
  </Accordion>
)

export default function ProjectsPage() {
  const { project, timeRemaining, handleSubmission, handleApproval, handleVideoUpload } = useProjectState();

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <Zap className="mr-2 h-8 w-8 text-indigo-500" />
        {project.title}
      </h1>
      <OverallProgressCard project={project} timeRemaining={timeRemaining} />
      <SectionAccordion 
        project={project}
        handleSubmission={handleSubmission}
        handleApproval={handleApproval}
      />
      <Card className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Final Steps</CardTitle>
          <CardDescription className="text-purple-100">Prepare for your defense and final submission</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center">
          <div>
            <p className="font-semibold mb-2">Video Defense</p>
            {project.videoDefenseScore ? (
              <p className="text-lg">Score: {project.videoDefenseScore}/100</p>
            ) : (
              <Button onClick={() => handleVideoUpload(project.id)} className="bg-white text-purple-600 hover:bg-purple-100">
                <Video className="mr-2 h-4  w-4" /> Upload Video Defense
              </Button>
            )}
          </div>
          <div>
            <p className="font-semibold mb-2">Final Defense Eligibility</p>
            {project.eligibleForFinalDefense ? (
              <Badge className="bg-green-400 text-green-800">Eligible for Final Defense</Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Not Yet Eligible</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="mt-8 bg-indigo-500 hover:bg-indigo-600">
              <Clock className="mr-2 h-4 w-4" /> View Project Timeline
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to see a detailed timeline of your project milestones</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}