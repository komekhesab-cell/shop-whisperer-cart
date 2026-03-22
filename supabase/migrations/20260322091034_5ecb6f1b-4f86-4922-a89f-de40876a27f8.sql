
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;
DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;

-- Keep public read access
-- "Anyone can view products" stays

-- Only allow the specific admin email to modify products
CREATE POLICY "Admin can insert products" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'developer.ramin@gmail.com');

CREATE POLICY "Admin can update products" ON public.products
  FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'email' = 'developer.ramin@gmail.com');

CREATE POLICY "Admin can delete products" ON public.products
  FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'email' = 'developer.ramin@gmail.com');
