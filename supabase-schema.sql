-- Create orders table for Cozy Cakey
-- Run this SQL in your Supabase dashboard

CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  cake_id text NOT NULL,
  cake_name text NOT NULL,
  size text NOT NULL,
  flavor text NOT NULL,
  base_color text,
  custom_base_color text,
  lettering text,
  lettering_color text,
  custom_lettering_color text,
  candy_crown_color text,
  custom_candy_crown_color text,
  bow_color text,
  custom_bow_color text,
  delivery_date date NOT NULL,
  pickup_time text NOT NULL,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  kakaotalk_name text,
  instagram_name text,
  customer_type text NOT NULL,
  delivery_option text NOT NULL,
  address text,
  payment_method text NOT NULL,
  allergy_agreement boolean NOT NULL DEFAULT false,
  questions_comments text,
  discount_code text,
  total_price decimal(10,2) NOT NULL,
  order_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security for anonymous ordering
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Optional: Create policy to allow reading orders (if needed for admin)
-- CREATE POLICY "Allow reading orders" ON orders
--   FOR SELECT 
--   TO authenticated 
--   USING (true);

-- Create index for better performance
CREATE INDEX orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX orders_customer_email_idx ON orders (email);