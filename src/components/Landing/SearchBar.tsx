import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Hi... what are you into?"
        className="w-full px-4 py-3 rounded-full pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
}