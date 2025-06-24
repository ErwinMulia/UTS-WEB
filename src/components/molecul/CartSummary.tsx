'use client';

import React from 'react';
import { Button } from '../atom/Button';

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
  isProcessing: boolean;
}

export const CartSummary = ({ total, onCheckout, isProcessing }: CartSummaryProps) => {
  return (
    <div className="px-6 py-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800">
          Total: Rp {total.toLocaleString('id-ID')}
        </div>
        <Button
          onClick={onCheckout}
          variant="primary"
          className={`flex items-center justify-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            'Checkout'
          )}
        </Button>
      </div>
    </div>
  );
};