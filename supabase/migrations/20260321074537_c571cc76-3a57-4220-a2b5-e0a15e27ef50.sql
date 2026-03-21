-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  details TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can view products
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Anyone can insert/update/delete for now (admin auth can be added later)
CREATE POLICY "Anyone can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete products" ON public.products FOR DELETE USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

CREATE POLICY "Anyone can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Anyone can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Anyone can update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Anyone can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with existing sample products
INSERT INTO public.products (name, price, description, details, category, image) VALUES
  ('Relaxed Linen Shirt', 68, 'Breathable pure linen in a relaxed fit. Perfect for warm days and layered looks.', ARRAY['100% European linen', 'Relaxed fit', 'Mother-of-pearl buttons', 'Machine washable'], 'Tops', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop'),
  ('Organic Cotton Midi Dress', 112, 'A fluid midi silhouette in organic cotton. Effortless elegance for any occasion.', ARRAY['100% organic cotton', 'Midi length', 'Side pockets', 'Adjustable waist tie'], 'Dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop'),
  ('Structured Wool Overcoat', 245, 'A timeless overcoat in Italian wool blend. Structured shoulders, clean lines.', ARRAY['70% wool, 30% cashmere', 'Fully lined', 'Two-button closure', 'Dry clean only'], 'Outerwear', 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=750&fit=crop'),
  ('Cashmere Blend Crewneck', 95, 'Soft cashmere blend knit with a classic crewneck. A wardrobe essential.', ARRAY['50% cashmere, 50% merino wool', 'Regular fit', 'Ribbed cuffs and hem', 'Hand wash recommended'], 'Knitwear', 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a28?w=600&h=750&fit=crop'),
  ('Wide-Leg Linen Trousers', 78, 'High-waisted wide-leg trousers in washed linen. Relaxed yet refined.', ARRAY['100% linen', 'High waist', 'Elastic back waistband', 'Machine washable'], 'Bottoms', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop'),
  ('Silk Satin Blouse', 135, 'Luxurious silk satin with a subtle sheen. Drapes beautifully, feels incredible.', ARRAY['100% mulberry silk', 'Loose fit', 'Concealed button placket', 'Dry clean only'], 'Tops', 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=750&fit=crop');