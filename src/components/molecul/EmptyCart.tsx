'use client';

import React from 'react';
import { Button } from '../atom/Button';

interface EmptyCartProps {
  onExplore: () => void;
}

export const EmptyCart = ({ onExplore }: EmptyCartProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <p className="text-gray-600 mb-4">Keranjang Anda kosong</p>
      <Button 
        onClick={onExplore}
        variant="primary"
      >
        Jelajahi Event
      </Button>
    </div>
  );
};