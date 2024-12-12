import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({ title, price, features, isPopular }: PricingCardProps) {
  return (
    <div className={`relative rounded-2xl p-8 ${isPopular ? 'bg-purple-700 text-white' : 'bg-white'}`}>
      {isPopular && (
        <span className="absolute -top-3 right-8 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">₹{price.toFixed(1)}</span>
        <span className="text-sm opacity-80">/mo</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isPopular
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
        }`}
      >
        Subscribe Now
      </button>
    </div>
  );
}