import React from 'react';
import { User } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-purple-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">Zuno</div>
          <div className="text-white">
            <User className="w-6 h-6" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-medium mb-2">
            Get your Business Connected with <span className="text-orange-500">Zuno</span>
          </h1>
          <button className="bg-purple-800 text-white px-6 py-2 rounded-full text-sm mt-4">
            LET US KNOW ABOUT YOUR BUSINESS
          </button>
        </div>

        <SearchBar />
      </div>
    </header>
  );
}