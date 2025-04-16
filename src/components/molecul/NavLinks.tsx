'use client';

import React from 'react';
import HeaderButton from '@/components/atom/HeaderButton';

const NavLinks = () => (
  <div className="flex items-center justify-center flex-1">
    <div className="flex space-x-4">
      <HeaderButton href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
        Beranda
      </HeaderButton>
      <HeaderButton href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
        Acara
      </HeaderButton>
      <HeaderButton href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
        Kategori
      </HeaderButton>
      <HeaderButton href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
        Tentang Kami
      </HeaderButton>
    </div>
  </div>
);

export default NavLinks;