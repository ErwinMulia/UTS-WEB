'use client';

import React from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-56 px-3 py-1 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;