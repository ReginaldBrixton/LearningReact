"use client"

import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, Book, File, Moon, Paperclip, Send, Sun, Search } from "lucide-react"

const contacts = [
  { id: 1, name: "Dr. Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "How's your research going?", time: "2m ago", status: "Online" },
  { id: 2, name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "I've submitted my paper", time: "1h ago", status: "Offline" },
  { id: 3, name: "Research Team", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Meeting at 3 PM", time: "3h ago", status: "Busy" },
  { id: 4, name: "Library Services", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Your book is due soon", time: "1d ago", status: "Offline" },
  { id: 5, name: "Prof. Johnson", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Feedback on your draft", time: "2d ago", status: "Office Hours" },
]

const initialMessages = [
  { id: 1, sender: "Dr. Smith", content: "How's your research paper coming along?", timestamp: "10:00 AM", thread: "General" },
  { id: 2, sender: "You", content: "It's progressing well. I've completed the literature review.", timestamp: "10:02 AM", thread: "General" },
  { id: 3, sender: "Dr. Smith", content: "Great! Have you started on the methodology section?", timestamp: "10:05 AM", thread: "Methodology" },
  { id: 4, sender: "You", content: "Yes, I'm working on it now. I have a question about the data analysis.", timestamp: "10:07 AM", thread: "Methodology" },
  { id: 5, sender: "Dr. Smith", content: "Sure, what's your question?", timestamp: "10:08 AM", thread: "Methodology" },
]

const statusColors = {
  Online: "bg-emerald-500",
  Busy: "bg-rose-500",
  Offline: "bg-slate-500",
  "Office Hours": "bg-amber-500",
}

export default function ColorfulResponsiveResearchChatComponent() {
  const [activeContact, setActiveContact] = useState(null)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [activeThread, setActiveThread] = useState("General")
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState("light")
  const [submissionProgress, setSubmissionProgress] = useState(60)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const typingTimeout = setTimeout(() => setIsTyping(false), 3000)
    return () => clearTimeout(typingTimeout)
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thread: activeThread
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
      setIsTyping(true)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      {/* Sidebar */}
      <div className={`w-full md:w-80 lg:w-96 ${isSidebarOpen ? 'block' : 'hidden'} md:block ${theme === "dark" ? "bg-gray-800" : "bg-white"} border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Chats</h2>
            <Button size="sm" variant="outline" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
          <div className="relative">
            <Input placeholder="Search chats" className="pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-4 cursor-pointer ${
                activeContact?.id === contact.id
                  ? theme === "dark"
                    ? "bg-indigo-900"
                    : "bg-indigo-100"
                  : theme === "dark"
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveContact(contact)
                setIsSidebarOpen(false)
              }}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className={`font-semibold truncate ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{contact.name}</span>
                  <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{contact.time}</span>
                </div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} truncate`}>{contact.lastMessage}</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={`w-3 h-3 rounded-full ${statusColors[contact.status]}`}></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{contact.status}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} border-b border-gray-200 p-4 flex items-center justify-between`}>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            {activeContact && (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                  <AvatarFallback>{activeContact.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{activeContact.name}</h2>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{activeContact.status}</p>
                </div>
              </>
            )}
          </div>
          <Button size="sm" variant="outline">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {/* Research Progress */}
        <div className={`p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>Research Progress</h3>
          <Progress value={submissionProgress} className="mt-2" />
          <div className="flex justify-between mt-1 text-sm text-gray-500">
            <span>Literature Review</span>
            <span>Methodology</span>
            <span>Data Analysis</span>
            <span>Conclusion</span>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className={`flex-1 p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
          {messages.map((message, index) => (
            <div key={message.id}>
              {(index === 0 || message.thread !== messages[index - 1].thread) && (
                <div className={`flex justify-center my-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  <Badge variant="outline">{message.thread}</Badge>
                </div>
              )}
              <div className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                <Card className={`max-w-[70%] ${
                  message.sender === 'You'
                    ? theme === "dark"
                      ? "bg-indigo-700 text-white"
                      : "bg-indigo-500 text-white"
                    : theme === "dark"
                    ? "bg-gray-600"
                    : "bg-white"
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm">{message.content}</p>
                    {message.attachment && (
                      <div className="mt-2 flex items-center text-xs">
                        <File className="w-4 h-4 mr-1" />
                        <span>{message.attachment}</span>
                      </div>
                    )}
                    <p className={`text-xs mt-1 ${theme === "dark" ? "opacity-70" : "opacity-50"}`}>{message.timestamp}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`flex justify-start mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              <Card className={theme === "dark" ? "bg-gray-600" : "bg-white"}>
                <CardContent className="p-3">
                  <p className="text-sm">Typing...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} border-t border-gray-200 p-4`}>
          <Tabs defaultValue="chat">
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
                <Button size="icon" variant="outline">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="files">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Upload Research Paper Draft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Upload Data Set
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Upload Bibliography
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="citations">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Generate APA Citation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Generate MLA Citation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Generate Chicago Citation
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Research Paper Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Citation Style Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book className="mr-2 h-4 w-4" />
                  Data Analysis Tools
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}