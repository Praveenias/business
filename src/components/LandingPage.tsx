import React from 'react';
import { BusinessType } from '../types';
import { Search } from 'lucide-react';

interface LandingPageProps {
  onBusinessSelect: (type: BusinessType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBusinessSelect }) => {
  const categories = ['All', 'Food', 'Hotel', 'Lounge'];
  
  const businessCards = [
    {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      peopleCount: "15 People On-boarded",
      type: "Restaurant",
      ownership: "Owned by Individuals",
      businessType: 'restaurant' as BusinessType
    },
    {
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
      peopleCount: "20 People On-boarded",
      type: "Retail Store",
      ownership: "Owned by Individual",
      businessType: 'retail' as BusinessType
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">Zuno</div>
          <button className="text-gray-600">
            <span className="sr-only">Profile</span>
            👤
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="text-center mt-16 px-4">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-100 mb-6">
          <span className="text-purple-600 text-sm">LET US KNOW ABOUT YOUR BUSINESS</span>
        </div>
        
        <h1 className="text-4xl font-serif text-gray-900 mb-8">
          Get your Business Connected with <span className="text-orange-500">Zuno</span>
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Hi... what are you into?"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-4 mt-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${
                index === 1 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
              } hover:bg-orange-500 hover:text-white transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Business Cards Grid */}
      <div className="container mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {businessCards.map((card, index) => (
          <button
            key={index}
            onClick={() => onBusinessSelect(card.businessType)}
            className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="relative">
              <img
                src={card.image}
                alt={card.type}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                {card.peopleCount}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-purple-100 rounded-lg"></div>
                <h3 className="font-medium">{card.type}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.ownership}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Growth Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-2xl text-center text-gray-900 mb-4">
          Grow your Business with <span className="text-orange-500">Zuno</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-4xl font-bold text-gray-900">99.2%</div>
            <div className="font-medium mt-2">Successful Business</div>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum is a dummy text used to fill the space
            </p>
          </div>

          <div className="bg-purple-700 text-white rounded-2xl p-8">
            <div className="text-4xl font-bold">5L+</div>
            <div className="font-medium mt-2">Successful Business</div>
            <p className="text-sm text-white/80 mt-2">
              Lorem ipsum is a dummy text used to fill the space
            </p>
          </div>

          <div className="bg-orange-500 text-white rounded-2xl p-8">
            <div className="text-4xl font-bold">4.93★</div>
            <div className="font-medium mt-2">Successful Business</div>
            <p className="text-sm text-white/80 mt-2">
              Lorem ipsum is a dummy text used to fill the space
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900">About us</h3>
            <p className="text-gray-600">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900">Office Location</h3>
            <p className="text-gray-600">
              No. 32 RV Garden, Kodaperi, Tambaram, Chennai- 600045
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;