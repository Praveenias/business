import React, { useState } from 'react';

interface TaxDetailsFormProps {
  onSubmit: (details: { gstNumber: string; taxIdentifier: string }) => void;
}

const TaxDetailsForm: React.FC<TaxDetailsFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    gstNumber: '',
    taxIdentifier: '',
  });

  const [errors, setErrors] = useState({
    gstNumber: '',
    taxIdentifier: '',
  });

  const validateGST = (gstNumber: string): boolean =>
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber);

  const validateTIN = (taxIdentifier: string): boolean =>
    /^\d{9,11}$/.test(taxIdentifier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const gstError = validateGST(formData.gstNumber)
      ? ''
      : 'Invalid GST Number. Ensure it matches the official format.';
    const tinError = validateTIN(formData.taxIdentifier)
      ? ''
      : 'Invalid Tax Identification Number. Must be 9-11 digits.';

    setErrors({
      gstNumber: gstError,
      taxIdentifier: tinError,
    });

    if (!gstError && !tinError) {
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
          className={`w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
            errors.gstNumber ? 'focus:ring-red-500' : 'focus:ring-orange-500'
          }`}
          placeholder="Enter GST number"
        />
        {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>}
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
          className={`w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
            errors.taxIdentifier ? 'focus:ring-red-500' : 'focus:ring-orange-500'
          }`}
          placeholder="Enter tax identification number"
        />
        {errors.taxIdentifier && <p className="text-red-500 text-sm mt-1">{errors.taxIdentifier}</p>}
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

export default TaxDetailsForm;
