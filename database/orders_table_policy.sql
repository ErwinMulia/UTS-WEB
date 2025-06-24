-- Membuat tabel orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Membuat tabel order_items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  event_id UUID NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aktifkan Row Level Security untuk tabel orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk tabel orders
-- Kebijakan untuk INSERT: Pengguna hanya dapat menyisipkan pesanan mereka sendiri
CREATE POLICY "Users can insert their own orders" 
  ON orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Kebijakan untuk SELECT: Pengguna hanya dapat melihat pesanan mereka sendiri
CREATE POLICY "Users can view their own orders" 
  ON orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Aktifkan Row Level Security untuk tabel order_items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk tabel order_items
-- Kebijakan untuk INSERT: Pengguna hanya dapat menyisipkan item untuk pesanan mereka
CREATE POLICY "Users can insert their own order items" 
  ON order_items 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Kebijakan untuk SELECT: Pengguna hanya dapat melihat item untuk pesanan mereka
CREATE POLICY "Users can view their own order items" 
  ON order_items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );