import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start space-x-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-orange-500" />
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl max-w-[80%] ${
            isBot ? 'bg-gray-100' : 'bg-orange-100'
          }`}
        >
          <p className="text-gray-800">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;