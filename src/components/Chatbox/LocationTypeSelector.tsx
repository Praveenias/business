import React, { useState } from 'react';
import { MapPin, Map } from 'lucide-react';
import { LocationType } from '../../types';

interface LocationTypeSelectorProps {
  onSelect: (type: LocationType) => void;
}

const LocationTypeSelector: React.FC<LocationTypeSelectorProps> = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState<LocationType | null>(null);

  const handleSelect = (type: LocationType) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <button
        onClick={() => handleSelect('single')}
        disabled={selectedType !== null && selectedType !== 'single'}
        className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-200 ${
          selectedType === 'single'
            ? 'border-purple-500 bg-purple-50' // Highlight selected button
            : 'border-purple-100 hover:border-purple-500 hover:bg-purple-50'
        } ${selectedType !== null && selectedType !== 'single' ? 'opacity-50 cursor-not-allowed' : ''}`} // Style disabled button
      >
        <MapPin className={`h-8 w-8 mb-2 ${selectedType === 'single' ? 'text-purple-600' : 'text-gray-500'}`} />
        <span className="text-sm font-medium text-gray-700">Single Location</span>
      </button>

      <button
        onClick={() => handleSelect('multi')}
        disabled={selectedType !== null && selectedType !== 'multi'}
        className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-200 ${
          selectedType === 'multi'
            ? 'border-purple-500 bg-purple-50' // Highlight selected button
            : 'border-purple-100 hover:border-purple-500 hover:bg-purple-50'
        } ${selectedType !== null && selectedType !== 'multi' ? 'opacity-50 cursor-not-allowed' : ''}`} // Style disabled button
      >
        <Map className={`h-8 w-8 mb-2 ${selectedType === 'multi' ? 'text-purple-600' : 'text-gray-500'}`} />
        <span className="text-sm font-medium text-gray-700">Multi Location</span>
      </button>
    </div>
  );
};

export default LocationTypeSelector;
