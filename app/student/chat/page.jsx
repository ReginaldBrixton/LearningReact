"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

const contacts = [
  { id: 1, name: "Dr. Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "How's your research going?", time: "2m ago", status: "Online" },
  // ... other contacts
]

export default function ChatList() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="relative">
          <Input placeholder="Search chats" className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={() => router.push(`/student/chat/${contact.id}`)}
          >
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold truncate text-gray-900">{contact.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">{contact.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
