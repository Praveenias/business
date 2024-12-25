import React, { useState } from 'react';
import { Store, Utensils, Car, Laptop, Package } from 'lucide-react';
import { BusinessType } from '../../types';

interface BusinessTypeSelectorProps {
  onSelect: (type: BusinessType) => void;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<BusinessType | null>(null);

  const businessTypes = [
    { type: 'restaurant', icon: Utensils, label: 'Restaurant' },
    { type: 'retail', icon: Store, label: 'Retail Store' },
    { type: 'automotive', icon: Car, label: 'Automotive' },
    { type: 'electronics', icon: Laptop, label: 'Electronics' },
    { type: 'd2c', icon: Package, label: 'D2C Brand' },
  ];

  const handleSelect = (type: BusinessType) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {businessTypes.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => handleSelect(type as BusinessType)}
          disabled={selectedType !== null && selectedType !== type} // Disable other buttons if a type is selected
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedType === type
              ? 'border-purple-500 bg-purple-50' // Highlight selected button
              : 'border-purple-100 hover:border-purple-500 hover:bg-purple-50'
          } ${selectedType !== null && selectedType !== type ? 'opacity-50 cursor-not-allowed' : ''}`} // Style disabled buttons
        >
          <Icon className={`h-8 w-8 mb-2 ${selectedType === type ? 'text-purple-600' : 'text-gray-500'}`} />
          <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BusinessTypeSelector;
