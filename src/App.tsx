import React, { useState } from 'react';
import { Message } from './types/chat';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ThemeToggle } from './components/ThemeToggle';
import { sendMessage } from './utils/api';
import { MessageSquare } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        isBot: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      const response = await sendMessage(content);
      console.log(response.data)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:  response.data,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">

        <div className="bg-white dark:bg-gray-800 rounded-t-lg p-4 border-b dark:border-gray-700 
                      flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-blue-600 dark:text-blue-400" size={24} />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Jack Jay
            </h1>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 p-4 space-y-4 transition-colors">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-lg p-4 border-t dark:border-gray-700 transition-colors">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;