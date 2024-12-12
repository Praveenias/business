import React from 'react';
import { Check } from 'lucide-react';

interface FeatureItemProps {
  text: string;
  variant?: 'purple' | 'white' | 'gray';
}

export function FeatureItem({ text, variant = 'gray' }: FeatureItemProps) {
  const variantStyles = {
    purple: 'text-purple-700',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  return (
    <li className="flex items-center gap-3 py-2">
      <Check className={`w-5 h-5 ${variantStyles[variant]}`} />
      <span className={`text-sm ${variantStyles[variant]}`}>{text}</span>
    </li>
  );
}