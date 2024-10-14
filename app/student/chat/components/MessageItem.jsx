import React from 'react';

export default function MessageItem({ message }) {
  return (
    <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
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
  );
}
