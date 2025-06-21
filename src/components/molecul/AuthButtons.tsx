'use client';

import React from 'react';
import HeaderButton from '@/components/atom/HeaderButton';

const AuthButtons = () => (
  <div className="flex items-center space-x-4">
    <HeaderButton href="/login" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500">
      Login
    </HeaderButton>
    <HeaderButton href="/register" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
      Register
    </HeaderButton>
  </div>
);

export default AuthButtons; 