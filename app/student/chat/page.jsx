"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

const theme = {
  light: {
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-100',
      hover: 'hover:bg-gray-100'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      muted: 'text-gray-500',
      icon: 'text-gray-400'
    },
    border: 'border-gray-200'
  },
  dark: {
    background: {
      primary: 'dark:bg-gray-900',
      secondary: 'dark:bg-gray-800',
      hover: 'dark:hover:bg-gray-700'
    },
    text: {
      primary: 'dark:text-gray-100',
      secondary: 'dark:text-gray-300',
      muted: 'dark:text-gray-400',
      icon: 'dark:text-gray-500'
    },
    border: 'dark:border-gray-700'
  }
}

const contacts = [
  { id: 1, name: "Dr. Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "How's your research going?", time: "2m ago", status: "Online" },
  // ... other contacts
]

export default function ChatList() {
  const router = useRouter()

  return (
    <div className={`flex flex-col h-screen ${theme.light.background.secondary} ${theme.dark.background.secondary}`}>
      <div className={`p-4 ${theme.light.background.primary} ${theme.dark.background.primary} border-b ${theme.light.border} ${theme.dark.border}`}>
        <h2 className={`text-xl font-bold mb-4 ${theme.light.text.primary} ${theme.dark.text.primary}`}>Chats</h2>
        <div className="relative">
          <Input placeholder="Search chats" className="pl-10" />
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.light.text.icon} ${theme.dark.text.icon}`} />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 cursor-pointer ${theme.light.background.hover} ${theme.dark.background.hover} transition-colors duration-200`}
            onClick={() => router.push(`/student/chat/${contact.id}`)}
          >
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className={`font-semibold truncate ${theme.light.text.primary} ${theme.dark.text.primary}`}>{contact.name}</span>
                <span className={`text-xs ${theme.light.text.muted} ${theme.dark.text.muted} flex-shrink-0`}>{contact.time}</span>
              </div>
              <p className={`text-sm ${theme.light.text.secondary} ${theme.dark.text.secondary} truncate`}>{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
