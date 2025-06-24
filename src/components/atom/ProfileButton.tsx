import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ProfileButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export const ProfileButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  icon,
  isLoading = false,
  loadingText,
}: ProfileButtonProps) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const baseClasses = 'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors';
  const buttonClasses = twMerge(
    baseClasses,
    getVariantClasses(),
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '',
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {isLoading ? (
        <>
          <span className="animate-spin mr-2">⟳</span>
          {loadingText || children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};