'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="text-red-600 hover:text-red-800"
      aria-label="Hapus item"
    >
      <FaTrash />
    </button>
  );
};