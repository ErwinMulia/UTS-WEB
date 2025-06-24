'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient';
import { Notification } from '../atom/Notification';
import { EmptyCart } from '../molecul/EmptyCart';
import { CartTable } from '../molecul/CartTable';
import { CartSummary } from '../molecul/CartSummary';

interface CartItem {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  quantity: number;
}

export const CartOrganism = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Periksa status login
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      
      // Ambil data keranjang dari localStorage
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      }
    };
    
    checkAuth();
  }, []);

  // Fungsi untuk menambah jumlah tiket
  const increaseQuantity = (id: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    // Trigger storage event untuk update CartIcon
    window.dispatchEvent(new Event('storage'));
  };

  // Fungsi untuk mengurangi jumlah tiket
  const decreaseQuantity = (id: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    // Trigger storage event untuk update CartIcon
    window.dispatchEvent(new Event('storage'));
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    // Trigger storage event untuk update CartIcon
    window.dispatchEvent(new Event('storage'));
  };

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    // Otomatis hilangkan notifikasi setelah 5 detik
    setTimeout(() => setNotification(null), 5000);
  };

  // Fungsi untuk checkout
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      showNotification('error', 'Keranjang belanja kosong');
      return;
    }

    setIsProcessing(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Gagal mendapatkan data pengguna. Silakan login kembali.');
      }

      // Hitung total harga
      const totalPrice = cartItems.reduce((total, item) => {
        const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
        return total + (priceValue * item.quantity);
      }, 0);

      // Buat order baru
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_price: totalPrice,
          status: 'pending',
          order_date: new Date().toISOString()
        }])
        .select();

      if (orderError !== null) {
        console.error('Order creation error:', orderError);
        throw new Error('Gagal membuat pesanan: ' + orderError.message);
      }

      if (!order || order.length === 0) {
        throw new Error('Data pesanan tidak tersedia setelah pembuatan.');
      }

      const orderId = Number(order[0].id);

      // Siapkan item pesanan
      const orderItems = cartItems.map(item => ({
        order_id: orderId,
        event_id: String(item.id),
        quantity: item.quantity,
        price: parseInt(item.price.replace(/[^0-9]/g, ''))
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError !== null) {
        console.error('Insert order_items error:', itemsError);
        throw new Error('Gagal menambahkan item pesanan: ' + itemsError.message);
      }

      // Kosongkan keranjang & update UI
      localStorage.removeItem('cartItems');
      setCartItems([]);
      window.dispatchEvent(new Event('storage'));

      // Tampilkan notifikasi sukses
      showNotification('success', 'Checkout berhasil! Mengalihkan ke halaman sukses...');

      // Alihkan ke halaman sukses setelah delay
      setTimeout(() => {
        router.push('/order-success');
      }, 1500);

      return; // ❗ Penting agar tidak lanjut ke catch
    } catch (error) {
      console.error('Error during checkout:', error);
      showNotification('error', error instanceof Error ? error.message : 'Terjadi kesalahan saat checkout.');
    } finally {
      setIsProcessing(false);
    }
  }; 

  // Hitung total harga
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (priceValue * item.quantity);
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