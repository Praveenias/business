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

  const [errors, setErrors] = useState({
    email: '',
    mobile: '',
    panCard: '',
  });

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateMobile = (mobile: string): boolean =>
    /^[6-9]\d{9}$/.test(mobile);

  const validatePanCard = (panCard: string): boolean =>
    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panCard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email || '') ? '' : 'Invalid email address';
    const mobileError = validateMobile(formData.mobile || '') ? '' : 'Invalid mobile number';
    const panCardError = validatePanCard(formData.panCard || '') ? '' : 'Invalid PAN card number';

    setErrors({
      email: emailError,
      mobile: mobileError,
      panCard: panCardError,
    });

    if (!emailError && !mobileError && !panCardError) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when typing
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
            errors.email ? 'focus:ring-red-500' : 'focus:ring-orange-500'
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
          className={`w-full px-3 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
            errors.mobile ? 'focus:ring-red-500' : 'focus:ring-orange-500'
          }`}
          placeholder="Enter your mobile number"
        />
        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
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
          className={`w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
            errors.panCard ? 'focus:ring-red-500' : 'focus:ring-orange-500'
          }`}
          placeholder="Enter PAN card number"
        />
        {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#400C7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Continue
      </button>
    </form>
  );
};

export default AdminDetailsForm;
