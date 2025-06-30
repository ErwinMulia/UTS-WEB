'use client';

import { Text } from '../atom/Text';
import { Icon } from '../atom/Icon';
import { Button } from '../atom/Button';
import { Image } from '../atom/Image';
import { useState } from 'react';

interface Event {
  id: string | number;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = () => {
    // Ambil keranjang dari localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Periksa apakah item sudah ada di keranjang
    const existingItemIndex = cartItems.findIndex((item: Event) => item.id === event.id);
    
    if (existingItemIndex >= 0) {
      // Jika sudah ada, tambah quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Jika belum ada, tambahkan dengan quantity 1
      cartItems.push({
        ...event,
        quantity: 1
      });
    }
    
    // Simpan kembali ke localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Trigger storage event untuk update CartIcon
    window.dispatchEvent(new Event('storage'));
    
    // Tampilkan feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Image src={event.image} alt={event.title} />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Icon type="calendar" size={16} />
          <Text>{event.date}</Text>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Icon type="mapPin" size={16} />
          <Text>{event.location}</Text>
        </div>
        <div className="flex justify-between items-center">
          <Text className="font-bold text-blue-600">{event.price}</Text>
          <Button 
            onClick={addToCart}
            className={isAdded ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            {isAdded ? 'Ditambahkan' : 'Pesan Tiket'}
          </Button>
        </div>
      </div>
    </div>
  );
}