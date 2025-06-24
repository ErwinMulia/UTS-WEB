'use client';

import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface QuantityButtonProps {
  type: 'increase' | 'decrease';
  onClick: () => void;
  disabled?: boolean;
}

export const QuantityButton = ({ type, onClick, disabled = false }: QuantityButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`p-1 rounded-full bg-gray-200 hover:bg-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {type === 'increase' ? <FaPlus size={12} /> : <FaMinus size={12} />}
    </button>
  );
};