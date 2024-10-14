import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageItem from './MessageItem';

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
    <ScrollArea className="flex-1 p-2 ">
      {selectedChat.messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}
