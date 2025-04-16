'use client';

import React from 'react';
import HeaderButton from '@/components/atom/HeaderButton';

const AuthButtons = () => (
  <div className="flex items-center space-x-4">
    <HeaderButton href="#" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500">
      Masuk
    </HeaderButton>
    <HeaderButton href="#" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
      Daftar
    </HeaderButton>
  </div>
);

export default AuthButtons;