'use client';

import React from 'react';
import { CartItem } from './CartItem';

interface CartItemType {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartTableProps {
  items: CartItemType[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartTable = ({ items, onIncrease, onDecrease, onRemove }: CartTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              location={item.location}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};