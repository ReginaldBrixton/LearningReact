import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function ContactItem({ chat, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
        isSelected ? 'bg-gray-100 dark:bg-gray-700' : ''
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
  );
}
