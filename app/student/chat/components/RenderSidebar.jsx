import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ContactItem from './ContactItem';

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
          <ContactItem
            key={chat.id}
            chat={chat}
            isSelected={selectedChat.id === chat.id}
            onSelect={() => handleChatSelect(chat)}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
