import React from 'react';
import locationicon from '../../assets/images/location_icon.svg';

interface DetailRowProps {
  icon?: string;
  label: string;
  value: string;
  underlineLabel?: boolean;
}

export const DetailRow: React.FC<DetailRowProps> = ({
  icon = locationicon,
  label,
  value,
  underlineLabel = true
}) => {
  return (
    <div className="flex items-center justify-between w-full py-3 border-b border-[#DFDFDF] group hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-2 w-1/2">
        <img src={icon} alt="" className="w-5 h-5 opacity-75 group-hover:opacity-100" />
        <span className={`text-[13px] font-medium text-gray-600 ${underlineLabel ? 'underline' : ''}`}>
          {label}
        </span>
      </div>
      <div className="flex items-center justify-end w-1/2">
        <span className="text-[13px] font-bold text-[#400C7A]">{value}</span>
      </div>
    </div>
  );
};