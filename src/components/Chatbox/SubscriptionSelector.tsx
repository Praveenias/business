import React, { useState } from 'react';
import { Zap, Rocket, Building, Loader2, TrainFrontTunnel } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier } from '../types';
import { FeaturesSection } from './Subscription/FeatureSection';

interface SubscriptionSelectorProps {
  onSelect: (tier: SubscriptionTier) => void;
}

const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({ onSelect }) => {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
  const [step, setStep] = useState<'select' | 'trial' | 'setup'>('select');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      tier: 'starter',
      title: 'Starter Plan',
      description : 'For Professional Business Entrepreneur',
      price: '822.2',
      features: [
        '1,000 monthly feedbacks',
        'Up to 10 products',
        'Basic analytics',
        'Email support'
      ],
      isPopular: false,
    },
    {
      tier: 'prefessional',
      title: 'Professional Plan',
      description : 'The most Reliable for Business Enterprises',
      price: '1650.3',
      features: [
        '5,000 monthly feedbacks',
        'Up to 50 products',
        'Advanced analytics',
        'Priority support',
        'Custom feedback forms'
      ],
      isPopular: true,
    },
    {
      tier: 'enterprise',
      title: 'Enterprise Plan',
      description : 'For Professional Business Entrepreneur',
      price: '2130.5',
      features: [
        'Unlimited feedbacks',
        'Unlimited products',
        'Enterprise analytics',
        '24/7 support',
        'Custom integration',
        'Dedicated account manager'
      ],
      isPopular: false,
    }
  ];

  const handlePlanSelect = async (tier: SubscriptionTier) => {
    if (isProcessing || selectedTier) return;
    
    setIsProcessing(true);
    setSelectedTier(tier);
    
    // Activate trial
    setStep('trial');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Setup account
    setStep('setup');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Complete setup and trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    onSelect(tier);
    setIsProcessing(false);
  };

  if (step === 'setup') {
    return (
      <div className="text-center space-y-4 p-8 bg-blue-50 rounded-lg my-6 shadow-sm">
        <h3 className="text-xl font-bold text-blue-600">Setting Up Your Account</h3>
        <div className="space-y-2">
          <p className="text-gray-600">✓ Creating workspace</p>
          <p className="text-gray-600">✓ Configuring preferences</p>
          <p className="text-gray-600">✓ Preparing dashboard</p>
        </div>
        <div className="animate-pulse mt-4">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
          <p className="text-sm text-blue-600 mt-2">Almost there...</p>
        </div>
      </div>
    );
  }

  if (step === 'trial') {
    return (
      <div className="text-center space-y-4 p-8 bg-green-50 rounded-lg my-6 shadow-sm">
        <h3 className="text-xl font-bold text-green-600">Activating Your Trial</h3>
        <div className="space-y-2">
          <p className="text-gray-600">✓ 30-day free trial activated</p>
          <p className="text-gray-600">✓ Full access to all features</p>
          <p className="text-gray-600">✓ No credit card required</p>
        </div>
        {selectedTier && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              After trial: {selectedTier === 'starter' ? '$49' : selectedTier === 'growth' ? '$149' : 'Custom'}/month
            </p>
          </div>
        )}
        <div className="animate-pulse mt-4">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-green-600" />
          <p className="text-sm text-green-600 mt-2">Activating trial...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {plans.map(({ tier, title, price,isPopular }) => (
          <div>
          <div
            key={tier}
            className={`flex flex-col p-6 rounded-lg border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              
              <span className="text-lg font-semibold text-gray-900">{title}</span>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">₹{price}</span>
              <span className="text-gray-500">/month</span>
              <p className="text-sm text-purple-600 mt-1">30-day free trial</p>
            </div> 
          
          <button
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              isPopular
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
            }`} onClick={() => handlePlanSelect(tier as SubscriptionTier)}
          >
            Subscribe Now
          </button>
          </div>
          </div>
        ))}
      </div>
      <FeaturesSection plans={plans} />
    </div>
    
  );
};

export default SubscriptionSelector;