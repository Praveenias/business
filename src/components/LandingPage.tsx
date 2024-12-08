import React, { useState, useMemo } from 'react';
import CategoryTabs from './Landing/CategoryTabs';
import BusinessCard from './Landing/BusinessCard';

import { SearchProvider, useSearch } from '../contexts/SearchContext';
import { searchBusinesses } from '../utils/searchUtils';
import type { Business } from '../types/business';
import Header from './Landing/Header';
import Stats from './Landing/Stats';
import Footer from './Landing/Footer';


const businesses: Business[] = [
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    title: 'Restaurant',
    subtitle: 'Owned by Individuals',
    peopleCount: 23,
    category: 'Food'
  },
  {
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    title: 'Hotel Steps',
    subtitle: 'Owned by Individuals',
    peopleCount: 29,
    category: 'Hotel'
  },
  {
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
    title: 'Lounge Bar',
    subtitle: 'Owned by Corporation',
    peopleCount: 8,
    category: 'Lounge'
  },
  {
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    title: 'Fine Dining',
    subtitle: 'Owned by Corporation',
    peopleCount: 15,
    category: 'Food'
  },
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    title: 'Luxury Hotel',
    subtitle: 'Owned by Corporation',
    peopleCount: 45,
    category: 'Hotel'
  },
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    title: 'Rooftop Lounge',
    subtitle: 'Owned by Individuals',
    peopleCount: 12,
    category: 'Lounge'
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    title: 'Restaurant',
    subtitle: 'Owned by Individuals',
    peopleCount: 23,
    category: 'Food'
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    title: 'Restaurant',
    subtitle: 'Owned by Individuals',
    peopleCount: 23,
    category: 'Food'
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    title: 'Restaurant',
    subtitle: 'Owned by Individuals',
    peopleCount: 23,
    category: 'Food'
  },
];

function BusinessList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { searchQuery } = useSearch();

  const filteredBusinesses = useMemo(() => {
    const filtered = searchBusinesses(businesses, searchQuery, [selectedCategory]);
    return filtered.sort((a, b) => {
      if (a.category === selectedCategory && b.category !== selectedCategory) return -1;
      if (a.category !== selectedCategory && b.category === selectedCategory) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto">
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No businesses found matching your search criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {filteredBusinesses.map((business, index) => (
              <BusinessCard 
                key={index} 
                {...business} 
                selectedCategory={selectedCategory}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <Stats />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SearchProvider>
      <BusinessList />
    </SearchProvider>
  );
}