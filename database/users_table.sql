-- Pastikan ekstensi uuid-ossp diaktifkan
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Membuat tabel users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aktifkan Row Level Security untuk tabel users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk memungkinkan pengguna melihat profil mereka sendiri
CREATE POLICY "Users can view their own profile" 
  ON users 
  FOR SELECT 
  USING (auth.uid() = id);

-- Kebijakan untuk memungkinkan pengguna mengedit profil mereka sendiri
CREATE POLICY "Users can update their own profile" 
  ON users 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Kebijakan untuk memungkinkan pengguna memasukkan data profil mereka sendiri
CREATE POLICY "Users can insert their own profile" 
  ON users 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Kebijakan untuk memungkinkan admin melihat semua profil
CREATE POLICY "Admins can view all profiles" 
  ON users 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  ));

-- Kebijakan untuk memungkinkan admin mengedit semua profil
CREATE POLICY "Admins can update all profiles" 
  ON users 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  ));

-- Fungsi trigger untuk memperbarui updated_at saat data diubah
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Trigger untuk memperbarui updated_at saat data diubah
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();