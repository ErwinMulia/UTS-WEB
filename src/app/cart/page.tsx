'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { ButtonWithIcon } from '@/components/atom/ButtonWithIcon';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';

interface CartItem {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Fungsi untuk checkout
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }

    // Simpan data pesanan ke Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Hitung total harga (asumsi price dalam format "Rp X.XXX.XXX")
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

      if (orderError) throw orderError;

      // Tambahkan detail order untuk setiap item
      if (order && order.length > 0) {
        const orderId = order[0].id;
        
        const orderItems = cartItems.map(item => ({
          order_id: orderId,
          event_id: item.id,
          quantity: item.quantity,
          price: parseInt(item.price.replace(/[^0-9]/g, ''))
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;

        // Kosongkan keranjang
        localStorage.removeItem('cartItems');
        setCartItems([]);
        
        // Redirect ke halaman sukses
        router.push('/order-success');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Terjadi kesalahan saat checkout. Silakan coba lagi.');
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
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Keranjang Tiket</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">Keranjang Anda kosong</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Jelajahi Event
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  {cartItems.map((item) => {
                    const priceValue = parseInt(item.price.replace(/[^0-9]/g, ''));
                    const subtotal = priceValue * item.quantity;
                    
                    return (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.title} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => decreaseQuantity(item.id)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="text-gray-700">{item.quantity}</span>
                            <button 
                              onClick={() => increaseQuantity(item.id)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rp {subtotal.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-800">
                  Total: Rp {calculateTotal().toLocaleString('id-ID')}
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterSectionOrganism />
    </>
  );
}