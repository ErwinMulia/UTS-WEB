import React from 'react';
import { FaUser, FaPhone, FaEnvelope, FaEdit } from 'react-icons/fa';
import { ProfileInfoItem } from '../atom/ProfileInfoItem';
import { ProfileButton } from '../atom/ProfileButton';

interface ProfileData {
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

interface ProfileInfoDisplayProps {
  profile: ProfileData;
  onEdit: () => void;
}

export const ProfileInfoDisplay = ({ profile, onEdit }: ProfileInfoDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Informasi Akun</h2>
        <ProfileButton 
          onClick={onEdit} 
          variant="primary" 
          icon={<FaEdit />}
          className="px-3 py-1.5"
        >
          Edit
        </ProfileButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileInfoItem
          label="Email"
          value={profile.email}
          icon={<FaEnvelope />}
        />
        
        <ProfileInfoItem
          label="Nama Lengkap"
          value={profile.full_name}
          icon={<FaUser />}
        />
        
        <ProfileInfoItem
          label="Nomor Telepon"
          value={profile.phone}
          icon={<FaPhone />}
        />
        
        <ProfileInfoItem
          label="Tanggal Bergabung"
          value={new Date(profile.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        />
      </div>
    </div>
  );
};