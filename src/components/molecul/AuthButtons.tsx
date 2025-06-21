'use client';

import React, { useState, useEffect } from 'react';
import HeaderButton from '@/components/atom/HeaderButton';
import ProfileIcon from './ProfileIcon';
import { supabase } from '@/lib/supabaseclient';

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  if (isLoggedIn) {
    return <ProfileIcon />;
  }
  
  return (
    <div className="flex items-center space-x-4">
      <HeaderButton href="/login" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500">
        Login
      </HeaderButton>
      <HeaderButton href="/register" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
        Register
      </HeaderButton>
    </div>
  );
};

export default AuthButtons;