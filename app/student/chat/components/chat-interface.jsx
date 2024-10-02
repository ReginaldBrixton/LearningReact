'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreHorizontal, Search, Paperclip, Smile, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const chatData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/api/placeholder/32/32",
    lastMessage: "See you tomorrow!",
    time: "2m ago",
    online: true,
    messages: [
      { id: 1, text: "Hey, how are you?", sent: false, time: "10:00 AM" },
      { id: 2, text: "I'm good, thanks! How about you?", sent: true, time: "10:02 AM" },
      { id: 3, text: "Pretty good! Are we still on for tomorrow?", sent: false, time: "10:05 AM" },
      { id: 4, text: "Yes, absolutely! Looking forward to it.", sent: true, time: "10:07 AM" },
      { id: 5, text: "See you tomorrow!", sent: false, time: "10:08 AM" },
    ]
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Thanks for the help!",
    time: "1h ago",
    online: false,
    messages: []
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "/api/placeholder/32/32",
    lastMessage: "The meeting is at 3 PM",
    time: "3h ago",
    online: true,
    messages: []
  },
  {
    id: 4,
    name: "Michael Brown",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Did you see the news?",
    time: "5h ago",
    online: false,
    messages: []
  },
  {
    id: 5,
    name: "Lisa Wilson",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Great work today!",
    time: "1d ago",
    online: true,
    messages: []
  }
];

export function ChatInterfaceComponent() {
  const [selectedChat, setSelectedChat] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const newMsg = {
      id: selectedChat.messages.length + 1,
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setNewMessage("");
  };

  const filteredChats = chatData.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    (<div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Horizontal scrollable chat list for smaller screens */}
      <div
        className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="flex space-x-4">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex flex-col items-center cursor-pointer">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs mt-1 text-center">{chat.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <div
          className="hidden md:block w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <Input
              type="text"
              placeholder="Search chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              startIcon={<Search className="w-4 h-4 text-gray-400" />} />
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-4 cursor-pointer ${selectedChat.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold">{chat.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.online && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </motion.div>
            ))}
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h2 className="font-semibold">{selectedChat.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedChat.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Video Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <AnimatePresence>
              {selectedChat.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div
                    className={`max-w-[70%] ${message.sent ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} rounded-lg p-3`}>
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${message.sent ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {message.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </ScrollArea>
          
          <form
            onSubmit={handleSend}
            className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach File</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Smile className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice Message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button type="submit" size="icon">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>)
  );
}