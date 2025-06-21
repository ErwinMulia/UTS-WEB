'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient';
import { Header } from '@/components/organism/Header';
import { FooterSectionOrganism } from '@/components/organism/FooterSectionOrganism';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave } from 'react-icons/fa';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        router.replace('/login');
        return;
      }
      
      fetchUserProfile(data.session.user.id);
    };
    
    checkAuth();
  }, [router]);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      setError('');
      
      // Ambil data user dari tabel users
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfile(data as UserProfile);
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || ''
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Gagal mengambil data profil');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setUpdateSuccess(false);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User tidak terautentikasi');
      }
      
      // Update data di tabel users
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh data profil
      await fetchUserProfile(user.id);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Hilangkan pesan sukses setelah 3 detik
      setTimeout(() => setUpdateSuccess(false), 3000);
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Profil Saya</h1>
          
          {loading && !isEditing ? (
            <div className="text-center py-8">Memuat data profil...</div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          ) : profile ? (
            <>
              {updateSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Profil berhasil diperbarui!
                </div>
              )}
              
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <span>{profile.email}</span>
                    </div>
                    <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="full_name" className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <FaUser className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="flex-grow outline-none"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Nomor Telepon</label>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <FaPhone className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-grow outline-none"
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={loading}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Menyimpan...' : (
                        <>
                          <FaSave className="mr-2" />
                          Simpan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Informasi Akun</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <span>{profile.email}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <span>{profile.full_name || '-'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Nomor Telepon</p>
                      <div className="flex items-center">
                        <FaPhone className="text-gray-400 mr-2" />
                        <span>{profile.phone || '-'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Tanggal Bergabung</p>
                      <div className="flex items-center">
                        <span>
                          {new Date(profile.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">Tidak ada data profil ditemukan</div>
          )}
        </div>
      </main>
      
      <FooterSectionOrganism />
    </div>
  );
}