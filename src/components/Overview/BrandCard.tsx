import React from 'react';
import brandname from '../../assets/images/brand_name.svg';
import editicon from '../../assets/images/edit.svg';
import menu from '../../assets/images/menu.svg';

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
  onEdit,
}) => {
  if (!name) return null;

  // Determine the margin-top class based on the label value
  const marginTopClass = label === "Brand Name" ? "mt-20" : "mt-0";

  // Determine the image source based on the label value
  const imageSrc = label === "Brand Name" ? brandname : menu;

  return (
    <div
      className={`relative flex items-center p-3 ${marginTopClass} rounded-[20px] border border-[#DFDFDF]${className}`}
    >
      {/* Label Section */}
      <div className="flex items-center gap-3 w-1/3">
        <img 
          src={imageSrc} 
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
