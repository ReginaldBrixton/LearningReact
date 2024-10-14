import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function RenderSidebar({ filteredChats, selectedChat, handleChatSelect, searchQuery, handleSearchChange }) {
  return (
    <div className="hidden md:flex flex-col h-full w-full max-w-xs bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
              selectedChat.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage 
                src={chat.avatar} 
                alt={chat.name} 
                fetchPriority="high"
                onLoad={(e) => {
                  e.target.setAttribute('fetchpriority', 'low');
                  e.target.setAttribute('loading', 'lazy');
                }}
              />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
            {chat.online && (
              <div className="w-3 h-3 bg-green-500 rounded-full ml-2 flex-shrink-0"></div>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
