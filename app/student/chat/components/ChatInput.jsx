import React from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const theme = {
  light: {
    background: {
      primary: 'bg-white',
      hover: 'hover:bg-gray-100'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      placeholder: 'placeholder-gray-500'
    },
    border: 'border-gray-200',
    button: {
      ghost: 'text-gray-600 hover:bg-gray-100',
      primary: 'bg-blue-500 hover:bg-blue-600 text-white'
    }
  },
  dark: {
    background: {
      primary: 'dark:bg-gray-800',
      hover: 'dark:hover:bg-gray-700'
    },
    text: {
      primary: 'dark:text-gray-100',
      secondary: 'dark:text-gray-300',
      placeholder: 'dark:placeholder-gray-400'
    },
    border: 'dark:border-gray-700',
    button: {
      ghost: 'dark:text-gray-300 dark:hover:bg-gray-700',
      primary: 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white'
    }
  }
};

export default function ChatInput({ newMessage, setNewMessage, handleSend }) {
  return (
    <form
      onSubmit={handleSend}
      className={`${theme.light.background.primary} ${theme.dark.background.primary} border-t ${theme.light.border} ${theme.dark.border} p-4`}>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className={`${theme.light.button.ghost} ${theme.dark.button.ghost}`}>
                <Paperclip className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${theme.light.background.primary} ${theme.dark.background.primary} ${theme.light.text.primary} ${theme.dark.text.primary}`}>
              <p>Attach File</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={`flex-1 ${theme.light.text.primary} ${theme.dark.text.primary} ${theme.light.text.placeholder} ${theme.dark.text.placeholder}`} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className={`${theme.light.button.ghost} ${theme.dark.button.ghost}`}>
                <Smile className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${theme.light.background.primary} ${theme.dark.background.primary} ${theme.light.text.primary} ${theme.dark.text.primary}`}>
              <p>Add Emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className={`${theme.light.button.ghost} ${theme.dark.button.ghost}`}>
                <Mic className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className={`${theme.light.background.primary} ${theme.dark.background.primary} ${theme.light.text.primary} ${theme.dark.text.primary}`}>
              <p>Voice Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button type="submit" size="icon" className={`${theme.light.button.primary} ${theme.dark.button.primary}`}>
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
