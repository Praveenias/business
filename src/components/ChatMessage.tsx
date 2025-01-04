import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Message } from '../types';
import logo from '../assets/images/logo.svg'

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`flex items-start space-x-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <div className="w-9 h-9 rounded-full bg-[#400C7A] flex items-center justify-center">
             <img src={logo} alt="profile" className="w-[30px] h-[30px]" />
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl max-w-[80%] flex justify-center items-center ${
            isBot ? 'bg-[#F8F8F8] text-[#403F3F]' : 'bg-[#F8F8F8] text-[#400C7A]'
          }`}
        >
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;