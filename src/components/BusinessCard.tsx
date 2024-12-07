import React from 'react';

interface BusinessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-6 text-left hover:shadow-lg transition-all duration-200 group border border-gray-100"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-purple-600 rounded-lg text-white group-hover:bg-orange-500 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default BusinessCard;