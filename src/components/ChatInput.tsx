import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 placeholder-gray-500 dark:placeholder-gray-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="bg-blue-600 dark:bg-blue-500 text-white rounded-lg px-4 py-2 
                 hover:bg-blue-700 dark:hover:bg-blue-600 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 flex items-center gap-2 transition-colors"
      >
        <Send size={18} />
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};