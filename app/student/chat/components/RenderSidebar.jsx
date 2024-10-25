import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ContactItem from './ContactItem';

const theme = {
  light: {
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-100'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      icon: 'text-gray-400'
    },
    border: 'border-gray-200'
  },
  dark: {
    background: {
      primary: 'dark:bg-gray-800',
      secondary: 'dark:bg-gray-700'
    },
    text: {
      primary: 'dark:text-gray-100',
      secondary: 'dark:text-gray-300',
      icon: 'dark:text-gray-500'
    },
    border: 'dark:border-gray-700'
  }
};

export default function RenderSidebar({ filteredChats, selectedChat, handleChatSelect, searchQuery, handleSearchChange }) {
  return (
    <div className={`flex flex-col h-full w-full max-w-xs ${theme.light.background.primary} ${theme.dark.background.primary} border-r ${theme.light.border} ${theme.dark.border}`}>
      <div className="p-4">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.light.text.icon} ${theme.dark.text.icon}`} />
          <Input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={handleSearchChange}
            className={`w-full pl-10 ${theme.light.text.primary} ${theme.dark.text.primary} ${theme.light.background.secondary} ${theme.dark.background.secondary}`}
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
