'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient';
import { Notification } from '../atom/Notification';
import { EmptyCart } from '../molecul/EmptyCart';
import { CartTable } from '../molecul/CartTable';
import { CartSummary } from '../molecul/CartSummary';

interface CartItem {
  id: string; 
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  quantity: number;
}

export const CartOrganism = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      const fixedItems: CartItem[] = parsed.map((item: any) => ({
        ...item,
        id: String(item.id),
      }));
      setCartItems(fixedItems);
    }
  }, []);

  const increaseQuantity = (id: string) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage'));
  };

  const decreaseQuantity = (id: string) => {
    const updatedItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage'));
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showNotification('error', 'Keranjang belanja kosong');
      return;
    }

    setIsProcessing(true);

    try {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) {
        throw new Error('Email pengguna tidak ditemukan. Silakan login manual atau inputkan email.');
      }

      const totalPrice = cartItems.reduce((total, item) => {
        const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
        return total + priceValue * item.quantity;
      }, 0);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_email: userEmail,
          total_price: totalPrice,
          status: 'pending',
          order_date: new Date().toISOString()
        }])
        .select();

      if (orderError) {
        throw new Error('Gagal membuat pesanan: ' + orderError.message);
      }

      const orderId = order?.[0]?.id;
      if (!orderId) {
        throw new Error('Order ID tidak ditemukan setelah insert order');
      }

      const orderItems = cartItems.map(item => ({
        order_id: orderId,
        event_id: item.id,
        quantity: item.quantity,
        price: parseInt(item.price.replace(/[^0-9]/g, '')),
      }));

      console.log('Data order items akan diinsert:', orderItems);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)
        .select();

      console.log('Hasil insert order items:', itemsData);
      console.log('Error insert order items:', itemsError);

      if (itemsError) {
        throw new Error('Gagal menambahkan item pesanan: ' + (itemsError.message || JSON.stringify(itemsError)));
      }

      localStorage.removeItem('cartItems');
      setCartItems([]);
      window.dispatchEvent(new Event('storage'));

      showNotification('success', 'Checkout berhasil! Mengalihkan ke halaman sukses...');

      setTimeout(() => {
        router.push('/order-success');
      }, 1500);

    } catch (error) {
      console.error('Error during checkout:', error);
      showNotification('error', error instanceof Error ? error.message : 'Terjadi kesalahan saat checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + priceValue * item.quantity;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Keranjang Tiket</h1>

      {cartItems.length === 0 ? (
        <EmptyCart onExplore={() => router.push('/')} />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <CartTable
            items={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
          />

          <CartSummary
            total={calculateTotal()}
            onCheckout={handleCheckout}
            isProcessing={isProcessing}
          />
        </div>
      )}
    </div>
  );
};