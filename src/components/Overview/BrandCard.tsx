import React from 'react';
import brandname from '../../assets/images/brand_name.svg';
import editicon from '../../assets/images/edit.svg';

interface BrandCardProps {
  name: string;
  label?: string;
  className?: string;
  onEdit?: () => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  name,
  label = "Brand Name",
  className = "",
  onEdit
}) => {
  if (!name) return null;

  return (
    <div className={`relative flex items-center p-3 mt-24 rounded-[20px] border border-[#DFDFDF] shadow-md hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Label Section */}
      <div className="flex items-center gap-3 w-1/3">
        <img 
          src={brandname} 
          alt={label}
          className="w-6 h-6 object-contain"
        />
        <span className="text-[15px] font-medium text-gray-700">{label}</span>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex justify-center items-center">
        <span className="text font-bold text-[#400C7A] truncate max-w-[80%]">
          {name}
        </span>
      </div>

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <img 
          src={editicon} 
          alt="Edit"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};