'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/molecul/LoginForm';
import { AuthLink } from '@/components/molecul/AuthLink';
import { supabase } from '@/lib/supabaseclient';

export const LoginOrganism = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!username || !password) {
      setError('Username dan password wajib diisi');
      setLoading(false);
      return;
    }

    try {
      // Cari user berdasarkan username dan password
      const { data, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (queryError || !data) {
        console.error('Login error:', queryError);
        setError('Username atau password salah');
      } else {
        setSuccess(true);
        localStorage.setItem('user_username', username); // simpan username user
        localStorage.setItem('user_id', data.id); // simpan id user
        localStorage.setItem('user_role', data.role); // simpan role user
        setTimeout(() => {
          router.push('/'); // arahkan ke halaman utama atau dashboard
        }, 1000);
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <LoginForm
          onSubmit={handleLogin}
          error={error}
          loading={loading}
          success={success}
        />


      </div>
    </div>
  );
};
