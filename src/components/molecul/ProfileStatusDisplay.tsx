import React from 'react';
import { FaSpinner, FaUser } from 'react-icons/fa';
import { ProfileButton } from '../atom/ProfileButton';

interface ProfileLoadingProps {
  isLoading: boolean;
}

export const ProfileLoading = ({ isLoading }: ProfileLoadingProps) => {
  if (!isLoading) return null;
  
  return (
    <div className="text-center py-8">
      <FaSpinner className="animate-spin mx-auto mb-4 text-blue-600" size={24} />
      <p>Memuat data profil...</p>
    </div>
  );
};

interface ProfileErrorProps {
  error: string | null;
  onRetry: () => void;
}

export const ProfileError = ({ error, onRetry }: ProfileErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p className="font-medium">Terjadi Kesalahan:</p>
      <p className="text-sm mt-1">{error}</p>
      <ProfileButton
        onClick={onRetry}
        variant="danger"
        className="mt-2 px-4 py-2 text-sm"
      >
        Coba Lagi
      </ProfileButton>
    </div>
  );
};

interface ProfileEmptyProps {
  onRetry: () => void;
}

export const ProfileEmpty = ({ onRetry }: ProfileEmptyProps) => {
  return (
    <div className="text-center py-8">
      <FaUser className="mx-auto text-gray-300 mb-4" size={48} />
      <h3 className="text-lg font-medium text-gray-900">Tidak ada data profil</h3>
      <p className="text-gray-500 mt-2">Profil Anda belum tersedia</p>
      <ProfileButton
        onClick={onRetry}
        variant="primary"
        className="mt-4"
      >
        Coba Lagi
      </ProfileButton>
    </div>
  );
};

interface ProfileSuccessMessageProps {
  show: boolean;
  message?: string;
}

export const ProfileSuccessMessage = ({ 
  show, 
  message = "Profil berhasil diperbarui!" 
}: ProfileSuccessMessageProps) => {
  if (!show) return null;
  
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {message}
    </div>
  );
};