'use client'

import React, { useState } from 'react';
import HorizontalChatList from './components/HorizontalChatList';
import RenderSidebar from './components/RenderSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import chatData from '../../data/chatData';

export default function ChatInterfaceComponent() {
  const [selectedChat, setSelectedChat] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredChats = () => chatData.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const newMsg = {
      id: selectedChat.messages.length + 1,
      text: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setNewMessage("");
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleChatSelect = (chat) => setSelectedChat(chat);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="md:hidden">
        <HorizontalChatList 
          filteredChats={getFilteredChats()} 
          handleChatSelect={handleChatSelect} 
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-1/3 max-w-xs border-r border-gray-200 dark:border-gray-700">
          <RenderSidebar 
            filteredChats={getFilteredChats()} 
            selectedChat={selectedChat} 
            handleChatSelect={handleChatSelect}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />
        </aside>
        <main className="flex-1 flex flex-col">
          <ChatHeader selectedChat={selectedChat} />
          <ChatMessages 
            selectedChat={selectedChat} 
          />
          <ChatInput 
            newMessage={newMessage} 
            setNewMessage={setNewMessage} 
            handleSend={handleSend} 
          />
        </main>
      </div>
    </div>
  );
}
