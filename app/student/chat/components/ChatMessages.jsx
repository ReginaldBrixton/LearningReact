import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

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
        <div
          key={message.id}
          className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
          <div
            className={`max-w-[70%] ${
              message.sent
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
            } rounded-xl p-3 relative`}>
            <p>{message.text}</p>
            <p
              className={`text-xs mt-1 ${
                message.sent ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
              }`}>
              {message.time}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}

