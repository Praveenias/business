import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Let's talk about your business"
            className="w-full pl-12 pr-4 py-3 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      <div className="absolute top-full left-0 right-0 mt-4 flex items-center justify-center space-x-2">
        <button className="px-4 py-1 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 transition-colors">
          All
        </button>
        <button className="px-4 py-1 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 transition-colors">
          Food
        </button>
        <button className="px-4 py-1 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 transition-colors">
          Retail
        </button>
        <button className="px-4 py-1 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 transition-colors">
          Service
        </button>
      </div>
    </div>
  );
};

export default SearchBar;