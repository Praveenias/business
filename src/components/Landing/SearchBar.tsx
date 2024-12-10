import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="absolute bottom-[-43px]  border border-[#400C7A] rounded-[10px] w-[45%] max-w-[502px]">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Hi... what are you into?"
        className="w-full px-4 py-3 border border-[#400C7A] rounded-[10px] pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#400C7A] w-5 h-5" />
    </div>
  );
}