'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Logo from '@/components/atom/Logo';
import NavLinks from '@/components/molecul/NavLinks';
import SearchBar from '@/components/molecul/SearchBar';
import AuthButtons from '@/components/molecul/AuthButtons';

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
            <Logo />
            {/* Navigation Links */}
            <NavLinks />
            {/* Search Bar and Auth Buttons */}
            <div className="flex items-center space-x-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AuthButtons />  {/* Ensure AuthButtons is used here */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}