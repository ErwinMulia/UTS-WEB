'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient';
import { FaPlus, FaMinus, FaTrash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
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
    
    // Simpan data pesanan ke Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
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

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Gagal membuat pesanan: ' + orderError.message);
      }

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

        if (itemsError) {
          console.error('Error adding order items:', itemsError);
          throw new Error('Gagal menambahkan item pesanan: ' + itemsError.message);
        }

        // Kosongkan keranjang
        localStorage.removeItem('cartItems');
        setCartItems([]);
        window.dispatchEvent(new Event('storage')); // Update cart icon
        
        showNotification('success', 'Checkout berhasil! Mengalihkan ke halaman sukses...');
        
        // Redirect ke halaman sukses setelah notifikasi muncul sebentar
        setTimeout(() => {
          router.push('/order-success');
        }, 1500);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      showNotification('error', error instanceof Error ? error.message : 'Terjadi kesalahan saat checkout. Silakan coba lagi.');
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
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {notification && (
          <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <FaExclamationCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {notification.message}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setNotification(null)}
                    className={`inline-flex rounded-md p-1.5 ${notification.type === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-100' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  disabled={isProcessing}
                  className={`flex items-center justify-center px-6 py-2 rounded-md transition ${isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
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