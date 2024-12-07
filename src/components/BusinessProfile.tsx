import React, { useState } from 'react';
import { PersonalDetails } from '../types';

interface BusinessProfileProps {
  onSubmit: (details: PersonalDetails) => void;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ onSubmit }) => {
  const [details, setDetails] = useState<PersonalDetails>({
    mobile: '',
    role: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={details.mobile}
            onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
            placeholder="Mobile"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="text"
            value={details.role}
            onChange={(e) => setDetails({ ...details, role: e.target.value })}
            placeholder="Your Role"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default BusinessProfile;