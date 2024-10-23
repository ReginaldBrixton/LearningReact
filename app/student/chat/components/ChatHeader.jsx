import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Video } from 'lucide-react';

const theme = {
  light: {
    background: {
      primary: 'bg-white'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-500'
    },
    border: 'border-gray-200',
    button: {
      ghost: 'text-gray-600 hover:bg-gray-100'
    }
  },
  dark: {
    background: {
      primary: 'dark:bg-gray-800'
    },
    text: {
      primary: 'dark:text-gray-100',
      secondary: 'dark:text-gray-400'
    },
    border: 'dark:border-gray-700',
    button: {
      ghost: 'dark:text-gray-300 dark:hover:bg-gray-700'
    }
  }
};

export default function ChatHeader({ selectedChat, toggleSidebar }) {
  return (
    <div className={`${theme.light.background.primary} ${theme.dark.background.primary} border-b ${theme.light.border} ${theme.dark.border} p-4 flex items-center justify-between`}>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className={`md:hidden mr-2 ${theme.light.button.ghost} ${theme.dark.button.ghost}`} onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <Avatar className="w-10 h-10">
          <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
          <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className={`font-semibold ${theme.light.text.primary} ${theme.dark.text.primary}`}>{selectedChat.name}</h2>
          <p className={`text-sm ${theme.light.text.secondary} ${theme.dark.text.secondary}`}>
            {selectedChat.online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className={`${theme.light.button.ghost} ${theme.dark.button.ghost}`}>
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className={`${theme.light.button.ghost} ${theme.dark.button.ghost}`}>
          <Video className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
