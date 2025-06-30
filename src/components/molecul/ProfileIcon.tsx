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
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Toggle menu saat ikon diklik
  const toggleMenu = () => setOpen((prev) => !prev);

  // Ambil informasi user dari localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('user_role');
      const name = localStorage.getItem('user_username');
      setUserRole(role);
      setUsername(name);
    }
  }, []);

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
    // Hapus data user dari localStorage
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
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
          {username && (
            <div className="block px-4 py-2 text-sm font-medium text-blue-600 border-b border-gray-200">
              Halo, {username}
            </div>
          )}
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
          {userRole === 'admin' && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-blue-700 font-medium hover:bg-blue-50"
            >
              Admin Panel
            </Link>
          )}
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