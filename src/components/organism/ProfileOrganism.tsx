import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ProfileEditForm } from '../molecul/ProfileEditForm';
import { ProfileInfoDisplay } from '../molecul/ProfileInfoDisplay';
import { 
  ProfileLoading, 
  ProfileError, 
  ProfileEmpty, 
  ProfileSuccessMessage 
} from '../molecul/ProfileStatusDisplay';

interface ProfileData {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

export const ProfileOrganism = () => {
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: ''
  });

  useEffect(() => {
    const checkUser = () => {
      try {
        const userId = localStorage.getItem('user_id');
        const username = localStorage.getItem('user_username');
        
        if (userId && username) {
          setCurrentUser({ id: userId, username: username });
          fetchUserProfile(userId);
        } else {
          setLoading(false);
          setError('Silakan login untuk melihat profil');
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        setLoading(false);
        setError('Gagal memuat sesi pengguna');
      }
    };

    checkUser();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Coba ambil dari tabel users
      let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      // Jika tidak ada di users, coba di profiles
      if (error && error.code === 'PGRST116') {
        const profileResult = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        data = profileResult.data;
        error = profileResult.error;
      }

      if (error) {
        console.error('Fetch error:', error);
        if (error.code === 'PGRST116') {
          // Tidak ada data profil, coba buat dari data auth
          await createProfileFromAuth(userId);
        } else {
          throw error;
        }
      } else if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || ''
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat profil');
    } finally {
      setLoading(false);
    }
  };

  const createProfileFromAuth = async (userId: string) => {
    try {
      // Ambil data dari localStorage
      const username = localStorage.getItem('user_username');
      
      if (!username) throw new Error('Tidak dapat mengambil data pengguna');
      
      const userData = {
        id: userId,
        email: username, // Menggunakan username sebagai email
        full_name: null,
        phone: null,
        created_at: new Date().toISOString()
      };
      
      // Coba insert ke users
      let { error } = await supabase.from('users').insert([userData]);
      
      // Jika gagal di users, coba di profiles
      if (error) {
        const { error: profileError } = await supabase.from('profiles').insert([userData]);
        if (profileError) throw profileError;
      }
      
      // Ambil ulang profil
      await fetchUserProfile(userId);
      
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(err instanceof Error ? err.message : 'Gagal membuat profil');
    }
  };

  const handleUpdateProfile = async (data: { full_name: string; phone: string }) => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Validasi nomor telepon
      const phoneRegex = /^[0-9+\-\s]+$/;
      if (data.phone && !phoneRegex.test(data.phone)) {
        throw new Error('Format nomor telepon tidak valid');
      }
      
      const updateData = {
        full_name: data.full_name,
        phone: data.phone,
        updated_at: new Date().toISOString()
      };
      
      console.log('Mencoba update profil dengan data:', updateData);
      
      // Coba update di tabel users
      let { error, data: updatedData } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', currentUser.id)
        .select();
      
      // Jika gagal, coba di tabel profiles
      if (error) {
        console.log('Error updating users table:', error);
        const profileResult = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', currentUser.id)
          .select();
        
        updatedData = profileResult.data;
        error = profileResult.error;
        
        if (error) {
          console.log('Error updating profiles table:', error);
        } else {
          console.log('Berhasil update di tabel profiles:', updatedData);
        }
      } else {
        console.log('Berhasil update di tabel users:', updatedData);
      }
      
      if (error) {
        console.error('Update error:', error);
        throw error;
      }
      
      // Refresh data profil
      await fetchUserProfile(currentUser.id);
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

  const handleRetry = () => {
    if (currentUser) {
      fetchUserProfile(currentUser.id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Profil Saya</h1>
      
      {loading && !isEditing ? (
        <ProfileLoading isLoading={loading} />
      ) : error ? (
        <ProfileError error={error} onRetry={handleRetry} />
      ) : profile ? (
        <>
          <ProfileSuccessMessage show={updateSuccess} />
          
          {isEditing ? (
            <ProfileEditForm
              initialData={{
                full_name: profile.full_name || '',
                phone: profile.phone || ''
              }}
              email={profile.email}
              onSubmit={handleUpdateProfile}
              onCancel={() => {
                setIsEditing(false);
                setFormData({
                  full_name: profile?.full_name || '',
                  phone: profile?.phone || ''
                });
              }}
              isLoading={loading}
            />
          ) : (
            <ProfileInfoDisplay 
              profile={profile} 
              onEdit={() => setIsEditing(true)} 
            />
          )}
        </>
      ) : (
        <ProfileEmpty onRetry={handleRetry} />
      )}
    </div>
  );
};