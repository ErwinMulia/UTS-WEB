'use client';

import React from 'react';

interface CartItemProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  quantity: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  title,
  date,
  location,
  price,
  image,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const subtotal = parseInt(price.replace(/[^0-9]/g, '')) * quantity;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
        <img src={image} alt={title} className="w-12 h-12 rounded object-cover" />
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{location}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{price}</td>
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
        <button
          onClick={() => onDecrease(id)}
          disabled={quantity <= 1}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => onIncrease(id)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{subtotal.toLocaleString()}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onRemove(id)}
          className="text-red-600 hover:underline"
        >
          Hapus
        </button>
      </td>
    </tr>
  );
};
