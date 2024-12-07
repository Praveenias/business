import React from 'react';

interface StepsProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepsProgress: React.FC<StepsProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = Math.min(((currentStep - 1) / totalSteps) * 100, 100);

  return (
    <div className="p-4 border-t mt-auto">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Steps completed</span>
          <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepsProgress;