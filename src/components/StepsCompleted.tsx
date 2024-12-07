import React from 'react';
import { Check } from 'lucide-react';

interface StepsCompletedProps {
  currentStep: number;
}

const StepsCompleted: React.FC<StepsCompletedProps> = ({ currentStep }) => {
  const totalSteps = 6;
  const progress = Math.min(((currentStep - 1) / totalSteps) * 100, 100);

  const steps = [
    { 
      question: "What is the name of your business?",
      completed: currentStep > 1
    },
    { 
      question: "How many branches does your business operate?",
      completed: currentStep > 2
    },
    { 
      question: "Which is the main branch?",
      completed: currentStep > 3
    },
    { 
      question: "What is the main branch address?",
      completed: currentStep > 4
    },
    { 
      question: "Do you want to upload your restaurant menu?",
      completed: currentStep > 5
    },
    { 
      question: "Choose your subscription plan",
      completed: currentStep > 6
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Setup Progress</h3>
            <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepsCompleted;