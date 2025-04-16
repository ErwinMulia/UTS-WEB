import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-blue-600 hover:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={twMerge(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};