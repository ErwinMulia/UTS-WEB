'use client';

import React from 'react';

interface AlertMessageProps {
  type: 'success' | 'error';
  message: string;
  className?: string;
  children?: React.ReactNode;
}

export const AlertMessage = ({
  type,
  message,
  className = '',
  children,
}: AlertMessageProps) => {
  if (!message && !children) return null;
  
  return (
    <div 
      className={`${type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded border ${className}`}
    >
      {message}
      {children}
    </div>
  );
};