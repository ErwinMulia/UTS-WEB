import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaSave, FaSpinner } from 'react-icons/fa';
import { ProfileInput } from '../atom/ProfileInput';
import { ProfileButton } from '../atom/ProfileButton';

interface ProfileFormData {
  full_name: string;
  phone: string;
}

interface ProfileEditFormProps {
  initialData: ProfileFormData;
  email: string;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export const ProfileEditForm = ({
  initialData,
  email,
  onSubmit,
  onCancel,
  isLoading
}: ProfileEditFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProfileInput
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={() => {}}
        label="Email"
        icon={<FaEnvelope />}
        readOnly={true}
        helpText="Email tidak dapat diubah"
      />
      
      <ProfileInput
        id="full_name"
        name="full_name"
        type="text"
        value={formData.full_name}
        onChange={handleInputChange}
        label="Nama Lengkap"
        icon={<FaUser />}
        placeholder="Masukkan nama lengkap"
        required
      />
      
      <ProfileInput
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        label="Nomor Telepon"
        icon={<FaPhone />}
        placeholder="Masukkan nomor telepon"
      />
      
      <div className="flex justify-end space-x-2 pt-4">
        <ProfileButton 
          onClick={onCancel}
          variant="secondary"
          disabled={isLoading}
        >
          Batal
        </ProfileButton>
        
        <ProfileButton
          type="submit"
          variant="primary"
          disabled={isLoading}
          isLoading={isLoading}
          loadingText="Menyimpan..."
          icon={<FaSave />}
        >
          Simpan
        </ProfileButton>
      </div>
    </form>
  );
};