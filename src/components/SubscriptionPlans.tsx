import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface SubscriptionPlansProps {
  onSelect: (plan: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onSelect }) => {
  const [selectedTab, setSelectedTab] = useState('starter');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '822.2',
      features: [
        '100GB cloud storage',
        'Basic analytics',
        'Email support',
        'API access',
        'Basic reporting'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      price: '1650.3',
      features: [
        '500GB cloud storage',
        'Advanced analytics',
        'Priority support',
        'Full API access',
        'Custom reporting'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: '2130.5',
      features: [
        'Unlimited storage',
        'Enterprise analytics',
        '24/7 support',
        'Custom solutions',
        'White-label options'
      ]
    }
  ];

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    onSelect(plan);
  };

  return (
    <div className="space-y-8 mt-6">
      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl p-6 ${
              plan.popular 
                ? 'bg-purple-600 text-white transform scale-105' 
                : 'bg-purple-50'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-2xl font-bold">₹{plan.price}</span>
              <span className="text-sm ml-1">/mo</span>
            </div>
            <button
              onClick={() => handlePlanSelection(plan.name)}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                plan.popular
                  ? 'bg-white text-purple-600 hover:bg-gray-100'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors`}
            >
              {selectedPlan === plan.name ? '✓ Selected' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-center text-lg font-semibold mb-4">Feature List</h3>
        <div className="flex justify-center space-x-4 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedTab(plan.id)}
              className={`px-6 py-2 rounded-lg text-sm font-medium ${
                selectedTab === plan.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {plans.find(p => p.id === selectedTab)?.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <Check className="h-5 w-5 text-purple-600" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;