import React, { useState } from 'react';
import { Zap, Rocket, Building, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier } from '../types';

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
      name: 'Starter',
      icon: Zap,
      feedbacks: '1,000',
      products: '10',
      price: '$49',
      features: [
        '1,000 monthly feedbacks',
        'Up to 10 products',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      tier: 'growth',
      name: 'Growth',
      icon: Rocket,
      feedbacks: '5,000',
      products: '50',
      price: '$149',
      features: [
        '5,000 monthly feedbacks',
        'Up to 50 products',
        'Advanced analytics',
        'Priority support',
        'Custom feedback forms'
      ]
    },
    {
      tier: 'enterprise',
      name: 'Enterprise',
      icon: Building,
      feedbacks: 'Custom',
      products: 'Unlimited',
      price: 'Custom',
      features: [
        'Unlimited feedbacks',
        'Unlimited products',
        'Enterprise analytics',
        '24/7 support',
        'Custom integration',
        'Dedicated account manager'
      ]
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      {plans.map(({ tier, name, icon: Icon, feedbacks, products, price, features }) => (
        <button
          key={tier}
          onClick={() => handlePlanSelect(tier as SubscriptionTier)}
          disabled={isProcessing}
          className={`flex flex-col p-6 rounded-lg border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Icon className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-900">{name}</span>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-500">/month</span>
            <p className="text-sm text-purple-600 mt-1">30-day free trial</p>
          </div>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">✨ {feedbacks} monthly feedbacks</p>
            <p className="text-sm text-gray-600">📦 {products} products</p>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SubscriptionSelector;