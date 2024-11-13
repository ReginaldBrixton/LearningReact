'use client'

import { useState } from 'react'
import { Search, Plus, ExternalLink, ChevronDown, Mail, MessageSquare, FileText, HelpCircle, Users, Settings, BarChart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

const FAQS = [
  {
    question: "How do I add a new supervisor?",
    answer: "Navigate to Supervisor Management in the sidebar, click the 'Add Supervisor' button, and fill in the required information. Don't forget to assign appropriate permissions."
  },
  {
    question: "How can I manage project submissions?",
    answer: "Go to Project Management, select the specific project, and you'll find options to view, approve, or reject submissions. You can also leave feedback for students."
  },
  {
    question: "How do I generate reports?",
    answer: "Access the Reports section from the sidebar. Choose the type of report you need (e.g., student progress, supervisor workload), set your parameters, and click 'Generate Report'."
  },
  {
    question: "How do I reset a user's password?",
    answer: "In User Management, find the user, click the options menu (three dots), and select 'Reset Password'. The user will receive an email with instructions."
  }
]

const DOCUMENTATION_LINKS = [
  {
    title: "User Management Guide",
    description: "Learn how to manage users, roles, and permissions",
    link: "/docs/user-management",
    icon: Users
  },
  {
    title: "Project Management Guide",
    description: "Comprehensive guide for managing FYP projects",
    link: "/docs/project-management",
    icon: FileText
  },
  {
    title: "System Administration",
    description: "System configuration and maintenance guide",
    link: "/docs/admin-guide",
    icon: Settings
  },
  {
    title: "Reporting Guide",
    description: "Learn how to generate and analyze reports",
    link: "/docs/reporting",
    icon: BarChart
  }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    type: 'technical'
  })

  const handleSubmitTicket = () => {
    // TODO: Implement ticket submission
    console.log('Submitting ticket:', ticketForm)
    // Reset form
    setTicketForm({
      subject: '',
      description: '',
      priority: 'medium',
      type: 'technical'
    })
  }

  const filteredFaqs = FAQS.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Support Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Submit a new support ticket for technical assistance or inquiries.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="Detailed explanation of your issue"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={ticketForm.type}
                    onChange={(e) => setTicketForm({ ...ticketForm, type: e.target.value })}
                  >
                    <option value="technical">Technical</option>
                    <option value="account">Account</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentation
            </CardTitle>
            <CardDescription>
              Access detailed system documentation and guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DOCUMENTATION_LINKS.map((doc, index) => (
                <a
                  key={index}
                  href={doc.link}
                  className="block p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium flex items-center gap-2">
                        {doc.title}
                        <ExternalLink className="h-4 w-4" />
                      </h3>
                      <p className="text-sm text-gray-500">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Get in touch with our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Technical Support</h3>
                <p className="text-sm text-gray-500 mb-4">
                  For system-related issues and technical assistance
                </p>
                <p className="text-sm">
                  Email: support@example.com<br />
                  Phone: +1 (555) 123-4567<br />
                  Hours: Mon-Fri, 9AM-5PM
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-medium mb-2">General Inquiries</h3>
                <p className="text-sm text-gray-500 mb-4">
                  For general questions and administrative support
                </p>
                <p className="text-sm">
                  Email: info@example.com<br />
                  Phone: +1 (555) 987-6543<br />
                  Hours: Mon-Fri, 9AM-5PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 