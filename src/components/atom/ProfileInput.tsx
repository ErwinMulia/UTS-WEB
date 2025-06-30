import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProfileInputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: ReactNode;
  className?: string;
  label?: string;
  helpText?: string;
  pattern?: string;
}

export const ProfileInput = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  icon,
  className = '',
  label,
  helpText,
  pattern,
}: ProfileInputProps) => {
  const baseInputClasses = 'flex-grow outline-none bg-transparent';
  const baseContainerClasses = 'flex items-center border rounded-md px-3 py-2';
  const containerClasses = twMerge(
    baseContainerClasses,
    disabled ? 'bg-gray-100' : '',
    readOnly ? 'bg-gray-100' : '',
    !disabled && !readOnly ? 'focus-within:border-blue-500' : '',
    className
  );

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={containerClasses}>
        {icon && <div className="text-gray-400 mr-2">{icon}</div>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={baseInputClasses}
          pattern={pattern}
        />
      </div>
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
  );
};