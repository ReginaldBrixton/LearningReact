"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Bell, File, Paperclip, Book } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const contacts = [
  { id: 1, name: "Dr. Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "How's your research going?", time: "2m ago", status: "Online" },
  // ... other contacts
]

const initialMessages = [
  { id: 1, sender: "Dr. Smith", content: "How's your research paper coming along?", timestamp: "10:00 AM", thread: "General" },
  // ... other messages
]

export default function ChatPage({ params }) {
  const router = useRouter()
  const { chatId } = params
  const [activeContact, setActiveContact] = useState(null)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [theme, setTheme] = useState("light") // You might want to implement theme switching
  const [submissionProgress, setSubmissionProgress] = useState(60) // Example progress value
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const contact = contacts.find(c => c.id.toString() === chatId)
    setActiveContact(contact)
  }, [chatId])

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thread: "General"
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  const toggleSidebar = () => {
    // Implement sidebar toggle functionality
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} border-b border-gray-200 pb-2 flex 
        items-center justify-between`}>
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
                  <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
                  {activeContact.name}</h2>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{activeContact.
                  status}</p>
                </div>
              </>
            )}
          </div>
          <Button size="sm" variant="outline">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {/* Research Progress */}
        <div className={`p-3 w-[100%] ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>Research 
          Progress</h3>
          <Progress value={submissionProgress} className="mt-2" />
          <div className="flex justify-between mt-1 text-sm text-gray-500">
            <span>Introduction</span>
            <span>Literature Review</span>
            <span>Methodology</span>
            <span>Data Analysis</span>
            <span>Conclusion</span>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className={`flex-1 p-3 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
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
                    <p className={`text-xs mt-1 ${theme === "dark" ? "opacity-70" : "opacity-50"}`}>{message.timestamp}
                    </p>
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
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} border-t border-gray-200 p-2`}>
          <Tabs defaultValue="chat">
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="space-y-4 w-[100%]">
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
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
