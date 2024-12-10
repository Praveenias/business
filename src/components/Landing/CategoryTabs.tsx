import React from 'react';
import { Check, LayoutGrid } from 'lucide-react';
import { categoryConfig } from '../../utils/categoryUtils';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = ['All', 'Food', 'Hotel', 'Lounge'];

  return (
    <div>
    <div className="flex justify-center items-center mt-[5%] gap-4 my-6 px-4 items-center flex-wrap">
      <button 
        className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
        aria-label="Grid view"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      {categories.map((category) => {
        const config = categoryConfig[category as keyof typeof categoryConfig];
        const Icon = config?.icon;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full border transition-all
              hover:shadow-md active:scale-95 transform
              ${selectedCategory === category 
                ? 'bg-orange-500 border-orange-500 text-white' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-orange-200'
              }
            `}
          >
            {category === 'All' ? (
              <div className={`
                w-4 h-4 rounded-full flex items-center justify-center
                ${selectedCategory === category 
                  ? 'border-white' 
                  : 'border border-gray-300'
                }
              `}>
                {selectedCategory === category && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            ) : (
              Icon && <Icon className={`w-4 h-4 ${
                selectedCategory === category 
                  ? 'text-white' 
                  : config.iconColor
              }`} />
            )}
            {category}
          </button>
        );
      })}
    </div>
    <div className="container mx-auto px-4 py-16">
    <h2 className="text-center text-3xl font-medium mb-2">
      Ready to Setup your <span className="text-orange-500">Business</span>
    </h2>
    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.
    </p>
  </div>
  </div>
  );
}