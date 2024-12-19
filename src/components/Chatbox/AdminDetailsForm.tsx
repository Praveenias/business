import React, { useState } from 'react';
import { AdminDetails } from '../../types';

interface AdminDetailsFormProps {
  onSubmit: (details: Partial<AdminDetails>) => void;
}

const AdminDetailsForm: React.FC<AdminDetailsFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<AdminDetails>>({
    name: '',
    email: '',
    mobile: '',
    panCard: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {/* <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 m-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your full name"
        />
      </div> */}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-3 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your mobile number"
        />
      </div>

      <div>
        <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">
          PAN Card Number
        </label>
        <input
          type="text"
          id="panCard"
          name="panCard"
          required
          value={formData.panCard}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter PAN card number"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#400C7A]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Continue
      </button>
    </form>
  );
};

export default AdminDetailsForm;