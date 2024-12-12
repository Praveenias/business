import React from 'react';
import { MapPin, Map } from 'lucide-react';
import { LocationType } from '../../types';

interface LocationTypeSelectorProps {
  onSelect: (type: LocationType) => void;
}

const LocationTypeSelector: React.FC<LocationTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <button
        onClick={() => onSelect('single')}
        className="flex flex-col items-center p-6 rounded-lg border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
      >
        <MapPin className="h-8 w-8 text-purple-600 mb-2" />
        <span className="text-sm font-medium text-gray-700">Single Location</span>
      </button>
      <button
        onClick={() => onSelect('multi')}
        className="flex flex-col items-center p-6 rounded-lg border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
      >
        <Map className="h-8 w-8 text-purple-600 mb-2" />
        <span className="text-sm font-medium text-gray-700">Multi Location</span>
      </button>
    </div>
  );
};

export default LocationTypeSelector;