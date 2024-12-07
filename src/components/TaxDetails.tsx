import React, { useState } from 'react';

interface TaxDetailsProps {
  onSubmit: (details: { panOrGst: string }) => void;
}

const TaxDetails: React.FC<TaxDetailsProps> = ({ onSubmit }) => {
  const [panOrGst, setPanOrGst] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ panOrGst });
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="panOrGst" className="block text-sm font-medium text-gray-700 mb-1">
            What is your Business PAN or GST?
          </label>
          <input
            type="text"
            id="panOrGst"
            value={panOrGst}
            onChange={(e) => setPanOrGst(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter PAN or GST number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default TaxDetails;