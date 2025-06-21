'use client';

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import HeaderButton from '@/components/atom/HeaderButton';

interface CartIconProps {
  itemCount?: number;
}

const CartIcon = ({ itemCount = 0 }: CartIconProps) => (
  <HeaderButton href="/cart" className="relative px-3 py-2 text-gray-700 hover:text-blue-600">
    <div className="relative">
      <FaShoppingCart size={20} />
      {itemCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </div>
      )}
    </div>
  </HeaderButton>
);

export default CartIcon;