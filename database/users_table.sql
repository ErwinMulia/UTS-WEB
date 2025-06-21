-- Membuat tabel users untuk menyimpan data profil pengguna
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Membuat kebijakan keamanan untuk tabel users
-- Hanya pengguna yang terautentikasi yang dapat melihat data mereka sendiri
CREATE POLICY "Users can view their own profile" 
  ON users 
  FOR SELECT 
  USING (auth.uid() = id);

-- Hanya pengguna yang terautentikasi yang dapat memperbarui data mereka sendiri
CREATE POLICY "Users can update their own profile" 
  ON users 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Trigger untuk membuat record baru di tabel users saat pengguna baru mendaftar
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone)
  VALUES (new.id, new.email, '', '');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger yang akan dijalankan setelah pengguna baru dibuat di auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();