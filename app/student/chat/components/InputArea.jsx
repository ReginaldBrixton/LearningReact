import React from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ChatInput({ newMessage, setNewMessage, handleSend }) {
  return (
    <form
      onSubmit={handleSend}
      className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Paperclip className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <p>Attach File</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Smile className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <p>Add Emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Mic className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <p>Voice Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button 
          type="submit" 
          size="icon"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
