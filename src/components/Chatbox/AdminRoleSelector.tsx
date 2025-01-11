import React, { useState } from 'react';
import { UserCog, Users, UserCheck, Building2 } from 'lucide-react';
import { AdminRole } from '../../types';

interface AdminRoleSelectorProps {
  onSelect: (role: AdminRole) => void;
}

const AdminRoleSelector: React.FC<AdminRoleSelectorProps> = ({ onSelect }) => {
  const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null);

  const roles = [
    { type: 'Business Owner', icon: Building2, label: 'Business Owner' },
    { type: 'Director', icon: Users, label: 'Director' },
    { type: 'Manager', icon: UserCog, label: 'Manager' },
    { type: 'Authorized Representative', icon: UserCheck, label: 'Authorized Representative' },
  ];

  const handleSelect = (role: AdminRole) => {
    setSelectedRole(role);
    onSelect(role);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {roles.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => handleSelect(type as AdminRole)}
          disabled={selectedRole !== null && selectedRole !== type} // Disable if another role is selected
          className={`flex flex-col items-center p-4 rounded-[15px] border-2 transition-all duration-200 ${
            selectedRole === type
              ? 'border-[#400C7A] bg-purple-50' // Highlight the selected button
              : 'border-purple-100 hover:border-[#400C7A] hover:bg-purple-50'
          } ${selectedRole !== null && selectedRole !== type ? 'opacity-50 cursor-not-allowed' : ''}`} // Style disabled buttons
        >
          <Icon className={`h-8 w-8 mb-2 ${selectedRole === type ? 'text-[#400C7A]' : 'text-gray-500'}`} />
          <span className="text-sm font-medium text-center">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AdminRoleSelector;
