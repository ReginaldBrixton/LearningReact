'use client';
import { useState } from 'react'
import { motion } from 'framer-motion';
import { Check, Upload, Video } from 'lucide-react';

import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Progress } from "./components/ui/progress"
import { ScrollArea } from "./components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"

const initialProject = {
  id: '1',
  title: 'My Capstone Project',
  sections: [
    {
      name: 'Proposal',
      submissions: {
        'Topic': { status: 'pending' },
        'Document': { status: 'pending' },
      },
    },
    {
      name: 'Capstone 2',
      submissions: {
        'Chapter 1': { status: 'pending' },
        'Chapter 2': { status: 'pending' },
        'Chapter 3': { status: 'pending' },
      },
    },
    {
      name: 'Capstone 3',
      submissions: {
        'Chapter 4': { status: 'pending' },
        'Chapter 5': { status: 'pending' },
        'Video Defense': { status: 'pending' },
      },
    },
    {
      name: 'Final Defense',
      submissions: {
        'Final Submission': { status: 'pending' },
      },
    },
  ],
  currentSection: 0,
  videoDefenseScore: null,
  eligibleForFinalDefense: false,
}

const useProjectState = () => {
  const [project, setProject] = useState(initialProject)

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

  return { project, handleSubmission, handleApproval, handleVideoUpload }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'text-yellow-500'
    case 'submitted': return 'text-blue-500'
    case 'approved': return 'text-green-500'
    case 'rejected': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

const OverallProgressCard = ({ project }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Overall Progress</CardTitle>
      <CardDescription>Your journey through the capstone project</CardDescription>
    </CardHeader>
    <CardContent>
      <Progress
        value={(project.currentSection / (project.sections.length - 1)) * 100}
        className="h-2" />
      <div className="mt-2 text-sm text-muted-foreground">
        Current Phase: {project.sections[project.currentSection].name}
      </div>
    </CardContent>

  </Card>
)

const SubmissionItem = ({ submission, sectionIndex, submissionKey, submissionIndex, handleSubmission, handleApproval }) => (
  <motion.div
    key={submissionIndex}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: submissionIndex * 0.1 }}
    className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <h3 className="font-semibold mb-2 flex items-center justify-between">
      <span>{submissionKey}</span>
      <span className={`text-sm ${getStatusColor(submission.status)}`}>
        {submission.status}
      </span>
    </h3>
    {submission.status === 'pending' && (
      <div className="space-y-2">
        <Label htmlFor={`file-${sectionIndex}-${submissionIndex}`} className="sr-only">
          Upload {submissionKey}
        </Label>
        <Input
          id={`file-${sectionIndex}-${submissionIndex}`}
          type="file"
          className="cursor-pointer" />
        <Button onClick={() => handleSubmission(sectionIndex, submissionKey)} className="w-full">
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
        <p className="text-sm font-medium text-green-600">Score: {submission.score}/100</p>
      </div>
    )}
  </motion.div>
)

const SectionAccordion = ({ project, handleSubmission, handleApproval }) => (
  <Accordion type="single" collapsible className="w-full space-y-4">
    {project.sections.map((section, sectionIndex) => (
      <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-semibold">{section.name}</span>
            <span
              className={`text-sm font-medium ${sectionIndex <= project.currentSection ? 'text-blue-500' : 'text-gray-400'}`}>
              {sectionIndex < project.currentSection ? 'Completed' : sectionIndex === project.currentSection ? 'In Progress' : 'Locked'}
            </span>
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
  const { project, handleSubmission, handleApproval, handleVideoUpload } = useProjectState();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">{project.title}</h1>
      <OverallProgressCard project={project} />
      <SectionAccordion 
        project={project}
        handleSubmission={handleSubmission}
        handleApproval={handleApproval}
      />
      <Card className="mt-8">
        <CardFooter className="flex justify-between">
          <div>
            <p className="font-semibold">Video Defense</p>
            {project.videoDefenseScore ? (
              <p>Score: {project.videoDefenseScore}/100</p>
            ) : (
              <Button onClick={() => handleVideoUpload(project.id)}>
                <Video className="mr-2 h-4 w-4" /> Upload Video Defense
              </Button>
            )}
          </div>
          <div>
            <p className="font-semibold">Final Defense Eligibility</p>
            {project.eligibleForFinalDefense ? (
              <p className="text-green-600">Eligible for Final Defense</p>
            ) : (
              <p className="text-yellow-600">Not Yet Eligible</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}