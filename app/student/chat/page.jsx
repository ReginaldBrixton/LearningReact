'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreHorizontal, Search, Paperclip, Smile, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { ScrollArea } from "./components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"

// Mock data for chats
const chatData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
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
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks for the help!",
    time: "1h ago",
    online: false,
    messages: [
      { id: 1, text: "Hey, I'm stuck on this coding problem.", sent: false, time: "2:30 PM" },
      { id: 2, text: "What seems to be the issue?", sent: true, time: "2:35 PM" },
      { id: 3, text: "I can't figure out how to implement the sorting algorithm.", sent: false, time: "2:37 PM" },
      { id: 4, text: "Let me show you an example. It's easier than you think!", sent: true, time: "2:40 PM" },
      { id: 5, text: "Thanks for the help!", sent: false, time: "3:15 PM" },
    ]
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "The meeting is at 3 PM",
    time: "3h ago",
    online: true,
    messages: [
      { id: 1, text: "Don't forget about our team meeting today.", sent: false, time: "9:00 AM" },
      { id: 2, text: "Thanks for the reminder. What time was it again?", sent: true, time: "11:30 AM" },
      { id: 3, text: "The meeting is at 3 PM", sent: false, time: "11:32 AM" },
      { id: 4, text: "Got it, I'll be there!", sent: true, time: "11:33 AM" },
    ]
  },
  {
    id: 4,
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Did you see the news?",
    time: "5h ago",
    online: false,
    messages: [
      { id: 1, text: "Did you see the news?", sent: false, time: "7:00 AM" },
      { id: 2, text: "No, what happened?", sent: true, time: "8:30 AM" },
      { id: 3, text: "There's a new breakthrough in quantum computing!", sent: false, time: "8:32 AM" },
      { id: 4, text: "Wow, that's exciting! Send me the link?", sent: true, time: "8:35 AM" },
    ]
  },
  {
    id: 5,
    name: "Lisa Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Great work today!",
    time: "1d ago",
    online: true,
    messages: [
      { id: 1, text: "Your presentation was amazing!", sent: false, time: "4:00 PM" },
      { id: 2, text: "Thank you! I was so nervous.", sent: true, time: "4:05 PM" },
      { id: 3, text: "You didn't show it at all. Great work today!", sent: false, time: "4:07 PM" },
      { id: 4, text: "I appreciate that, thanks!", sent: true, time: "4:10 PM" },
    ]
  },
  {
    id: 6,
    name: "David Lee",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "The project is due next week",
    time: "2d ago",
    online: false,
    messages: [
      { id: 1, text: "How's the project coming along?", sent: false, time: "11:00 AM" },
      { id: 2, text: "I'm about 70% done. You?", sent: true, time: "11:30 AM" },
      { id: 3, text: "Almost finished. Remember, it's due next week.", sent: false, time: "11:35 AM" },
      { id: 4, text: "I'll have it done in time, don't worry!", sent: true, time: "11:40 AM" },
    ]
  },
  {
    id: 7,
    name: "Emma Thompson",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "Movie night on Friday?",
    time: "3d ago",
    online: true,
    messages: [
      { id: 1, text: "Hey, are you free this Friday?", sent: false, time: "6:00 PM" },
      { id: 2, text: "I think so, why?", sent: true, time: "6:10 PM" },
      { id: 3, text: "Movie night at my place! You in?", sent: false, time: "6:12 PM" },
      { id: 4, text: "Sounds fun! What time?", sent: true, time: "6:15 PM" },
      { id: 5, text: "Let's say 8 PM. See you then!", sent: false, time: "6:20 PM" }
    ]
  }
];

export default function ChatInterfaceComponent() {
  const [selectedChat, setSelectedChat] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth < 768); // Assuming 768px as the breakpoint for mobile
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobileScreen) {
      scrollToBottom();
    }
  }, [selectedChat.messages, isMobileScreen]);

  // Utility Functions
  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function getFilteredChats() {
    return chatData.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Event Handlers
  function handleSend(e) {
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
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleChatSelect(chat) {
    setSelectedChat(chat);
  }

  // UI Components
  function renderHorizontalChatList() {
    return (
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex space-x-4 pb-5 min-w-max">
          {getFilteredChats().map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className="flex flex-col items-center cursor-pointer">
              <Avatar className="w-12 h-12">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1 text-center whitespace-nowrap">{chat.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderSidebar() {
    return (
      <div className="hidden md:block w-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="pr-2">
          <Input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
            startIcon={<Search className="w-4 h-4 text-gray-400" />} />
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {getFilteredChats().map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              onClick={() => handleChatSelect(chat)}
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
    );
  }

  function renderChatHeader() {
    return (
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 sm:pt-2 pb-2 flex items-center justify-between">
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
    );
  }
  function renderChatMessages() {
    return (
      <ScrollArea className="flex-1 p-2 ">
        <AnimatePresence>
          {selectedChat.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
              <div
                className={`max-w-[70%] ${
                  message.sent
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
                } rounded-xl p-3 relative`}>
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sent ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </ScrollArea>
    );
  }
  function renderChatInput() {
    return (
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
    );
  }

  // Main Render
  return (
    <div className="flex flex-col bg-white sm:h-[45rem] md:h-[48rem] lg:h-[47rem] dark:bg-gray-900">
      {renderHorizontalChatList()}
      <div className="flex flex-1 overflow-hidden">
        {renderSidebar()}
        <div className="flex-1 flex flex-col">
          {renderChatHeader()}
          {renderChatMessages()}
          <div className="">
            {renderChatInput()}
          </div>
        </div>
      </div>
    </div>
  );
}