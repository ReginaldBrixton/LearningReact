import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageItem from './MessageItem';

const theme = {
  light: {
    background: {
      primary: 'bg-white'
    },
    text: {
      primary: 'text-gray-900'
    },
    border: 'border-gray-200'
  },
  dark: {
    background: {
      primary: 'dark:bg-gray-800'
    },
    text: {
      primary: 'dark:text-gray-100'
    },
    border: 'dark:border-gray-700'
  }
};

export default function ChatMessages({ selectedChat, isMobileScreen }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isMobileScreen) {
      scrollToBottom();
    }
  }, [selectedChat.messages, isMobileScreen]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <ScrollArea className={`flex-1 p-2 ${theme.light.background.primary} ${theme.dark.background.primary} ${theme.light.text.primary} ${theme.dark.text.primary}`}>
      {selectedChat.messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}
