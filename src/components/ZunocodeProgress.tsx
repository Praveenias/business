import React from 'react';

const ZunocodeProgress: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">Preparing your Zunocode</p>
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-orange-500 rounded-full transition-all duration-500"
            style={{ width: '95%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZunocodeProgress;