import React, { useState } from 'react';

interface TaxDetailsFormProps {
  onSubmit: (details: { gstNumber: string; taxIdentifier: string }) => void;
}

const TaxDetailsForm: React.FC<TaxDetailsFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    gstNumber: '',
    taxIdentifier: '',
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
      <div>
        <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">
          GST Number
        </label>
        <input
          type="text"
          id="gstNumber"
          name="gstNumber"
          required
          value={formData.gstNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter GST number"
        />
      </div>

      <div>
        <label htmlFor="taxIdentifier" className="block text-sm font-medium text-gray-700">
          Tax Identification Number
        </label>
        <input
          type="text"
          id="taxIdentifier"
          name="taxIdentifier"
          required
          value={formData.taxIdentifier}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter tax identification number"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Continue
      </button>
    </form>
  );
};

export default TaxDetailsForm;