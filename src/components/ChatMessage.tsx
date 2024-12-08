import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';
import { ReactTyped  , Typed } from "react-typed";


interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  console.log(message.content)
  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg transition-colors',
        message.isBot 
          ? 'bg-gray-50 dark:bg-gray-800/50' 
          : 'bg-white dark:bg-gray-800'
      )}
    >
      <div className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center',
        message.isBot 
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
          : 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
      )}>

        {message.isBot ? <img src="https://anas-twitter-bucket.s3.ap-south-1.amazonaws.com/sdfdf.jpeg" alt="" /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-gray-100"> {message.isBot? <ReactTyped strings={[message.content]} typeSpeed={10}   loop={false}/> : <> {message.content} </>  }  </p>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};