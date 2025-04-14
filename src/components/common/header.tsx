// Header/Navbar Component
'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import { SearchIcon } from 'lucide-react';
import Image from "next/image";

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <>
      <Head>
        <title>Tikets.com - Sistem Pemesanan Tiket Online</title>
        <meta name="description" content="Pesan tiket acara favorit Anda dengan mudah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className='flex items-center gap-2'> 
                <Image
                src="/image/logotiketsj.svg"
                alt="Logo"
                width={30}
                height={30}
                priority
                />
            </div>
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-600">Tikets.com</div>
            </div>
            
            {/* Navigation Links - Centered */}
            <div className="flex items-center justify-center flex-1">
              <div className="flex space-x-4">
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">Beranda</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">Acara</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">Kategori</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">Tentang Kami</a>
              </div>
            </div>
            
            {/* Search Bar and Auth Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Box */}
              <div className="relative mr-2 hidden md:block">
                <input
                  type="text"
                  placeholder="Cari acara, lokasi..."
                  className="w-56 px-3 py-1 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
                  <SearchIcon size={16} />
                </button>
              </div>
              
              {/* Auth Buttons */}
              <a href="#" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500">Masuk</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">Daftar</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}