'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseclient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login for:', email);
      
      // 1) Login ke Supabase Auth
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.error('Login error:', loginError);
        // Periksa apakah error terkait email belum diverifikasi
        if (loginError.message.includes('Email not confirmed')) {
          throw new Error('Email belum diverifikasi. Silakan periksa email Anda untuk link verifikasi.');
        }
        throw loginError;
      }
      
      if (!data?.user) {
        console.error('No user data returned from login');
        throw new Error('Gagal login. User tidak ditemukan.');
      }
      
      console.log('User logged in successfully with ID:', data.user.id);

      // 2) Ambil role user dari tabel users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        throw userError;
      }
      
      if (!userData) {
        console.error('User not found in database');
        
        // Jika user ada di auth tetapi tidak ada di tabel users, coba buat entri baru
        console.log('Attempting to create user record in database');
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email,
              created_at: new Date().toISOString(),
              role: 'user',
            },
          ]);
          
        if (insertError) {
          console.error('Error creating user record:', insertError);
          throw new Error('User tidak ditemukan di database dan gagal membuat record baru.');
        }
        
        console.log('Created new user record in database');
        router.replace('/');
        return;
      }

      console.log('User role:', userData.role);
      
      // 3) Redirect berdasarkan role
      if (userData.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/');
      }

      
    } catch (err) {
      console.error('Login process error:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            {error.includes('Email belum diverifikasi') && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={async () => {
                    if (!email) {
                      setError('Masukkan email Anda untuk mengirim ulang verifikasi');
                      return;
                    }
                    setResendLoading(true);
                    try {
                      const { error } = await supabase.auth.resend({
                        type: 'signup',
                        email,
                        options: {
                          emailRedirectTo: `${window.location.origin}/login`,
                        },
                      });
                      if (error) throw error;
                      setResendSuccess(true);
                      setError('');
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Gagal mengirim email verifikasi');
                    } finally {
                      setResendLoading(false);
                    }
                  }}
                  disabled={resendLoading}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  {resendLoading ? 'Mengirim...' : 'Kirim ulang email verifikasi'}
                </button>
              </div>
            )}
          </div>
        )}
        
        {resendSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Email verifikasi telah dikirim ulang. Silakan periksa kotak masuk Anda.
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <p className="text-sm text-center">
          Belum punya akun?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Daftar disini
          </Link>
           </p>
      </div>
    </div>
  );
}