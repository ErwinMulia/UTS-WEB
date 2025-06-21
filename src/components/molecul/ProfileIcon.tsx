'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseclient';

interface ProfileIconProps {
  className?: string;
}

const ProfileIcon = ({ className = '' }: ProfileIconProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Toggle menu saat ikon diklik
  const toggleMenu = () => setOpen((prev) => !prev);

  // Tutup menu jika klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Ikon profil */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white focus:outline-none"
      >
        <FaUser size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg z-10">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profil Saya
          </Link>
          <Link
            href="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Pesanan Saya
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;