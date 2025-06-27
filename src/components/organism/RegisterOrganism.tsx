'use client';

import React, { useState } from 'react';
import { RegisterForm } from '@/components/molecul/RegisterForm';
import { AuthLink } from '@/components/molecul/AuthLink';
import { supabase } from '@/lib/supabaseclient';

export const RegisterOrganism = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (nama: string, email: string, password: string) => {
    setLoading(true);
    setError('');

    if (!nama || !email || !password) {
      setError('Nama, email, dan password wajib diisi');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            nama,
            email,
            password,
            role: 'user',
          }
        ]);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      setError('Pendaftaran berhasil!');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Daftar Akun</h2>

        <RegisterForm 
          onSubmit={handleRegister} 
          error={error} 
          loading={loading} 
        />

        <AuthLink 
          text="Sudah punya akun?" 
          linkText="Masuk di sini" 
          href="/login" 
        />
      </div>
    </div>
  );
};