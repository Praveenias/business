import React from 'react';
import { FeaturePlanColumn } from './FeaturePlanColumn';

interface FeaturesSectionProps {
  plans: Array<{
    title: string;
    features: string[];
  }>;
}

export function FeaturesSection({ plans }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-purple-900">Feature List</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-purple-300"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-purple-300"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <FeaturePlanColumn
              key={plan.title}
              title={plan.title}
              features={plan.features}
              variant={index === 1 ? 'purple' : 'gray'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}