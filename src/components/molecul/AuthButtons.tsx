'use client';

import React, { useState, useEffect } from 'react';
import HeaderButton from '@/components/atom/HeaderButton';
import ProfileIcon from './ProfileIcon';

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      // Periksa apakah user_id ada di localStorage
      const userId = localStorage.getItem('user_id');
      setIsLoggedIn(!!userId);
    };
    
    // Periksa saat komponen dimuat
    checkAuth();
    
    // Tambahkan event listener untuk perubahan pada localStorage
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Periksa setiap 2 detik (untuk menangani perubahan yang tidak memicu event storage)
    const interval = setInterval(checkAuth, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  if (isLoggedIn) {
    return <ProfileIcon />;
  }
  
  return (
    <div className="flex items-center space-x-4">
      <HeaderButton href="/login" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500">
        Login
      </HeaderButton>
    </div>
  );
};

export default AuthButtons;