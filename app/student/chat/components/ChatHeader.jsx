import React from 'react';
import { Phone, Video, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ChatHeader({ selectedChat }) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 sm:pt-2 pb-2 flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage 
            src={selectedChat.avatar} 
            alt={selectedChat.name}
            fetchPriority="high"
            onLoad={(e) => {
              e.target.setAttribute('fetchpriority', 'low');
              e.target.setAttribute('loading', 'lazy');
            }}
          />
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

