import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = "Type your message..."
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  return (

    <form onSubmit={handleSubmit} className="mt-2 px-4 pb-8">
      <div className="relative flex items-center gap-2">
        <div className="absolute left-3">
          <Mic className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-12 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#400C7A] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="absolute right-3 p-2 text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>

  );
};

export default ChatInput;