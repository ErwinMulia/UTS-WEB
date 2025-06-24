-- Membuat tabel events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  available_tickets INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aktifkan Row Level Security untuk tabel events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk SELECT: Semua pengguna dapat melihat events
CREATE POLICY "Anyone can view events" 
  ON events 
  FOR SELECT 
  USING (true);

-- Kebijakan untuk INSERT/UPDATE/DELETE: Hanya admin yang dapat mengelola events
CREATE POLICY "Only admins can manage events" 
  ON events 
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );