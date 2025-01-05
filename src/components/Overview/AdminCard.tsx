import React from 'react';
import usericon from '../../assets/images/user_icon.svg';
import { AdminDetails } from '../../types';

interface AdminCardProps {
  adminData: AdminDetails;
}

export const AdminCard: React.FC<AdminCardProps> = ({ adminData }) => {
  if (!adminData) return null;

  return (
    <div className="absolute top-[2%] left-[-5%] w-[110%] min-h-[60px] rounded-[15px] shadow-lg bg-[#400C7A] border border-[#400C7A] flex items-center px-4">
      <div className="flex items-center gap-6 w-full">
        <div className="flex-shrink-0">
          <img src={usericon} alt="User" className="w-[30px] h-[30px]" />
        </div>
        <div className="flex flex-col gap-1 flex-grow">
          <div className="flex items-center justify-between">
          {adminData.name && (
            <span className="text-white font-bold text-[15px]">Hi, {adminData.name}</span>
          )}
            {adminData.panCard && (
              <span className="text-[13px] text-[#0df90d] px-4 py-1 rounded-full font-bold shadow-sm">
                Profile Updated ✓
              </span>
            )}
          </div>
          <p className="text-white/90 font-medium text-[13px]">{adminData.role}</p>
        </div>
      </div>
    </div>
  );
};


