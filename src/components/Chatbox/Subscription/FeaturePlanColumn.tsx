import React from 'react';
import { FeatureItem } from './FeatureItem';

interface FeaturePlanColumnProps {
  title: string;
  features: string[];
  variant?: 'purple' | 'white' | 'gray';
}

export function FeaturePlanColumn({ title, features, variant = 'purple' }: FeaturePlanColumnProps) {
  return (
    <div className="flex-1">
      <div className="border-b border-orange-300 pb-2 mb-6">
        <h3 className={`text-xl font-semibold ${variant === 'purple' ? 'text-purple-700' : 'text-gray-800'}`}>
          {title}
        </h3>
      </div>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} variant={variant} />
        ))}
      </ul>
    </div>
  );
}