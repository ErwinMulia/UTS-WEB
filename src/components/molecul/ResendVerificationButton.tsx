'use client';

import React from 'react';
import { supabase } from '@/lib/supabaseclient';

interface ResendVerificationButtonProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  className?: string;
}

export const ResendVerificationButton = ({
  email,
  onSuccess,
  onError,
  className = '',
}: ResendVerificationButtonProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResendVerification = async () => {
    if (!email) {
      onError('Masukkan email Anda untuk mengirim ulang verifikasi');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Gagal mengirim email verifikasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleResendVerification}
      disabled={isLoading}
      className={`mt-2 text-blue-600 hover:text-blue-800 underline ${className}`}
    >
      {isLoading ? 'Mengirim...' : 'Kirim ulang email verifikasi'}
    </button>
  );
};