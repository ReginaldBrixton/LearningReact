"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search,
  Book,
  HelpCircle,
  FileQuestion,
  MessageCircle,
  Video,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Home,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Download,
  Lightbulb,
  BookOpen,
  Filter
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const faqs = [
  {
    question: "How do I submit my capstone project?",
    answer: "To submit your capstone project, navigate to the 'Submit Project' page from the dashboard. Fill in the required details and upload your project files. Make sure to review all information before final submission.",
    category: "Submission"
  },
  {
    question: "What file formats are accepted for project submission?",
    answer: "We accept a wide range of file formats including PDF, DOCX, PPT, ZIP (for multiple files), and common programming file extensions. The maximum file size is 50MB per upload.",
    category: "Submission"
  },
  {
    question: "How can I track the progress of my project?",
    answer: "You can track your project's progress on the 'My Projects' page. This page displays the current status, upcoming deadlines, and any feedback from your supervisor.",
    category: "Progress"
  },
  {
    question: "What should I do if I miss a deadline?",
    answer: "If you miss a deadline, contact your supervisor immediately. Explain your situation and discuss the possibility of an extension. Remember to update your project timeline on the system if an extension is granted.",
    category: "Deadlines"
  },
  {
    question: "How do I communicate with my supervisor through the system?",
    answer: "Use the 'Messages' feature to communicate with your supervisor. You can send messages, share files, and schedule meetings through this feature.",
    category: "Communication"
  }
]

const tutorials = [
  { title: "Getting Started Guide", icon: Book, link: "/tutorials/getting-started", category: "Basics" },
  { title: "How to Submit Your Project", icon: FileQuestion, link: "/tutorials/project-submission", category: "Submission" },
  { title: "Communicating with Your Supervisor", icon: MessageCircle, link: "/tutorials/communication", category: "Communication" },
  { title: "Understanding Project Milestones", icon: ChevronRight, link: "/tutorials/milestones", category: "Progress" },
  { title: "Tips for a Successful Capstone Project", icon: Lightbulb, link: "/tutorials/tips", category: "Advice" },
]

const videoTutorials = [
  { title: "System Overview", link: "https://example.com/video1", category: "Basics" },
  { title: "Submitting Your Project", link: "https://example.com/video2", category: "Submission" },
  { title: "Effective Communication with Supervisors", link: "https://example.com/video3", category: "Communication" },
  { title: "Managing Project Timelines", link: "https://example.com/video4", category: "Progress" },
]

const allCategories = ["All", "Basics", "Submission", "Progress", "Communication", "Advice"]

export function HelpPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const filteredContent = (content: any[]) =>
    content.filter(item => 
      (item.question || item.title).toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === 'All' || item.category === activeCategory)
    )

  const handleFeedback = (id: string, isPositive: boolean) => {
    setFeedbackGiven(prev => ({ ...prev, [id]: true }))
    console.log(`Feedback for ${id}: ${isPositive ? 'Positive' : 'Negative'}`)
  }

  const ContentCard = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <Card className="bg-white dark:bg-gray-800 mb-6">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold flex items-center text-indigo-600 dark:text-indigo-400">
          <Icon className="mr-2" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Help Center</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Find answers, tutorials, and support</p>
      </motion.div>

      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="pt-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Categories</h2>
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {activeCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allCategories.map((category) => (
                <DropdownMenuItem key={category} onSelect={() => setActiveCategory(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      <ContentCard title="Frequently Asked Questions" icon={HelpCircle}>
        <ScrollArea className="h-[300px] md:h-[400px] pr-4">
          <Accordion type="single" collapsible className="w-full">
            {filteredContent(faqs).map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center">
                    <Badge className="mr-2" variant="outline">{faq.category}</Badge>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">{faq.answer}</p>
                  {!feedbackGiven[`faq-${index}`] && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</span>
                      <Button variant="outline" size="sm" onClick={() => handleFeedback(`faq-${index}`, true)}>
                        <ThumbsUp className="w-4 h-4 mr-1" /> Yes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleFeedback(`faq-${index}`, false)}>
                        <ThumbsDown className="w-4 h-4 mr-1" /> No
                      </Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </ContentCard>

      <ContentCard title="Tutorials and Guides" icon={BookOpen}>
        <ScrollArea className="h-[300px] md:h-[400px]">
          <ul className="space-y-2">
            {filteredContent(tutorials).map((tutorial, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50 dark:hover:bg-indigo-900" asChild>
                  <a href={tutorial.link} className="flex items-center">
                    <tutorial.icon className="mr-2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span className="flex-grow text-left">{tutorial.title}</span>
                    <Badge variant="outline" className="ml-2">{tutorial.category}</Badge>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.li>
            ))}
          </ul>
        </ScrollArea>
      </ContentCard>

      <ContentCard title="Video Tutorials" icon={Video}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredContent(videoTutorials).map((video, index) => (
            <a 
              key={index} 
              href={video.link} 
              className="block p-4 rounded-lg bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors"
            >
              <div className="flex items-center">
                <Video className="w-8 h-8 text-purple-500 dark:text-purple-300 mr-3" />
                <div>
                  <h3 className="font-semibold text-purple-700 dark:text-purple-200">{video.title}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-300">Click to watch</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </ContentCard>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold flex items-center text-blue-600 dark:text-blue-400">
            <MessageCircle className="mr-2" /> Need More Help?
          </CardTitle>
          <CardDescription>Get in touch with our support team or access additional resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              <MessageCircle className="mr-2" /> Contact Support
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2" /> Download User Manual
            </Button>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary"><Home className="mr-1 h-3 w-3" /> Dashboard</Badge>
              <Badge variant="secondary"><Star className="mr-1 h-3 w-3" /> My Projects</Badge>
              <Badge variant="secondary"><MessageCircle className="mr-1 h-3 w-3" /> Messages</Badge>
              <Badge variant="secondary"><FileQuestion className="mr-1 h-3 w-3" /> Submit Project</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-700 mt-4 rounded-b-lg">
          <div className="w-full flex flex-col sm:flex-row items-center gap-2">
            <Input placeholder="Enter your email for newsletter" className="flex-grow" />
            <Button className="w-full sm:w-auto"><Send className="mr-2" /> Subscribe</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}