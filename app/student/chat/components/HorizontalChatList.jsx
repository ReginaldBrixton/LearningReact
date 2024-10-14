import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function HorizontalChatList({ filteredChats, handleChatSelect }) {
  return (
    <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
      <div className="flex space-x-4 pb-5 min-w-max">
        {filteredChats.map((chat) => (
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

