'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Logo from '@/components/atom/Logo'; 
import NavLinks from '@/components/molecul/NavLinks';
import SearchBar from '@/components/molecul/SearchBar';
import AuthButtons from '@/components/molecul/AuthButtons';  
import CartIcon from '@/components/molecul/CartIcon';

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Periksa status login dan jumlah item di keranjang
  useEffect(() => {
    // Periksa status login dan jumlah item di keranjang
    const checkAuthAndCart = () => {
      // Periksa status login berdasarkan user_id di localStorage
      const userId = localStorage.getItem('user_id');
      setIsLoggedIn(!!userId);
      
      // Ambil jumlah item di keranjang dari localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItemCount(cartItems.length);
    };
    
    // Periksa saat komponen dimuat
    checkAuthAndCart();
    
    // Tambahkan event listener untuk perubahan pada localStorage
    const handleStorageChange = () => {
      checkAuthAndCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Periksa setiap 2 detik (untuk menangani perubahan yang tidak memicu event storage)
    const interval = setInterval(checkAuthAndCart, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tikets.com - Sistem Pemesanan Tiket Online</title>
        <meta name="description" content="Pesan tiket acara favorit Anda dengan mudah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            <div className="flex items-center gap-2">
              <Logo />

              <div className="text-xl font-bold text-blue-600">Tikets.com</div>  
            </div>

            <NavLinks />

            <div className="flex items-center space-x-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <CartIcon itemCount={cartItemCount} />
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}