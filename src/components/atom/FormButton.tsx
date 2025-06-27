'use client';

import React from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: () => void;
}

export const FormButton = ({
  type = 'submit',
  disabled = false,
  className = '',
  children,
  isLoading = false,
  loadingText = 'Memproses…',
  onClick,
}: FormButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 ${className}`}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};