"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import RenderSidebar from "./components/RenderSidebar"
import ChatHeader from "./components/ChatHeader"
import ChatMessages from "./components/ChatMessages"
import ChatInput from "./components/ChatInput"

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

const initialChats = [
  { id: 1, name: "Dr. Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "How's your research going?", time: "2m ago", status: "Online", messages: [] },
  { id: 2, name: "Prof. Johnson", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Don't forget about the seminar tomorrow", time: "1h ago", status: "Offline", messages: [] },
  // ... add more chats as needed
]

export default function ChatPage() {
  const router = useRouter()
  const [chats, setChats] = useState(initialChats)
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768)
      setShowSidebar(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    if (isMobileScreen) setShowSidebar(false)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, { id: Date.now(), text: newMessage, sent: true, time: new Date().toLocaleTimeString() }]
          }
        }
        return chat
      })
      setChats(updatedChats)
      setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id))
      setNewMessage("")
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className={`flex h-screen ${theme.light.background.secondary} ${theme.dark.background.secondary}`}>
      {showSidebar && (
        <RenderSidebar
          filteredChats={filteredChats}
          selectedChat={selectedChat}
          handleChatSelect={handleChatSelect}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      )}
      <div className="flex flex-col flex-1">
        <ChatHeader selectedChat={selectedChat} toggleSidebar={toggleSidebar} />
        <ChatMessages selectedChat={selectedChat} isMobileScreen={isMobileScreen} />
        <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} handleSend={handleSend} />
      </div>
    </div>
  )
}
