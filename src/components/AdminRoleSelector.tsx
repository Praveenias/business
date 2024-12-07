import React from 'react';
import { UserCog, Users, UserCheck, Building2 } from 'lucide-react';
import { AdminRole } from '../types';

interface AdminRoleSelectorProps {
  onSelect: (role: AdminRole) => void;
}

const AdminRoleSelector: React.FC<AdminRoleSelectorProps> = ({ onSelect }) => {
  const roles = [
    { type: 'owner', icon: Building2, label: 'Business Owner' },
    { type: 'director', icon: Users, label: 'Director' },
    { type: 'manager', icon: UserCog, label: 'Manager' },
    { type: 'authorized_representative', icon: UserCheck, label: 'Authorized Representative' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {roles.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onSelect(type as AdminRole)}
          className="flex flex-col items-center p-4 rounded-lg border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
        >
          <Icon className="h-8 w-8 text-purple-600 mb-2" />
          <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default AdminRoleSelector;