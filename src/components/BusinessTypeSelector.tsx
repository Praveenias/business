import React from 'react';
import { Store, Utensils, Car, Laptop, Package } from 'lucide-react';
import { BusinessType } from '../types';

interface BusinessTypeSelectorProps {
  onSelect: (type: BusinessType) => void;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({ onSelect }) => {
  const businessTypes = [
    { type: 'restaurant', icon: Utensils, label: 'Restaurant' },
    { type: 'retail', icon: Store, label: 'Retail Store' },
    { type: 'automotive', icon: Car, label: 'Automotive' },
    { type: 'electronics', icon: Laptop, label: 'Electronics' },
    { type: 'd2c', icon: Package, label: 'D2C Brand' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {businessTypes.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onSelect(type as BusinessType)}
          className="flex flex-col items-center p-4 rounded-lg border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
        >
          <Icon className="h-8 w-8 text-purple-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BusinessTypeSelector;