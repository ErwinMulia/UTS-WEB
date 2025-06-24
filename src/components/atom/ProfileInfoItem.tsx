import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProfileInfoItemProps {
  label: string;
  value: string | null | undefined;
  icon?: ReactNode;
  fallbackText?: string;
  className?: string;
}

export const ProfileInfoItem = ({
  label,
  value,
  icon,
  fallbackText = 'Belum diisi',
  className = '',
}: ProfileInfoItemProps) => {
  const baseClasses = 'space-y-2';
  const containerClasses = twMerge(baseClasses, className);
  
  return (
    <div className={containerClasses}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div className="flex items-center p-3 bg-gray-50 rounded-md">
        {icon && <div className="text-gray-400 mr-3">{icon}</div>}
        <span className="font-medium">{value || fallbackText}</span>
      </div>
    </div>
  );
};