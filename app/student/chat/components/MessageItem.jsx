
import React from 'react';

const theme = {
  light: {
    sent: {
      bg: 'bg-blue-500',
      text: 'text-white',
      time: 'text-blue-100'
    },
    received: {
      bg: 'bg-gray-200',
      text: 'text-gray-900',
      time: 'text-gray-500'
    }
  },
  dark: {
    sent: {
      bg: 'dark:bg-blue-600',
      text: 'dark:text-white',
      time: 'dark:text-blue-200'
    },
    received: {
      bg: 'dark:bg-gray-700',
      text: 'dark:text-gray-100', 
      time: 'dark:text-gray-400'
    }
  }
};

export default function MessageItem({ message }) {
  return (
    <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-xl p-3 relative ${
          message.sent
            ? `${theme.light.sent.bg} ${theme.light.sent.text} ${theme.dark.sent.bg} ${theme.dark.sent.text} rounded-br-none`
            : `${theme.light.received.bg} ${theme.light.received.text} ${theme.dark.received.bg} ${theme.dark.received.text} rounded-bl-none`
        }`}>
        <p>{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            message.sent 
              ? `${theme.light.sent.time} ${theme.dark.sent.time}`
              : `${theme.light.received.time} ${theme.dark.received.time}`
          }`}>
          {message.time}
        </p>
      </div>
    </div>
  );
}
